# Pythonの公式イメージをベースに使用
FROM python:3

# 作業ディレクトリを設定
WORKDIR /app

# 依存ライブラリをコピーしてインストール
COPY app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Flask アプリのコードをコピー
COPY app/ .

# ポートを公開
EXPOSE 5001

# Flask アプリを実行
CMD ["python", "main.py"]
