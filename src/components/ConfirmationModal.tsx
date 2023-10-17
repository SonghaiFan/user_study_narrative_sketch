import React from "react";

interface ConfirmationModalProps {
  isVisible: boolean;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  mode: string;
  trueAnswer: string;
  selectedAnswer: string | null;
  reason: string;
  setReason: React.Dispatch<React.SetStateAction<string>>;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  mode,
  trueAnswer,
  selectedAnswer,
  reason,
  setReason,
}) => {
  if (!isVisible) {
    return null;
  }

  const isCorrectSelection = trueAnswer === selectedAnswer;

  const TrainingMessage = () => (
    <p className="text-lg">
      {isCorrectSelection ? (
        <>
          Your selection is correct! It's{" "}
          <span className="font-bold">{trueAnswer}</span>.
        </>
      ) : (
        <>
          The selection is{" "}
          <span className="font-bold text-red-500">incorrect</span>.
        </>
      )}
    </p>
  );

  const TaskMessage = () => (
    <p className="text-lg">
      Are you sure you want to submit your answer:{" "}
      <span className="font-bold">{selectedAnswer}</span>?
    </p>
  );

  const handleConfirm = () => {
    onConfirm(reason); // Pass reason to the onConfirm prop function
  };

  return (
    <div
      id="confirmationModal"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40"
    >
      <div className="bg-white p-8 rounded-md max-w-[40rem]">
        {mode === "train" ? <TrainingMessage /> : <TaskMessage />}
        {mode === "task" && (
          <>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain your reasoning..."
              className="mt-2 w-full p-4 border rounded-md overflow-auto resize-none max-h-[200px]"
            />
            <p className="mt-4 text-sm text-gray-600 break-words">
              You can only submit after explaining your reasoning. If you wish
              to review the text and your selection, click the red button. Your
              input text will be saved, and you can continue from where you left
              after reviewing.
            </p>
          </>
        )}
        <div className="flex justify-end mt-4">
          {mode !== "train" && (
            <button
              className="mx-2 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={onCancel}
            >
              No, Review Again Before Proceeding
            </button>
          )}
          {mode === "task" && reason && (
            <button
              className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleConfirm}
            >
              Yes, Proceed With Current Answer
            </button>
          )}

          {mode === "train" && (
            <button
              className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={isCorrectSelection ? handleConfirm : onCancel}
            >
              {isCorrectSelection ? "Continue" : "Try Again"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
