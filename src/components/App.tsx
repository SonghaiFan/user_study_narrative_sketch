import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useQueryParam from "../utils/useQueryParam";
import UserStatusProvider from "../contexts/UserStatusContext";

import Login from "./Login";
import MyRoutes from "./MyRoutes";

const App: React.FC = () => {
  const hasLoggedInUser = localStorage.getItem("userId") || false;
  const [isLoggedIn, setLoggedIn] = useState(hasLoggedInUser);
  const [userId, setUserId] = useState("");

  const prolificId = useQueryParam("prolificId");

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
        path="/"
        element={
          !isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/end" />
        }
      />
      <Route
        path="/*"
        element={
          !isLoggedIn ? (
            <Navigate to="/login" />
          ) : (
            <UserStatusProvider userId={userId}>
              <MyRoutes onLogout={handleLogout} />
            </UserStatusProvider>
          )
        }
      />
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />
        }
      />
    </Routes>
  );
};

export default App;
