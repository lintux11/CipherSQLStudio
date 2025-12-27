const express = require("express");
const Assignment = require("../models/Assignment.model");

const router = express.Router();

// GET all assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find({});
    return res.status(200).json(assignments);
  } catch (error) {
    console.error("❌ Fetch assignments error:", error);
    return res.status(500).json({
      message: "Failed to fetch assignments",
    });
  }
});

// GET assignment by ID
router.get("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    return res.status(200).json(assignment);
  } catch (error) {
    console.error("❌ Fetch assignment error:", error);
    return res.status(500).json({ message: "Failed to fetch assignment" });
  }
});

module.exports = router;
