import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavigationButtonsTask from "./navigation/NavigationButtonsTask";
import ChaptersToMarkdown from "../utils/ChaptersToMarkdown";
import { ConfirmationModal } from "./ConfirmationModal";

// import sketches images
import Retain from "/public/motifs/Retain.png";
import Shift from "/public/motifs/Shift.png";

import { Stories } from "../types";

interface SelectionTrainProps {
  stories: Stories;
}

const train_options = {
  Retain: Retain,
  Shift: Shift,
};

const SelectionTrain: React.FC<SelectionTrainProps> = ({ stories }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rightSelection, setRightSelection] = useState<string>(() => {
    return stories && stories.length > 0 ? stories[0].structure : "";
  });
  const [selection, setSelection] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (currentStoryIndex >= stories.length) {
      navigate("/task");
    } else {
      setRightSelection(stories[currentStoryIndex].structure);
    }
  }, [currentStoryIndex, stories, navigate]);

  const askConfirmation = (key: string) => {
    setSelection(key);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setReason("");
    setCurrentStoryIndex((prev) => prev + 1);
    setShowModal(false);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  if (currentStoryIndex >= stories.length || !stories[currentStoryIndex]) {
    return null;
  }

  const currentStory = stories[currentStoryIndex];
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
      <div className="flex flex-row overflow-hidden h-full  ">
        {/* Left Panel */}
        <div className="w-1/2 p-8 border overflow-auto">
          <ChaptersToMarkdown data={currentStory} mode="train" />
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10 xl:p-[150px] border grid xl:grid-cols-2 sm:grid-cols-1 gap-8">
          {Object.entries(train_options).map(([key, value]) => (
            <div
              key={key}
              className={`relative aspect-w-1 aspect-h-1 border ${
                rightSelection === key ? "" : ""
              } transform hover:scale-105 hover:border-blue-500 transition-transform duration-500 ease-in-out`}
            >
              <img
                src={value}
                alt={key}
                className="absolute inset-0 w-full h-full object-contain cursor-pointer"
                onClick={() => askConfirmation(key)}
              />
              <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-50 text-white text-xs text-center py-1">
                {key}
              </div>
            </div>
          ))}
        </div>

        <ConfirmationModal
          isVisible={showModal}
          onConfirm={handleConfirm}
          onCancel={hideModal}
          mode="train"
          trueAnswer={rightSelection}
          selectedAnswer={selection}
          reason={reason}
          setReason={setReason}
        />
      </div>
    </>
  );
};

export default SelectionTrain;
