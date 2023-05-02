from flask import Flask, request, jsonify, render_template, json
from flask_cors import CORS
from database.database_init import db, connection_string
import query

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = connection_string
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

gpt = query.init_conversation_chain()

@app.route("/server")
def index():
    return jsonify({"status": "succeeded", "results": {"sql_query": "SELECT * FROM sales", "sql_table": "1"}})


@app.route("/server/query", methods=['POST'])
def process_query():
    try:
        user_input = request.json['userInput']
        gpt_response = gpt.predict(input=user_input)
        sql_query = query.extract_sql_query(gpt_response)

        return jsonify({
            'status': 'success',
            'sql_query': sql_query
        }), 200  # Return status code 200 for successful response

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500  # Return status code 500 for internal server error



if __name__ == "__main__":
    app.run(debug=True)
