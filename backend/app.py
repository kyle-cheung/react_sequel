from pydantic import BaseModel
from database.database_init import database, engine, metadata
import query
from typing import Optional
import logging

gpt = query.init_conversation_chain()

def ask_question():
    while True:
        question = input("Ask your question: ")
        if question.lower() == "exit":
            break
        else:
            gpt_response = gpt.predict(input=question)
            print(gpt_response)

if __name__ == "__main__":
    ask_question()