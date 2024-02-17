from flask import Flask, jsonify, redirect, request, session, abort
from flask_cors import CORS
from google_auth_oauthlib.flow import Flow
from google.oauth2 import id_token
import google.auth.transport.requests
from pip._vendor import cachecontrol
import requests
import os
import pathlib

import cohere
import pandas as pd
import numpy as np
import os
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"), environment="venv")
co = cohere.Client(os.environ.get("COHERE_API_KEY"))
GOOGLE_CLIENT_ID = os.environ.get("CLIENT_ID")
client = OpenAI()



app = Flask(__name__)
app.secret_key = "XT5PUdwqegbndhgfsbdvH5m79D"
CORS(app)

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
GOOGLE_CLIENT_ID = os.environ.get("CLIENT_ID")
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", 
            "https://mail.google.com/", "openid"],
    redirect_uri="http://localhost:5000/callback"
                                     )


def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function()

    return wrapper


@app.route("/login", methods=['GET', 'POST'])
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@app.route("/callback", methods=['GET', 'POST'])
def callback():
    flow.fetch_token(authorization_response=request.url)
    
    if not session["state"] == request.args["state"]:
        abort(500) # state doesn't match
    
    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)
    
    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )
    
    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    return redirect("http://localhost:3000")


@app.route("/logout", methods=['GET', 'POST'])
def logout():
    session.clear()
    return redirect("http://localhost:3000")


@app.route("/")
def index():
    return "Hello World <a href='/login'><button>Login</button></a>"


@app.route("/protected_area")
@login_is_required
def protected_area():
    return f"Hello {session['name']}! <br/> Info: {session} <br/> <a href='/logout'><button>Logout</button></a>"


# for testing flask and react connection
@app.route("/testing", methods=['GET'])
def testing():
    return jsonify(
        {"testing1": "abc", "testing2": "def"}
    )


@app.route("/embeddings_query", methods=['POST'])
def embeddings_query():
    data = request.get_json()
    query = data.get('query')

    index_name = 'cohere-pinecone-phish'
    index = pc.Index(index_name)
    
    q_embed = co.embed(
        texts=[query],
        model='embed-english-v3.0',
        input_type='search_query',
        truncate='END'
    ).embeddings

    res = index.query(vector=q_embed, top_k=9, include_metadata=True)
    results = []
    for match in res['matches']:
        results.append(match['metadata']['email'])
    return jsonify(results)


@app.route("/trained_model_query", methods=['POST'])
def trained_model_query():
    data = request.get_json()
    query = data.get('query')

    response = co.generate(
        model='95e83af8-15c7-414a-a743-e5bd36a08b0a-ft',
        prompt=query
    )
    return jsonify(response.generations[0].text)

@app.route("/general_model_query", methods=['POST'])
def general_model_query():
    data = request.get_json()
    query = data.get('query')

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
        {"role": "system", "content": "You are a phishing email detection model. You are given the following email and asked to determine if it is a 'Phishing' or a 'Safe' email. Please only give a one word response. The email is as follows: "},
        {"role": "user", "content": query}
        ]
    )
    return jsonify(completion.choices[0].message.content)

if __name__ == "__main__":
    app.run(debug=True)