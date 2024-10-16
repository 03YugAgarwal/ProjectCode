const { Assignment, Question, TestCase } = require('../models/AssignmentSchema')

const getAssignmentForStudent = async(req,res) => {
    try{
        const {courseid} = req.params
        const assignment = await Assignment.find({course: courseid})
        res.status(200).json(assignment);
    }catch(error){
        res.status(500).json({message: "Server error while finding assignment"})
    }
}

module.exports = {getAssignmentForStudent}