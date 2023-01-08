const mysql2 = require("mysql2/promise");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = require("./config");
const pool = mysql2.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

module.exports = pool;
