import requests
import json

base_url = 'http://localhost:8000'
endpoint = '/server/query'
url = base_url + endpoint

payload = {
    'userInput': 'show me 5 rows of orders'
}

headers = {
    'Content-Type': 'application/json'
}

response = requests.post(url, headers=headers, data=json.dumps(payload))

print(response.json())
