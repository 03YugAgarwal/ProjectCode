const mongoose = require('mongoose')

const userTeacherSchema = mongoose.Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }
})

const UserTeacher = mongoose.model('UserTeacherMap',userTeacherSchema)
module.exports = {UserTeacher}