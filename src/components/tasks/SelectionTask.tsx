import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { modeConfig } from "../../utils/modeConfig";
import { getTaskConfig } from "./SelectionTaskConfig";
import SketchSelectionPanel from "./SketchSelectionPanel";
import NavigationButtonsTask from "../navigation/NavigationButtonsTask";
import { ConfirmationModal } from "../common/ConfirmationModal";
import { logSelectionData, logTimeData } from "../../utils/logger";
import ChaptersToMarkdown from "../common/ChaptersToMarkdown";
import { Stories } from "../data/types";
import { useUserStatus } from "../../hooks/useUserStatus";
import { ENABLE_DEBUG } from "../../constants/debug";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SelectionTaskProps {
  stories: Stories;
  mode: "trail" | "training" | "task";
}

const SelectionTask: React.FC<SelectionTaskProps> = ({ stories, mode }) => {
  const navigate = useNavigate();
  const { status } = useUserStatus();

  const [showHint, setShowHint] = useState<boolean>(false);

  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rightSelection, setRightSelection] = useState<string>(
    stories.length > 0 ? stories[0].structure : ""
  );
  const [selection, setSelection] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("");

  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] =
    useState<boolean>(false);

  const userId = status.userId;
  const currentModeConfig = modeConfig[mode];
  const currentStory = stories[currentStoryIndex];
  const currentStoryName = currentStory?.name;
  const isSelectionCorrect = rightSelection === selection;

  useEffect(() => {
    const recordTimeData = async () => {
      // Call your logTimeData function here
      await logTimeData(userId, mode, currentStoryName, currentStoryIndex);
    };

    if (currentStoryIndex >= stories.length) {
      navigate(currentModeConfig.nextPath); // Use value from config
    } else {
      setRightSelection(currentStory.structure);
      recordTimeData();
    }

    setShowHint(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStoryIndex]);

  const handleConfirm = async () => {
    setIsConfirmButtonDisabled(true); // Disable the button to prevent multiple clicks

    // Create a document in Firestore to record the user's selection and task details
    if (!ENABLE_DEBUG) {
      await logSelectionData(
        userId,
        mode,
        currentStoryIndex,
        currentStoryName,
        rightSelection,
        selection,
        reason
      );
    }

    // Fake delay to simulate server response
    if (ENABLE_DEBUG) {
      await new Promise((r) => setTimeout(r, 1000));
    }

    setReason("");
    setCurrentStoryIndex((prev) => prev + 1);
    setShowModal(false);
    setIsConfirmButtonDisabled(false); // Re-enable the button after operation is complete
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

      {(mode !== "task" || ENABLE_DEBUG) && (
        <div className="fixed top-32 sm:top-24 p-6 py-4">
          <button
            className="p-2 text-white rounded-md bg-blue-500 flex items-center justify-center"
            onClick={() => {
              setShowHint(!showHint);
            }}
          >
            {showHint ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      )}

      <div id="storyText" className="text-xl font-bold pl-2 text-center ">
        {`${currentStory.section}: ${currentStoryIndex + 1}/${stories.length}`}
      </div>
      <div className="flex flex-col xl:flex-row overflow-hidden h-full px-0 sm:px-20 border">
        {/* Chapters Panel */}
        <div className="w-full xl:w-1/2 h-1/2 xl:h-auto p-8  overflow-auto border ">
          <ChaptersToMarkdown data={currentStory} showHint={showHint} />
        </div>

        {/* Sketch Selection Panel */}
        <div
          id="sketch-selection-panel"
          className="w-full xl:w-1/2 h-1/2 xl:h-auto border"
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
          disableConfirmButton={
            isConfirmButtonDisabled || taskConfig[mode].disableConfirmButton
          }
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
