import { threeNodesOptions } from "../../constants/motifs";
import train_stories from "../data/stories/combined_stories_train.json";

interface TaskConfigProps {
  isSelectionCorrect: boolean;
  isSubmitConfirmed: boolean;
  isFeedbackProvided: boolean;
  rightSelection: string;
  selection: string | null;
}

function getDescription(structure: string) {
  const story = train_stories.find((s) => s.structure === structure);
  return story?.description;
}

export const getTrainingMessage = (
  isSelectionCorrect: boolean,
  rightSelection: string
) =>
  isSelectionCorrect ? (
    <>
      <p className="text-lg">
        Your selection is correct! It's{" "}
        <span className="font-bold">{rightSelection}</span>.
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Check the rich text version that provides titles and keywords (
        <span className="inline-block px-2 py-1 m-2 text-xs sm:text-sm font-medium bg-gray-700 text-gray-200 rounded">
          themes
        </span>
        and
        <span className="inline-block px-2 py-1 m-2 text-xs sm:text-sm font-medium bg-gray-200 text-gray-700 rounded-xl">
          entities
        </span>
        ) to help you understand how the narrative in the TT graph works.
      </p>
      <p className="text-sm text-gray-600 mt-2">
        <span className="font-bold">Explanation:</span>{" "}
        {getDescription(rightSelection)}
      </p>
    </>
  ) : (
    <p className="text-lg">
      The selection is{" "}
      <span className="font-bold text-red-500">incorrect.</span>
    </p>
  );

export const getTaskMessage = (
  isSubmitConfirmed: boolean,
  selection: string | null
) => {
  const selectionText = selection ? `"${selection}"` : "your selection";

  return isSubmitConfirmed ? (
    <>
      <p className="text-lg">
        Why you choose <span className="font-bold">{selectionText}</span>?
      </p>
      <p className="text-sm text-gray-600 mt-2">
        You can only proceed to the next story after you have provided your
        feedback for both reasoning and confidence level.
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
        ? "Submit and proceed"
        : "Yes, Proceed With Current Answer",
      disableConfirmButton: isSubmitConfirmed && !isFeedbackProvided,
      cancelButtonText: "No, Review Again Before Proceeding",
      disableCancelButton: isSubmitConfirmed,
      message: TaskMessage,
      options: threeNodesOptions,
    },
  };
};
