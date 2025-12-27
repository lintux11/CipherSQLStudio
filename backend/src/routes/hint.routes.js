const express = require("express");
const router = express.Router();
const { getHint } = require("../controllers/hint.controller");

router.post("/", getHint);

module.exports = router;
