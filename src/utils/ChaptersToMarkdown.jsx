import React from "react";

function highlightEntities(content, entities) {
  let modifiedContent = content;

  entities.forEach((entity) => {
    // Make sure to replace all occurrences of the entity in the content.
    const regex = new RegExp(entity, "g");
    modifiedContent = modifiedContent.replace(regex, `\`${entity}\``);
  });

  return modifiedContent;
}

function ChaptersToMarkdown({ data }) {
  return (
    <div>
      {data.chapters.map((chapter, index) => (
        <div key={chapter.id}>
          {/* Chapter Title */}
          <h2>
            {index + 1}. {chapter.title}
          </h2>

          {/* Time Period */}
          <p>
            <strong>Time Period:</strong> {chapter.time_period.join(" - ")}
          </p>

          {/* Themes */}
          <p>
            <strong>Themes:</strong> {chapter.themes.join(", ")}
          </p>

          {/* Entities */}
          <p>
            <strong>Entities:</strong> {chapter.entity.join(", ")}
          </p>

          {/* Content with highlighted entities */}
          <p
            dangerouslySetInnerHTML={{
              __html: highlightEntities(chapter.content, chapter.entity),
            }}
          />

          {/* Add a separator for clarity */}
          {index !== data.chapters.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
}

export default ChaptersToMarkdown;
