from flask import Flask, request, jsonify, render_template
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.environ['OPENAI_API_KEY']

app = Flask(__name__)

app.config['WTF_CSRF_ENABLED'] = False

# Keywords related to sustainability
sustainability_keywords = ["sustainability", "carbon footprint", "eco-friendly", "green living", "renewable energy", "recycling", "climate change", "environment", "conservation", "energy efficiency", "zero waste", "solar power", "reduce waste", "sustainable agriculture", "eco-conscious", "clean energy", "ecosystem", "biodiversity", "global warming", "reusable", "low impact", "conservation", "sustainable practices", "green technology", "organic farming", "sustainable transportation"]

def is_sustainability_related(message):
    # Check if the message contains any sustainability-related keywords
    for keyword in sustainability_keywords:
        if keyword in message:
            return True
    return False

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()

    if not data or 'message' not in data:
        return jsonify({'error': 'Message is required'}), 400

    message = data['message']

    # Check if the message is related to sustainability
    if not is_sustainability_related(message):
        return jsonify({'error': 'Please ask a question related to sustainability'}), 400

    # Make a request to OpenAI's v1/chat/completions endpoint
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": message}
        ]
    )

    # Extract the assistant's message from the response
    assistant_message = response['choices'][0]['message']['content']

    return jsonify({'answer': assistant_message}), 200

@app.route('/result', methods=['POST'])
def result():
    data = request.get_json()

    if not data or 'message' not in data:
        return jsonify({'error': 'Message is required'}), 400

    message = data['message']

    # Check if the message is related to sustainability
    if not is_sustainability_related(message):
        return jsonify({'error': 'Please ask a question related to sustainability'}), 400

    # Make a request to OpenAI's v1/chat/completions endpoint
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": message}
        ]
    )

    # Extract the assistant's message from the response
    assistant_message = response['choices'][0]['message']['content']

    return jsonify({'answer': assistant_message}), 200

if __name__ == "__main__":
    app.run(debug=True)
