// Navbar.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleButton = () => {
    if (isLoggedIn) {
      logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <button onClick={handleButton}>Signout</button>
      ) : (
        <button onClick={handleButton}>Login</button>
      )}
    </>
  );
};

export default Navbar;
