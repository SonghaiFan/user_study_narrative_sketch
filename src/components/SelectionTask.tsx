import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationButtonsTask from "./Nav/NavigationButtonsTask";
import ChaptersToMarkdown from "../utils/ChaptersToMarkdown";
import { ConfirmationModal } from "./ConfirmationModal";

// import sketches images
import ArchSketch from "../motifs/Arch.png";
import LadderSketch from "../motifs/Ladder.png";
import LinearSketch from "../motifs/Linear.png";
import LongForkSketch from "../motifs/LongFork.png";
import SharpBranchSketch from "../motifs/SharpBranch.png";
import ShortForkSketch from "../motifs/ShortFork.png";
import WideBranchSketch from "../motifs/WideBranch.png";
import WideMergeSketch from "../motifs/WideMerge.png";
import SharpMergeSketch from "../motifs/SharpMerge.png";

import { Stories } from "../types";

interface SelectionTaskProps {
  stories: Stories;
  mode: "train" | "task";
}

const options = {
  Linear: LinearSketch,
  Arch: ArchSketch,
  Ladder: LadderSketch,
  LongFork: LongForkSketch,
  SharpBranch: SharpBranchSketch,
  WideBranch: WideBranchSketch,
  ShortFork: ShortForkSketch,
  SharpMerge: SharpMergeSketch,
  WideMerge: WideMergeSketch,
};

const SelectionTask: React.FC<SelectionTaskProps> = ({ stories, mode }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rightSelection, setRightSelection] = useState<string>(() => {
    return stories && stories.length > 0 ? stories[0].structure : "";
  });
  const [selection, setSelection] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentStoryIndex >= stories.length) {
      navigate(mode === "train" ? "/task" : "/more");
    } else {
      setRightSelection(stories[currentStoryIndex].structure);
    }
    // console.log(currentStory);
  }, [currentStoryIndex, stories, navigate, mode]);

  const askConfirmation = (key: string) => {
    setSelection(key);
    setShowModal(true);
  };

  const changeStory = () => {
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
        className="fixed w-full bottom-5 p-6 py-4"
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
      <div className="flex flex-row overflow-hidden  ">
        {/* Left Panel */}
        <div className="w-1/2 p-8 border overflow-auto">
          <ChaptersToMarkdown data={currentStory} mode={mode} />
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10 xl:p-[150px] border grid xl:grid-cols-3 sm:grid-cols-2  gap-8">
          {Object.entries(options).map(([key, value]) => (
            <div
              key={key}
              className={`relative aspect-w-1 aspect-h-1 border ${
                rightSelection === key && mode === "train"
                  ? "border-red-500"
                  : ""
              } transform hover:scale-105 hover:border-blue-500 hover:border-4 transition-transform duration-500 ease-in-out`}
            >
              <img
                src={value}
                alt={key}
                className="absolute inset-0 w-full h-full object-contain cursor-pointer"
                onClick={() => askConfirmation(key)}
              />
              <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-1">
                {key}
              </div>
            </div>
          ))}
        </div>

        <ConfirmationModal
          isVisible={showModal}
          onConfirm={changeStory}
          onCancel={hideModal}
          mode={mode}
          trueAnswer={rightSelection}
          selectedAnswer={selection}
        />
      </div>
    </>
  );
};

export default SelectionTask;
