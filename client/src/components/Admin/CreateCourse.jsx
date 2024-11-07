import { useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";
import { Link } from "react-router-dom";

const CreateCourse = () => {
  const [semester, setSemester] = useState("");
  const [title, setTitle] = useState("");
  const [courseID, setCourseID] = useState("");
  const [faculty, setFaculty] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!semester || !title || !courseID || !faculty) {
      setError("All fields are required.");
      return;
    }

    const token = Cookies.get("user_token");
    if (!token) {
      setError("Authentication token is missing. Please log in.");
      return;
    }

    const payload = {
      Semester: semester,
      Title: title,
      CourseID: courseID,
      Faculty: faculty
    };

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/course/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create course.");
      } else {
        setSuccess("Course created successfully!");
        setSemester("");
        setTitle("");
        setCourseID("");
        setFaculty("");
      }
    } catch (err) {
      setError("An error occurred while creating the course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Create a Course</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Semester</label>
        <input
          type="text"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>CourseID</label>
        <input
          type="text"
          value={courseID}
          onChange={(e) => setCourseID(e.target.value)}
        />
        <label>Faculty</label>
        <input
          type="text"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <Link to="/">Back</Link>
    </>
  );
};

export default CreateCourse;