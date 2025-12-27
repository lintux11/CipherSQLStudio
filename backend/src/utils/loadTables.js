const { pool } = require("../config/postgres");

/**
 * Load sample tables into sandbox schema
 */
const loadSampleTables = async (schemaName, sampleTables) => {
  for (const table of sampleTables) {
    const columnsSQL = table.columns
      .map(col => `${col.columnName} ${col.dataType}`)
      .join(", ");

    const createTableQuery = `
      CREATE TABLE ${schemaName}.${table.tableName} (
        ${columnsSQL}
      );
    `;

    await pool.query(createTableQuery);

    for (const row of table.rows) {
      const columns = Object.keys(row).join(", ");
      const values = Object.values(row);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

      const insertQuery = `
        INSERT INTO ${schemaName}.${table.tableName} (${columns})
        VALUES (${placeholders});
      `;

      await pool.query(insertQuery, values);
    }
  }
};

module.exports = { loadSampleTables };
