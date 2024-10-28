const express = require("express");
const router = express.Router();

const { ValidateToken } = require("../controller/ValidateToken");

router.get("/", ValidateToken);

module.exports = router;
