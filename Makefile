#各コードの前に"make"をつける 例) make init
init:  #新規のビルド
	docker-compose -f docker-compose.yml up -d --build

init-mac:  #新規ビルド後にブラウザを開く(MacOS)
	@make init
	@make mac-open

init-linux:  #新規ビルド後にブラウザを開く(LinuxOS)
	@make init
	@make linux-open

up:  #セットアップや既存イメージの再ビルド
	docker-compose -f docker-compose.yml up -d

build:  #キャッシュを使わないビルド,起動はしない
	docker-compose -f docker-compose.yml build --no-cache

stop:  #コンテナの停止
	docker-compose stop

start:  #コンテナの再起動
	docker-compose -f docker-compose.yml start

down:  #コンテナ削除
	docker-compose down --remove-orphans

restart:
	@make stop
	@make up

resmake:  #コンテナの再生成
	@make down
	@make up

reupdate:  #コンテナを更新
	@make down
	@make init

reset:  #全てのデータを削除し、新規ビルド(成果物は消えない)
	@make destroy
	@make init

#イメージ、ボリューム、その他コンテナを全て削除します
destroy:
	docker compose down --rmi all --volumes --remove-orphans
#ボリューム、その他コンテナを削除します
destroy-volumes:
	docker compose down --volumes --remove-orphans

app:  #appコンテナ(nextのコンテナ)に入る
	docker-compose exec app sh
back:  #flaskコンテナに入る
	docker-compose exec flask sh

ps: . #現在稼働中のコンテナを表示
	docker-compose ps

npm-dev:  #サーバーを起動(コンテナ起動時にport:3000は使われているため、あまり意味はない)
	docker-compose exec app npm run dev
python:
	docker-compose exec flask python main.py

mac-next:  #MacOSの場合はこれでブラウザが開く
	open http://localhost:3000
mac-flask:
	open http://127.0.0.1:5001

linux-next:  #LinuxOSの場合はこれでブラウザが開く
	xdg-open http://localhost:3000
linux-flask:
	edg-open http://127.0.0.1:5001