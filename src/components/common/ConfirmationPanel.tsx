import { MdDragIndicator } from "react-icons/md"; // Import drag icon from react-icons

interface ConfirmationPanelProps {
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  showFeedback: boolean; // to control the display of the feedback form
  confirmButtonText?: string; // text for the confirmation button
  cancelButtonText?: string; // text for the cancel button
  disableConfirmButton: boolean; // to control the state of the confirm button
  disableCancelButton: boolean; // to control the state of the cancel button
  inputText: string; // text to be displayed in the modal
  setInputText: (text: string) => void; // function to set the text
  inputRate: number | null; // rate to be displayed in the modal
  setInputRate: (rate: number | null) => void; // function to set the rate
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
      className="bg-white p-8 rounded-md max-w-[40rem]"
    >
      <div className="absolute top-0 right-0 mt-2 mr-2 px-2 cursor-move rounded bg-slate-100 hover:bg-slate-200">
        <span className="flex items-center">
          <span className="ml-2 text-sm">Drag it</span>
          <MdDragIndicator size={30} />
        </span>
      </div>

      {children}
      {showFeedback && (
        <>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Explain your reasoning..."
            className="mt-2 w-full p-4 border rounded-md overflow-auto resize-none max-h-[200px]"
          />

          <div className="mt-4">
            <span className="text-sm text-gray-600 block mb-2">
              Confidence level:
            </span>
            <div className="flex flex-wrap">
              {confidenceLevels.map(({ level, label }) => (
                <label key={level} className="flex items-center mr-4 mb-2">
                  <input
                    type="radio"
                    name="confidenceLevel"
                    value={level}
                    checked={inputRate === level}
                    onChange={() => setInputRate(level)}
                    className="mr-1"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </>
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
