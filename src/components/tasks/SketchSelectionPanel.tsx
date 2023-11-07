import { ENABLE_DEBUG } from "../../constants/debug";
interface StorySelectionPanelProps {
  mode?: "trail" | "training" | "task";
  options: { [key: string]: string };
  rightSelection: string;
  onSelection: (key: string) => void;
}
const SketchSelectionPanel: React.FC<StorySelectionPanelProps> = ({
  options,
  rightSelection,
  onSelection,
}) => {
  const numberOfOptions = Object.keys(options).length;
  return (
    <div
      className={`w-full h-full p-2 lg:p-20 grid ${
        numberOfOptions === 2 ? "sm:grid-cols-2" : "grid-cols-3"
      } gap-2 sm:gap-8`}
    >
      {Object.entries(options).map(([key, value]) => (
        <div
          key={key}
          className={`relative aspect-w-1 aspect-h-1 border ${
            ENABLE_DEBUG && rightSelection === key ? "border-red-500" : ""
          } transform hover:scale-105 hover:border-blue-500 transition-transform duration-500 ease-in-out rounded`}
        >
          <img
            src={value}
            alt={key}
            className="absolute inset-0 w-full h-full object-contain cursor-pointer"
            onClick={() => onSelection(key)}
          />
          <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-50 text-white text-xs text-center py-1 rounded-b">
            {key}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SketchSelectionPanel;
