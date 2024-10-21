const mongoose = require('mongoose')

const userCourseSchema = mongoose.Schema({
    Users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    Course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }
})
const UserCourse = mongoose.model('UserCourseMap',userCourseSchema)
module.exports = {UserCourse}