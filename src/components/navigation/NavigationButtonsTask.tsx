import { ENABLE_DEBUG } from "../../constants/debug";
import NavigationButtonsWrapper from "./NavigationButtonsWrapper";

interface NavigationButtonsProps {
  currentStoryIndex: number;
  setCurrentStoryIndex: React.Dispatch<React.SetStateAction<number>>;
  maxStories: number;
  className?: string;
}
const NavigationButtonsTask: React.FC<NavigationButtonsProps> = ({
  className,
  currentStoryIndex,
  setCurrentStoryIndex,
  maxStories,
}) => {
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
    <NavigationButtonsWrapper
      className={`${ENABLE_DEBUG ? "" : "hidden"} ${className}`}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      hidePrevious={!ENABLE_DEBUG || currentStoryIndex === 0}
      hideNext={!ENABLE_DEBUG || currentStoryIndex === maxStories - 1}
    />
  );
};

export default NavigationButtonsTask;
