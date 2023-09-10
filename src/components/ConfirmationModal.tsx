import React from "react";

interface ConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      id="confirmationModal"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40"
    >
      <div className="bg-white p-8 rounded-md">
        <p>Are you sure you want to select this image?</p>
        <div className="flex justify-end mt-4">
          <button
            className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="mx-2 px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
