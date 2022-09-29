/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { uid: "K9ISFp2HfnTFjRvrfzq9z8ZdiZ33", user_name: "アリぽん" },
    { uid: "jaWXrFOnXGhHpxIc6zkbNmV37p02", user_name: "アイぽん" },
    { uid: "zYLiW8w3YLQZUYBqRohZTkjlpM13", user_name: "リコぽん" },
    { uid: "jHcPcGQxE1go6bQeerzXW3jfGsm1", user_name: "アユぽん" },
  ]);
};
