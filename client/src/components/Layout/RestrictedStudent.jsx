import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext"; 

import styles from './Restricted.module.css'

const RestrictedStudent = () => {
  const { isLoggedIn, checkToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      const isValid = await checkToken(); 
      if (!isValid) {
        navigate("/login"); 
      }
    };

    validateSession();
  }, [navigate, checkToken]);

  let content = <p className={styles.para}>Not Authorized or logged in</p>

  return isLoggedIn ? <Outlet /> : content;
};

export default RestrictedStudent;
