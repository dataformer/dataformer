import { useCallback, useEffect, useState } from "react";

// Adapted from https://stackoverflow.com/a/68742668/7483061
// CC-BY-SA 4.0

const useResize = (widthSettings) => {
  const isBeingResizedStates = widthSettings.map((_) => useState(false));
  const widthStates = widthSettings.map((widthSetting) =>
    useState(widthSetting[0])
  );
  const cumulativeSum = (
    (sum) => (value) =>
      (sum += value)
  )(0);
  const offsets = [0].concat(
    widthStates.map((widthState) => widthState[0]).map(cumulativeSum)
  );

  const enableResizeCallbacks = widthSettings.map((_, i) =>
    useCallback(() => {
      isBeingResizedStates[i][1](true);
    }, [isBeingResizedStates[i][1]])
  );

  const disableResizeCallbacks = widthSettings.map((_, i) =>
    useCallback(() => {
      isBeingResizedStates[i][1](false);
    }, [isBeingResizedStates[i][1]])
  );

  const resizeCallbacks = widthSettings.map((_, i) =>
    useCallback(
      (mouseEvent) => {
        if (isBeingResizedStates[i][0]) {
          const newWidth = mouseEvent.clientX - offsets[i];
          if (newWidth >= widthSettings[i][1]) {
            widthStates[i][1](newWidth);
          }
        }
      },
      [
        widthSettings[i][1],
        isBeingResizedStates[i][0],
        widthStates[i][1],
        offsets[i],
      ]
    )
  );

  widthSettings.map((_, i) =>
    useEffect(() => {
      console.log(`Adding listeners for ${i}`);
      document.addEventListener("mousemove", resizeCallbacks[i]);
      document.addEventListener("mouseup", disableResizeCallbacks[i]);

      return () => {
        console.log(`Removing listeners for ${i}`);
        document.removeEventListener("mousemove", resizeCallbacks[i]);
        document.removeEventListener("mouseup", disableResizeCallbacks[i]);
      };
    }, [disableResizeCallbacks[i], resizeCallbacks[i]])
  );

  return [
    widthStates.map((widthState) => widthState[0]),
    enableResizeCallbacks,
  ];
};

export default useResize;
