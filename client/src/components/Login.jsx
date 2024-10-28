import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useTokenValidation from "../hooks/useTokenValidation";

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

  const [regno, setRegno] = useState("");
  const [password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  useTokenValidation()

  const handleRegNoInput = (e) => {
    setRegno(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true); 

    // Uncomment validation logic if needed
    // if (regno.length === 0 || password.length === 0) {
    //   alert("Register Number and Password cannot be empty.");
    //   return;
    // }
    // if (!validatePassword(password)) {
    //   alert("Password must be at least 8 characters long, contain an uppercase letter, and a special character.");
    //   return;
    // }

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

      if (data?.token) {
        Cookies.set("user_token", data.token, { sameSite: 'None', secure: true, expires: 1 });
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
    <>
      <form>
        <label htmlFor="">Registration Number</label>
        <input
          type="text"
          placeholder="XYBCEABCD"
          value={regno}
          onChange={handleRegNoInput}
        />
        <label htmlFor="">Password</label>
        <input
          type="password" 
          value={password}
          onChange={handlePasswordInput}
        />
        <button onClick={handleSubmit} disabled={isClicked}>
          Submit
        </button>
        <p>Note: You will be logged out after 5 hours.</p>
      </form>
    </>
  );
};

export default Login;
