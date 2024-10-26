import { useState } from "react";
import Cookies from "js-cookie";

function validatePassword(password) {
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (
    password.length >= 8 &&
    uppercaseRegex.test(password) &&
    specialCharRegex.test(password)
  ) {
    return true;
  } else {
    return false;
  }
}

const Login = () => {
  const [regno, setRegno] = useState("");
  const [password, setPassowrd] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleRegNoInput = (e) => {
    setRegno(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassowrd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setIsClicked(!isClicked);
  
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
        Cookies.set("user_token", data.token, { expires: 5 / 24 });
        alert("Token set successfully!");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsClicked(!isClicked);
    }
  };
  

  return (
    <>
      <form action="">
        <label htmlFor="">Registeration Number</label>
        <input
          type="text"
          placeholder="XYBCEABCD"
          value={regno}
          onChange={handleRegNoInput}
        />
        <label htmlFor="">Password</label>
        <input
          type="passaword"
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
