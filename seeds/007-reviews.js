/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("reviews").del();
  await knex("reviews").insert([
    {
      date: "2022-08-25",
      text: "予約が直前すぎて取れず、急遽飛び込みでお伺いしたのですが、快く受け入れてくださいました😭診察までもスムーズで、先生もとても優しかったです。説明もわかりやすく、初めての症状で不安だったのですがとても安心できました。またお伺いさせていただきます。",
      clinic_id: 1,
      user_id: "K9ISFp2HfnTFjRvrfzq9z8ZdiZ33",
      approved: true,
    },
    {
      date: "2022-09-10",
      text: "気持ちにも寄り添ってくれて、説明もきっちりしてくれる院長。看護師さん達も本当に優しくて、本当に素晴らしいと思いました！受付の方が…と書き込みされてる方がいましたが、もしそうだったとしたら今は改善されています。来てよかったと思いました。",
      clinic_id: 1,
      user_id: "jaWXrFOnXGhHpxIc6zkbNmV37p02",
      approved: false,
    },
    {
      date: "2022-10-05",
      text: "女性特有の恥ずかしい病気の話や、診察などもサッパリしてもらったほうがこちらとしては恥ずかしさが軽減して気持ちが楽で私は好きです。定期的な検診であれば女性の先生の方が私は恥ずかしい思いをしなくて良いのでこれからもこちらにかかろうと思います。",
      clinic_id: 1,
      user_id: "zYLiW8w3YLQZUYBqRohZTkjlpM13",
      approved: true,
    },
    {
      date: "2022-10-03",
      text: "婦人科で伺いました。先生は優しく穏やかな方で、不安な気持ちで来た私にとても親切に対応をしてくださいました。「他に何か不安はないですか？何でも聞いてくださいね。」と毎回言ってくださるので安心します。説明も丁寧で分かりやすく、治療いただき症状も改善しました。",
      clinic_id: 1,
      user_id: "jHcPcGQxE1go6bQeerzXW3jfGsm1",
      approved: false,
    },
    {
      date: "2022-07-25",
      text: "私はピルをもらいたくて受診したのですが、周りは妊婦さんばかりでした。産科がメインなのかな。",
      clinic_id: 5,
      user_id: "jHcPcGQxE1go6bQeerzXW3jfGsm1",
      approved: false,
    },
    {
      date: "2022-08-25",
      text: "先生は感じの良い方でした。ひとりひとりじっくり話を聞いてくれるので、その分待ち時間が少し長め。余裕を持って行くといいと思います。",
      clinic_id: 5,
      user_id: "zYLiW8w3YLQZUYBqRohZTkjlpM13",
      approved: true,
    },
  ]);
};
