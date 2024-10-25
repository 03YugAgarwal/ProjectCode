const {Course} = require('../models/CourseSchema')
const { Teacher } = require("../models/TeacherSchema");
const {UserCourse} = require("../models/Map/UserCourse")
const {User} = require('../models/UserSchema')

const createCourse = async(req,res) => {
    try{
        const {Semester, Title, CourseID, Faculty, isOver} = req.body;

        if(!Semester || !Title || !CourseID || !Faculty) {
            res.status(500).json({error: 'MissingField',message: "All the fields are required to create a course"})
            return
        }

        let FacultyID = await Teacher.findOne({TeacherID: Faculty})
        FacultyID = FacultyID._id

        if(isOver){
            res.status(500).json({error: "AlreadyOver",message: "isOver property is true, cannot create already over course"})
            return
        }

        const newCourse = await Course.create({Semester,Title,CourseID,Faculty: FacultyID})
        
        res.status(200).json({_id: newCourse._id, CourseID})
        

    }catch(error){
        console.error(error);
    }
}

const getAllCourses = async(req,res) => {
    try{
        const course = await Course.find();
        if(!course){
            res.status(404).json({error: 'NoCourse',message: "No Course Found"})
            return
        }

        res.status(200).json({TotalCourse: course.length,course})
    }catch(error){
        console.error(error)
        res.status(500).json({error:"Couldnt fetch all course",message: "Internal Server Error"})
    }
}

const assignedCourse = async(req,res) => {
    try{
        const assignedcourses = await UserCourse.find()
        res.status(200).json(assignedcourses)
    }catch(error){
        res.status(500).json({error:"Couldnt fetch assigned course ",message: "Internal Server Error", errorCatch: error.message})
    }

}

const assignStudentsToCourse = async(req,res) => {
    try{
        const {Students, CourseID} = req.body

        if(Students.length === 0 || !CourseID){
            res.status(400).json({error: "MissingField",message: "All fields are required"})
            return
        }

        const course = await Course.findOne({CourseID})
        if(!course){
            res.status(404).json({error:"NoSuchCourse",message: `No course with CourseID: ${CourseID} found`})
            return
        }
        const newMap = await UserCourse.create({Users: Students,Course: course._id})
        res.status(200).json(newMap)


    }catch(error){
        res.status(500).json({error: "couldntAssign",message: "There was error in assigning students to course",errorCatch: error.message})
    }
}

const getMyCourses = async(req,res) => {
    try{
        const userId = req.userId;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: "UserNotFound", message: "User not found" });
        }
        const userRegisterNumber = user.RegisterNumber;
        const allUserCourseMap = await UserCourse.find();

        let courseIds = [];
        allUserCourseMap.forEach((usercourse) => {
            if (usercourse.Users.includes(userRegisterNumber)) {
                courseIds.push(usercourse.Course);
            }
        });

        const courses = await Course.find({ _id: { $in: courseIds } })
        let titles = []
        courses.forEach((course)=>{
            if(!course.isOver)
                titles.push(course.Title)
        })

        res.status(200).json({Course: courses, Title: titles});
        

    }catch(error){
        res.status(500).json({error: "Couldn'tGetCourses", message: "Error in fetching your courses",errorCatch: error.message})
    }
}

const getCourseById = async (req,res) => {
    try{
        const CourseID = req.params.CourseID
        const course = await Course.findOne({CourseID})
        res.status(200).json(course)
    }catch(error){
        res.status(500).json({error: "Couldn'tGetCourse", message: "Error in fetching your course",errorCatch: error.message})
    }
}

module.exports = {createCourse, getAllCourses,assignStudentsToCourse, assignedCourse, getMyCourses,getCourseById}