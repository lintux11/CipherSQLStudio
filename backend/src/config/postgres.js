const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD || undefined,
  database: process.env.PG_DATABASE
});

const testPostgresConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("PostgreSQL connected at:", result.rows[0].now);
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = {
  pool,
  testPostgresConnection
};
