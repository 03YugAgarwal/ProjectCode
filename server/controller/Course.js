const { Course } = require("../models/CourseSchema");
const Teacher  = require("../models/TeacherSchema");
const { UserCourse } = require("../models/Map/UserCourse");
const { User } = require("../models/UserSchema");

const createCourse = async (req, res) => {
  try {
    const { Semester, Title, CourseID, Faculty, isOver } = req.body;

    if (!Semester || !Title || !CourseID || !Faculty) {
      res.status(500).json({
        error: "MissingField",
        message: "All the fields are required to create a course",
      });
      return;
    }

    const alrCourse = await Course.findOne({CourseID})
    if(alrCourse){
      return res.status(400).json({"message":"Course with this courseid already exists"})
    }
    
    let FacultyID = await Teacher.findOne({ TeacherID: Faculty });
    
    if(!FacultyID){
      return res.status(400).json({"message":"No Such faculty exists"})
    }

    FacultyID = FacultyID._id;

    if (isOver) {
      res.status(500).json({
        error: "AlreadyOver",
        message: "isOver property is true, cannot create already over course",
      });
      return;
    }

    const newCourse = await Course.create({
      Semester,
      Title,
      CourseID,
      Faculty: FacultyID,
    });

    res.status(200).json({ _id: newCourse._id, CourseID });
  } catch (error) {
    console.error(error);
  }
};

const getAllCourses = async (req, res) => {
  try {
    const course = await Course.find();
    if (!course) {
      res.status(404).json({ error: "NoCourse", message: "No Course Found" });
      return;
    }

    res.status(200).json({ TotalCourse: course.length, course });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Couldnt fetch all course",
      message: "Internal Server Error",
    });
  }
};

const assignedCourse = async (req, res) => {
  try {
    const assignedcourses = await UserCourse.find();
    res.status(200).json(assignedcourses);
  } catch (error) {
    res.status(500).json({
      error: "Couldnt fetch assigned course ",
      message: "Internal Server Error",
      errorCatch: error.message,
    });
  }
};

const assignStudentsToCourse = async (req, res) => {
  try {
    const isTeacherOrAdmin = req.role.includes(2);
    if (!isTeacherOrAdmin) {
      return res.status(403).json({
        error: "Unauthorized",
        message: "Unauthorized to assign to courses",
      });
    }

    const { Students, CourseID } = req.body;

    if (!Array.isArray(Students) || Students.length === 0 || !CourseID) {
      return res.status(400).json({
        error: "MissingField",
        message: "CourseID and non-empty Students array are required",
      });
    }

    const course = await Course.findOne({ CourseID });
    if (!course) {
      return res.status(404).json({
        error: "NoSuchCourse",
        message: `No course with CourseID: ${CourseID} found`,
      });
    }

    const existingMap = await UserCourse.findOne({ Course: course._id });
    if (existingMap) {
      const uniqueStudents = Array.from(new Set([...existingMap.Users, ...Students]));
      existingMap.Users = uniqueStudents;
      await existingMap.save();
      return res.status(200).json({ message: "Students updated successfully", updatedStudents: uniqueStudents });
    }

    const newMap = await UserCourse.create({
      Users: Students,
      Course: course._id,
    });
    return res.status(200).json({ message: "Students assigned successfully", assignedStudents: Students });
  } catch (error) {
    console.error("Error assigning students:", error);
    return res.status(500).json({
      error: "ServerError",
      message: "An error occurred while assigning students to course",
    });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ error: "UserNotFound", message: "User not found" });
    }
    const userRegisterNumber = user.RegisterNumber;
    const allUserCourseMap = await UserCourse.find();

    let courseIds = [];
    allUserCourseMap.forEach((usercourse) => {
      if (usercourse.Users.includes(userRegisterNumber)) {
        courseIds.push(usercourse.Course);
      }
    });

    const courses = await Course.find({ _id: { $in: courseIds } });
    let titles = [];
    courses.forEach((course) => {
      if (!course.isOver) titles.push(course.Title);
    });

    res.status(200).json({ Course: courses, Title: titles });
  } catch (error) {
    res.status(500).json({
      error: "Couldn'tGetCourses",
      message: "Error in fetching your courses",
      errorCatch: error.message,
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const CourseID = req.params.CourseID;
    const course = await Course.findOne({ CourseID });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      error: "Couldn'tGetCourse",
      message: "Error in fetching your course",
      errorCatch: error.message,
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  assignStudentsToCourse,
  assignedCourse,
  getMyCourses,
  getCourseById,
};
