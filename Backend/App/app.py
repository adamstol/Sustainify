from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_cors import cross_origin
import openai
import os
from dotenv import load_dotenv


load_dotenv()
openai.api_key = os.environ['OPENAI_API_KEY']


app = Flask(__name__)

app.config['WTF_CSRF_ENABLED'] = False
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# CORS(app, resources={r"/result": {"origins": "http://localhost:3000"}})

one_para = ('for the all next  prompts, limit your answer in one paragraph by default, '
            'unless the prompt asks for more than one paragraph\n')
hide = 'for all my new prompts, you must not mention you are an ai language model can you do that\n'


# Keywords related to sustainability
sustainability_keywords = ["sustainability", "carbon footprint", "eco-friendly", "green living", "renewable energy",
                           "recycling", "climate change", "environment", "conservation", "energy efficiency",
                           "zero waste", "solar power", "reduce waste", "sustainable agriculture", "eco-conscious",
                           "clean energy", "ecosystem", "biodiversity", "global warming", "reusable", "low impact",
                           "conservation", "sustainable practices", "green technology", "organic farming",
                           "sustainable transportation"]


def is_sustainability_related(message):
    # Check if the message contains any sustainability-related keywords
    for keyword in sustainability_keywords:
        if keyword in message:
            return True
    return False


# @app.route("/")
# def home():
#     return render_template("/../../Frontend/src/static/public/index.html")


@app.route('/ask', methods=['POST', 'GET'])
@cross_origin(origin='http://localhost:3000')
def ask():
    print('post')
    data = request.get_json()
    print('json')
    if not data or 'message' not in data:
        return jsonify({'answer': 'Message is required'}), 400

    message = data['message']

    # Check if the message is related to sustainability
    if not is_sustainability_related(message):
        return jsonify({'answer': 'Please ask a question related to sustainability'}), 200

    # Make a request to OpenAI's v1/chat/completions endpoint
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": one_para + hide},
            {"role": "user", "content": message}
        ]

    )

    # Extract the assistant's message from the response
    assistant_message = response['choices'][0]['message']['content']

    return jsonify({'answer': assistant_message}), 200


@app.route('/result', methods=['POST'])
@cross_origin(origin='http://localhost:3000')
def result():

    data = request.get_json()
    # if not data or 'survey' not in data:
    #     return jsonify({'answer': 'Message is required'}), 400

    pre_prompt = ('Follow this format for your response, fill in the parts with {}:'

                  'Total carbon dioxide emissions: {Number of carbon dioxide emissions in float 2 decimal point tons}'

                  'Feedback:'

                  '{One paragraph max on how to reduce carbon emissions not bullet points}'

                  'Using the data below here fill in the response above and follow it exactly'
                  )

    q1 = ['1 room', '2 rooms', '3 rooms', '4 rooms or more']
    q2 = ['apartment', 'townhouse', 'bungalow', 'house']
    q3 = ['no heating', 'electrical', 'gas and electrical', 'gas']
    q4 = ['no', None, 'yes']
    q5 = ['1-2', '3-4', '5-6', '7 or more']

    sec_1 = ('\nSize of home: ' + q1[data['question1']] +
             '\nType of home: ' + q2[data['question2']] +
             '\nHeat source of home: ' + q3[data['question3']] +
             '\nDoes your house have AC: ' + q4[data['question4']] +
             '\nHow many people live in your household: ' +
             q5[data['question5']]
             )

    q6 = ['1-2', '3-4', '5-6', '7 or more']
    q7 = ['1', '2', '3', '4']
    q8 = ['Electric/None', 'hybrid', 'gas', 'diesel']
    q9 = ['less than 10,000', 'less than 15,000', 'less than 20,000', '20,000+']
    q10 = ['Sedan', 'SUV', 'Pickup', 'Truck']

    sec_2 = ('\nHow often do you fly per year: ' + q6[data['question6']] +
             '\nHow many cars does your household own: ' + q7[data['question7']] +
             '\nType of car(s) Gas: ' + q8[data['question8']] +
             '\nHow many km do you drive per year: ' + q9[data['question9']] +
             '\nSize of your most used car: ' + q10[data['question10']]
             )

    q11 = ['0', '1-2 times', '3-5 times', '6+ times']
    q12 = ['0', '1-2 times', '3-5 times', '6+ times']
    q13 = ['I never waste food', 'I avoid wasting food',
           'I often waste food', 'I don\'t even think about it']
    q14 = ['yes', None, 'no']
    q15 = ['yes', None, 'no']

    sec_3 = ('\nHow often do you eat beef or lamb: ' + q11[data['question11']] +
             '\nHow often do you eat purely plant based meals: ' + q12[data['question12']] +
             '\nWhich of these statements best describes your attitude about wasting food: ' + q13[data['question13']] +
             '\nI try to recycle as often as I can: ' + q14[data['question14']] +
             '\nDo you actively try to reduce your carbon footprint: ' +
             q15[data['question15']]
             )

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": pre_prompt},
            {"role": "user", "content": sec_1 + sec_2 + sec_3}
        ]
    )

    assistant_message = response['choices'][0]['message']['content']
    array_of_words = assistant_message.split()
    # print(type(assistant_message))
    # print(assistant_message)
    num = float(array_of_words[4])
    # print(num)
    return jsonify({'number': num, 'answer': assistant_message}), 200
    # num = 16.01
    # return jsonify({'number': num, 'answer': assistant_message}), 200


@app.route('/suggest/<section>', methods=['GET'])
def suggest(section):

    if section not in ['household', 'traveling', 'consumption-habits']:
        return jsonify({'error': 'invalid request'}), 400

    return jsonify({'answer': 'working'}), 200


if __name__ == "__main__":
    app.run(debug=True)
