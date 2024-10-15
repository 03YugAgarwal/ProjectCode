const mongoose = require("mongoose");

const testCaseSchema = mongoose.Schema({
    input: {
        type: String,
        required: [true, "Please provide an input for test case"]
    },
    output: {
        type: String,
        required: [true, "Please provide an output for test case"]
    }
})

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: [true, "Please provide a question"]
    },
    testCaseNumber: {
        type: number
    },
    testCase: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestCase'
    }]

})

const assignmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["LabWork", "HomeWork"],
    required: true,
    default: "LabWork",
  },
  numberOfCodes: {
    type: Number,
    required: true,
    default: 1,
  },
  question: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
const Question = mongoose.model("Question", questionSchema);
const TestCase = mongoose.model("TestCase",testCaseSchema)

module.exports = {Assignment, Question, TestCase};
