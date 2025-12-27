const express = require("express");
const cors = require("cors");
const assignmentRoutes = require("./routes/assignment.routes");
const executeRoutes = require("./routes/execute.routes");
const hintRoutes = require("./routes/hint.routes");



const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  console.log("✅ Health route hit");
  res.status(200).json({ status: "ok" });
});


app.use("/api/assignments", assignmentRoutes);
app.use("/api/execute", executeRoutes);
app.use("/api/hint", hintRoutes);



module.exports = app;
