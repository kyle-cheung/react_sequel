from database.database_init import engine
import os
import re
import psycopg2
from sqlalchemy import inspect
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain import PromptTemplate, LLMChain,  ConversationChain
from langchain.memory import ChatMessageHistory, ConversationBufferMemory
from langchain.prompts import (
    ChatPromptTemplate, 
    MessagesPlaceholder, 
    SystemMessagePromptTemplate, 
    HumanMessagePromptTemplate
)


load_dotenv()  # Load environment variables from .env file

password = os.environ['POSTGRES_PASSWORD']  # Get password from the environment
openai_api_key = os.environ['OPENAI_API_KEY']  # Get password from the environment

# Define your connection string
connection_string = f"host=localhost dbname=ecom_sales user=sequel_user password={password}"

def try_connection():
    try:
        # Connect to the database
        conn = psycopg2.connect(connection_string)
        cursor = conn.cursor()
        print("Connected to the PostgreSQL database!")
        conn.close()
        return {"status" : "success"}

    except Exception as e:
        print("Error connecting to the PostgreSQL database:")
        print(e)
        return {"status" : "error"}
    
def get_postgres_schema():
    # Use the SQLAlchemy engine to connect to the database
    with engine.connect() as connection:
        # Use SQLAlchemy's Inspector to get database metadata
        inspector = inspect(connection)

        # Get a list of table names
        tables = inspector.get_table_names()

        table_structure = {}

        # Iterate over each table and get column information
        for table in tables:
            columns = inspector.get_columns(table)
            # Store a list of column names and types for each table
            table_structure[table] = [(column['name'], column['type']) for column in columns]

        return table_structure
    
def init_llm():
    template = """
        You are a SQL generator that constructs SQL code in PostgresQL dialect when given a question.
        There are 5 rules you abide by:
        1. Only return SQL code
        2. Always use table aliases
        3. Always use CTEs when necessary
        4. Never use subqueries
        5. Wrap your code in triple back ticks "```"
        Answer the question below based the table structure below. If the question cannot be answered using the table structure provided, answer with "I don't know".
        Table structure: {table_structure}
        Question: {user_prompt}
        Answer: 
    """
    prompt = PromptTemplate(template = template, input_variables=["user_prompt", "table_structure"])
    chat = ChatOpenAI(model_name="gpt-4", temperature=0.1, openai_api_key=openai_api_key)
    llm_chain = LLMChain(prompt=prompt, llm=chat)
    return prompt, llm_chain, chat

def init_system_template():
    table_structure = "{" + repr(get_postgres_schema()) + "}"
    system_message = f"""
        You are a SQL writer that will reply with code in PostgresQL dialect when asked a question.
        There are 5 rules you abide by:
        1. Always use table aliases
        2. Always use CTEs when necessary
        3. Never use subqueries
        4. Wrap your code in a code block, also known as, triple back ticks "```"
        5. Always add comments to explain your code inside the code block
        You will answer future questions based on the table structure below. If the question cannot be answered using the table structure provided, I will answer with "I don't know". Sales is synonymous with orders.
        Table structure: {table_structure}
    """
    return system_message

def init_conversation_chain():
    system_prompt = init_system_template()
    system_message_prompt = SystemMessagePromptTemplate.from_template(system_prompt)
    prompt = ChatPromptTemplate.from_messages([
        system_message_prompt,
        MessagesPlaceholder(variable_name="history"),
        HumanMessagePromptTemplate.from_template("{input}")
    ])
    
    llm = ChatOpenAI(model_name="gpt-4", temperature=0, openai_api_key=openai_api_key)
    memory = ConversationBufferMemory(return_messages=True)
    conversation = ConversationChain(memory=memory, prompt=prompt, llm=llm)
    return conversation

def extract_sql_query(s: str):
    pattern = r"```(.*?)```"
    sql_query = re.search(pattern, s, re.DOTALL)
    if sql_query:
        return sql_query.group(1).strip()
    else:
        return None


def test():
    gpt = init_conversation_chain()
    while True:
        user_input = input("Enter a value (type 'exit' to quit): ")
        if user_input == 'exit':
            break
        print(gpt.predict(input=user_input))
