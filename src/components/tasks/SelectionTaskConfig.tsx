import { taskOptions } from "../../constants/motifs";

interface TaskConfigProps {
  isSelectionCorrect: boolean;
  reason: string;
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

export const getTaskMessage = (selection: string | null) => (
  <p className="text-lg">
    Are you sure you want to submit your answer:{" "}
    <span className="font-bold">{selection}</span>?
  </p>
);

export const getTaskConfig = ({
  isSelectionCorrect,
  reason,
  rightSelection,
  selection,
}: TaskConfigProps) => {
  const TrainingMessage = getTrainingMessage(
    isSelectionCorrect,
    rightSelection
  );
  const TaskMessage = getTaskMessage(selection);

  return {
    trail: {
      confirmButtonText: "Proceed to Next",
      disableConfirmButton: !isSelectionCorrect,
      cancelButtonText: "Try Again",
      disableCancelButton: isSelectionCorrect,
      message: TrainingMessage,
      options: taskOptions,
    },
    train: {
      confirmButtonText: "Proceed to Next",
      disableConfirmButton: !isSelectionCorrect,
      cancelButtonText: "Try Again",
      disableCancelButton: isSelectionCorrect,
      message: TrainingMessage,
      options: taskOptions,
    },
    task: {
      confirmButtonText: "Yes, Proceed With Current Answer",
      disableConfirmButton: !reason,
      cancelButtonText: "No, Review Again Before Proceeding",
      disableCancelButton: false,
      message: TaskMessage,
      options: taskOptions,
    },
  };
};
