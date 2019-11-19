const knex = require("knex");
const knexConfig = require("../knexfile");
const dbEnv = process.env.NODE_ENV || "development";
const db = knex(knexConfig[dbEnv]);

module.exports = db;