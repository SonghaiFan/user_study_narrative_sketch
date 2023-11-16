// src/components/App.tsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserStatusProvider from "../contexts/UserStatusContext";

import Login from "./Login";
import MyRoutes from "./MyRoutes";

const App: React.FC = () => {
  const hasLoggedInUser = localStorage.getItem("userId") || false;
  const [isLoggedIn, setLoggedIn] = useState(hasLoggedInUser);
  const [userId, setUserId] = useState("");

  // get all url params
  const urlParams = new URLSearchParams(window.location.search);
  console.log("All URL Params:", urlParams);

  // get PROLIFIC_PID from url
  const prolificId = urlParams.get("PROLIFIC_PID");
  console.log("Prolific ID from URL:", prolificId);

  const storeUserId = (id: string) => {
    localStorage.setItem("userId", id);
  };

  useEffect(() => {
    if (prolificId) {
      setUserId(prolificId);
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
          isLoggedIn ? (
            <Navigate to="/home" />
          ) : (
            <Login onLogin={handleLogin} prolificId={prolificId} />
          )
        }
      />
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
    </Routes>
  );
};

export default App;
