import { MdDragIndicator } from "react-icons/md"; // Import drag icon from react-icons
import Draggable from "react-draggable"; // Import Draggable

interface ConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  showFeedback: boolean; // to control the display of the textarea
  confirmButtonText?: string; // text for the confirmation button
  cancelButtonText?: string; // text for the cancel button
  disableConfirmButton: boolean; // to control the state of the confirm button
  disableCancelButton: boolean; // to control the state of the cancel button
  inputText: string; // text to be displayed in the modal
  setInputText: (text: string) => void; // function to set the text
  captionText: string; // text for the caption
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
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
  captionText,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 pointer-events-auto ">
      <Draggable bounds="parent" handle="#drag-handle">
        <div className="bg-white p-8 rounded-md max-w-[40rem] pt-12">
          <div
            id="drag-handle"
            className="absolute top-0 right-0 mt-2 mr-2 px-2 cursor-move rounded bg-slate-100 hover:bg-slate-200"
          >
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
              <p className="text-sm text-gray-600 mt-2">{captionText}</p>
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
      </Draggable>
    </div>
  );
};
