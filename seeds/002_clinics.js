/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("clinics").del();
  await knex("clinics").insert([
    {
      id: 1,
      clinic_name: "めぐみウィメンズクリニック",
      stars: 0.0,
      url: "http://megumi-w-clinic.com/",
      image: "ここにurl",
      tokyo_ward_id: 14,
    },
    {
      id: 2,
      clinic_name: "せきぐちクリニック",
      stars: 0.0,
      url: "https://www.sekiguchi-clinic.net/",
      image: "ここにurl",
      tokyo_ward_id: 14,
    },
    {
      id: 3,
      clinic_name: "ユリクリニック",
      stars: 0.0,
      url: "http://www.himawari.metro.tokyo.jp/qq13/qqport/tomintop/detail/fk1101.php?sisetuid=2132829890&kinouid=fk9920",
      image: "ここにurl",
      tokyo_ward_id: 14,
    },
    {
      id: 4,
      clinic_name: "成城松村クリニック",
      stars: 0.0,
      url: "http://seijo-keikoclub.com/",
      image: "ここにurl",
      tokyo_ward_id: 14,
    },
    {
      id: 5,
      clinic_name: "成城マタニティクリニック",
      stars: 0.0,
      url: "http://www.seijo-mc.com/",
      image: "ここにurl",
      tokyo_ward_id: 14,
    },
    {
      id: 6,
      clinic_name: "ゆみこクリニック",
      stars: 0.0,
      url: "http://www.yumiko-clinic.com",
      image: "ここにurl",
      tokyo_ward_id: 14,
    },
    {
      id: 7,
      clinic_name: "依田レディスクリニック",
      stars: 0.0,
      url: "http://www.yoda-clinic.com",
      image: "ここにurl",
      tokyo_ward_id: 14,
    },
    {
      id: 8,
      clinic_name: "三軒茶屋メリーレディースクリニック",
      stars: 0.0,
      url: "http://merry-ladies-clinic.com/",
      image: "ここにurl",
      tokyo_ward_id: 14,
    },
    {
      id: 9,
      clinic_name: "下北沢セントラルクリニック",
      stars: 0.0,
      url: "http://www.shimokita-cent-clinic.com/",
      image: "ここにurl",
      tokyo_ward_id: 14,
    },
    {
      id: 10,
      clinic_name: "池ノ上産婦人科",
      stars: 0.0,
      url: "http://www.sanfujin.com/",
      image: "ここにurl",
      tokyo_ward_id: 14,
    },
    {
      id: 11,
      clinic_name: "三軒茶屋ウィメンズクリニック",
      stars: 0.0,
      url: "http://www.sangenjaya-wcl.com/index.html",
      image: "ここにurl",
      tokyo_ward_id: 14,
    },
  ]);
};
