const express = require("express");
const router = express.Router();

const {checkAnswer} = require("../controller/Answer")

router.post('/check',checkAnswer)

module.exports = router;
