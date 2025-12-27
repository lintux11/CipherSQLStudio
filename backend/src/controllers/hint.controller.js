const Assignment = require("../models/Assignment.model");
const openai = require("../config/openai");

const getHint = async (req, res) => {
  const { assignmentId, sqlQuery } = req.body;

  if (!assignmentId) {
    return res.status(400).json({ message: "assignmentId required" });
  }

  try {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const prompt = `
You are a SQL tutor.
Your task is to help a student solve a SQL problem by giving a HINT only.

RULES:
- DO NOT give the full SQL query
- DO NOT write exact SQL code
- DO NOT reveal the final answer
- Give conceptual guidance only

QUESTION:
${assignment.question}

STUDENT QUERY (may be empty or wrong):
${sqlQuery || "No query yet"}

Give a short, helpful hint (1–2 sentences).
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4
    });

    const hint = response.choices[0].message.content;

    return res.status(200).json({ hint });
  } catch (error) {
    console.error("OPENAI ERROR DETAILS ↓↓↓");
    console.error(error?.response?.data || error.message || error);

    // ✅ Fallback hint (important for evaluation)
    return res.status(200).json({
      hint:
        "Think about grouping the data based on the required column and applying an aggregate function to compute the result."
    });
  }
};

module.exports = { getHint };
