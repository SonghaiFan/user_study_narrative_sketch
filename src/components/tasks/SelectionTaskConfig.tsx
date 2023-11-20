import { threeNodesOptions } from "../../constants/motifs";

interface TaskConfigProps {
  isSelectionCorrect: boolean;
  isSubmitConfirmed: boolean;
  isFeedbackProvided: boolean;
  rightSelection: string;
  selection: string | null;
}

export const getTrainingMessage = (
  isSelectionCorrect: boolean,
  rightSelection: string
) => (
  <p className="text-lg">
    {isSelectionCorrect ? (
      <>
        Your selection is correct! It's{" "}
        <span className="font-bold">{rightSelection}</span>.
      </>
    ) : (
      <>
        The selection is{" "}
        <span className="font-bold text-red-500">incorrect</span>.
      </>
    )}
  </p>
);

export const getTaskMessage = (
  isSubmitConfirmed: boolean,
  selection: string | null
) => {
  const selectionText = selection ? `"${selection}"` : "your selection";

  return isSubmitConfirmed ? (
    <>
      {" "}
      <p className="text-lg">
        Please explain your reasoning for selecting{" "}
        <span className="font-bold">{selectionText}</span>.
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Please provide an explanation for your reasoning before submitting.
      </p>
    </>
  ) : (
    <>
      <p className="text-lg">
        Are you sure you want to confirm your answer:{" "}
        <span className="font-bold">{selectionText}</span>?
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Once confirmed, you will not be able to change your answer.
      </p>
    </>
  );
};

export const getTaskConfig = ({
  isSelectionCorrect,
  isSubmitConfirmed,
  isFeedbackProvided,
  rightSelection,
  selection,
}: TaskConfigProps) => {
  const TrainingMessage = getTrainingMessage(
    isSelectionCorrect,
    rightSelection
  );
  const TaskMessage = getTaskMessage(isSubmitConfirmed, selection);

  return {
    training: {
      confirmButtonText: "Proceed to Next",
      disableConfirmButton: !isSelectionCorrect,
      cancelButtonText: "Try Again",
      disableCancelButton: isSelectionCorrect,
      message: TrainingMessage,
      options: threeNodesOptions,
    },
    task: {
      confirmButtonText: isSubmitConfirmed
        ? "Submit reasoning and proceed"
        : "Yes, Proceed With Current Answer",
      disableConfirmButton: isSubmitConfirmed && !isFeedbackProvided,
      cancelButtonText: "No, Review Again Before Proceeding",
      disableCancelButton: isSubmitConfirmed,
      message: TaskMessage,
      options: threeNodesOptions,
    },
  };
};
