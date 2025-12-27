const express = require("express");
const router = express.Router();
const { executeSQL } = require("../controllers/execute.controller");

router.post("/", executeSQL);

module.exports = router;
