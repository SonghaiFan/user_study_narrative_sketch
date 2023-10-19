import React, { useContext, useEffect } from "react";
import { UserStatusContext } from "../contexts/UserStatusContext";
import { ENABLE_DEBUG } from "../../constants/debug";
import Pagination from "./Pagination";
import { getStatusForTaskIndex } from "../../utils/status";

interface NavigationButtonsProps {
  currentStoryIndex: number;
  setCurrentStoryIndex: React.Dispatch<React.SetStateAction<number>>;
  maxStories: number; // to ensure you don't go beyond the last story
  className?: string;
}
const NavigationButtonsTask: React.FC<NavigationButtonsProps> = ({
  className,
  currentStoryIndex,
  setCurrentStoryIndex,
  maxStories,
}) => {
  const userStatusContext = useContext(UserStatusContext);

  if (!userStatusContext) {
    throw new Error("TaskRoute must be used within a UserStatusProvider");
  }

  const { status, setStatus } = userStatusContext;

  useEffect(() => {
    const newStatus = getStatusForTaskIndex(currentStoryIndex, maxStories);
    setStatus(newStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStoryIndex, maxStories]);

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStoryIndex < maxStories - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    }
  };

  return (
    <Pagination
      className={`${status == "task-complted" ? "hidden" : ""} ${className}`}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      hidePrevious={!ENABLE_DEBUG || currentStoryIndex === 0}
      hideNext={!ENABLE_DEBUG || currentStoryIndex === maxStories - 1}
    />
  );
};

export default NavigationButtonsTask;
