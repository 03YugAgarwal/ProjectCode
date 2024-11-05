const express = require("express");
const router = express.Router();

const { ValidateToken, ValidateTokenFaculty } = require("../controller/ValidateToken");

router.get("/", ValidateToken);
router.get("/faculty", ValidateTokenFaculty);

module.exports = router;
