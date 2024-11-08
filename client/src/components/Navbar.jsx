// Navbar.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Button from "./ui/Button";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const { isLoggedIn, logout, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleButton = () => {
    if (isLoggedIn) {
      logout();
    } else {
      navigate("/login");
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleCreateClick = () => {
    navigate("/create");
  };

  let content = null;

  if (userRole?.includes(1) && !userRole?.includes(2)) {
    content = <Button onClick={handleCreateClick}>Create Assignment</Button>;
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.logo} onClick={handleHomeClick}>
        <img className={styles.img} src="/logo.png" alt="Alt-tab-logo" />
        <h1>Alt-Tab</h1>
      </div>
      <div>
        {content}
        {isLoggedIn ? (
          <Button onClick={handleButton}>Signout</Button>
        ) : (
          <Button onClick={handleButton}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
