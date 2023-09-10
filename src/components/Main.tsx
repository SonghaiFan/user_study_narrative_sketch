import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "./Nav/NavigationBar";
import NavigationButtons from "./Nav/NavigationButtons";
import MarkdownViewer from "../components/MarkdownViewer";

const routes = [
  {
    path: "/home",
    name: "Home",
    render: (userId) => (
      <MarkdownViewer
        filePath="src/slides/home.md"
        className="w-1/2 m-auto mt-5"
        userId={userId}
      />
    ),
  },
  {
    path: "/about",
    name: "About",
    render: (userId) => (
      <MarkdownViewer
        filePath="src/slides/about.md"
        className="w-1/2 m-auto mt-5"
        userId={userId}
      />
    ),
  },
  {
    path: "/more",
    name: "More",
    render: (userId) => (
      <MarkdownViewer
        filePath="src/slides/more.md"
        className="w-1/2 m-auto mt-5"
        userId={userId}
      />
    ),
  },
  {
    path: "/task",
    name: "Task",
    render: (userId) => (
      <MarkdownViewer
        filePath="src/slides/task.md"
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
    <>
      <NavigationBar
        className="sticky z-50 bg-blue-500 p-6 py-4"
        routes={routes}
        onLogout={onLogout}
      />
      <NavigationButtons
        className="fixed z-50 w-full bottom-1/2 p-6 py-4"
        previousPath={previousPath}
        nextPath={nextPath}
        navigate={navigate}
      />
      <Routes>
        <Route
          path="/home"
          element={
            <MarkdownViewer
              filePath="src/slides/home.md"
              className="w-1/2 m-auto mt-5"
              userId={userId}
            />
          }
        />
        <Route
          path="/about"
          element={
            <MarkdownViewer
              filePath="src/slides/about.md"
              className="w-1/2 m-auto mt-5"
              userId={userId}
            />
          }
        />
        <Route
          path="/more"
          element={
            <MarkdownViewer
              filePath="src/slides/more.md"
              className="w-1/2 m-auto mt-5"
              userId={userId}
            />
          }
        />
        <Route
          path="/task"
          element={
            <MarkdownViewer
              filePath="src/slides/task.md"
              className="w-1/2 m-auto mt-5"
              userId={userId}
            />
          }
        />
      </Routes>
    </>
  );
};

export default Main;
