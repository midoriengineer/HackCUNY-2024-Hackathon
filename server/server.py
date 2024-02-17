from flask import Flask, jsonify
from flask_cors import CORS

import cohere
import pandas as pd
import numpy as np
import os
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI



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
