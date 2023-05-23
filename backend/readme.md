This uses FastAPI

# Getting Started

Install the requirements:

```
pip install requirements.txt
```

Run the app and navigate to http://localhost:3000

```
uvicorn server:app
```

Or to run in debug mode:

```
uvicorn server:app --log-level debug
```

# Endpoints

Only the frontend should be able to hit these endpoints

## /server/query

This endpoint is a `POST`, it inputs a text based question and the output is a json with the following:

```
{
    'status': 'success',
    'sql_query': user's input converted into a SQL query
}
```
