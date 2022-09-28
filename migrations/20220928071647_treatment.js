/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("treatment", (t) => {
    t.increments("id").primary();
    t.string("type");
    t.integer("clinic_id").references("id").inTable("clinics");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("treatment");
};
