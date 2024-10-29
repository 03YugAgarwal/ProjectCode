import { useState, useCallback } from "react";
import TeacherAssignmentFormQuestion from "./TeacherAssignmentFormQuestion";

const TeacherAssignmentForm = () => {
  const [codes, setCodes] = useState(1);
  const [questionsData, setQuestionsData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    type: "",
    codes,
    question: questionsData
  });

  const handleQuestionsUpdate = useCallback((questions) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      codes,
      question: questions
    }));
    setQuestionsData(questions);
  }, [codes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Questions: ",formData);
  };

  return (
    <>
      <h1>Create an assignment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          placeholder="Bubble Sort"
          value={formData.title}
          onChange={(e) =>
            setFormData(prevFormData => ({ ...prevFormData, title: e.target.value }))
          }
        />
        <label htmlFor="course">Choose the course</label>
        <select
          name="coursename"
          id="coursename"
          value={formData.course}
          onChange={(e) =>
            setFormData(prevFormData => ({ ...prevFormData, course: e.target.value }))
          }
        >
          <option value="COURSE1">COURSE1</option>
          <option value="COURSE2">COURSE2</option>
          <option value="COURSE3">COURSE3</option>
        </select>
        <label htmlFor="type">Assignment Type</label>
        <select
          name="typeOption"
          id="typeOption"
          value={formData.type}
          onChange={(e) =>
            setFormData(prevFormData => ({ ...prevFormData, type: e.target.value }))
          }
        >
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