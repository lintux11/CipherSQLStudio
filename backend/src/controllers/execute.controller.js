const Assignment = require("../models/Assignment.model");
const {
  createSandboxSchema,
  dropSandboxSchema
} = require("../utils/sandbox");
const { loadSampleTables } = require("../utils/loadTables");
const { executeUserQuery } = require("../utils/executeQuery");
const { validateSQL } = require("../utils/sqlValidator");


const executeSQL = async (req, res) => {
  const { assignmentId, sqlQuery } = req.body;
  const validation = validateSQL(sqlQuery);

if (!validation.valid) {
  return res.status(400).json({
    success: false,
    error: validation.message
  });
}


  if (!assignmentId || !sqlQuery) {
    return res.status(400).json({ message: "assignmentId and sqlQuery required" });
  }

  const schemaName = `workspace_${Date.now()}`;

  try {
    // 1. Get assignment
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // 2. Create sandbox
    await createSandboxSchema(schemaName);

    // 3. Load sample tables
    await loadSampleTables(schemaName, assignment.sampleTables);

    // 4. Execute user query
    const result = await executeUserQuery(schemaName, sqlQuery);

    // 5. Cleanup
    await dropSandboxSchema(schemaName);

    return res.status(200).json({
      success: true,
      rows: result
    });
  } catch (error) {
    // Cleanup even on error
    await dropSandboxSchema(schemaName);

    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = { executeSQL };
