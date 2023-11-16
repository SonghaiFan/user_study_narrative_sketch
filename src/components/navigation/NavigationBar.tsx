import { Link, useLocation } from "react-router-dom";
import Timer from "../common/Timer";
import { MdTimer } from "react-icons/md";
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
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white">
      <h1 className="relative z-10 text-xl font-semibold ">User study</h1>

      <div className="flex items-center justify-between align-items-center left-1/2 z-20 bg-blue-600 rounded-full p-1">
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

  return (
    <div>
      <nav
        className={`flex flex-row justify-between items-center ${className}`}
      >
        <ul
          className={`flex bg-blue-500 rounded-lg p-2 mt-12 lg:mt-0 lg:px-0`}
          id="menu"
        >
          {routes.map((route) => (
            <li key={route.path}>
              {ENABLE_DEBUG ? (
                <Link
                  to={route.path}
                  className={`text-white rounded-lg p-2  hover:bg-blue-600 ${
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

        <button
          type="submit"
          className="p-2 mt-12 lg:mt-0 lg:px-0 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600  "
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
