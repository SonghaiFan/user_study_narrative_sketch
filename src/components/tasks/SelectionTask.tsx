import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { modeConfig } from "../../modeConfig";
import { getTaskConfig } from "./SelectionTaskConfig";
import { UserStatusContext } from "../contexts/UserStatusContext";
import SketchSelectionPanel from "./SketchSelectionPanel";
import NavigationButtonsTask from "../navigation/NavigationButtonsTask";
import { ConfirmationModal } from "../common/ConfirmationModal";
import { logData } from "../../utils/Logger";
import ChaptersToMarkdown from "../../utils/chaptersToMarkdown";
import { Stories } from "../data/types";

import { ENABLE_LOGGING } from "../../constants/debug";

interface SelectionTaskProps {
  stories: Stories;
  mode: "train" | "task";
}

const SelectionTask: React.FC<SelectionTaskProps> = ({ stories, mode }) => {
  const navigate = useNavigate();
  const userStatusContext = useContext(UserStatusContext);

  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rightSelection, setRightSelection] = useState<string>(
    stories.length > 0 ? stories[0].structure : ""
  );
  const [selection, setSelection] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("");

  const userId = userStatusContext?.userId;
  const currentModeConfig = modeConfig[mode];
  const currentStory = stories[currentStoryIndex];
  const isSelectionCorrect = rightSelection === selection;

  useEffect(() => {
    if (currentStoryIndex >= stories.length) {
      navigate(currentModeConfig.nextPath); // Use value from config
    } else {
      setRightSelection(currentStory.structure);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStoryIndex, stories, navigate, mode]);

  const handleConfirm = async () => {
    // Create a document in Firestore to record the user's selection and task details

    if (ENABLE_LOGGING) {
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

  const onSlection = (key: string) => {
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
        className="fixed w-full bottom-1/2 right-0 p-6 py-4"
        currentStoryIndex={currentStoryIndex}
        setCurrentStoryIndex={setCurrentStoryIndex}
        maxStories={stories.length}
      ></NavigationButtonsTask>

      <div id="storyText" className="text-2xl font-bold pl-2">
        {`${currentStory.section}: ${currentStoryIndex + 1}/${stories.length}`}
        <span className="font-normal text-sm text-white">
          {currentStory.name}
        </span>
      </div>
      <div className="flex flex-row overflow-hidden h-full">
        {/* Left Panel */}
        <div className="w-1/2 p-8 border overflow-auto">
          <ChaptersToMarkdown data={currentStory} mode={mode} />
        </div>

        {/* Right Panel */}
        <SketchSelectionPanel
          options={taskConfig[mode].options}
          rightSelection={rightSelection}
          mode={mode}
          onSlection={onSlection}
        />

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
