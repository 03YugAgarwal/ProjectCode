import { useState, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
      const response = await fetch("http://localhost:9000/user/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      
      if (data?.token && data?.role) {
        // Save token and role in AuthContext
        login(data.token, data.role);
        navigate("/"); // Redirect to home or appropriate route after login
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
    <form onSubmit={handleSubmit}>
      <label>Registration Number</label>
      <input
        type="text"
        placeholder="XYBCEABCD"
        value={regno}
        onChange={handleRegNoInput}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={handlePasswordInput}
      />
      <button type="submit" disabled={isClicked}>
        Submit
      </button>
      <p>Note: You will be logged out after 1 day.</p>
    </form>
  );
};

export default Login;