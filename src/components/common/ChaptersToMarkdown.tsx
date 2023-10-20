import { Chapter } from "../data/types";

interface ChaptersToMarkdownProps {
  data: {
    chapters: Chapter[];
  };
  mode: string;
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
  bgColor: string;
  textColor: string;
}

const RenderTags: React.FC<RenderTagsProps> = ({
  tags,
  bgColor,
  textColor,
}) => {
  return (
    <>
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`inline-block ${bgColor} ${textColor} px-2 py-1 mr-2 mb-2 rounded-xl text-xs font-medium`}
        >
          {tag}
        </span>
      ))}
    </>
  );
};

const ChaptersToMarkdown: React.FC<ChaptersToMarkdownProps> = ({
  data,
  mode,
}) => {
  return (
    <div className="p-5 xl:w-2/3 m-auto bg-gray-100 rounded">
      {data.chapters.map(
        ({ id, title, time_period, entity, themes, content }) => (
          <div key={id} className="mb-5 bg-white border rounded p-4 shadow-sm">
            <h3
              className={`sm:text-lg leading-6 font-medium text-gray-900 ${
                mode == "task" ? "hidden" : ""
              } `}
            >
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              {time_period
                .map((date) =>
                  new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                )
                .join(" to ")}
            </p>
            <div
              className={`mt-2 font-bold ${mode == "task" ? "hidden" : ""} `}
            >
              <RenderTags
                tags={entity}
                bgColor="bg-gray-200"
                textColor="text-gray-700"
              />
              <RenderTags
                tags={themes}
                bgColor="bg-gray-300"
                textColor="text-gray-700"
              />
            </div>
            <p className="text-xs sm:text-base text-gray-800">
              {mode == "task" ? content : getHighlightedText(content, entity)}
            </p>
            <hr className="my-2" />
          </div>
        )
      )}
    </div>
  );
};

export default ChaptersToMarkdown;
