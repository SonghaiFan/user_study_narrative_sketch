import React from "react";
import shuffle from "lodash/shuffle";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "./Nav/NavigationBar";
import NavigationButtons from "./Nav/NavigationButtons";
import SelectionTask from "./SelectionTask";
import SelectionTaskTrain from "./SelectionTaskTrain";
import MarkdownViewer from "../components/MarkdownViewer";
import story1 from "../stories/story_Culture_and_Entertainment_seed11.json";
import story2 from "../stories/story_Politics_seed11.json";

const routes = [
  {
    path: "/home",
    name: "Home",
    render: (userId: string | undefined) => (
      <MarkdownViewer
        filePath="slides/home.md"
        className="w-1/2 m-auto mt-5"
        userId={userId}
      />
    ),
  },
  {
    path: "/about",
    name: "About",
    render: (userId: string | undefined) => (
      <MarkdownViewer
        filePath="slides/about.md"
        className="w-1/2 m-auto mt-5"
        userId={userId}
      />
    ),
  },
  {
    path: "/trail",
    name: "Trail",
    render: () => <SelectionTaskTrain stories={shuffle(story1)} mode="train" />,
  },
  {
    path: "/task",
    name: "Task",
    render: () => <SelectionTask stories={shuffle(story2)} mode="task" />,
  },
  {
    path: "/more",
    name: "More",
    render: (userId: string | undefined) => (
      <MarkdownViewer
        filePath="slides/more.md"
        className="w-1/2 m-auto mt-5"
        userId={userId}
      />
    ),
  },
];

interface MainProps {
  userId: string;
  onLogout: () => void;
}

const Main: React.FC<MainProps> = ({ userId, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = routes.findIndex(
    (route) => route.path === location.pathname
  );
  const previousPath = currentIndex > 0 ? routes[currentIndex - 1].path : null;
  const nextPath =
    currentIndex < routes.length - 1 ? routes[currentIndex + 1].path : null;

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
        navigate={navigate}
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
