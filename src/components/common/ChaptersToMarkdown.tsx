import { Chapter } from "../data/types";

interface ChaptersToMarkdownProps {
  data: {
    chapters: Chapter[];
  };
  showHint?: boolean;
}

function getHighlightedText(text: string, highlights: string[]): JSX.Element {
  const regex = new RegExp(`(${highlights.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          className={
            highlights.some((h) => h.toLowerCase() === part.toLowerCase())
              ? "font-bold"
              : ""
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
}

interface RenderTagsProps {
  tags: string[];
  className: string;
}

const RenderTags: React.FC<RenderTagsProps> = ({ tags, className }) => {
  return (
    <>
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`${className} inline-block px-2 py-1 mr-2 mb-2 text-xs sm:text-sm font-medium `}
        >
          {tag}
        </span>
      ))}
    </>
  );
};

const ChaptersToMarkdown: React.FC<ChaptersToMarkdownProps> = ({
  data,
  showHint = false,
}) => {
  return (
    <div className="p-5 2xl:w-2/3 m-auto bg-gray-100 rounded">
      {data.chapters.map(
        ({ id, title, time_period, entity, themes, content }) => (
          <div key={id} className="mb-5 bg-white border rounded p-4 shadow-sm">
            <h3
              className={`sm:text-lg leading-6 font-medium text-gray-900 ${
                showHint ? "" : "hidden"
              } `}
            >
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              {new Date(time_period[0]).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }) + "~"}
            </p>
            <div className={`mt-2 font-bold ${showHint ? "" : "hidden"} `}>
              <RenderTags
                tags={themes}
                className="bg-gray-700 text-gray-200 rounded"
              />
              <RenderTags
                tags={entity}
                className="bg-gray-200 text-gray-700 rounded-xl"
              />
            </div>
            <p className="text-xs sm:text-base text-gray-800">
              {showHint ? getHighlightedText(content, entity) : content}
            </p>
            <hr className="my-2" />
          </div>
        )
      )}
    </div>
  );
};

export default ChaptersToMarkdown;
