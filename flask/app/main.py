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


    response = openai.images.generate(
        model="dall-e-2",  # DALL·E 2 を指定
        prompt=prompt,  # 生成したい画像のプロンプト
        n=1,  # 生成する画像の数
        size="1024x1024"  # 画像サイズ
    )

    # 画像のURLを取得
    image_url = response.data[0].url
    print(f"Generated Image URL: {image_url}")

    # 画像をダウンロードして保存
    image_data = requests.get(image_url).content
    with open(save_path, "wb") as file:
        file.write(image_data)

    print("Image saved as output.png")

    return send_file(save_path,mimetype='image/png')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
