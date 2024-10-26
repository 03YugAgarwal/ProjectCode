import { useState } from "react";

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
  const [token, setToken] = useState("")

  const handleRegNoInput = (e) => {
    setRegno(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassowrd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (regno.length === 0 || password.length === 0) {
      return;
    }

    if (!validatePassword) {
      return;
    }
    const payload = {
      RegisterNumber: regno,
      Password: password,
    };
    fetch("http://localhost:9000/user/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setToken(data?.token))
      .catch((error) => console.error(error));
    
    // TODO: Cookie saving of token

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
        <button onClick={handleSubmit}>Submit</button>
        <p>Note: You will be logged out after 5 hours.</p>
      </form>
    </>
  );
};

export default Login;
