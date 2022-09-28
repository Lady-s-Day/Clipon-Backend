/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("clinics", (t) => {
    t.increments("id").primary();
    t.string("clinic_name", 32).unique().notNullable();
    t.float("stars").notNullable();
    t.string("url");
    t.string("image");
    t.integer("tokyo_ward_id").references("id").inTable("tokyo");
    t.boolean("doctor");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("clinics");
};
