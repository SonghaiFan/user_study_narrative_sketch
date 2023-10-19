import { useContext, useEffect } from "react";
import { UserStatusContext } from "../contexts/UserStatusContext";
import Pagination from "./Pagination";
import { getStatusForPath } from "../../utils/status";

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
    const newStatus = getStatusForPath(currentPath);
    setStatus(newStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  const handlePrevious = () => {
    if (previousPath) navigate(previousPath);
  };

  const handleNext = () => {
    if (nextPath) navigate(nextPath);
  };

  return (
    <Pagination
      className={`${status != "task-not-started" ? "hidden" : ""} ${className}`}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      hidePrevious={true} //!previousPath
      hideNext={!nextPath}
    />
  );
};

export default NavigationButtons;
