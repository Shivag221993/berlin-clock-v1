import { useMemo } from "react";

interface TimeMatrix {
  hours: number;
  minutes: number;
  seconds: number;
}

export function useTimeParser(
  systemDate: Date,
  customTime?: string,
): TimeMatrix {
  return useMemo(() => {
    if (!customTime || customTime.trim() === "") {
      return {
        hours: systemDate.getHours(),
        minutes: systemDate.getMinutes(),
        seconds: systemDate.getSeconds(),
      };
    }

    const normalizedTime = customTime.trim();
    const parts = normalizedTime.split(":");

    if (parts.length < 2 || parts.length > 3) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const isNumeric = parts.every((part) => /^\d+$/.test(part));
    if (!isNumeric) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parts.length === 3 ? parseInt(parts[2], 10) : 0;

    if (hours > 23 || minutes > 59 || seconds > 59) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    return { hours, minutes, seconds };
  }, [systemDate, customTime]);
}
