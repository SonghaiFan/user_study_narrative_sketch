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
  // Initialize state with data from local storage if available
  const initialStatus = JSON.parse(localStorage.getItem("userStatus") || "{}");
  const [status, setStatus] = useState<Status>({
    userId: initialStatus.userId || "",
    isLoggedIn: initialStatus.isLoggedIn || false,
    isConsented: initialStatus.isConsented || false,
    isFinished: initialStatus.isFinished || false,
  });

  useEffect(() => {
    // Update local storage whenever the status changes
    localStorage.setItem("userStatus", JSON.stringify(status));
  }, [status]);

  return (
    <UserStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </UserStatusContext.Provider>
  );
};

export default UserStatusProvider;
