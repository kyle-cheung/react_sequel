from flask import Flask, request, jsonify, render_template, json
from flask_cors import CORS
from database.database_init import db, connection_string
import query

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = connection_string
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route("/server")
def index():
    return jsonify({"status": "succeeded", "results": {"sql_query": "SELECT * FROM sales", "sql_table": "1"}})

@app.route("/server/test", methods=['POST'])
def test():
    user_input = request.json['userInput']
    print(user_input)
    # Process the user input and generate the required fields
    status = 'success'
    response = 'Processed user input'
    sql_query = 'SELECT * FROM table'
    sql_results = 'Your SQL query results'

    return jsonify({
        'status': status,
        'response': response,
        'sql_query': sql_query,
        'sql_results': sql_results
    })

if __name__ == "__main__":
    app.run(debug=True)
