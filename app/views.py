
from app import app
from flask import jsonify, request

from app.sentiment import S_



@app.route('/')
def index():
    return jsonify("We Connect Python API")


@app.route('/sentiment', method = ['POST'])
def sentiment():
    data = request.get_json()
    analysis = S_.analyze(data.article)
    
    
    return jsonify(analysis = analysis)