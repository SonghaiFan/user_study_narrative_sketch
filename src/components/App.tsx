import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useProlificId from "./useProlificId"; // Import the custom hook
import UserStatusProvider from "./context/UserStatusContext";

import Login from "./Login";
import Main from "./Route";

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  const prolificId = useProlificId(); // Use the hook

  const storeUserId = (id: string) => {
    localStorage.setItem("userId", id);
  };

  useEffect(() => {
    if (prolificId) {
      setUserId(prolificId);
      setLoggedIn(true);
      storeUserId(prolificId);
    }
  }, [prolificId]);

  const handleLogin = (id: string) => {
    setUserId(id);
    setLoggedIn(true);
    storeUserId(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId("");
    setLoggedIn(false);
    <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />
        }
      />
      <Route
        path="/*"
        element={
          !isLoggedIn ? (
            <Navigate to="/login" />
          ) : (
            <UserStatusProvider userId={userId}>
              <Main userId={userId} onLogout={handleLogout} />
            </UserStatusProvider>
          )
        }
      />
    </Routes>
  );
};

export default App;
