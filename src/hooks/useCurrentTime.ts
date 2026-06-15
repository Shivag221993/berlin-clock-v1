import { useState, useEffect } from "react";

export const useCurrentTime = (): Date => {
  const [time, setTime] = useState(() => new Date());

  // Stryker disable all
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  // Stryker restore all

  return time;
};