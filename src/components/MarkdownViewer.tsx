import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";
import remarkGfm from "remark-gfm";

interface MarkdownViewerProps {
  filePath: string;
  className?: string;
  userId?: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  filePath,
  className,
  userId,
}) => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, [filePath]);

  return (
    <div className={`markdown-body ${className}`}>
      user ID: {userId}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
