from flask import Flask, request, jsonify, render_template, json
from flask_cors import CORS
from database.database_init import db, connection_string

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = connection_string
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route("/api")
def index():
    return jsonify({"status": "succeeded", "results": {"sql_query": "SELECT * FROM sales", "sql_table": "1"}})

if __name__ == "__main__":
    app.run(debug=True)
