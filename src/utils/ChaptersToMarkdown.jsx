import React from "react";

function ChaptersToMarkdown({ data }) {
  const highlightEntities = (content, entities) => {
    let highlightedContent = content;

    entities.forEach((entity) => {
      const regex = new RegExp(`(${entity})`, "g");
      highlightedContent = highlightedContent.replace(
        regex,
        "<strong>$1</strong>"
      );
    });

    return { __html: highlightedContent };
  };

  return (
    <div className="p-5 bg-gray-100 rounded">
      {data.chapters.map((chapter) => (
        <div
          key={chapter.id}
          className="mb-5 bg-white border rounded p-4 shadow-sm"
        >
          {/* Chapter Title */}
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {chapter.title}
          </h3>

          {/* Time Period */}
          <p className="text-sm text-gray-500">
            {chapter.time_period.join(" - ")}
          </p>

          {/* Themes */}
          <div className="mt-2">
            {chapter.themes.map((theme, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 text-gray-700 px-2 py-1 mr-2 mb-2 rounded-full text-xs font-medium"
              >
                {theme}
              </span>
            ))}
          </div>

          {/* Content */}
          <p
            className="text-md text-gray-800 "
            dangerouslySetInnerHTML={highlightEntities(
              chapter.content,
              chapter.entity
            )}
          />

          {/* Add a separator for clarity */}
          <hr className="my-2" />
        </div>
      ))}
    </div>
  );
}

export default ChaptersToMarkdown;
