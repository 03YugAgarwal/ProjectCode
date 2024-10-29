const mongoose = require("mongoose");

const testCaseSchema = mongoose.Schema({
  input: {
    type: String,
    required: [true, "Please provide an input for test case"],
  },
  output: {
    type: String,
    required: [true, "Please provide an output for test case"],
  },
});

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please provide a question"],
  },
  testCaseNumber: {
    type: Number,
  },
  testCase: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestCase",
    },
  ],
});

const assignmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for assignment"],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
    index: true, 
  },
  type: {
    type: String,
    required: true,
    default: "LabWork",
  },
  numberOfCodes: {
    type: Number,
    required: true,
    default: 1,
  },
  createdOn: {
    type: Date,
    default: Date.now,
    index: true,
  },
  startBy: {  
    type: Date,
  },
  submitBy: { 
    type: Date,
  },
  question: [
    {
      number: {
        type: Number,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      numberOfTestCases: {
        type: Number,
        default: 0,
        required: true,
      },
      testCases: [
        {
          input: {
            type: String,
            required: true,
          },
          output: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});


const Assignment = mongoose.model("Assignment", assignmentSchema);
const Question = mongoose.model("Question", questionSchema);
const TestCase = mongoose.model("TestCase", testCaseSchema);

module.exports = { Assignment, Question, TestCase };
