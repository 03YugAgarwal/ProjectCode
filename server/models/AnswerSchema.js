const mongoose = require('mongoose')

const answerSchema = mongoose.Schema({
    output: [
        {
            input: {
                type: String,
            },
            actualOutput: {
                type: String
            },
            expectedOutput: {
                type: String
            }
        }
    ],
    countPassed: {
        type: Number
    },
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
        index: true 
    },
    questionNumber: {
        type: Number,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
    },
    studentid : {
        type: String
    },
    code: {
        type: String
    }
})

const Answer = mongoose.model('Answer',answerSchema)
module.exports = {Answer}