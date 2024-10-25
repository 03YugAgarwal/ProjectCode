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
        unique: true,
        required: true
    },
    Faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    isOver: {
        type: Boolean,
        default: false
    }
})

const Course = mongoose.model('Course',courseSchema)

module.exports = {Course}