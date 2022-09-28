/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("treatments").del();
  await knex("treatments").insert([
    { id: 1, type: "月経異常", clinic_id: 1 },
    { id: 2, type: "生理痛", clinic_id: 1 },
    { id: 3, type: "PMS", clinic_id: 1 },
    { id: 4, type: "避妊", clinic_id: 1 },
    { id: 5, type: "月経異常", clinic_id: 2 },
    { id: 6, type: "PMS", clinic_id: 2 },
    { id: 7, type: "生理痛", clinic_id: 2 },
    { id: 8, type: "性感染症", clinic_id: 2 },
    { id: 9, type: "性感染症", clinic_id: 3 },
    { id: 10, type: "避妊", clinic_id: 3 },
    { id: 11, type: "PMS", clinic_id: 4 },
    { id: 12, type: "避妊", clinic_id: 4 },
    { id: 13, type: "性感染症", clinic_id: 4 },
    { id: 14, type: "月経異常", clinic_id: 5 },
    { id: 15, type: "生理痛", clinic_id: 5 },
    { id: 16, type: "PMS", clinic_id: 5 },
    { id: 17, type: "性感染症", clinic_id: 5 },
    { id: 18, type: "性感染症", clinic_id: 6 },
    { id: 19, type: "避妊", clinic_id: 7 },
    { id: 20, type: "PMS", clinic_id: 7 },
    { id: 21, type: "月経異常", clinic_id: 8 },
    { id: 22, type: "生理痛", clinic_id: 8 },
    { id: 23, type: "PMS", clinic_id: 8 },
    { id: 24, type: "生理痛", clinic_id: 9 },
    { id: 25, type: "PMS", clinic_id: 9 },
    { id: 26, type: "性感染症", clinic_id: 10 },
    { id: 27, type: "月経異常", clinic_id: 10 },
    { id: 28, type: "生理痛", clinic_id: 10 },
    { id: 29, type: "避妊", clinic_id: 10 },
    { id: 30, type: "PMS", clinic_id: 11 },
    { id: 31, type: "性感染症", clinic_id: 11 },
  ]);
};
