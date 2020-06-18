import os

from flask import Flask, json, request, jsonify, render_template, make_response
from flask_cors import CORS
from scraper.handlers import *
import time


app = Flask(__name__)
CORS(app)

def format_server_time():
  server_time = time.localtime()
  return time.strftime("%I:%M:%S %p", server_time)

@app.route('/')
def homepage():
    time = format_server_time()
    return ("<h1>Server Time: %s\n</h1> <h1>Listening...</h1>" %time )

@app.route('/search', methods=['GET','POST'])
def get_search():
    data= request.get_data()
    return search_timeline(data)


if __name__ == '__main__':
    app.run(host='localhost', port=8080,debug=True)
