const knex = require("knex");
require("dotenv").config({
  path: "./.env.local",
});

// const db = knex({
//   client: "pg",
//   connection:
//     process.env.DATABASE_URL ||
//     `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:5432/clipon`,
//   searchPath: "public",
// });

const db = knex({
  client: "pg",
  connection: {
    user: process.env.DB_USER || "postgres", // e.g. 'my-user'
    password: process.env.DB_PASS || "cct1clipon", // e.g. 'my-user-password'
    database: process.env.DB_NAME || "clipon", // e.g. 'my-database'
    host:
      process.env.INSTANCE_UNIX_SOCKET ||
      "/cloudsql/cliponproject:asia-northeast1:clipon-test2", // e.g. '/cloudsql/project:region:instance'
  },
});

module.exports = db;
