// src/contexts/UserStatusContext.tsx
import React, { createContext, useState, useEffect, FC } from "react";

export interface Status {
  userId: string;
  isLoggedIn: boolean;
  isConsented: boolean;
  isFinished: boolean;
}

export interface UserStatusContextProps {
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
}

export const UserStatusContext = createContext<
  UserStatusContextProps | undefined
>(undefined);

interface UserStatusProviderProps {
  children: React.ReactNode;
}

const UserStatusProvider: FC<UserStatusProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<Status>({
    userId: "",
    isLoggedIn: false,
    isConsented: false,
    isFinished: false,
  });

  useEffect(() => {
    console.log("UserStatusProvider: ", status);
    localStorage.setItem("userStatus", JSON.stringify(status));
  }, [status]);

  return (
    <UserStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </UserStatusContext.Provider>
  );
};

export default UserStatusProvider;
