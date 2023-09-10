import React from "react";
import NavigationButton from "./NavigationButton";

interface NavigationButtonsProps {
  previousPath: string | null;
  nextPath: string | null;
  navigate: (path: string) => void;
  className?: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  className,
  previousPath,
  nextPath,
  navigate,
}) => {
  return (
    <nav className={`flex justify-between items-center ${className}`}>
      <NavigationButton
        direction="previous"
        path={previousPath}
        navigate={navigate}
      />
      <NavigationButton direction="next" path={nextPath} navigate={navigate} />
    </nav>
  );
};

export default NavigationButtons;
