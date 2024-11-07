const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    RegisterNumber: {
        type: String,
    },
    Name: {
        type: String,
    },
    Email: {
        type: String,
    },
    Password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User',userSchema)
module.exports = {User}