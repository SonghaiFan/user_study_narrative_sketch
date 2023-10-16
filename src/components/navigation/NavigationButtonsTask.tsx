import React from "react";
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

  return (
    <nav className={`flex justify-between items-center ${className}`}>
      <NavigationButton
        direction="previous"
        disabled={currentStoryIndex === 0}
        onClick={goToPreviousStory}
      />
      <NavigationButton
        direction="next"
        disabled={currentStoryIndex === maxStories - 1}
        onClick={goToNextStory}
      />
    </nav>
  );
};

export default NavigationButtonsTask;
