import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login function
  const login = async (name, password, setError) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        { name, password },
        {
          auth: { username: name, password },
          withCredentials: true, // Ensures cookies are stored
        }
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setError("Invalid username or password.");
      setIsAuthenticated(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
    window.location.reload(); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
