/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("table_name").del();
  await knex("table_name").insert([
    { uid: "K9ISFp2HfnTFjRvrfzq9z8ZdiZ33", user_name: "アリぽん" },
    { uid: "bB6osfo9lZhyKLO0nP0VE8Fb2H62", user_name: "リコぽん" },
    { uid: "zYLiW8w3YLQZUYBqRohZTkjlpM13", user_name: "アユぽん" },
    { uid: "53kR3H9AWHcp7u2pQlqELzRaMz13", user_name: "アユぽん" },
  ]);
};
