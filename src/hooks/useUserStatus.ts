// src/hooks/useUserStatus.ts
import { useContext } from "react";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../contexts/UserStatusContext";

export const useUserStatus = (): UserStatusContextProps => {
  const context = useContext(UserStatusContext);
  if (context === undefined) {
    throw new Error("useUserStatus must be used within a UserStatusProvider");
  }
  return context;
};
