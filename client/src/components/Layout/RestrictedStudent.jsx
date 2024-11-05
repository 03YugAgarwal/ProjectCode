import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext"; 

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

  let content = <p>Login to continue accessing the platform</p>

  return isLoggedIn ? <Outlet /> : content;
};

export default RestrictedStudent;
