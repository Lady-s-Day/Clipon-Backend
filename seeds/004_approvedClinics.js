/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("approved_clinics").del();
  await knex("approved_clinics").insert([
    { id: 1, clinic_id: 1, user_id: "K9ISFp2HfnTFjRvrfzq9z8ZdiZ33" },
    { id: 2, clinic_id: 2, user_id: "K9ISFp2HfnTFjRvrfzq9z8ZdiZ33" },
    { id: 3, clinic_id: 3, user_id: "bB6osfo9lZhyKLO0nP0VE8Fb2H62" },
    { id: 4, clinic_id: 4, user_id: "bB6osfo9lZhyKLO0nP0VE8Fb2H62" },
    { id: 5, clinic_id: 5, user_id: "zYLiW8w3YLQZUYBqRohZTkjlpM13" },
    { id: 6, clinic_id: 6, user_id: "zYLiW8w3YLQZUYBqRohZTkjlpM13" },
    { id: 7, clinic_id: 7, user_id: "53kR3H9AWHcp7u2pQlqELzRaMz13" },
    { id: 8, clinic_id: 8, user_id: "53kR3H9AWHcp7u2pQlqELzRaMz13" },
  ]);
};
