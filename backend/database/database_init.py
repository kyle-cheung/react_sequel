from sqlalchemy import create_engine, MetaData
from databases import Database
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

password = os.environ['POSTGRES_PASSWORD']  # Get password from the environment
db_user = 'sequel_user'
db_name = 'ecom_sales'
# Define your connection string
DATABASE_URL = f"postgresql://{db_user}:{password}@localhost:5432/{db_name}"

# SQLAlchemy
engine = create_engine(DATABASE_URL)
metadata = MetaData()

# databases query builder
database = Database(DATABASE_URL)
