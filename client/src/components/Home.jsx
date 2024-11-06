import { useEffect, useState } from "react";
import AssignmentCard from "./Layout/AssignmentCard";
import Cookies from "js-cookie";
import {BASE_URL} from '../constants'

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = Cookies.get("user_token");

        const response = await fetch(BASE_URL+"/course/mycourses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();

        if (data.Course && data.Course.length > 0) {
          setCourses(data.Course);
        } else {
          setError("No courses available");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Error fetching courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!selectedCourse) return;

      try {
        const token = Cookies.get("user_token");

        const response = await fetch(`${BASE_URL}/student/${selectedCourse}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }

        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setError("Error fetching assignments. Please try again later.");
      }
    };

    fetchAssignments();
  }, [selectedCourse]);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {courses.length > 0 ? (
        <>
          <select name="course" id="course" onChange={handleCourseChange}>
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.Title}
              </option>
            ))}
          </select>

          <div>
            <h2>Upcoming Assignments:</h2>
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <AssignmentCard key={assignment._id} assignment={assignment} />
              ))
            ) : (
              <p>No assignments available for this course.</p>
            )}
          </div>
        </>
      ) : (
        <p>No courses available. Please contact support or check back later.</p>
      )}
    </>
  );
};

export default Home;