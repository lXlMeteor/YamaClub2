import openai
import requests

import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

API_KEY = os.getenv('API_KEY')

openai.api_key = API_KEY

save_dir = "image"
save_path = os.path.join(save_dir, "output.png")

def chat_with_gpt4o():
    client = openai.OpenAI(api_key=API_KEY)
    messages = [
        {"role": "system", "content": "あなたは文章を画像生成AIのプロンプトに書き直す天才です。ユーザーの文章をプロンプトに書き直してその文章のみを返答してください。返答は一文でかつ簡潔にしてください。また、公序良俗に反するような内容は含まないでください。"},
        {"role": "user", "content": "近年の夏はとても暑いと思いませんか？自分は夏になると1枚も服を着たくなくてほぼ全裸、パンイチで過ごすんですよね、\
そして私の家の階段には私よりも大きなサイズの窓が付いてるんです、もちろんそんな上品な家庭じゃないので階段の窓にカーテンなんかありません\
いつも通り今日もあっちいなと思いながら階段をおりていると向かいの家の息子さん？(30~くらいの人でした)とバッチリ目が合ってるではありませんか\
\
私の裸体とお気に入りのバッドマンパンツが見られましたもう世界が滅びればいいです"}
    ]
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages
    )

    return response.choices[0].message.content

print(datetime.now())
response = chat_with_gpt4o()
print(datetime.now())

# 画像生成のリクエスト
response = openai.images.generate(
    model="dall-e-2",  # DALL·E 2 を指定
    prompt=response,  # 生成したい画像のプロンプト
    n=1,  # 生成する画像の数
    size="1024x1024"  # 画像サイズ
)
print(datetime.now())

# 画像のURLを取得
image_url = response.data[0].url
print(f"Generated Image URL: {image_url}")
print(datetime.now())
# 画像をダウンロードして保存
image_data = requests.get(image_url).content

with open(save_path, "wb") as file:
    file.write(image_data)
print(datetime.now())
print("Image saved as output.png")
