const knex = require("knex");
const knexConfig = require("../knexfile");
const dbEnv = process.env.DB_ENV || "development";

const db = knex(knexConfig[dbEnv]);
// const db = knex(knexConfig.test);

module.exports = db;
