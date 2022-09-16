/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tokyo").del();
  await knex("tokyo").insert([
    { id: 1, ward: "足立区" },
    { id: 2, ward: "荒川区" },
    { id: 3, ward: "板橋区" },
    { id: 4, ward: "江戸川区" },
    { id: 5, ward: "大田区" },
    { id: 6, ward: "葛飾区" },
    { id: 7, ward: "北区" },
    { id: 8, ward: "江東区" },
    { id: 9, ward: "品川区" },
    { id: 10, ward: "渋谷区" },
    { id: 11, ward: "新宿区" },
    { id: 12, ward: "杉並区" },
    { id: 13, ward: "墨田区" },
    { id: 14, ward: "世田谷区" },
    { id: 15, ward: "台東区" },
    { id: 16, ward: "千代田区" },
    { id: 17, ward: "中央区" },
    { id: 18, ward: "豊島区" },
    { id: 19, ward: "中野区" },
    { id: 20, ward: "練馬区" },
    { id: 21, ward: "文京区" },
    { id: 22, ward: "港区" },
    { id: 23, ward: "目黒区" },
  ]);
};
