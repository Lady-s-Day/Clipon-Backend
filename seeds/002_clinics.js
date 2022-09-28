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
      image: "https://i.ibb.co/D8xZWwQ/megumi.jpg",
      tokyo_ward_id: 14,
      doctor: true,
    },
    {
      id: 2,
      clinic_name: "せきぐちクリニック",
      stars: 0.0,
      url: "https://www.sekiguchi-clinic.net/",
      image: "https://i.ibb.co/qJwtPjm/sekiguchi.jpg",
      tokyo_ward_id: 14,
      doctor: false,
    },
    {
      id: 3,
      clinic_name: "ユリクリニック",
      stars: 0.0,
      url: "http://www.himawari.metro.tokyo.jp/qq13/qqport/tomintop/detail/fk1101.php?sisetuid=2132829890&kinouid=fk9920",
      image: null,
      tokyo_ward_id: 14,
      doctor: true,
    },
    {
      id: 4,
      clinic_name: "成城松村クリニック",
      stars: 0.0,
      url: "https://www.seijo-keikoclub.com/",
      image: "https://i.ibb.co/p1K7fgV/seijo-matsumura.jpg",
      tokyo_ward_id: 14,
      doctor: true,
    },
    {
      id: 5,
      clinic_name: "成城マタニティクリニック",
      stars: 0.0,
      url: "https://www.seijo-mc.com/",
      image: "https://i.ibb.co/kKf2xP2/seijo-maternity.jpg",
      tokyo_ward_id: 14,
      doctor: true,
    },
    {
      id: 6,
      clinic_name: "ゆみこクリニック",
      stars: 0.0,
      url: "http://www.yumiko-clinic.com",
      image: "https://i.ibb.co/Ky5MGXT/yumiko.jpg",
      tokyo_ward_id: 14,
      doctor: true,
    },
    {
      id: 7,
      clinic_name: "依田レディスクリニック",
      stars: 0.0,
      url: "http://www.yoda-clinic.com",
      image: "https://i.ibb.co/42kcLbT/yoda-ladys.jpg",
      tokyo_ward_id: 14,
      doctor: true,
    },
    {
      id: 8,
      clinic_name: "三軒茶屋メリーレディースクリニック",
      stars: 0.0,
      url: "http://merry-ladies-clinic.com/",
      image: "https://i.ibb.co/Z17dRNf/merry.jpg",
      tokyo_ward_id: 14,
      doctor: true,
    },
    {
      id: 9,
      clinic_name: "下北沢セントラルクリニック",
      stars: 0.0,
      url: "http://www.shimokita-cent-clinic.com/",
      image: "https://i.ibb.co/b6r783B/shimokita-central.jpg",
      tokyo_ward_id: 14,
      doctor: false,
    },
    {
      id: 10,
      clinic_name: "池ノ上産婦人科",
      stars: 0.0,
      url: "http://www.sanfujin.com/",
      image: "https://i.ibb.co/s63zDyS/ikenoue.jpg",
      tokyo_ward_id: 14,
      doctor: true,
    },
    {
      id: 11,
      clinic_name: "三軒茶屋ウィメンズクリニック",
      stars: 0.0,
      url: "http://www.sangenjaya-wcl.com/index.html",
      image: "https://i.ibb.co/VgRMfJ8/sancha-womens.jpg",
      tokyo_ward_id: 14,
      doctor: false,
    },
  ]);
};
