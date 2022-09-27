/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("reviews", (t) => {
    t.increments("id").primary();
    t.timestamp("date").notNullable();
    t.text("text").notNullable();
    t.integer("clinic_id").references("id").inTable("clinics");
    t.string("user_id").references("uid").inTable("users");
    t.boolean("approved").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};
