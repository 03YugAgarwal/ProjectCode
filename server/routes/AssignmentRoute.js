const express = require("express");
const router = express.Router();

const { getAssignmentForStudent } = require("../controller/Assignment");

router.get("/:courseid", getAssignmentForStudent);

module.exports = router;
