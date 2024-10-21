const mongoose = require("mongoose");

const solutionSchema = mongoose.Schema({
  Code: {
    type: String,
  },
  TestCasesPassed: {
    type: Number,
  },
});

const workSchema = mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  submittedOn: {
    type: Date,
    default: Date.now,
  },
  Solution: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Solution",
    },
  ],
});

const Work = mongoose.model("Work", workSchema);
const Solution = mongoose.model("Solution", solutionSchema);

module.exports = { Work, Solution };
