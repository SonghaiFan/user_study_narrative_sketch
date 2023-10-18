interface StorySelectionPanelProps {
  options: { [key: string]: string };
  rightSelection: string;
  mode: "train" | "task";
  onSlection: (key: string) => void;
}

const SketchSelectionPanel: React.FC<StorySelectionPanelProps> = ({
  options,
  rightSelection,
  mode,
  onSlection,
}) => {
  return (
    <div className="w-1/2 p-10 xl:p-[150px] border grid xl:grid-cols-3 sm:grid-cols-2  gap-8">
      {Object.entries(options).map(([key, value]) => (
        <div
          key={key}
          className={`relative aspect-w-1 aspect-h-1 border ${
            rightSelection === key && mode === "train" ? "border-red-500" : ""
          } transform hover:scale-105 hover:border-blue-500 transition-transform duration-500 ease-in-out`}
        >
          <img
            src={value}
            alt={key}
            className="absolute inset-0 w-full h-full object-contain cursor-pointer"
            onClick={() => onSlection(key)}
          />
          <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-50 text-white text-xs text-center py-1">
            {key}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SketchSelectionPanel;
