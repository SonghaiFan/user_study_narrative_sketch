import { taskOptions } from "../../constants/motifs";

interface TaskConfigProps {
  isSelectionCorrect: boolean;
  isSubmitConfirmed: boolean;
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
) => (
  <p className="text-lg">
    {isSubmitConfirmed ? (
      <>
        Please explain why you select{" "}
        <span className="font-bold">{selection}</span>?
      </>
    ) : (
      <>
        Are you sure you want to submit your answer:{" "}
        <span className="font-bold">{selection}</span>?
      </>
    )}
  </p>
);

export const getTaskConfig = ({
  isSelectionCorrect,
  isSubmitConfirmed,
  rightSelection,
  selection,
}: TaskConfigProps) => {
  const TrainingMessage = getTrainingMessage(
    isSelectionCorrect,
    rightSelection
  );
  const TaskMessage = getTaskMessage(isSubmitConfirmed, selection);

  return {
    trail: {
      confirmButtonText: "Proceed to Next",
      disableConfirmButton: !isSelectionCorrect,
      cancelButtonText: "Try Again",
      disableCancelButton: isSelectionCorrect,
      message: TrainingMessage,
      options: taskOptions,
    },
    training: {
      confirmButtonText: "Proceed to Next",
      disableConfirmButton: !isSelectionCorrect,
      cancelButtonText: "Try Again",
      disableCancelButton: isSelectionCorrect,
      message: TrainingMessage,
      options: taskOptions,
    },
    task: {
      confirmButtonText: isSubmitConfirmed
        ? "Submit reasoning and proceed"
        : "Yes, Proceed With Current Answer",
      disableConfirmButton: true,
      cancelButtonText: "No, Review Again Before Proceeding",
      disableCancelButton: isSubmitConfirmed,
      message: TaskMessage,
      options: taskOptions,
    },
  };
};
