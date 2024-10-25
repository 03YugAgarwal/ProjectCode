const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
    TeacherID: {
        type: String,
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Teacher = mongoose.model('Teacher',teacherSchema)
module.exports = {Teacher}