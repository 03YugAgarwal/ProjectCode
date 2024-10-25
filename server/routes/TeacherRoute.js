const express = require("express");
const router = express.Router();

const {getAllTeachers, createTeacher, loginTeacher} = require('../controller/Teacher')

router.get('/',getAllTeachers)
router.post('/create',createTeacher)
router.post('/login',loginTeacher)

module.exports = router