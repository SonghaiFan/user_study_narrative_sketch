import React, { createContext, useState, FC } from "react";

interface UserStatusContextProps {
  userId: string;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export const UserStatusContext = createContext<
  UserStatusContextProps | undefined
>(undefined);

interface UserStatusProviderProps {
  userId: string;
  children: React.ReactNode;
}

const UserStatusProvider: FC<UserStatusProviderProps> = ({
  userId,
  children,
}) => {
  const [status, setStatus] = useState("");
  return (
    <UserStatusContext.Provider value={{ userId, status, setStatus }}>
      {children}
    </UserStatusContext.Provider>
  );
};

export default UserStatusProvider;
