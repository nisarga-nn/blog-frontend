import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsUserLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsUserLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ handleLogin, handleLogout, isUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
