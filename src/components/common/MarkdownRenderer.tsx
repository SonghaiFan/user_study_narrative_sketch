import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  path: string; // Path to the .md file
  className?: string;
  // userId?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  path,
  className,
  // userId,
}) => {
  const [markdown, setMarkdown] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((text) => setMarkdown(text))
      .catch((fetchError) => {
        console.error("Fetch error:", fetchError);
        setError(fetchError);
      });
  }, [path]); // Re-run the effect when 'path' changes

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={`markdown-body ${className}`}>
      {/* user ID: {userId} */}
      <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown} />
    </div>
  );
};

export default MarkdownRenderer;
