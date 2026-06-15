import { useState } from "react";
import { useCurrentTime } from "./useCurrentTime";
import { useTimeParser } from "./useTimeParser";

export const useBerlinClock = () => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customTime, setCustomTime] = useState("12:00:00");

  const currentTime = useCurrentTime();
  const activeCustomString = isCustomMode ? customTime : null;

  const { hours, minutes, seconds } = useTimeParser(
    currentTime,
    activeCustomString,
  );

  const pad = (num: number) => String(num).padStart(2, "0");
  const digitalDisplay = isCustomMode
    ? customTime
    : `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return {
    digitalTime: digitalDisplay,
    isCustomMode,
    customTime,
    setIsCustomMode,
    setCustomTime,
  };
};
