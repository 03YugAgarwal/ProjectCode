const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: [true, "Please provide an input for the test case"],
  },
  output: {
    type: String,
    required: [true, "Please provide an output for the test case"],
  },
});

const questionSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, "Please provide the question number"],
  },
  question: {
    type: String,
    required: [true, "Please provide a question"],
  },
  numberOfTestCases: {
    type: Number,
    required: true,
    default: 0,
  },
  testCases: [testCaseSchema], // Embed the testCaseSchema here
});

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the assignment"],
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
  isOver: {
    type: Boolean,
    default: false,
  },
  startBy: {
    type: Date, // Supports both date and time
  },
  submitBy: {
    type: Date, // Supports both date and time
  },
  question: [questionSchema], // Embed the questionSchema here
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = { Assignment };