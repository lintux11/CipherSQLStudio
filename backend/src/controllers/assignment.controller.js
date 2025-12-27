const Assignment = require("../models/Assignment.model");

// GET all assignments (already working)
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find(
      {},
      { title: 1, difficulty: 1, question: 1 }
    );
    return res.status(200).json(assignments);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch assignments" });
  }
};

// GET single assignment by ID
const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    return res.status(200).json(assignment);
  } catch (error) {
    return res.status(400).json({ message: "Invalid assignment ID" });
  }
};

module.exports = {
  getAllAssignments,
  getAssignmentById
};
