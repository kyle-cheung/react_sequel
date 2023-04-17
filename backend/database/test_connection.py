import os
import psycopg2
from dotenv import load_dotenv

def print_result(header, rows):
    print("Result:")
    print("|", " | ".join(header), "|")
    print("|", "-" * (sum([len(h) for h in header]) + len(header) * 3 - 1), "|")
    for row in rows:
        print("|", " | ".join(map(str, row)), "|")

load_dotenv()  # Load environment variables from .env file

password = os.environ['POSTGRES_PASSWORD']  # Get password from the environment

# Define your connection string
connection_string = f"host=localhost dbname=ecom_sales user=sequel_user password={password}"

try:
    # Connect to the database
    conn = psycopg2.connect(connection_string)
    cursor = conn.cursor()
    print("Connected to the PostgreSQL database!")

    while True:
        query = input("Enter a SQL query (or type 'exit' to quit): ").strip()
        if query.lower() == 'exit':
            break
        try:
            cursor.execute(query)
            if query.lower().startswith("select"):
                headers = [desc[0] for desc in cursor.description]
                results = cursor.fetchall()
                print_result(headers, results)
            else:
                conn.commit()
                print("Query executed successfully.")
        except Exception as e:
            print("Error executing the SQL query:")
            print(e)
            conn.rollback()

    conn.close()

except Exception as e:
    print("Error connecting to the PostgreSQL database:")
    print(e)
