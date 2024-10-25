const express = require('express')
const router = express.Router()

const {getAllCourses,createCourse, assignStudentsToCourse,assignedCourse,getMyCourses,getCourseById} = require('../controller/Course')

router.get('/',getAllCourses)
router.post('/create',createCourse)
router.post('/assign',assignStudentsToCourse)
router.get('/assigned',assignedCourse)
router.get('/mycourses',getMyCourses)
router.get('/:CourseID',getCourseById)

module.exports = router
