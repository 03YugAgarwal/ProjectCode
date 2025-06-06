import { useState } from "react";
import { BASE_URL } from "../../constants";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

import Input from '../ui/Input'
import Feedback from '../ui/Feedback'

import styles from './CreateTeacher.module.css'


const CreateTeacher = () => {
  const [registerid, setRegisterid] = useState("");
  const [teachername, setTeachername] = useState("");
  const [teacheremail, setTeacheremail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const token = Cookies.get("user_token");

    if (registerid.length < 3) {
      setError("Teacher ID should be greater than length 3");
      return;
    }
    if (teachername.length === 0) {
      setError("Teacher name is required");
      return;
    }
    if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(teacheremail)) {
      setError("Invalid email format");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/teacher/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          TeacherID: registerid,
          Name: teachername,
          Email: teacheremail,
          Password: registerid,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create teacher account");
      } else {
        setSuccess("Teacher account created successfully!");
        setRegisterid("");
        setTeachername("");
        setTeacheremail("");
      }
    } catch (err) {
      setError("An error occurred while creating teacher account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className={styles.container}>
        <form>
          <h1>Create Teacher Login</h1>
          {/* <label>Teacher ID</label> */}
          <Input
            type="text"
            onChange={(e) => setRegisterid(e.target.value)}
            placeholder="Teacher ID (Must be unique)"
            value={registerid}
          />
          {/* <label>Teacher Name</label> */}
          <Input
            type="text"
            placeholder="Name"
            onChange={(e) => setTeachername(e.target.value)}
            value={teachername}
          />
          {/* <label>Teacher Email</label> */}
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => setTeacheremail(e.target.value)}
            value={teacheremail}
          />
          <button onClick={handleClick} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {error && <Feedback type="error">{error}</Feedback>}
        {success && <Feedback type="success">{success}</Feedback>}
        {/* <Link to="/">Back</Link> */}
      </div>
    </>
  );
};

export default CreateTeacher;
