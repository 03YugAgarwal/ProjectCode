// Navbar.js
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Modal from "./ui/Modal";

import Button from "./ui/Button";

import styles from "./Navbar.module.css";

import ChangePassword from "./Admin/ChangePassword";

const Navbar = () => {
  const { isLoggedIn, logout, userRole } = useContext(AuthContext);
  const [type, setType] = useState("user")
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

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

  const handleChangeUser = () => {

    setType("user")
    setIsOpen(true)
  }
  
  const handleChangeStudent = () => {
    
    setType("teacher")
    setIsOpen(true)
  }

  if (userRole?.includes(0) && !userRole?.includes(1)) {
    content = <Button onClick={handleChangeUser}>Change Password</Button>;
  }

  if (userRole?.includes(1) && !userRole?.includes(2)) {
    content = (
      <>
        <Button onClick={handleChangeStudent}>Change Password</Button>
        <Button onClick={handleCreateClick}>Create Assignment</Button>
      </>
    );
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ChangePassword type={type} />
      </Modal>
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
    </>
  );
};

export default Navbar;
