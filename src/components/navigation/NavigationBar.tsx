import { useState, useEffect } from "react"; // Import useState
import { Link, useLocation } from "react-router-dom";
import Timer from "../Timer";

interface Route {
  path: string;
  name: string;
}

interface NavigationProps {
  routes: Route[];
  className?: string;
  onLogout: () => void;
}

const CenterIndicator: React.FC = () => {
  return (
    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2  ">
      <h1 className="relative z-10 text-xl font-semibold text-white">
        User study
      </h1>

      <div className="relative w-20 h-8 bg-blue-500 rounded-full">
        <div className="absolute left-1/2 transform -top-1 z-20">
          <Timer />
        </div>
      </div>
    </div>
  );
};
const NavigationBar: React.FC<NavigationProps> = ({
  routes,
  className,
  onLogout,
}) => {
  const location = useLocation();
  const [visitedRoutes, setVisitedRoutes] = useState<string[]>([
    location.pathname,
  ]); // State to keep track of visited routes

  // Update the visited routes whenever location changes
  useEffect(() => {
    setVisitedRoutes((prevVisited) => {
      if (!prevVisited.includes(location.pathname)) {
        return [...prevVisited, location.pathname];
      }
      return prevVisited;
    });
  }, [location.pathname]);

  return (
    <div>
      <nav className={`flex justify-between items-center ${className}`}>
        <ul className="flex space-x-4">
          {routes.map((route) => (
            <li key={route.path}>
              {visitedRoutes.includes(route.path) ? (
                <Link
                  to={route.path}
                  className={`text-white hover:text-gray-300 ${
                    location.pathname === route.path ? "underline" : ""
                  }`}
                >
                  {route.name}
                </Link>
              ) : (
                <span className="text-blue-800 cursor-not-allowed">
                  {route.name}
                </span>
              )}
            </li>
          ))}
        </ul>

        <button
          type="submit"
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={onLogout}
        >
          Logout
        </button>
        <CenterIndicator />
      </nav>
    </div>
  );
};

export default NavigationBar;
