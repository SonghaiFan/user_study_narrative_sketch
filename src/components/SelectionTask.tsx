// ImageSelection.tsx
import React, { useState } from "react";
import story from "../stories/story_World News_SimpleLinear_seed42.json";
import ChaptersToMarkdown from "../utils/ChaptersToMarkdown";
const options = [
  "Arch",
  "Ladder",
  "Linear",
  "LongFork",
  "SharpBranch",
  "SharpMerge",
  "ShortFork",
  "WideBranch",
  "WideMerge",
];
export const ImageSelection: React.FC = () => {
  const [currentParagraph, setCurrentParagraph] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const askConfirmation = (imageNumber: number) => {
    // Add any additional functionality if necessary
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const changeParagraph = () => {
    hideModal();
    setCurrentParagraph((prev) => prev + 1);
  };

  return (
    <div className="flex flex-row flex-1 overflow-hidden">
      {/* Left Panel */}
      <div className="w-1/2 p-8 border overflow-auto">
        <p
          id="storyText"
          className="text-xl"
        >{`Paragraph text for ${currentParagraph}`}</p>

        <ChaptersToMarkdown data={story} />
      </div>

      {/* Right Panel */}
      <div className="w-1/2 p-8 border grid grid-cols-3 gap-4">
        {options.map((option) => (
          <div key={option} className="aspect-w-1 aspect-h-1">
            <img
              src="https://placehold.co/200x200"
              className="aspect-content cursor-pointer"
              onClick={() => askConfirmation(1)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          id="confirmationModal"
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40"
        >
          <div className="bg-white p-8 rounded-md">
            <p>Are you sure you want to select this image?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={changeParagraph}
              >
                Confirm
              </button>
              <button
                className="mx-2 px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={hideModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSelection;
