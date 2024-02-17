from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# for testing flask and react connection
@app.route("/testing", methods=['GET'])
def testing():
    return jsonify(
        {"testing1": "abc", "testing2": "def"}
    )


if __name__ == "__main__":
    app.run(debug=True)
