from transformers import pipeline

classifier = pipeline("sentiment-analysis")

def analyze_sentiment(text: str):
    return classifier(text)
