from flask import Flask, send_file, request
from datetime import datetime
import openai
import requests
import os
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()

API_KEY = os.getenv('API_KEY')

openai.api_key = API_KEY

# Google Generative AIのセットアップ（ダミー呼び出し）
def generate_ai_response():
    # 実際のAPI呼び出しコードをここに追加
    return "グールルのダミーAIだよ"

@app.route('/')
def home():
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    ai_response = generate_ai_response()

    return f"Hello, Flask with Docker! Current time: {current_time}<br>AI says: {ai_response}"

@app.route('/generate')
def generate():

    data = request.get_json()
    prompt = data['text']
    name = data['name']

    save_dir = "image"
    save_path = os.path.join(save_dir, f"{name}.png")

    client = openai.OpenAI(api_key=API_KEY)
    messages = [
        {"role": "system", "content": "あなたは文章を画像生成AIのプロンプトに書き直す天才です。ユーザーの文章をプロンプトに書き直してその文章のみを返答してください。返答は一文でかつ簡潔にしてください。また、公序良俗に反するような内容は含まないでください。"},
        {"role": "user", "content": prompt}
    ]
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages
    )

    prompt = response.choices[0].message.content

    response = openai.images.generate(
        model="dall-e-2",
        prompt=prompt,
        n=1,
        size="1024x1024"
    )

    image_url = response.data[0].url
    print(f"Generated Image URL: {image_url}")

    image_data = requests.get(image_url).content
    with open(save_path, "wb") as file:
        file.write(image_data)

    print("Image saved as output.png")

    return send_file(save_path,mimetype='image/png')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
