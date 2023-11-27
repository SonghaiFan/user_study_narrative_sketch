import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { modeConfig } from "../../utils/modeConfig";
import { getTaskConfig } from "./SelectionTaskConfig";
import SketchSelectionPanel from "./SketchSelectionPanel";
import NavigationButtonsTask from "../navigation/NavigationButtonsTask";
import { ConfirmationPanel } from "../common/ConfirmationPanel";
import { logUserSelectionData } from "../../utils/firebaseUtils";
import ChaptersToMarkdown from "../common/ChaptersToMarkdown";
import { Stories } from "../data/types";
import { useUserStatus } from "../../hooks/useUserStatus";
import { ENABLE_DEBUG } from "../../constants/debug";

interface SelectionTaskProps {
  stories: Stories;
  mode: "training" | "task";
}

const SelectionTask: React.FC<SelectionTaskProps> = ({ stories, mode }) => {
  const navigate = useNavigate();
  const { status } = useUserStatus();

  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [showBottomPanel, setShowBottomPanel] = useState<boolean>(false);
  const [rightSelection, setRightSelection] = useState<string>(
    stories.length > 0 ? stories[0].structure : ""
  );
  const [selection, setSelection] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [isSubmitConfirmed, setIsSubmitConfirmed] = useState<boolean>(false);
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] =
    useState<boolean>(false);

  const userId = status.userId;
  const currentModeConfig = modeConfig[mode];
  const currentStory = stories[currentStoryIndex];
  const currentStoryName = currentStory?.name;
  const isSelectionCorrect = rightSelection === selection;
  const isFeedbackProvided = reason !== "" && confidence !== null;
  const showHint = mode === "training" && isSelectionCorrect;

  useEffect(() => {
    if (currentStoryIndex >= stories.length) {
      navigate(currentModeConfig.nextPath); // Use value from config
    } else {
      setRightSelection(currentStory.structure);
    }

    setIsSubmitConfirmed(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStoryIndex]);

  const handleSubmit = async () => {
    setIsSubmitConfirmed(true);

    if (!ENABLE_DEBUG) {
      await logUserSelectionData(
        userId,
        mode,
        currentStoryIndex,
        currentStoryName,
        rightSelection,
        selection,
        reason,
        confidence,
        "end of selection"
      );
    }

    if (ENABLE_DEBUG) {
      console.log(
        `User ${userId} selected ${selection} for ${currentStoryName}, end of selection.`
      );
    }
  };

  const handleConfirm = async () => {
    setIsConfirmButtonDisabled(true); // Disable the button to prevent multiple clicks

    // Create a document in Firestore to record the user's selection and task details
    if (!ENABLE_DEBUG && mode === "task") {
      await logUserSelectionData(
        userId,
        mode,
        currentStoryIndex,
        currentStoryName,
        rightSelection,
        selection,
        reason,
        confidence,
        "confirm"
      );
    }

    // Fake delay to simulate server response
    if (ENABLE_DEBUG) {
      // await new Promise((r) => setTimeout(r, 1000));
      console.log(
        `User ${userId} selected ${selection} for ${currentStoryName} and clicked confirm, the selection is ${isSelectionCorrect}, and the reason is ${reason} and the confidence level is ${confidence}.`
      );
    }

    setReason("");
    setConfidence(null);
    setCurrentStoryIndex((prev) => prev + 1);
    setShowBottomPanel(false);
    setIsConfirmButtonDisabled(false); // Re-enable the button after operation is complete
  };

  const handleCancel = async () => {
    // Create a document in Firestore to record the user's selection and task details
    if (!ENABLE_DEBUG) {
      await logUserSelectionData(
        userId,
        mode,
        currentStoryIndex,
        currentStoryName,
        rightSelection,
        selection,
        reason,
        confidence,
        "cancel"
      );
    }

    // Fake delay to simulate server response
    if (ENABLE_DEBUG) {
      // await new Promise((r) => setTimeout(r, 1000));
      console.log(
        `User ${userId} selected ${selection} for ${currentStoryName} and clicked cancel`
      );
    }

    setShowBottomPanel(false);
  };

  const taskConfig = getTaskConfig({
    isSubmitConfirmed,
    isSelectionCorrect,
    isFeedbackProvided,
    rightSelection,
    selection,
  });

  const onSelection = (key: string) => {
    setSelection(key);
    setShowBottomPanel(true);

    if (!ENABLE_DEBUG && mode === "training") {
      // Create a document in Firestore to record the user's selection and task details
      logUserSelectionData(
        userId,
        mode,
        currentStoryIndex,
        currentStoryName,
        rightSelection,
        key,
        reason,
        confidence,
        "select"
      );
    }

    if (ENABLE_DEBUG) {
      console.log(`User ${userId} selected ${key} for ${currentStoryName}.`);
    }
  };

  if (currentStoryIndex >= stories.length || !currentStory) {
    return null;
  }

  return (
    <>
      <NavigationButtonsTask
        className="fixed w-full bottom-5 right-0 p-6 py-4"
        currentStoryIndex={currentStoryIndex}
        setCurrentStoryIndex={setCurrentStoryIndex}
        maxStories={stories.length}
      ></NavigationButtonsTask>

      <div className="text-sm pl-2 text-center text-gray-400">
        {Array.from({ length: stories.length }, (_, i) =>
          i <= currentStoryIndex ? "●" : "○"
        ).join(" ")}
        {` (${currentStoryIndex + 1}/${stories.length})`}
      </div>

      <div
        className={`grid ${
          showBottomPanel ? "grid-rows-[60%_40%]" : "grid-rows-1"
        } overflow-hidden h-full px-0 sm:px-20 border`}
      >
        {/* First Row with Two Panels */}
        <div
          className={`flex ${showBottomPanel ? "row-span-1" : "row-span-2"}`}
        >
          {/* Chapters Panel */}
          <div className="w-1/2 h-full p-8 overflow-auto border">
            <ChaptersToMarkdown data={currentStory} showHint={showHint} />
          </div>
          {/* Sketch Selection Panel */}
          <div id="sketch-selection-panel" className="w-1/2 h-full border">
            <SketchSelectionPanel
              options={taskConfig[mode].options}
              rightSelection={rightSelection}
              mode={mode}
              onSelection={onSelection}
              locked={showBottomPanel}
            />
          </div>
        </div>

        {/* Confirmation Panel */}
        {showBottomPanel && (
          <div id="confirmation-panel" className="row-span-1 m-auto ">
            <ConfirmationPanel
              onConfirm={
                mode === "task"
                  ? isSubmitConfirmed
                    ? handleConfirm
                    : handleSubmit
                  : handleConfirm
              }
              onCancel={handleCancel}
              showFeedback={mode === "task" && isSubmitConfirmed}
              confirmButtonText={taskConfig[mode].confirmButtonText}
              cancelButtonText={taskConfig[mode].cancelButtonText}
              disableConfirmButton={
                isConfirmButtonDisabled || taskConfig[mode].disableConfirmButton
              }
              disableCancelButton={taskConfig[mode].disableCancelButton}
              inputText={reason}
              setInputText={setReason}
              inputRate={confidence}
              setInputRate={setConfidence}
            >
              {taskConfig[mode].message}
            </ConfirmationPanel>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectionTask;
