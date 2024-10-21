const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
    TeacherID: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    }
})

const Teacher = mongoose.model('Teacher',teacherSchema)
module.exports = {Teacher}