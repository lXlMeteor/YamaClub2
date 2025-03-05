新規作成は /YamaClub2ディレクトリで
> `make init`

-MacOS-                  
> `make mac-next`
> `make mac-flask`

-LinuxOS-
> `make linux-next`
> `make linux-flask`

でブラウザを確認(nextは外部画像が正しく読み込まれていません)

ライブラリなどのインストールは
```make app```や```make back```
でコンテナに入って実行すること

ホスト環境(ローカル環境)で
```npm run dev```や```python main.py```
をなるべく使用しないこと

```make app```や```make back```
などでコンテナに入り、実行すること


docker-compose.yml
--開発用コンテナ統括ファイル

docker-compose.prod.yml
--本番用コンテナ統括ファイル

Dockerfile.dev
--開発用コンテナ管理ファイル

Dockerfile
--本番用コンテナ管理ファイル

Makefile
--長かったり、数行あるコマンドを一つの短いコマンドで制御できるようにしたファイル
-- make + 〇〇
--で実行