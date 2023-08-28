import React from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface NavigationButtonProps {
  direction: "previous" | "next";
  path: string | null;
  navigate: (path: string) => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  path,
  navigate,
}) => {
  const disabled = !path;
  const navigateToPath = () => path && navigate(path);

  return (
    <button
      disabled={disabled}
      onClick={navigateToPath}
      className={`transition-all duration-200 ease-in-out ${
        disabled
          ? "text-gray-300 cursor-not-allowed"
          : "text-gray-400 hover:text-gray-500"
      }`}
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
