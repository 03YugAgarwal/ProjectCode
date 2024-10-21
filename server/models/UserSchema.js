const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    TeacherID: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User',userSchema)
module.exports = {User}