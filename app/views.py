
import json
from app import app
from flask import jsonify, request

from app.sentiment import S_



@app.route('/')
def index():
    return jsonify("We Connect Python API")


@app.route('/sentiment', methods = ['POST'])
def sentiment():
    data = json.loads(request.data)
    analysis = S_.analyze(data['article'])
    
    
    return jsonify(analysis = analysis)