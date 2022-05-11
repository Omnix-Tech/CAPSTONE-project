
from textblob import TextBlob

class Sentiment:
  def __init__(self):
    pass
  
  def analyze(text):
    matches = TextBlob(text)
    if matches.sentiment.polarity < 0:
      return True
    return False
  


S_ = Sentiment()