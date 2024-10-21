const mongoose = require('mongoose')

const userTeacherSchema = mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }
})

const UserTeacher = mongoose.model('UserTeacherMap',userTeacherSchema)
module.exports = {UserTeacher}