// Importing necessary libraries and components
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "./navigation/NavigationBar";
import NavigationButtonsWrapper from "./navigation/NavigationButtonsWrapper";
import { ENABLE_DEBUG } from "../constants/debug";
import { routes } from "./MyRoutesConfig";
import { logRoutePathNavigation } from "../utils/firebaseUtils";
import { useUserStatus } from "../hooks/useUserStatus";

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
  const { status } = useUserStatus();
  const userId = status.userId;
  const navigate = useNavigate();

  const location = useLocation();

  const currentPath = location.pathname;

  const { previousPath, nextPath } = getNavigationPaths(currentPath);

  const handlePrevious = () => {
    if (previousPath) navigate(previousPath);
  };

  const handleNext = () => {
    if (nextPath) navigate(nextPath);
  };

  const isNavigationHidden =
    !ENABLE_DEBUG &&
    (currentPath == "/task" ||
      currentPath == "/training" ||
      currentPath == "/end");

  // each time the route path changes, log the path
  useEffect(() => {
    !ENABLE_DEBUG && logRoutePathNavigation(userId, currentPath);
    ENABLE_DEBUG && console.log("Log route path navigation to ", currentPath);
  }, [currentPath, userId]);

  return (
    <div className="flex flex-col h-screen">
      <NavigationBar
        className="sticky z-50 bg-blue-500 sm:p-6 py-4"
        routes={routes}
        onLogout={onLogout}
      />
      <NavigationButtonsWrapper
        className={`${
          isNavigationHidden ? "hidden" : ""
        } fixed w-full bottom-1/2 right-0 p-6 py-4`}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        hidePrevious={!previousPath}
        hideNext={!nextPath}
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
