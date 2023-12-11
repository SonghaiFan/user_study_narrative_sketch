import React from "react";

interface FeedbackFormProps {
  textAreaLabel?: string;
  textPrompt?: string;
  textAreaPlaceholder?: string;
  inputText: string;
  setInputText: (text: string) => void;
  radioLabel?: string;
  inputRate: number | null;
  setInputRate: (rate: number) => void;
  radioOptions: { value: number; label: string }[];
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  textAreaLabel,
  textPrompt,
  textAreaPlaceholder = "Provide your feedback...",
  inputText,
  setInputText,
  radioLabel,
  inputRate,
  setInputRate,
  radioOptions,
}) => {
  return (
    <>
      {/* Text Prompt */}
      {textPrompt && <h2 className="text-xl mb-4">{textPrompt}</h2>}
      {textAreaLabel && (
        <>
          <p className="text-sm text-gray-600 block mb-2">{textAreaLabel}</p>
        </>
      )}

      <ul className="text-sm text-gray-600 block mb-2 list-inside list-disc">
        <li className="mb-2">
          Is the narrative structure of the TT-graph easy to understand?
        </li>
        <li className="mb-2">
          Is there a clear narrative structure within the text?
        </li>
        <li className="mb-2">Is the task easy to complete?</li>
        <li className="mb-2">
          What strategies do you typically employ to interpret the narrative
          structure?
        </li>
      </ul>

      {/* Text Area */}
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={textAreaPlaceholder}
        className="mt-2 w-full p-4 border rounded-md overflow-auto resize-none max-h-[200px]"
      />

      {radioLabel && (
        <span className="text-sm text-gray-600 block mt-4 mb-2">
          {radioLabel}
        </span>
      )}
      <div className="flex flex-wrap">
        {radioOptions.map(({ value, label }) => (
          <label key={value} className="flex items-center mr-4 mb-2">
            <input
              type="radio"
              name="radioOption"
              value={value}
              checked={inputRate === value}
              onChange={() => setInputRate(value)}
              className="mr-1"
            />
            {label}
          </label>
        ))}
      </div>
    </>
  );
};

export default FeedbackForm;
