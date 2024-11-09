import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";
import AdminSidebar from "./AdminSidebar";

import styles from "./CreateStudent.module.css";

const CreateStudent = () => {
  const [students, setStudents] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    let studArr = students
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    if (studArr.length === 0) {
      setError("Please provide at least one valid StudentID.");
      return;
    }

    const token = Cookies.get("user_token");

    if (!token) {
      setError("Authentication token is missing. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/user/createMultiple`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ RegisterNumbers: studArr }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create student accounts");
      } else {
        const result = await response.json();
        setSuccess(
          `Created ${result.createdUsers.length} student(s) successfully!`
        );
        setStudents("");
      }
    } catch (err) {
      setError("An error occurred while creating student accounts.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className={styles.createstudent}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form>
          <h1>Create Student Login</h1>
          {/* <label>StudentID</label> */}
          <textarea
            onChange={(e) => setStudents(e.target.value)}
            value={students}
            placeholder="Enter Student IDs, separated by commas"
          />
          <p>Note: Give comma-separated values for multiple students</p>
          <button onClick={handleClick} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {/* <Link to="/">Back</Link> */}
      </div>
    </>
  );
};

export default CreateStudent;
