
from flask import Flask, json, request, jsonify
from flask_cors import CORS
from handlers import *

api = Flask(__name__)
CORS(api)
@api.route('/search', methods=['POST'])
def get_search():
    data= request.get_data()
    return search_timeline(data)



if __name__ == '__main__':
    api.run()
