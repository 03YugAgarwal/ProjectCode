import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const checkToken = async () => {
    const token = Cookies.get("user_token");
    if (!token) return false;

    try {
      const response = await fetch("http://localhost:9000/validate", {
        method: "GET",
        headers: { Authorization: `${token}` },
      });
      if (!response.ok) {
        Cookies.remove("user_token");
        return { isLoggedIn: false, role: null };
      }
      const data = await response.json();
      return { isLoggedIn: true, role: data.role };
    } catch (error) {
      console.error("Error validating token:", error);
      return { isLoggedIn: false, role: null };
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const result = await checkToken();
      if (result.isLoggedIn) {
        setIsLoggedIn(true);
        setUserRole(result.role);
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    };
    initializeAuth();
  }, []);

  const login = (token, role) => {
    
    Cookies.set("user_token", token, { sameSite: "None", secure: true, expires: 1 });
    setIsLoggedIn(true);
    setUserRole(role);
    
  };

  const logout = () => {
    
    Cookies.remove("user_token");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};