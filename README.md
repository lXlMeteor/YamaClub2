新規作成は
/waratte_kuyou　ディレクトリで
> ```make init```


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