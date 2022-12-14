/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("approved_clinics", (t) => {
    t.increments().index();
    t.integer("clinic_id").references("id").inTable("clinics");
    t.string("user_id").references("uid").inTable("users");
    t.string("photo_uri");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("approved_clinics");
};
