const {Course} = require('../models/CourseSchema')

const createCourse = async(req,res) => {
    try{
        const {Semester, Title, CourseID, Faculty, isOver} = req.body;

        if(!Semester || !Title || !CourseID || !Faculty) {
            res.status(500).json({error: 'MissingField',message: "All the fields are required to create a course"})
            return
        }

        if(isOver){
            res.status(500).json({error: "AlreadyOver",message: "isOver property is true, cannot create already over course"})
            return
        }

        const newCourse = Course.create(Semester,Title,CourseID,Faculty)
        
        res.status(200).json(newCourse)
        

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
        res.status(200).json(course)
    }catch(error){
        console.error(error)
        res.status(500).json({error:"Coudnt fetch all course",message: "Internal Server Error"})
    }
}

module.exports = {createCourse, getAllCourses}