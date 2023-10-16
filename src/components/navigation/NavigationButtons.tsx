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
        disabled={!previousPath}
        onClick={() => previousPath && navigate(previousPath)}
      />
      <NavigationButton
        direction="next"
        disabled={!nextPath}
        onClick={() => nextPath && navigate(nextPath)}
      />
    </nav>
  );
};

export default NavigationButtons;
