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
        message: "Unauthorized to create assignments",
      });
    }

    const teacher = await Teacher.findById(req.userId);
    if (!teacher) {
      return res.status(403).json({
        error: "Unauthorized",
        message: "Unauthorized to create assignments",
      });
    }

    const { title, course, type, codes, question, startBy, submitBy, isOver } = req.body;

    // Validation check for required fields
    if (!title || !course || !type || !codes || !question) {
      return res.status(400).json({
        error: "MissingFields",
        message: "Some required fields are missing values",
      });
    }

    // Construct the assignment data
    const data = {
      title,
      course,
      type,
      numberOfCodes: codes,
      question,
      ...(startBy && { startBy }), // Optional startBy field
      ...(submitBy && { submitBy }), // Optional submitBy field
      isOver: isOver || false, // Set default value to false if not provided
    };

    const createdAssignment = await Assignment.create(data);
    res.status(201).json(createdAssignment);

  } catch (error) {
    res.status(500).json({
      error: "Couldn'tCreateAssignment",
      message: "Error in creating assignment",
      errorCatch: error.message,
    });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const isTeacherOrAdmin = req.role.includes(1);
    if (!isTeacherOrAdmin) {
      return res.status(403).json({
        error: "Unauthorized",
        message: "Unauthorized to update assignments",
      });
    }

    const teacher = await Teacher.findById(req.userId);
    if (!teacher) {
      return res.status(403).json({
        error: "Unauthorized",
        message: "Unauthorized to update assignments",
      });
    }

    const { _id, title, course, type, question, startBy, submitBy, isOver } = req.body;

    // Prepare the base data for updating
    const updateData = {
      ...(title && { title }),
      ...(course && { course }),
      ...(type && { type }),
      ...(startBy && { startBy }),
      ...(submitBy && { submitBy }),
      ...(isOver !== undefined && { isOver }),
    };

    // If question is provided, update question and adjust numberOfCodes based on its length
    if (question) {
      updateData.question = question.map(q => ({
        number: q.number,
        question: q.question,
        numberOfTestCases: q.numberOfTestCases,
        testCases: q.testCases.map(tc => ({
          input: tc.input,
          output: tc.output,
        }))
      }));
      updateData.numberOfCodes = question.length; // Set numberOfCodes to match question array length
    }

    const updatedAssignment = await Assignment.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAssignment) {
      return res.status(404).json({
        error: "NotFound",
        message: "Assignment not found",
      });
    }

    res.status(200).json(updatedAssignment);

  } catch (error) {
    res.status(500).json({
      error: "Couldn'tUpdateAssignment",
      message: "Error in updating assignment",
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

const getAssignmentForTeacherByID = async (req,res) => {
  try {
    
    const courses = await Course.find({ Faculty: req.userId });
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No assigned courses found" });
    }

    const courseIds = courses.map(course => course._id);

    const assignments = await Assignment.find({ course: { $in: courseIds } });

    if (!assignments || assignments.length === 0) {
      return res.status(404).json({ message: "No assignments found for the assigned courses" });
    }

    res.status(200).json({
      courses,
      assignments,
    });



  }catch(error){
    res.status(500).json({
      error: "Couldn'tFind",
      message: "Error in finding assignment",
      errorCatch: error.message,
    });
  }
}

const getAssignmentForTeacherByAssignmentid = async(req,res) => {
  try{
    const {id} = req.params
    const data = await Assignment.findById(id)
    res.status(200).json(data)
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
  getAssignmentById,
  getAssignmentForTeacherByID,
  getAssignmentForTeacherByAssignmentid,
  updateAssignment
};
