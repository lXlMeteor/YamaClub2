import openai
import requests

import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('API_KEY')

openai.api_key = API_KEY

save_dir = "image"
save_path = os.path.join(save_dir, "output.png")




# 画像生成のリクエスト
response = openai.images.generate(
    model="dall-e-2",  # DALL·E 2 を指定
    prompt="中学生時代にテストで名前を書くとき、名前の前に“天才”と書き付け足していた…",  # 生成したい画像のプロンプト
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
