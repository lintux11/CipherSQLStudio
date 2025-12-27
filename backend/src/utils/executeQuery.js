const { pool } = require("../config/postgres");

/**
 * Execute user SQL safely inside sandbox
 */
const executeUserQuery = async (schemaName, sqlQuery) => {
  await pool.query(`SET search_path TO ${schemaName};`);

  const result = await pool.query(sqlQuery);
  return result.rows;
};

module.exports = { executeUserQuery };
