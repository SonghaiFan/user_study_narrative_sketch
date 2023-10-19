import React from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface NavigationButtonProps {
  direction: "previous" | "next";
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} transition-all duration-200 ease-in-out pointer-events-auto text-gray-400 hover:text-gray-500`}
    >
      {direction === "previous" ? (
        <FaArrowCircleLeft className="text-2xl" />
      ) : (
        <FaArrowCircleRight className="text-2xl" />
      )}
      {direction.charAt(0).toUpperCase() + direction.slice(1)}
    </button>
  );
};

export default NavigationButton;
