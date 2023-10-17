import React, { useContext, useEffect } from "react";
import { UserStatusContext } from "../contexts/UserStatusContext";
import NavigationButton from "./NavigationButton";

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
    if (currentStoryIndex === maxStories - 1) {
      console.log("status", status);
      setStatus("task-completed");
    } else {
      setStatus("task-in-progress");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStoryIndex, maxStories]);

  const goToPreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev: number) => prev - 1);
    }
  };

  const goToNextStory = () => {
    if (currentStoryIndex < maxStories - 1) {
      setCurrentStoryIndex((prev: number) => prev + 1);
    }
  };

  const reachedEnd = currentStoryIndex === maxStories - 1;

  // ${status === "task-completed" ? "hidden " : "" }
  return (
    <nav className={`hidden justify-end items-center  ${className}`}>
      <NavigationButton
        direction="previous"
        disabled={currentStoryIndex === 0}
        onClick={goToPreviousStory}
        className="hidden"
      />
      <NavigationButton
        direction="next"
        disabled={reachedEnd}
        onClick={goToNextStory}
      />
    </nav>
  );
};

export default NavigationButtonsTask;
