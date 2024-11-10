import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";

import styles from "./UpdateAssignmentForm.module.css";
import Feedback from "../ui/Feedback";
import Button from "../ui/Button";
import Input from "../ui/Input";

const UpdateAssignmentForm = () => {
  const { id } = useParams();
  const [assignmentData, setAssignmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchAssignmentData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/student/teacher/get/${id}`, {
          method: "GET",
          headers: {
            Authorization: `${Cookies.get("user_token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch assignment data");
        }

        const data = await response.json();

        // Parse startBy and submitBy into separate date and time parts
        const startByDate = data.startBy ? data.startBy.split("T")[0] : "";
        const startByTime = data.startBy ? data.startBy.split("T")[1] : "";
        const submitByDate = data.submitBy ? data.submitBy.split("T")[0] : "";
        const submitByTime = data.submitBy ? data.submitBy.split("T")[1] : "";

        setAssignmentData({
          ...data,
          startByDate,
          startByTime,
          submitByDate,
          submitByTime,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentData();
  }, [id]);

  const handleInputChange = (e, field, index = null, testCaseIndex = null) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setAssignmentData((prev) => {
      const updatedData = { ...prev };

      if (field === "numberOfCodes") {
        const updatedQuestions = [...updatedData.question];
        updatedData.numberOfCodes = parseInt(value);
        while (updatedQuestions.length < value) {
          updatedQuestions.push({
            number: updatedQuestions.length + 1,
            question: "",
            numberOfTestCases: 1,
            testCases: [
              {
                input: "",
                output: "",
                _id: `${Date.now()}_${updatedQuestions.length + 1}`,
              },
            ],
            _id: `${Date.now()}_${updatedQuestions.length + 1}`,
          });
        }
        updatedData.question = updatedQuestions.slice(0, value);
      } else if (index !== null && testCaseIndex === null) {
        if (field === "numberOfTestCases") {
          const updatedTestCases = [...updatedData.question[index].testCases];
          updatedData.question[index][field] = parseInt(value);
          while (updatedTestCases.length < value) {
            updatedTestCases.push({
              input: "",
              output: "",
              _id: `${Date.now()}_${updatedTestCases.length + 1}`,
            });
          }
          updatedData.question[index].testCases = updatedTestCases.slice(
            0,
            value
          );
        } else {
          updatedData.question[index][field] = value;
        }
      } else if (index !== null && testCaseIndex !== null) {
        updatedData.question[index].testCases[testCaseIndex][field] = value;
      } else if (
        field === "startByDate" ||
        field === "startByTime" ||
        field === "submitByDate" ||
        field === "submitByTime"
      ) {
        // Handle date and time separately
        const [dateField, timeField] = field.includes("startBy")
          ? ["startByDate", "startByTime"]
          : ["submitByDate", "submitByTime"];
        updatedData[dateField] =
          field === dateField ? value : updatedData[dateField];
        updatedData[timeField] =
          field === timeField ? value : updatedData[timeField];
        updatedData[field.includes("startBy") ? "startBy" : "submitBy"] = `${
          updatedData[dateField] || ""
        }T${updatedData[timeField] || ""}`;
      } else {
        updatedData[field] = value;
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    // console.log(assignmentData);
    // return

    try {
      const response = await fetch(BASE_URL + `/student/update`, {
        method: "PUT",
        headers: {
          Authorization: `${Cookies.get("user_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignmentData),
      });

      if (!response.ok) {
        throw new Error("Failed to update assignment");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Title:</label>
        <Input
          type="text"
          placeholder="Title"
          value={assignmentData.title}
          onChange={(e) => handleInputChange(e, "title")}
        />
        <label>Type:</label>
        <Input
          type="text"
          placeholder="Type > home | lab"
          value={assignmentData.type}
          onChange={(e) => handleInputChange(e, "type")}
        />
        <label>Start By Date:</label>
        <div className={styles.dates}>
          <input
            type="date"
            value={assignmentData.startByDate || ""}
            onChange={(e) => handleInputChange(e, "startByDate")}
          />
          <input
            type="time"
            value={assignmentData.startByTime || ""}
            onChange={(e) => handleInputChange(e, "startByTime")}
          />
        </div>
        <label>Submit By Date:</label>
        <div className={styles.dates}>
          <input
            type="date"
            value={assignmentData.submitByDate || ""}
            onChange={(e) => handleInputChange(e, "submitByDate")}
          />
          <input
            type="time"
            value={assignmentData.submitByTime || ""}
            onChange={(e) => handleInputChange(e, "submitByTime")}
          />
        </div>
        <div className={styles.isOver}>
          <label>Is Over:</label>
          <input
            type="checkbox"
            checked={assignmentData.isOver || false}
            onChange={(e) => handleInputChange(e, "isOver")}
          />
        </div>
        <div>
          <label>Questions:</label>
          <Input
            type="number"
            value={assignmentData.numberOfCodes}
            onChange={(e) => handleInputChange(e, "numberOfCodes")}
          />
        </div>
        {assignmentData.question.map((question, index) => (
          <div key={question._id} className={styles.questionsContainer}>
            <hr />
            <h3>Question {index + 1}</h3>
            <label>Question Text:</label>
            <Input
              type="text"
              value={question.question}
              onChange={(e) => handleInputChange(e, "question", index)}
            />
            <label>Number of Test Cases:</label>
            <Input
              type="number"
              value={question.numberOfTestCases}
              onChange={(e) => handleInputChange(e, "numberOfTestCases", index)}
            />
            {question.testCases.map((testCase, testCaseIndex) => (
              <div key={testCase._id} className={styles.questionsContainer}>
                <h4
                  style={{
                    color: "#e6e6e6e",
                    marginTop: "12px",
                    borderTop: "1px solid black",
                  }}
                >
                  Test Case {testCaseIndex + 1}
                </h4>
                <label>Input:</label>
                <Input
                  type="text"
                  value={testCase.input}
                  onChange={(e) =>
                    handleInputChange(e, "input", index, testCaseIndex)
                  }
                />
                <label>Output:</label>
                <Input
                  type="text"
                  value={testCase.output}
                  onChange={(e) =>
                    handleInputChange(e, "output", index, testCaseIndex)
                  }
                />
              </div>
            ))}
          </div>
        ))}
        <Button type="submit">Update Assignment</Button>
        {success && (
          <Feedback type="success">Assignment updated successfully!</Feedback>
        )}
        {error && <Feedback type="error">Error: {error}</Feedback>}
      </form>
    </div>
  );
};

export default UpdateAssignmentForm;
