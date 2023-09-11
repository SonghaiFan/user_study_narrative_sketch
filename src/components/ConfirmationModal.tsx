interface ConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  mode: string;
  trueAnswer: string;
  selectedAnswer: string | null;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  mode,
  trueAnswer,
  selectedAnswer,
}) => {
  if (!isVisible) {
    return null;
  }

  const isCorrectSelection = trueAnswer === selectedAnswer;

  const getMessage = () => {
    if (mode === "train") {
      if (isCorrectSelection) {
        return `Your selection is correct! It's ${trueAnswer}. Do you want to continue?`;
      } else {
        return "The selection is incorrect. Would you like to try again? ";
      }
    } else {
      return "Are you sure you want to submit your answer?";
    }
  };

  return (
    <div
      id="confirmationModal"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40"
    >
      <div className="bg-white p-8 rounded-md">
        <p>{getMessage()}</p>
        <div className="flex justify-end mt-4">
          {mode === "task" && (
            <button
              className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={onConfirm}
            >
              Confirm
            </button>
          )}
          {mode === "train" && isCorrectSelection && (
            <button
              className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={onConfirm}
            >
              Confirm
            </button>
          )}

          {mode === "train" && !isCorrectSelection && (
            <button
              className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={onCancel}
            >
              Try Again
            </button>
          )}
          {mode !== "train" && (
            <button
              className="mx-2 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
