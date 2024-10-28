import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useTokenValidation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("user_token");
      if (token) {
        try {
          const response = await fetch("http://localhost:9000/validate", {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          });

          if (response.ok) {
            navigate("/");
          } else {
            console.log("Invalid token.");
          }
        } catch (error) {
          console.error("Error validating token:", error);
        }
      }
    };

    checkToken();
  }, [navigate]);
};

export default useTokenValidation;
