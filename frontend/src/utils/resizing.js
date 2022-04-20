import { useCallback, useEffect, useState } from "react";

// Adapted from https://stackoverflow.com/a/68742668/7483061
// CC-BY-SA 4.0

const useResize = (defaultWidth, minWidth) => {
  const [isBeingResized, setIsBeingResized] = useState(false);
  const [width, setWidth] = useState(defaultWidth);

  const enableResize = useCallback(() => {
    setIsBeingResized(true);
  }, [setIsBeingResized]);

  const disableResize = useCallback(() => {
    setIsBeingResized(false);
  }, [setIsBeingResized]);

  const resize = useCallback(
    (mouseEvent) => {
      if (isBeingResized) {
        const newWidth = mouseEvent.clientX;
        if (newWidth >= minWidth) {
          setWidth(newWidth);
        }
      }
    },
    [minWidth, isBeingResized, setWidth]
  );

  useEffect(() => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", disableResize);

    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", disableResize);
    };
  }, [disableResize, resize]);

  return [width, enableResize];
};

export default useResize;
