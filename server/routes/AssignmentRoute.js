const express = require("express");
const router = express.Router();

const {
  getAssignmentForStudentByID,
  getAssignmentForStudentByCourseID,
  createAssignment,
  getAssignmentById,
  getAssignmentForTeacherByID,
  getAssignmentForTeacherByAssignmentid
} = require("../controller/Assignment");

router.get("/:id", getAssignmentForStudentByID);
router.get("/course/:id", getAssignmentForStudentByCourseID);
router.post("/create", createAssignment);
router.get("/assignment/:id", getAssignmentById);
router.get("/teacher/get", getAssignmentForTeacherByID);
router.get("/teacher/get/:id", getAssignmentForTeacherByAssignmentid);

module.exports = router;
