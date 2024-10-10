import { useState } from "react";
import TeacherAssignmentFormQuestion from "./TeacherAssignmentFormQuestion";

const TeacherAssignmentForm = () => {
  const [codes, setCodes] = useState(1);
  const [questionsData, setQuestionsData] = useState([]);

  // Callback to receive the questions array from TeacherAssignmentFormQuestion
  const handleQuestionsUpdate = (questions) => {
    setQuestionsData(questions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Questions: ", questionsData);
  };

  return (
    <>
      <h1>Create an assignment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Title">Title</label>
        <input type="text" placeholder="Bubble Sort" />
        <label htmlFor="course">Choose the course</label>
        <select name="coursename" id="coursename">
          <option value="COURSE1">COURSE1</option>
          <option value="COURSE2">COURSE2</option>
          <option value="COURSE3">COURSE3</option>
        </select>
        <label htmlFor="type">Assignment Type</label>
        <select name="typeOption" id="typeOption">
          <option value="lab">Lab Work</option>
          <option value="home">Home Work</option>
        </select>
        <label htmlFor="codes">Number of codes</label>
        <input
          type="number"
          value={codes}
          onChange={(e) => setCodes(Number(e.target.value))}
        />

        <TeacherAssignmentFormQuestion
          numberOfQuestions={codes}
          onQuestionsChange={handleQuestionsUpdate}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default TeacherAssignmentForm;
