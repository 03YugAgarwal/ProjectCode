const axios = require("axios");
const { LANGUAGE_VERSIONS } = require("../constants");

const { Assignment } = require("../models/AssignmentSchema");
const { Answer } = require("../models/AnswerSchema");
const { User } = require("../models/UserSchema");

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston/",
});

const executeCode = async (language, code, input) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: code,
      },
    ],
    stdin: input,
  });
  return response.data;
};

const checkAnswer = async (req, res) => {
  try {
    const { code, assignmentID, questionNumber, language } = req.body;
    if (!code) {
      res.status(404).json({ error: "No code found" });
      return;
    }

    const assignment = await Assignment.findById(assignmentID);

    if (!assignment) {
      res.status(404).json({ error: "No such assignment found" });
      return;
    }

    let question = assignment?.question[questionNumber - 1];
    let newOutput = [];
    let countPassed = 0;

    for (const testcase of question?.testCases || []) {
      const { input, output: expectedOutput } = testcase;

      const { run: result } = await executeCode(language, code, input);

      const actualOutput = result.output.trim();
      
      newOutput.push({ input, actualOutput, expectedOutput });

      

      if (actualOutput === expectedOutput.trim()) {
        countPassed += 1;
      }
    }

    // console.log(newOutput);

    const user = await User.findById(req.userId)
    

    const answer = await Answer.findOneAndUpdate(
        { questionNumber, assignment: assignmentID, student: req.userId, studentid: user.RegisterNumber, code },  
        { output: newOutput, countPassed },                                  
        { new: true, upsert: true }                                          
    );

    // console.log(answer);
    

    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Couldn't check answer",
      errorCatch: error.message,
    });
  }
};

const getSubmission = async(req,res) => {
  try{

    const {assignmentID} = req.body

    const role = req.role

    if(!role.includes(1)){
      return res.status(401).json({error: "NotAuthorized", message: "Not authorized to access this"})
    }

    // console.log(assignmentID);
    const answer = await Answer.find({assignment: assignmentID})
    

    if(!answer){
      return res.status(404).json({error: "NoAnswerFound", message: "Either no one has answered yet or internal server error"})
    }

    res.status(200).json(answer)

  }catch(error){
    res.status(500).json({
      error: "Internal Server Error",
      message: "Couldn't check answer",
      errorCatch: error.message,
    });
  }
}

module.exports = { checkAnswer, getSubmission };
