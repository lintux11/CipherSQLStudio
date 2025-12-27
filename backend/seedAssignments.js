require("dotenv").config();
const mongoose = require("mongoose");
const Assignment = require("./src/models/Assignment.model");

console.log("🚀 Seeding script started...");
console.log("Using Mongo URI:", process.env.MONGO_URI ? "FOUND" : "NOT FOUND");

const seedAssignment = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    const countBefore = await Assignment.countDocuments();
    console.log("Assignments before seeding:", countBefore);

    await Assignment.deleteMany();

    const assignment = new Assignment({
      title: "Employees per Department",
      difficulty: "Easy",
      question:
        "Write a SQL query to find the total number of employees in each department.",
      sampleTables: [
        {
          tableName: "employees",
          columns: [
            { columnName: "id", dataType: "INTEGER" },
            { columnName: "name", dataType: "TEXT" },
            { columnName: "department", dataType: "TEXT" }
          ],
          rows: [
            { id: 1, name: "Alice", department: "HR" },
            { id: 2, name: "Bob", department: "Engineering" },
            { id: 3, name: "Charlie", department: "Engineering" },
            { id: 4, name: "Diana", department: "HR" }
          ]
        }
      ],
      expectedOutput: {
        type: "table",
        value: [
          { department: "HR", count: 2 },
          { department: "Engineering", count: 2 }
        ]
      }
    });

    await assignment.save();
    console.log("🎉 Sample assignment inserted successfully");

    const countAfter = await Assignment.countDocuments();
    console.log("Assignments after seeding:", countAfter);

    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedAssignment();
