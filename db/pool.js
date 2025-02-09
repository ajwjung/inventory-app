const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.CONNECTION_URI,
});

module.exports = pool;