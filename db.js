const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecomm",
  password: "Erinthos123",
  port: 5432,
});

module.exports = pool;
