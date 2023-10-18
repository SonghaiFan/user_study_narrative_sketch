import ReactMarkdown from "react-markdown";
import "github-markdown-css";
import remarkGfm from "remark-gfm";

interface MarkdownViewerProps {
  markdown: string;
  className?: string;
  userId?: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  markdown,
  className,
  // userId,
}) => {
  return (
    <div className={`markdown-body ${className}`}>
      {/* user ID: {userId} */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
