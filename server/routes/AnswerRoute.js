const express = require("express");
const router = express.Router();

const {checkAnswer, getSubmission} = require("../controller/Answer")

router.post('/check',checkAnswer)
router.post('/submission',getSubmission)

module.exports = router;
