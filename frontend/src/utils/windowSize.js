import { useState, useEffect } from "react";

export default function useWindowSize() {
  const getWindowSize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return [width, height];
  };
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
