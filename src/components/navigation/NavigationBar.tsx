import { useState, useEffect } from "react"; // Import useState
import { Link, useLocation } from "react-router-dom";
import Timer from "../common/Timer";
import { MdTimer } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { ENABLE_DEBUG } from "../../constants/debug";

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
    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 text-white">
      <h1 className="relative z-10 text-xl font-semibold ">User study</h1>

      <div className="flex items-center justify-between align-items-center left-1/2 z-20 bg-blue-600  rounded-full p-1">
        <MdTimer size={20} />
        <Timer />
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // each time the window size changed, setIsMenuOpen to false
  useEffect(() => {
    const handleResize = () => setIsMenuOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <nav
        className={`flex flex-row justify-between items-center p-4 ${className}`}
      >
        <div className="flex justify-center">
          <button
            type="button"
            className=" block sm:hidden text-white"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>
          <ul
            className={`${
              isMenuOpen ? "absolute top-10" : "hidden"
            }  mt-2 sm:flex flex-row space-y-2 sm:space-y-0 sm:space-x-4 bg-blue-500 rounded-lg p-5 sm:p-2 `}
            id="menu"
          >
            {routes.map((route) => (
              <li key={route.path}>
                {ENABLE_DEBUG ? (
                  <Link
                    to={route.path}
                    className={`text-white p-2 rounded-lg hover:bg-blue-600 ${
                      location.pathname === route.path ? "underline" : ""
                    }`}
                  >
                    {route.name}
                  </Link>
                ) : (
                  <span
                    className={`text-white rounded-lg p-2 ${
                      location.pathname === route.path ? "bg-blue-600" : ""
                    }`}
                  >
                    {route.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="ml-auto font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 p-2"
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
