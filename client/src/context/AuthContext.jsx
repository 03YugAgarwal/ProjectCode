// AuthContext.js
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = Cookies.get("user_token");
    if (!token) return setIsLoggedIn(false);

    try {
      const response = await fetch("http://localhost:9000/validate", {
        method: "GET",
        headers: { Authorization: `${token}` },
      });
      setIsLoggedIn(response.ok);
      if (!response.ok) Cookies.remove("user_token");
    } catch (error) {
      console.error("Error validating token:", error);
      setIsLoggedIn(false);
    }
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove("user_token");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};
