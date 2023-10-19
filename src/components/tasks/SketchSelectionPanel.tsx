import { ENABLE_DEBUG } from "../../constants/debug";
interface StorySelectionPanelProps {
  mode?: "train" | "task";
  options: { [key: string]: string };
  rightSelection: string;
  onSlection: (key: string) => void;
}
const SketchSelectionPanel: React.FC<StorySelectionPanelProps> = ({
  options,
  rightSelection,
  onSlection,
}) => {
  const numberOfOptions = Object.keys(options).length;
  return (
    <div
      className={`w-full h-full p-10 px-20 border grid ${
        numberOfOptions === 2 ? "sm:grid-cols-2" : "grid-cols-3"
      } gap-8`}
    >
      {Object.entries(options).map(([key, value]) => (
        <div
          key={key}
          className={`relative aspect-w-1 aspect-h-1 border ${
            ENABLE_DEBUG && rightSelection === key ? "border-red-500" : ""
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
