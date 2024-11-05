import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext"; 

const RestrictedTeacher = () => {
  const { isLoggedIn, checkToken, userRole } = useContext(AuthContext);
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

  let content = <p>Not Authorized or logged in</p>

  return isLoggedIn && userRole.includes(1) ? <Outlet /> : content;
};

export default RestrictedTeacher;
