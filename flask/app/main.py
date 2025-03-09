from flask import Flask, send_file
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont

app = Flask(__name__)

# Google Generative AIのセットアップ（ダミー呼び出し）
def generate_ai_response():
    # 実際のAPI呼び出しコードをここに追加
    return "グールルのダミーAIだよ"

@app.route('/')
def home():
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    ai_response = generate_ai_response()

    return f"Hello, Flask with Docker! Current time: {current_time}<br>AI says: {ai_response}"

@app.route('/test')
def test():
    img = Image.new('RGB', (200, 100), color = (73, 109, 137))
    d = ImageDraw.Draw(img)
    d.text((10,10), "lkajsdf;oijwa;foijaw;eij", fill=(255,255,0))
    
    # 一時的に画像を保存
    img.save('/tmp/hello_flask.png')
    
    # 画像をレスポンスとして返す
    return send_file('/tmp/hello_flask.png', mimetype='image/png')

@app.route('/generate')
def generate():

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
