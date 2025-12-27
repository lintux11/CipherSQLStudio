/**
 * Validate user SQL query
 * Allows only safe SELECT / WITH queries
 */
const validateSQL = (sql) => {
  if (!sql || typeof sql !== "string") {
    return { valid: false, message: "SQL query is required" };
  }

  // Normalize SQL
  const cleaned = sql
    .toLowerCase()
    .replace(/--.*$/gm, "")               // remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, "")     // remove block comments
    .trim();

  // Allow ONE optional trailing semicolon
  const normalized = cleaned.endsWith(";")
    ? cleaned.slice(0, -1).trim()
    : cleaned;

  // Block multiple statements
  if (normalized.includes(";")) {
    return {
      valid: false,
      message: "Multiple SQL statements are not allowed"
    };
  }

  // Allow only SELECT or WITH queries
  if (
    !normalized.startsWith("select") &&
    !normalized.startsWith("with")
  ) {
    return {
      valid: false,
      message: "Only SELECT queries are allowed"
    };
  }

  // Explicitly block dangerous keywords
  const blockedKeywords = [
    "insert",
    "update",
    "delete",
    "drop",
    "alter",
    "truncate",
    "create",
    "grant",
    "revoke"
  ];

  for (const keyword of blockedKeywords) {
    if (normalized.includes(keyword)) {
      return {
        valid: false,
        message: `Forbidden SQL keyword detected: ${keyword.toUpperCase()}`
      };
    }
  }

  return { valid: true };
};

module.exports = { validateSQL };
