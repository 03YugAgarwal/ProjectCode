const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    Semester: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    CourseID: {
        type: String,
        required: true
    },
    Faculty: {
        type: String,
        required: true
    }
})

const Course = mongoose.model('Course',courseSchema)

module.exports = {Course}