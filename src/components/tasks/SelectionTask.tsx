import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { modeConfig } from "../../modeConfig";
import { getTaskConfig } from "./SelectionTaskConfig";
import { UserStatusContext } from "../../contexts/UserStatusContext";
import SketchSelectionPanel from "./SketchSelectionPanel";
import NavigationButtonsTask from "../navigation/NavigationButtonsTask";
import { ConfirmationModal } from "../common/ConfirmationModal";
import { logData } from "../../utils/logger";
import ChaptersToMarkdown from "../../utils/chaptersToMarkdown";
import { Stories } from "../data/types";

import { ENABLE_DEBUG } from "../../constants/debug";

interface SelectionTaskProps {
  stories: Stories;
  mode: "train" | "task";
}
const SelectionTask: React.FC<SelectionTaskProps> = ({ stories, mode }) => {
  const navigate = useNavigate();
  const userStatus = useContext(UserStatusContext);

  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rightSelection, setRightSelection] = useState<string>(
    stories.length > 0 ? stories[0].structure : ""
  );
  const [selection, setSelection] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("");

  const currentModeConfig = modeConfig[mode];
  const currentStory = stories[currentStoryIndex];
  const isSelectionCorrect = rightSelection === selection;

  useEffect(() => {
    if (currentStoryIndex >= stories.length) {
      navigate(currentModeConfig.nextPath); // Use value from config
    }

    if (currentStoryIndex == stories.length - 1) {
      setStatus({ ...status, progress: "finished" });
    } else {
      setStatus({ ...status, progress: "progressing" });
    }

    setRightSelection(currentStory.structure);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStoryIndex]);

  if (!userStatus) {
    // UserStatusContext is undefined, do not render this component
    return null;
  }

  const { userId, status, setStatus } = userStatus;

  const handleConfirm = async () => {
    // Create a document in Firestore to record the user's selection and task details

    if (!ENABLE_DEBUG && mode === "task") {
      await logData(
        userId,
        mode,
        currentStory,
        rightSelection,
        selection,
        reason
      );
    }

    setReason("");
    setCurrentStoryIndex((prev) => prev + 1);
    setShowModal(false);
  };

  const taskConfig = getTaskConfig({
    isSelectionCorrect,
    reason,
    rightSelection,
    selection,
  });

  const onSelection = (key: string) => {
    setSelection(key);
    setShowModal(true);
  };

  const captionText =
    "You can only submit after explaining your reasoning. If you wish to review the text and your selection, click the red button. Your input text will be saved, and you can continue from where you left after reviewing.";

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

      <div id="storyText" className="text-xl font-bold pl-2">
        {`${currentStory.section}: ${currentStoryIndex + 1}/${stories.length}`}
      </div>
      <div className="flex flex-col md:flex-row overflow-hidden h-full">
        {/* Chapters Panel */}
        <div className="w-full md:w-1/2 h-1/2 md:h-auto p-8 border overflow-auto">
          <ChaptersToMarkdown data={currentStory} mode={mode} />
        </div>

        {/* Sketch Selection Panel */}
        <div
          id="sketch-selection-panel"
          className="w-full md:w-1/2 h-1/2 md:h-auto border"
        >
          <SketchSelectionPanel
            options={taskConfig[mode].options}
            rightSelection={rightSelection}
            mode={mode}
            onSelection={onSelection}
          />
        </div>

        <ConfirmationModal
          isVisible={showModal}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
          showTextarea={mode === "task"}
          confirmButtonText={taskConfig[mode].confirmButtonText}
          cancelButtonText={taskConfig[mode].cancelButtonText}
          disableConfirmButton={taskConfig[mode].disableConfirmButton}
          disableCancelButton={taskConfig[mode].disableCancelButton}
          inputText={reason}
          setInputText={setReason}
          captionText={captionText}
        >
          {taskConfig[mode].message}
        </ConfirmationModal>
      </div>
    </>
  );
};

export default SelectionTask;
