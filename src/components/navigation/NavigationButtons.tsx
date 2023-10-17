import React, { useContext, useEffect } from "react";
import NavigationButton from "./NavigationButton";
import { UserStatusContext } from "../contexts/UserStatusContext";
interface NavigationButtonsProps {
  previousPath: string | null;
  currentPath: string;
  nextPath: string | null;
  navigate: (path: string) => void;
  className?: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  className,
  previousPath,
  currentPath,
  nextPath,
  navigate,
}) => {
  const userStatusContext = useContext(UserStatusContext);

  if (!userStatusContext) {
    throw new Error("TaskRoute must be used within a UserStatusProvider");
  }

  const { status, setStatus } = userStatusContext;

  useEffect(() => {
    // console.log("currentPath", currentPath);
    // console.log("status", status);
    if (currentPath != "/task") {
      setStatus("task-not-started");
    }
    console.log("status", status);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPath]);

  return (
    <nav
      className={`${
        status === "task-not-started" || status === "task-completed"
          ? ""
          : "hidden "
      } flex justify-end items-center ${className}`}
    >
      <NavigationButton
        direction="previous"
        disabled={!previousPath}
        onClick={() => previousPath && navigate(previousPath)}
        className="hidden"
      />
      <NavigationButton
        direction="next"
        disabled={!nextPath}
        onClick={() => nextPath && navigate(nextPath)}
        className={!nextPath ? "opacity-0 pointer-events-none" : ""}
      />
    </nav>
  );
};

export default NavigationButtons;
