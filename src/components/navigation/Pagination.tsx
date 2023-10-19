/* eslint-disable @typescript-eslint/no-empty-function */
import NavigationButton from "./NavigationButton";
interface PaginationProps {
  handleNext: () => void;
  handlePrevious: () => void;
  hideNext?: boolean;
  hidePrevious?: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  handleNext,
  handlePrevious,
  hideNext = false,
  hidePrevious = false,
  className,
}) => {
  return (
    <nav className={`z-40 flex justify-between items-center ${className}`}>
      <NavigationButton
        direction="previous"
        disabled={hidePrevious}
        onClick={handlePrevious}
        className={hidePrevious ? "opacity-0 pointer-events-none" : ""}
      />
      <NavigationButton
        direction="next"
        disabled={hideNext}
        onClick={handleNext}
        className={hideNext ? "opacity-0 pointer-events-none" : ""}
      />
    </nav>
  );
};

export default Pagination;
