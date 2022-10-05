# Clipon-Backend

クリぽんアプリのバックエンドです。
 
# Requirements
- knex
- express.js
- postgres
- ngrok


# 使い方
 
1. このレポジトリをダウンロードする。
2. 必要なライブラリをインストールする: ```npm i ```
3. postgreSQLを開始する。
4. ```.env.local```ファイルの```DB_USER, DB_PASSWORD, DB_NAME```を指定する。
5. ```DB_NAME```で指定した名前のデータベースを作成する。
6. ```knex.js```のデータベース名を```DB_NAME```にせっていする。
7. ```npm run start```を実行する。
8. ```ngrok http 9000```を実行する。
9. ngrokが表示した```https```リンクをフロントのエンドポイントに使用する。

 
# 注意
 
クリぽんアプリのフロントは[こちらのレポジトリ](https://github.com/Lady-s-Day/Clipon)です。
 
# 製作者
 
* Aik123 (Ai Kurita)
* arisa277 (Arisa Nii)
* ayumiwatanabe3 (Ayumi Watanabe)
* nasi-goreng (Riko Naito)

