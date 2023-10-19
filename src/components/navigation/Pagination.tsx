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
    <nav
      className={`z-40 flex justify-between items-center pointer-events-none ${className}`}
    >
      <NavigationButton
        direction="previous"
        disabled={hidePrevious}
        onClick={handlePrevious}
        className={hidePrevious ? "opacity-0" : ""}
      />
      <NavigationButton
        direction="next"
        disabled={hideNext}
        onClick={handleNext}
        className={hideNext ? "opacity-0" : ""}
      />
    </nav>
  );
};

export default Pagination;
