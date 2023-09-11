import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./Login";
import Main from "./Route";

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const location = useLocation();

  const storeUserId = (id: string) => {
    localStorage.setItem("userId", id);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const idFromUrl = urlParams.get("id");
    const idFromLocalStorage = localStorage.getItem("userId");

    const idToUse = idFromUrl || idFromLocalStorage;

    if (idToUse) {
      setUserId(idToUse);
      setLoggedIn(true);
      storeUserId(idToUse);
    }
  }, [location]);

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
            <Main userId={userId} onLogout={handleLogout} />
          )
        }
      />
    </Routes>
  );
};

export default App;
