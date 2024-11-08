import { useState, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../constants";

// import Button from "./ui/Button";
import styles from "./Login.module.css";

function validatePassword(password) {
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    password.length >= 8 &&
    uppercaseRegex.test(password) &&
    specialCharRegex.test(password)
  );
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [regno, setRegno] = useState("");
  const [password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleRegNoInput = (e) => {
    setRegno(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);

    const payload = {
      RegisterNumber: regno,
      Password: password,
    };

    try {
      const response = await fetch(BASE_URL + "/user/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data?.token && data?.role) {
        login(data.token, data.role);
        navigate("/");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <div className={styles.login}>
      <img src="/login.jpg" alt="Designed by stories / Freepik" />
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="/logo.png" alt="Alt-tab-logo" />
          <h1>Welcome back!</h1>
          <p>Please enter your details</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <fieldset>
            {/* <label>Registration Number</label> */}
            <input
              type="text"
              placeholder="Registration Number"
              value={regno}
              onChange={handleRegNoInput}
            />
          </fieldset>
          <fieldset>
            {/* <label>Password</label> */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordInput}
            />
          </fieldset>
          <button type="submit" disabled={isClicked} className={styles.button}>
            Submit
          </button>
          <p> <strong>Note: </strong>You will be logged out after 1 day.</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
