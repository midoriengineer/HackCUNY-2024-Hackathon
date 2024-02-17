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

import cohere
import pandas as pd
import numpy as np
import os
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI



app = Flask(__name__)
app.secret_key = "XT5PUdwqegbndhgfsbdvH5m79D"
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
CORS(app)

# Sign In with Google setup
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


@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@app.route("/callback")
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
    return redirect("/protected_area")


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/")
def index():
    return "Hello World <a href='/login'><button>Login</button></a>"


@app.route("/protected_area")
@login_is_required
def protected_area():
    return f"Hello {session['name']}! <br/> <a href='/logout'><button>Logout</button></a>"


# for testing flask and react connection
@app.route("/testing", methods=['GET'])
def testing():
    return jsonify(
        {"testing1": "abc", "testing2": "def"}
    )

if __name__ == "__main__":
    app.run(debug=True)



co = cohere.Client(os.environ.get("COHERE_API_KEY"))
pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"), environment="venv")
client = OpenAI()


# get data from pinecone
index_name = 'cohere-pinecone-phish'
index = pc.Index(index_name)

def embeddings_query(query):
    q_embed = co.embed(
        texts=[query],
        model='embed-english-v3.0',
        input_type='search_query',
        truncate='END'
    ).embeddings

    res = index.query(vector=q_embed, top_k=5, include_metadata=True)
    results = [{match['metadata']['email']}]


def trained_model_query(query):
    response = co.generate(
        model='95e83af8-15c7-414a-a743-e5bd36a08b0a-ft',
        prompt=query
    )
    return response.generations[0].text

def general_model_query(query):
    pass
