import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUserStatus } from "../hooks/useUserStatus";
import Login from "./Login";
import MyRoutes from "./MyRoutes";

const AppRoutes: React.FC = () => {
  const { status, setStatus } = useUserStatus();
  const prolificId = new URLSearchParams(window.location.search).get(
    "PROLIFIC_PID"
  );

  const handleLogin = (id: string) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      userId: id,
      isLoggedIn: true,
    }));
  };

  const handleLogout = () => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      userId: "",
      isLoggedIn: false,
      isConsented: false,
    }));
  };

  useEffect(() => {
    if (prolificId) {
      setStatus((prevStatus) => ({
        ...prevStatus,
        userId: prolificId,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allowToStart = status.userId && status.isConsented && status.isLoggedIn;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          allowToStart ? (
            <Navigate to="/intro" />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/"
        element={
          allowToStart ? <Navigate to="/intro" /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/*"
        element={
          !status.isLoggedIn ? (
            <Navigate to="/" />
          ) : (
            <MyRoutes onLogout={handleLogout} />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
