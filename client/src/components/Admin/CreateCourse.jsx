import { useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

import styles from "./CreateCourse.module.css";
import Input from "../ui/Input";

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
      Faculty: faculty,
    };

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/course/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(payload),
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
      <AdminSidebar />
      <div className={styles.createcourse}>
        {error && (
          <p className={`${styles.message} ${styles.error}`}>{error}</p>
        )}
        {success && (
          <p className={`${styles.message} ${styles.success}`}>{success}</p>
        )}
        <form onSubmit={handleSubmit}>
          <h1>Create a Course</h1>
          {/* <label>Semester</label> */}
          <Input
            type="text"
            value={semester}
            placeholder="Semester"
            onChange={(e) => setSemester(e.target.value)}
          />
          {/* <label>Title</label> */}
          <Input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* <label>CourseID</label> */}
          <Input
            type="text"
            value={courseID}
            placeholder="CourseID"
            onChange={(e) => setCourseID(e.target.value)}
          />
          {/* <label>Faculty</label> */}
          <Input
            type="text"
            value={faculty}
            placeholder="Faculty ID"
            onChange={(e) => setFaculty(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          {/* <Link to="/" className={styles.backLink}>
            Back
          </Link> */}
        </form>
      </div>
    </>
  );
};

export default CreateCourse;
