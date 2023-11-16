import React from "react";
import UserStatusProvider from "../contexts/UserStatusContext";
import AppRoutes from "./AppRoutes";

const App: React.FC = () => {
  return (
    <UserStatusProvider>
      <AppRoutes />
    </UserStatusProvider>
  );
};

export default App;
