import React from "react";

interface FeedbackFormProps {
  showFeedback: boolean;
  inputText: string;
  setInputText: (text: string) => void;
  inputRate: number | null;
  setInputRate: (rate: number) => void;
  confidenceLevels: { level: number; label: string }[];
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  showFeedback,
  inputText,
  setInputText,
  inputRate,
  setInputRate,
  confidenceLevels,
}) => {
  if (!showFeedback) {
    return null;
  }

  return (
    <>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Explain your reasoning..."
        className="mt-2 w-full p-4 border rounded-md overflow-auto resize-none max-h-[200px]"
      />

      <div className="mt-2">
        <span className="text-sm text-gray-600 block mb-2">
          Confidence level:
        </span>
        <div className="flex flex-wrap">
          {confidenceLevels.map(({ level, label }) => (
            <label key={level} className="flex items-center mr-4 mb-2">
              <input
                type="radio"
                name="confidenceLevel"
                value={level}
                checked={inputRate === level}
                onChange={() => setInputRate(level)}
                className="mr-1"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
