import React, { useState, ReactNode } from "react";
import { FiChevronDown } from "react-icons/fi";

interface ConsentFormProps {
  handleSubmit: () => void;
  handleCancel: () => void;
  isSubmitted: boolean;
  children: ReactNode; // To render any child components or content
  title?: string; // Optional title for the form
  submitButtonLabel?: string; // Optional label for the submit button
  cancelButtonLabel?: string; // Optional label for the cancel button
}

const ConsentForm: React.FC<ConsentFormProps> = ({
  handleSubmit,
  handleCancel,
  isSubmitted,
  children,
  title,
  submitButtonLabel = "Confirm",
  cancelButtonLabel = "Cancel",
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8  w-full lg:w-1/2 rounded-md shadow-lg max-h-screen overflow-y-auto relative">
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        {children}
        {/* button to confirm and cancel */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className={`px-4 py-2 font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              !isSubmitted
                ? "bg-green-500 hover:bg-green-600 focus:ring-green-500"
                : "bg-gray-500"
            }`}
            onClick={handleSubmit}
            disabled={isSubmitted}
          >
            {submitButtonLabel}
          </button>
          <button
            type="button"
            className="px-4 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={handleCancel}
          >
            {cancelButtonLabel}
          </button>
        </div>
        {/* scroll down indicator */}

        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <FiChevronDown size={24} className="animate-bounce" />
          <p className="text-sm font-medium text-gray-500 mt-1 animate-fade-out">
            Scroll down to confirm
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsentForm;
