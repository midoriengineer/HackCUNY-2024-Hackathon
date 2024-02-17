from flask import Flask, jsonify, request
from flask_cors import CORS

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
client = OpenAI()



app = Flask(__name__)
CORS(app)

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