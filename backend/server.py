from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database.database_init import database, engine, metadata
import query
from typing import Optional
import logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

gpt = query.init_conversation_chain()

@app.get("/server")
def index():
    return {"status": "succeeded"}

class QueryInput(BaseModel):
    userInput: str


class QueryOutput(BaseModel):
    status: str
    sql_query: Optional[str] = None
    message: Optional[str] = None


@app.post("/server/query", response_model=QueryOutput)
async def process_query(input: QueryInput):
    try:
        logger.debug(f"Received input: {input.userInput}")

        gpt_response = gpt.predict(input=input.userInput)

        logger.debug(f"Generated gpt_response: {gpt_response}")

        sql_query = query.extract_sql_query(gpt_response)

        logger.debug(f"Extracted SQL query: {sql_query}")

        return {
            'status': 'success',
            'sql_query': sql_query
        }

    except Exception as e:
        logger.error(f"Error processing query: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)