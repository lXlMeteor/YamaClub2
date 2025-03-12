# ビルド用ステージ
FROM node:20.18.3 AS build

WORKDIR /next

# 本番用の依存関係を含まない依存関係をインストール
COPY package.json package-lock.json ./
RUN npm ci --only=production

# アプリケーションのソースコードをコピー
COPY . .

# Next.jsのビルドを実行
RUN npm run build

# 本番用ステージ（最終ステージ）
FROM node:20-alpine AS production

WORKDIR /next

# ビルド成果物をコピー
COPY --from=build . .

# 本番用依存関係をインストール（不要なものは省く）
RUN npm install --only=production

# 本番環境での実行コマンド
CMD ["npm", "run", "start"]

# 本番用のポートを開ける
EXPOSE 3000
