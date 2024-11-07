const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const {
  getAllTeachers,
  createTeacher,
  loginTeacher,
  getTeacherCourse
} = require("../controller/Teacher");

router.get("/", verifyToken, getAllTeachers);
router.get("/course", verifyToken, getTeacherCourse);
router.post("/create", verifyToken, createTeacher);
router.post("/login", loginTeacher);

module.exports = router;
