import React, { createContext, useState, FC } from "react";

interface Status {
  path: string;
  progress: string;
}

interface UserStatusContextProps {
  userId: string;
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
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
  const [status, setStatus] = useState<Status>({
    path: "home",
    progress: "enter",
  });
  return (
    <UserStatusContext.Provider value={{ userId, status, setStatus }}>
      {children}
    </UserStatusContext.Provider>
  );
};

export default UserStatusProvider;
