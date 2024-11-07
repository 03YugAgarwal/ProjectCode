import { useState, useEffect } from "react";

const UpdateTeacherAssignmentFormQuestion = ({
  numberOfQuestions,
  onQuestionsChange,
  preQuestions,
}) => {
  const [questions, setQuestions] = useState(preQuestions);

  useEffect(() => {
    // Generate initial questions only when `numberOfQuestions` changes
    const initialQuestions = Array.from(
      { length: numberOfQuestions },
      (_, i) => ({
        number: i + 1,
        question: "",
        testCases: [],
        numberOfTestCases: 0,
      })
    );
    setQuestions(initialQuestions);
  }, [numberOfQuestions]);

  useEffect(() => {
    // Call `onQuestionsChange` only when `questions` array changes
    onQuestionsChange(questions);
  }, [questions, onQuestionsChange]);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleTestCasesChange = (index, numberOfTestCases) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].numberOfTestCases = numberOfTestCases;
    updatedQuestions[index].testCases = Array.from(
      { length: numberOfTestCases },
      () => ({
        input: "",
        output: "",
      })
    );
    setQuestions(updatedQuestions);
  };

  const handleTestCaseInputChange = (
    questionIndex,
    testCaseIndex,
    field,
    value
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].testCases[testCaseIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <>
      <h2>Assignment Questions</h2>
      <div>
        {questions.map((q, questionIndex) => (
          <div key={questionIndex}>
            <label htmlFor={`question-${questionIndex}`}>
              Question {q.number}
            </label>
            <textarea
              type="text"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(questionIndex, e.target.value)
              }
              placeholder={`Enter question ${q.number}`}
            />

            <label htmlFor={`testcases-${questionIndex}`}>
              Number of Test Cases
            </label>
            <input
              type="number"
              value={q.numberOfTestCases}
              onChange={(e) =>
                handleTestCasesChange(questionIndex, Number(e.target.value))
              }
              placeholder="Enter number of test cases"
            />

            {q.testCases.map((testCase, testCaseIndex) => (
              <div
                key={testCaseIndex}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <h4>Test Case {testCaseIndex + 1}</h4>

                <label
                  htmlFor={`testcase-input-${questionIndex}-${testCaseIndex}`}
                >
                  Test Case Input
                </label>
                <textarea
                  rows="3"
                  value={testCase.input}
                  onChange={(e) =>
                    handleTestCaseInputChange(
                      questionIndex,
                      testCaseIndex,
                      "input",
                      e.target.value
                    )
                  }
                  placeholder={`Enter input for test case ${testCaseIndex + 1}`}
                />

                <label
                  htmlFor={`testcase-output-${questionIndex}-${testCaseIndex}`}
                >
                  Test Case Output
                </label>
                <textarea
                  rows="3"
                  value={testCase.output}
                  onChange={(e) =>
                    handleTestCaseInputChange(
                      questionIndex,
                      testCaseIndex,
                      "output",
                      e.target.value
                    )
                  }
                  placeholder={`Enter output for test case ${
                    testCaseIndex + 1
                  }`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default UpdateTeacherAssignmentFormQuestion;
