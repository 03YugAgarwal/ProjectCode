const {
  Assignment,
  Question,
  TestCase,
} = require("../models/AssignmentSchema");
const { Course } = require("../models/CourseSchema");
const { UserCourse } = require("../models/Map/UserCourse");
const { User } = require("../models/UserSchema");
const Teacher = require("../models/TeacherSchema");

const getAssignmentForStudentByID = async (req, res) => {
  try {
    const { id } = req.params;

    const courseDetails = await Course.findById(id);
    if (!courseDetails) {
      return res
        .status(404)
        .json({ error: "NoCourseFound", message: "No such course found." });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: "UserNotFound", message: "User not found." });
    }

    const userCourse = await UserCourse.findOne({ Course: id });
    if (!userCourse) {
      return res.status(404).json({
        error: "UserCourseNotFound",
        message: "User is not enrolled in this course.",
      });
    }

    const isStudentEnrolled = userCourse.Users.includes(user.RegisterNumber);
    const isTeacherOrAdmin = req.role.includes(1);

    if (isStudentEnrolled || isTeacherOrAdmin) {
      const assignments = await Assignment.find({ course: id });
      return res.status(200).json(assignments);
    } else {
      return res.status(403).json({
        error: "NotAuthorized",
        message: "You are not authorized to access this course.",
      });
    }
  } catch (error) {
    console.error("Error fetching assignment:", error);
    res.status(500).json({
      error: "ServerError",
      message: "Server error while finding assignment.",
    });
  }
};

const getAssignmentForStudentByCourseID = async (req, res) => {
  try {
    const { id } = req.params;

    const courseDetails = await Course.findOne({ CourseID: id });
    if (!courseDetails) {
      return res
        .status(404)
        .json({ error: "NoCourseFound", message: "No such course found." });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: "UserNotFound", message: "User not found." });
    }

    const userCourse = await UserCourse.findOne({ Course: courseDetails._id });
    if (!userCourse) {
      return res.status(404).json({
        error: "UserCourseNotFound",
        message: "User is not enrolled in this course.",
      });
    }

    const isStudentEnrolled = userCourse.Users.includes(user.RegisterNumber);
    const isTeacherOrAdmin = req.role.includes(1);

    if (isStudentEnrolled || isTeacherOrAdmin) {
      const assignments = await Assignment.find({ course: courseDetails._id });
      return res.status(200).json(assignments);
    } else {
      return res.status(403).json({
        error: "NotAuthorized",
        message: "You are not authorized to access this course.",
      });
    }
  } catch (error) {
    console.error("Error fetching assignment:", error);
    res.status(500).json({
      error: "ServerError",
      message: "Server error while finding assignment.",
    });
  }
};

const createAssignment = async (req, res) => {
  try {
    const isTeacherOrAdmin = req.role.includes(1);
    if (!isTeacherOrAdmin) {
      return res.status(403).json({
        error: "Unauthorized",
        message: "Unauthorized to create any assignments",
      });
    }

    const teacher = await Teacher.findById(req.userId); // Await added here
    if (!teacher) {
      return res.status(403).json({
        error: "Unauthorized",
        message: "Unauthorized to create any assignments",
      });
    }

    const { title, course, type, codes, question, startBy, submitBy } = req.body;

    if (!title || !course || !type || !codes) {
      return res.status(400).json({
        error: "MissingFields",
        message: "Some required fields are missing values",
      });
    }


    const data = {
      title,
      course,
      type,
      numberOfCodes: codes,
      question,
      ...(startBy && { startBy }), 
      ...(submitBy && { submitBy }),
    };

    const createdAssignment = await Assignment.create(data);

    console.log(createdAssignment);
    res.status(201).json(createdAssignment);

  } catch (error) {
    res.status(500).json({
      error: "Couldn'tCreateAssignment",
      message: "Error in creating assignment",
      errorCatch: error.message,
    });
  }
};

const getAssignmentById = async (req,res) => {
  try{
    const {id} = req.params
    const assignment = await Assignment.findById(id)

    

    res.status(200).json(assignment)

  }catch(error){
    res.status(500).json({
      error: "Couldn'tFind",
      message: "Error in finding assignment",
      errorCatch: error.message,
    });
  }
}

module.exports = {
  getAssignmentForStudentByID,
  getAssignmentForStudentByCourseID,
  createAssignment,
  getAssignmentById
};
