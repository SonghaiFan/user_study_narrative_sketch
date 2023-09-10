// ImageSelection.tsx
import React, { useState } from "react";
import story from "../stories/story_World News_SimpleLinear_seed42.json";
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

const options = {
  Linear: LinearSketch,
  Arch: ArchSketch,
  Ladder: LadderSketch,
  LongFork: LongForkSketch,
  SharpBranch: SharpBranchSketch,
  SharpMerge: SharpMergeSketch,
  ShortFork: ShortForkSketch,
  WideBranch: WideBranchSketch,
  WideMerge: WideMergeSketch,
};

export const SelectionTask: React.FC = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const askConfirmation = (key: string) => {
    console.log(key);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const changeStory = () => {
    hideModal();
    setCurrentStory((prev) => prev + 1);
  };

  return (
    <>
      <p id="storyText" className="text-2xl font-bold">
        {story[currentStory].section}
        <span className="font-normal text-sm text-white">
          {" "}
          {story[currentStory].name}
        </span>
      </p>
      <div className="flex flex-row  overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 p-8 border overflow-auto">
          <ChaptersToMarkdown data={story[currentStory]} />
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-8 border grid xl:grid-cols-3 grid-cols-2 gap-8">
          {Object.entries(options).map(([key, value]) => (
            <div
              key={key}
              className="relative aspect-w-1 aspect-h-1 transform hover:scale-105 border hover:border-blue-500 hover:border-4 transition-transform duration-500 ease-in-out"
            >
              <img
                src={value}
                alt={key} // added an alt tag for accessibility
                className="absolute inset-0 w-full h-full object-contain cursor-pointer"
                onClick={() => askConfirmation(key)}
              />
              {/* value as caption */}
              <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-1">
                {key}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <ConfirmationModal
          isVisible={showModal}
          onConfirm={changeStory}
          onCancel={hideModal}
        />
      </div>
    </>
  );
};

export default SelectionTask;
