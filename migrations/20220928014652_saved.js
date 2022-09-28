/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("saved", (t) => {
    t.increments("id").primary();
    t.integer("clinic_id").references("id").inTable("clinics");
    t.string("user_id").references("uid").inTable("users").index();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("saved");
};
