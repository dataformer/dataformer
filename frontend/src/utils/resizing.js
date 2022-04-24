import { useCallback, useEffect, useState } from "react";
import useWindowSize from "./windowSize";

// Adapted from https://stackoverflow.com/a/68742668/7483061
// CC-BY-SA 4.0

// FIXME: This whole "solution" is quite terrible, but I can't
// think of anything better which would be reasonably simple to
// implement and would work equally well. Feel free to refactor
// if you do.

const useResize = ({
  sidebarMinWidth,
  sidebarDefaultWidth,
  pipelineMinWidth,
  pipelineDefaultWidth,
  dataMinWidth,
}) => {
  const [windowWidth, _] = useWindowSize();
  const totalMinWidth = sidebarMinWidth + pipelineMinWidth + dataMinWidth;
  const totalDefaultWidth =
    sidebarDefaultWidth + pipelineDefaultWidth + dataMinWidth;
  const resizingConstrained = totalMinWidth >= windowWidth;
  const defaultSizeConstrained = totalDefaultWidth > windowWidth;

  const sidebarActualDefaultWidth =
    resizingConstrained || defaultSizeConstrained
      ? Math.floor(windowWidth * (sidebarMinWidth / totalMinWidth))
      : sidebarDefaultWidth;

  const pipelineActualDefaultWidth =
    resizingConstrained || defaultSizeConstrained
      ? Math.floor(windowWidth * (pipelineMinWidth / totalMinWidth))
      : pipelineDefaultWidth;

  const [isBeingResizedLeft, setIsBeingResizedLeft] = useState(false);
  const [isBeingResizedRight, setIsBeingResizedRight] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(sidebarActualDefaultWidth);
  const [pipelineWidth, setPipelineWidth] = useState(
    pipelineActualDefaultWidth
  );

  const resetWidths = () => {
    let newSidebarWidth = sidebarActualDefaultWidth;
    let newPipelineWidth = pipelineActualDefaultWidth;
    setSidebarWidth(newSidebarWidth);
    setPipelineWidth(newPipelineWidth);
    setLeftWidth(newSidebarWidth + newPipelineWidth);
  };

  useEffect(() => {
    resetWidths();
  }, [windowWidth]);

  // This is replicating information but serves as a protection against
  // asynchronous updates to state causing inconsistency.
  const [leftWidth, setLeftWidth] = useState(
    sidebarActualDefaultWidth + pipelineActualDefaultWidth
  );

  const enableResizeLeft = useCallback(() => {
    setIsBeingResizedLeft(true);
  }, [isBeingResizedLeft]);
  const enableResizeRight = useCallback(() => {
    setIsBeingResizedRight(true);
  }, [isBeingResizedRight]);
  const disableResizeLeft = useCallback(() => {
    setIsBeingResizedLeft(false);
  }, [isBeingResizedLeft]);
  const disableResizeRight = useCallback(() => {
    setIsBeingResizedRight(false);
  }, [isBeingResizedRight]);

  const resizeLeft = useCallback(
    (mouseEvent) => {
      if (isBeingResizedLeft) {
        const newSidebarWidth = mouseEvent.clientX;
        const newPipelineWidth = leftWidth - newSidebarWidth;
        if (
          resizingConstrained ||
          (newSidebarWidth >= sidebarMinWidth &&
            newPipelineWidth >= pipelineMinWidth)
        ) {
          setSidebarWidth(newSidebarWidth);
          setPipelineWidth(newPipelineWidth);
        } else if (newSidebarWidth >= sidebarMinWidth) {
          // Try to resize the data if possible
          const newLeftWidth = newSidebarWidth + pipelineMinWidth;
          const newDataWidth = windowWidth - newLeftWidth;
          if (newDataWidth >= dataMinWidth) {
            setSidebarWidth(newSidebarWidth);
            setLeftWidth(newLeftWidth);
          }
        }
      }
    },
    [
      resizingConstrained,
      isBeingResizedLeft,
      leftWidth,
      pipelineWidth,
      windowWidth,
      sidebarMinWidth,
      pipelineMinWidth,
      dataMinWidth,
      setSidebarWidth,
      setPipelineWidth,
      setLeftWidth,
    ]
  );

  const resizeRight = useCallback(
    (mouseEvent) => {
      if (isBeingResizedRight) {
        const newPipelineWidth = mouseEvent.clientX - sidebarWidth;
        const newDataWidth = windowWidth - sidebarWidth - newPipelineWidth;
        if (
          resizingConstrained ||
          (newPipelineWidth >= pipelineMinWidth && newDataWidth >= dataMinWidth)
        ) {
          setPipelineWidth(newPipelineWidth);
          setLeftWidth(windowWidth - newDataWidth);
        } else if (newDataWidth >= dataMinWidth) {
          // Try to resize the sidebar if possible
          const newSidebarWidth = windowWidth - pipelineWidth - newDataWidth;
          const newLeftWidth = windowWidth - newDataWidth;
          if (newSidebarWidth >= sidebarMinWidth) {
            setSidebarWidth(newSidebarWidth);
            setLeftWidth(newLeftWidth);
          }
        }
      }
    },
    [
      resizingConstrained,
      isBeingResizedRight,
      pipelineWidth,
      sidebarWidth,
      sidebarMinWidth,
      pipelineMinWidth,
      dataMinWidth,
      setSidebarWidth,
      setPipelineWidth,
      setLeftWidth,
    ]
  );

  useEffect(() => {
    document.addEventListener("mousemove", resizeLeft);
    document.addEventListener("mousemove", resizeRight);
    document.addEventListener("mouseup", disableResizeLeft);
    document.addEventListener("mouseup", disableResizeRight);

    return () => {
      document.removeEventListener("mousemove", resizeLeft);
      document.removeEventListener("mousemove", resizeRight);
      document.removeEventListener("mouseup", disableResizeLeft);
      document.removeEventListener("mouseup", disableResizeRight);
    };
  }, [resizeLeft, resizeRight, disableResizeLeft, disableResizeRight]);

  return { sidebarWidth, pipelineWidth, enableResizeLeft, enableResizeRight };
};

export default useResize;
