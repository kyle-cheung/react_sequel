from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

password = os.environ['POSTGRES_PASSWORD']  # Get password from the environment
db_user = 'sequel_user'
db_name = 'ecom_sales'
# Define your connection string
connection_string = f"postgresql://{db_user}:{password}@localhost:5432/{db_name}"

db = SQLAlchemy()
