const express = require('express')
const router = express.Router()

const {getAllCourses,createCourse, assignStudentsToCourse,assignedCourse} = require('../controller/Course')

router.get('/',getAllCourses)
router.post('/create',createCourse)
router.post('/assign',assignStudentsToCourse)
router.get('/assigned',assignedCourse)

module.exports = router
