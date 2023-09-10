import React, { useState } from "react";
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
    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
      <h1 className="relative z-10 text-xl font-semibold text-white">
        User study
      </h1>

      <div className="relative w-20 h-8 bg-blue-500 rounded-full">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
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
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <nav
        className={`flex justify-between items-center ${className}`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-80%)",
          transition: "all 0.2s ease-in-out",
        }}
      >
        <ul className="flex space-x-4">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                className={`text-white hover:text-gray-300 ${
                  location.pathname === route.path ? "underline" : ""
                }`}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className=" bg-blue-800 text-white px-2 py-1 rounded"
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
