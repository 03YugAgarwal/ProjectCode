// Navbar.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Button from "./ui/Button";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleButton = () => {
    if (isLoggedIn) {
      logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img className={styles.img} src="/logo.png" alt="Alt-tab-logo" />
        <h1>Alt-Tab</h1>
      </div>
      {isLoggedIn ? (
        <Button onClick={handleButton}>Signout</Button>
      ) : (
        <Button onClick={handleButton}>Login</Button>
      )}
    </div>
  );
};

export default Navbar;
