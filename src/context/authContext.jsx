import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true); // Loading state to manage initialization

  const login = async (inputs) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, inputs);
      setCurrentUser(res.data);
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error, e.g., show an error message
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error, if necessary
    }
  };

  useEffect(() => {
    if (currentUser !== null) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user"); // Remove the user data when logging out
    }
    setLoading(false);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
