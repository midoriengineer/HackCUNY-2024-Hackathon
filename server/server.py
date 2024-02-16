from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# for testing flask and react connection
@app.route("/testing")
def testing():
    return {"testing1": ["abc", "efg"]}


if __name__ == "__main__":
    app.run(debug=True)
