// Importing necessary libraries and components
import React, { useContext } from "react";
import { UserStatusContext } from "./contexts/UserStatusContext";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import _ from "lodash";
import NavigationBar from "./navigation/NavigationBar";
import NavigationButtons from "./navigation/NavigationButtons";
import SelectionTask from "./SelectionTask";
import SelectionTrain from "./SelectionTrain";
import MarkdownViewer from "./MarkdownViewer";
import stories from "../stories/combined_stories.json";
import train_stories from "../stories/combined_stories_train.json";
import { home_md, about_md, more_md } from "./markdownContent";

const stories_sample = stories; // assuming stories_sample is defined in this way

// Function to render markdown content
const renderMarkdown = (markdown: string, userId?: string) => (
  <MarkdownViewer
    markdown={markdown}
    className="w-1/2 m-auto mt-5"
    userId={userId}
  />
);

// Routes configuration
const routes = [
  { path: "/home", name: "Home", render: renderMarkdown.bind(null, home_md) },
  {
    path: "/about",
    name: "About",
    render: renderMarkdown.bind(null, about_md),
  },
  {
    path: "/train",
    name: "Train",
    render: () => <SelectionTrain stories={train_stories} />,
  },
  // {
  //   path: "/trail",
  //   name: "Trail",
  //   render: () => <SelectionTask stories={stories} mode="train" />,
  // },
  {
    path: "/task",
    name: "Task",
    render: () => <SelectionTask stories={stories_sample} mode="task" />,
  },
  { path: "/end", name: "End", render: renderMarkdown.bind(null, more_md) },
];

// Main component
interface MainProps {
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

const Main: React.FC<MainProps> = ({ onLogout }) => {
  const userStatusContext = useContext(UserStatusContext);
  const location = useLocation();

  if (!userStatusContext) {
    throw new Error("Main component must be used within a UserStatusProvider");
  }

  const { previousPath, nextPath } = getNavigationPaths(location.pathname);

  return (
    <div className="flex flex-col h-screen">
      <NavigationBar
        className="sticky z-50 bg-blue-500 p-6 py-4 shadow-sm"
        routes={routes}
        onLogout={onLogout}
      />
      <NavigationButtons
        className="fixed z-50 w-full bottom-1/2 right-0 p-6 py-4"
        previousPath={previousPath}
        currentPath={location.pathname}
        nextPath={nextPath}
        navigate={useNavigate()}
      />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.render()} />
        ))}
      </Routes>
    </div>
  );
};

export default Main;
