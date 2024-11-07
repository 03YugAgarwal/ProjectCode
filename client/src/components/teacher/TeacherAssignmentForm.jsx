import { useState, useEffect, useCallback } from "react";
import Cookies from 'js-cookie';
import { BASE_URL } from '../../constants';
import TeacherAssignmentFormQuestion from "./TeacherAssignmentFormQuestion";

const TeacherAssignmentForm = () => {
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
    isOver: false, // Default value for isOver
    startByDate: "",
    startByTime: "",
    submitByDate: "",
    submitByTime: "",
  });

  // Update formData whenever codes or questionsData changes
  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      codes,
      question: questionsData,
    }));
  }, [codes, questionsData]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = Cookies.get('user_token');
        const response = await fetch(`${BASE_URL}/teacher/course`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch courses');
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

  const handleInputChange = (e, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prevFormData => ({ ...prevFormData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Combine date and time fields into a single datetime string
      const startDateTime = formData.startByDate && formData.startByTime ? 
        `${formData.startByDate}T${formData.startByTime}` : "";
      const submitDateTime = formData.submitByDate && formData.submitByTime ? 
        `${formData.submitByDate}T${formData.submitByTime}` : "";
  
      // Update formData with the combined date and time
      const updatedFormData = {
        ...formData,
        startBy: startDateTime,
        submitBy: submitDateTime,
      };
  
      const token = Cookies.get('user_token');
      const response = await fetch(`${BASE_URL}/student/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });
      
      if (!response.ok) throw new Error('Failed to create assignment');
      alert("Assignment created successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          <option value="">Select a course</option>
          {courses.map(course => (
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

        {/* Date and Time Fields */}
        <label htmlFor="startByDate">Start By Date</label>
        <input
          type="date"
          id="startByDate"
          value={formData.startByDate}
          onChange={(e) => handleInputChange(e, 'startByDate')}
        />
        <label htmlFor="startByTime">Start By Time</label>
        <input
          type="time"
          id="startByTime"
          value={formData.startByTime}
          onChange={(e) => handleInputChange(e, 'startByTime')}
        />

        <label htmlFor="submitByDate">Submit By Date</label>
        <input
          type="date"
          id="submitByDate"
          value={formData.submitByDate}
          onChange={(e) => handleInputChange(e, 'submitByDate')}
        />
        <label htmlFor="submitByTime">Submit By Time</label>
        <input
          type="time"
          id="submitByTime"
          value={formData.submitByTime}
          onChange={(e) => handleInputChange(e, 'submitByTime')}
        />

        {/* Is Over Checkbox */}
        <label htmlFor="isOver">Is Over?</label>
        <input
          type="checkbox"
          id="isOver"
          checked={formData.isOver}
          onChange={(e) => handleInputChange(e, 'isOver')}
        />

        {loading && <p>Submitting...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <button type="submit" disabled={loading}>Submit</button>
      </form>
    </>
  );
};

export default TeacherAssignmentForm;