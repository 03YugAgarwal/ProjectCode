import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";
import { useParams } from "react-router-dom";
import UpdateTeacherAssignmentFormQuestion from "./UpdateTeacherAssignmentFormQuestion";

const UpdateTeacherAssignmentForm = () => {
  const [codes, setCodes] = useState(1);
  const [questionsData, setQuestionsData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    type: "lab",
    codes,
    question: questionsData,
  });

  const { id } = useParams();

  // Fetch and populate form data based on assignment ID
  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        const token = Cookies.get("user_token");
        const response = await fetch(`${BASE_URL}/student/teacher/get/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch assignment data");
        const data = await response.json();

        // Populate form fields with fetched data
        setFormData({
          title: data.title,
          course: data.course,
          type: data.type,
          codes: data.codes,
          question: data.question || [], // Ensure it's always an array
        });
        setCodes(data.codes);
        setQuestionsData(data.question || []); // Ensure it's always an array
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAssignmentData();
  }, [id]);

  // Fetch courses for the dropdown list
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = Cookies.get("user_token");
        const response = await fetch(`${BASE_URL}/teacher/course`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();

        setCourses(data.courses);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourses();
  }, []);

  const handleQuestionsUpdate = useCallback((questions) => {
    setQuestionsData(questions);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get("user_token");
      const response = await fetch(`${BASE_URL}/student/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update assignment");
      alert("Assignment updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Update an assignment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          placeholder="Bubble Sort"
          value={formData.title}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              title: e.target.value,
            }))
          }
        />

        <label htmlFor="course">Choose the course</label>
        <select
          name="coursename"
          id="coursename"
          value={formData.course}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              course: e.target.value,
            }))
          }
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.Title} ({course.CourseID})
            </option>
          ))}
        </select>

        <label htmlFor="type">Assignment Type</label>
        <select
          name="typeOption"
          id="typeOption"
          value={formData.type}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              type: e.target.value,
            }))
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

        <UpdateTeacherAssignmentFormQuestion
          numberOfQuestions={codes}
          onQuestionsChange={handleQuestionsUpdate}
          preQuestions={formData?.question}
        />

        {loading && <p>Submitting...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </>
  );
};

export default UpdateTeacherAssignmentForm;