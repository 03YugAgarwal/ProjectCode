const express = require('express')
const router = express.Router()

const {getAllCourses,createCourse} = require('../controller/Course')

router.get('/',getAllCourses)
router.post('/create',createCourse)

module.exports = router
