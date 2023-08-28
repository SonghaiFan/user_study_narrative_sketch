import MarkdownViewer from "../components/MarkdownViewer";
import Task from "../components/Task";

const routes = [
  {
    path: "/home",
    name: "Home",
    render: () => (
      <MarkdownViewer
        filePath="src/slides/home.md"
        className="w-1/2 m-auto mt-5"
      />
    ),
  },
  {
    path: "/about",
    name: "About",
    render: () => (
      <MarkdownViewer
        filePath="src/slides/about.md"
        className="w-1/2 m-auto mt-5"
      />
    ),
  },
  {
    path: "/task",
    name: "Task",
    render: (userId: string) => <Task userId={userId} />,
  },
];

export default routes;
