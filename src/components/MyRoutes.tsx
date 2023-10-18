// Importing necessary libraries and components
import React, { useContext } from "react";
import { UserStatusContext } from "./contexts/UserStatusContext";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import _ from "lodash";
import NavigationBar from "./navigation/NavigationBar";
import NavigationButtons from "./navigation/NavigationButtons";
import SelectionTask from "./tasks/SelectionTask";
import MarkdownViewer from "./common/MarkdownViewer";
import MarkdownRenderer from "./common/MarkdownRenderer";
import stories from "./data/stories/combined_stories.json";
import train_stories from "./data/stories/combined_stories_train.json";
import { home_md, about_md, end_md } from "./common/MarkdownContent";
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
  {
    path: "/home",
    name: "Home",
    component: (
      <MarkdownRenderer
        path="/markdown/home.md"
        className="w-1/2 m-auto mt-5"
      />
    ),
  },
  {
    path: "/about",
    name: "About",
    component: (
      <MarkdownRenderer
        path="/markdown/about.md"
        className="w-1/2 m-auto mt-5"
      />
    ),
  },
  {
    path: "/train",
    name: "Train",
    // render: () => <SelectionTask stories={train_stories} mode="train" />,
    component: <SelectionTask stories={train_stories} mode="train" />,
  },
  // {
  //   path: "/trail",
  //   name: "Trail",
  //   component: <SelectionTask stories={stories} mode="train" />,
  // },
  {
    path: "/task",
    name: "Task",
    component: <SelectionTask stories={stories_sample} mode="task" />,
  },
  {
    path: "/end",
    name: "End",
    component: (
      <MarkdownRenderer path="/markdown/end.md" className="w-1/2 m-auto mt-5" />
    ),
  },
];

// MyRoutes component
interface MyRoutesProps {
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

const MyRoutes: React.FC<MyRoutesProps> = ({ onLogout }) => {
  const userStatusContext = useContext(UserStatusContext);
  const location = useLocation();

  if (!userStatusContext) {
    throw new Error(
      "MyRoutes component must be used within a UserStatusProvider"
    );
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
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </div>
  );
};

export default MyRoutes;
