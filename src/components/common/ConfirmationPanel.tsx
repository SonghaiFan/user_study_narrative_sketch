import FeedbackForm from "./FeedbackForm";

interface ConfirmationPanelProps {
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  showFeedback: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  disableConfirmButton: boolean;
  disableCancelButton: boolean;
  inputText: string;
  setInputText: (text: string) => void;
  inputRate: number | null;
  setInputRate: (rate: number | null) => void;
}

export const ConfirmationPanel: React.FC<ConfirmationPanelProps> = ({
  onConfirm,
  onCancel,
  children,
  showFeedback,
  confirmButtonText = "Yes",
  cancelButtonText = "Cancel",
  disableConfirmButton,
  disableCancelButton,
  inputText,
  setInputText,
  inputRate,
  setInputRate,
}) => {
  const confidenceLevels = [
    { level: 1, label: "Very Low" },
    { level: 2, label: "Low" },
    { level: 3, label: "Moderate" },
    { level: 4, label: "High" },
    { level: 5, label: "Very High" },
  ];

  return (
    <div
      id="confirmationPanel"
      className="bg-white p-8 rounded-md max-w-[50rem]"
    >
      {children}
      {showFeedback && (
        <FeedbackForm
          showFeedback={showFeedback}
          inputText={inputText}
          setInputText={setInputText}
          inputRate={inputRate}
          setInputRate={setInputRate}
          confidenceLevels={confidenceLevels}
        />
      )}
      <div className="flex justify-end mt-4">
        <button
          className={`mx-2 px-4 py-2 text-white rounded-md ${
            disableConfirmButton
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500"
          }`}
          onClick={onConfirm}
          disabled={disableConfirmButton}
        >
          {confirmButtonText}
        </button>
        <button
          className={`mx-2 px-4 py-2 bg-red-500 text-white rounded-md ${
            disableCancelButton ? "hidden" : ""
          }`}
          onClick={onCancel}
          disabled={disableCancelButton}
        >
          {cancelButtonText}
        </button>
      </div>
    </div>
  );
};
