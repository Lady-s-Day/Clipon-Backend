/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("saved").del();
  await knex("saved").insert([
    { id: 1, clinic_id: 1, user_id: "K9ISFp2HfnTFjRvrfzq9z8ZdiZ33" },
    { id: 2, clinic_id: 5, user_id: "K9ISFp2HfnTFjRvrfzq9z8ZdiZ33" },
    { id: 3, clinic_id: 7, user_id: "K9ISFp2HfnTFjRvrfzq9z8ZdiZ33" },
  ]);
};
