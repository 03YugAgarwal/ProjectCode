import { useState } from "react";
import { BASE_URL } from "../../constants";
import Cookies from "js-cookie";
import AdminSidebar from "./AdminSidebar";

import styles from "./AssignStudent.module.css";
import Input from "../ui/Input";

import Feedback from '../ui/Feedback'

const AssignStudents = () => {
  const [students, setStudents] = useState("");
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [assignedStudentList, setAssignedStudentList] = useState([]); // New state for displaying students

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!courseId.trim()) {
      setError("Course ID cannot be empty");
      return;
    }

    let studArr = students
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    if (studArr.length === 0) {
      setError("Please provide at least one student");
      return;
    }

    const token = Cookies.get("user_token");

    if (!token) {
      setError("Authentication token is missing. Please log in.");
      return;
    }

    const payload = {
      Students: studArr,
      CourseID: courseId,
    };

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/course/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to assign students");
      } else {
        const result = await response.json();
        console.log(result);

        if (result?.updatedStudents) {
          setSuccess(
            `Successfully assigned ${result.updatedStudents.length} student(s) to the course.`
          );
          setAssignedStudentList(result.updatedStudents); // Update list
        } else if (result?.assignedStudents) {
          setSuccess(
            `Successfully assigned ${result.assignedStudents.length} student(s) to the course.`
          );
          setAssignedStudentList(result.assignedStudents); // Update list
        }

        setStudents("");
        setCourseId("");
      }
    } catch (err) {
      setError("An error occurred while assigning students: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className={styles.container}>
        <form>
          <h1>Assign Students to Course</h1>
          {/* <label htmlFor="">Students (comma-separated IDs)</label> */}
          <textarea
            onChange={(e) => setStudents(e.target.value)}
            value={students}
            placeholder="Enter Student IDs separated by commas"
          />
          {/* <label htmlFor="">Course ID</label> */}
          <Input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            placeholder="Enter Course ID"
          />
          <button onClick={handleClick} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {error && <Feedback type="error">{error}</Feedback>}
        {success && <Feedback type="success">{success}</Feedback>}
        <div>
          <h3>All students in this course:</h3>
          <p>
            {assignedStudentList.length > 0
              ? assignedStudentList.join(", ")
              : "No students assigned yet."}
          </p>
        </div>
      </div>
    </>
  );
};

export default AssignStudents;
