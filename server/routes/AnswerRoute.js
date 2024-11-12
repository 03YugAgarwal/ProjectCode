const express = require("express");
const router = express.Router();

const {checkAnswer, getSubmission, getCode} = require("../controller/Answer")

router.post('/check',checkAnswer)
router.post('/submission',getSubmission)
router.post('/code',getCode)

module.exports = router;
