import { useState, useEffect } from "react";

const WindowSizeIndicator = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-4">
      {width < 1024 && (
        <div className="text-center bg-yellow-300 p-2 rounded">
          <p>
            ⚠️ Your window width is {width}px. Please resize your window or
            change bigger screen.
          </p>
        </div>
      )}
    </div>
  );
};

export default WindowSizeIndicator;
