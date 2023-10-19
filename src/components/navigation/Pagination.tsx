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
    <nav className={`flex justify-end items-center ${className}`}>
      <NavigationButton
        direction="previous"
        disabled={hidePrevious}
        onClick={handlePrevious}
        className={hidePrevious ? "hidden" : ""}
      />
      <NavigationButton
        direction="next"
        disabled={hideNext}
        onClick={handleNext}
        className={hideNext ? "hidden" : ""}
      />
    </nav>
  );
};

export default Pagination;
