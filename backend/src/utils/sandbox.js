const { pool } = require("../config/postgres");

/**
 * Create a sandbox schema
 */
const createSandboxSchema = async (schemaName) => {
  const query = `CREATE SCHEMA IF NOT EXISTS ${schemaName};`;
  await pool.query(query);
};

/**
 * Drop sandbox schema completely
 */
const dropSandboxSchema = async (schemaName) => {
  const query = `DROP SCHEMA IF EXISTS ${schemaName} CASCADE;`;
  await pool.query(query);
};

/**
 * Set search path to sandbox
 */
const setSearchPath = async (schemaName) => {
  const query = `SET search_path TO ${schemaName};`;
  await pool.query(query);
};

module.exports = {
  createSandboxSchema,
  dropSandboxSchema,
  setSearchPath
};
