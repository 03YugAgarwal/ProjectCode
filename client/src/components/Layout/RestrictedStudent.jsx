import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext"; 

const RestrictedStudent = () => {
  const { isLoggedIn, checkToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      await checkToken(); 
      if (!isLoggedIn) {
        navigate("/login"); 
      }
    };

    validateSession();
  }, [isLoggedIn, navigate, checkToken]);

  return isLoggedIn ? <Outlet /> : null;
};

export default RestrictedStudent;
