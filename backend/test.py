import requests
import json

# The base URL will be localhost if you're running the server locally
base_url = 'http://localhost:8000'
# Define the endpoint you want to hit
endpoint = '/server/query'
# Combine the base URL with the endpoint
url = base_url + endpoint

# The payload will be a dictionary with the userInput
payload = {
    'userInput': 'show me 5 rows of orders'
}

# We need to set the headers to let the server know we're sending JSON
headers = {
    'Content-Type': 'application/json'
}

# Send a POST request to the server
response = requests.post(url, headers=headers, data=json.dumps(payload))

# Print out the response
print(response.json())
