const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema(
  {
    columnName: String,
    dataType: String
  },
  { _id: false }
);

const TableSchema = new mongoose.Schema(
  {
    tableName: String,
    columns: [ColumnSchema],
    rows: [mongoose.Schema.Types.Mixed]
  },
  { _id: false }
);

const AssignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true
    },
    question: {
      type: String,
      required: true
    },
    sampleTables: [TableSchema],
    expectedOutput: {
      type: {
        type: String
      },
      value: mongoose.Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Assignment", AssignmentSchema);
