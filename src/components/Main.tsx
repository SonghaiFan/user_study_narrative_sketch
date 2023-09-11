import React from "react";
// import shuffle from "lodash/shuffle";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// Components
import NavigationBar from "./Nav/NavigationBar";
import NavigationButtons from "./Nav/NavigationButtons";
import SelectionTask from "./SelectionTask";
import SelectionTaskTrain from "./SelectionTaskTrain";
import MarkdownViewer from "../components/MarkdownViewer";

// Data
import story from "../stories/combined_stroy_seed11.json";
import { home_md, about_md, more_md } from "./markdownContent"; // Assuming you separate the markdown content

const renderMarkdown = (markdown: string, userId?: string) => (
  <MarkdownViewer
    markdown={markdown}
    className="w-1/2 m-auto mt-5"
    userId={userId}
  />
);

const routes = [
  { path: "/home", name: "Home", render: renderMarkdown.bind(null, home_md) },
  {
    path: "/about",
    name: "About",
    render: renderMarkdown.bind(null, about_md),
  },
  {
    path: "/trail",
    name: "Trail",
    render: () => <SelectionTaskTrain stories={story} mode="train" />,
  },
  {
    path: "/task",
    name: "Task",
    render: () => <SelectionTask stories={story} mode="task" />,
  },
  { path: "/more", name: "More", render: renderMarkdown.bind(null, more_md) },
];

interface MainProps {
  userId: string;
  onLogout: () => void;
}

const getNavigationPaths = (currentPath: string) => {
  const currentIndex = routes.findIndex((route) => route.path === currentPath);
  return {
    previousPath: currentIndex > 0 ? routes[currentIndex - 1].path : null,
    nextPath:
      currentIndex < routes.length - 1 ? routes[currentIndex + 1].path : null,
  };
};

const Main: React.FC<MainProps> = ({ userId, onLogout }) => {
  const location = useLocation();
  const { previousPath, nextPath } = getNavigationPaths(location.pathname);

  return (
    <div className="flex flex-col h-screen">
      <NavigationBar
        className="sticky z-50 bg-blue-500 p-6 py-4 shadow-sm"
        routes={routes}
        onLogout={onLogout}
      />
      <NavigationButtons
        className="fixed z-50 w-full bottom-1/2 p-6 py-4 hidden"
        previousPath={previousPath}
        nextPath={nextPath}
        navigate={useNavigate()}
      />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.render(userId)}
          />
        ))}
      </Routes>
    </div>
  );
};

export default Main;
