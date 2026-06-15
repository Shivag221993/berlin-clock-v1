import { useMemo } from "react";
// Stryker disable all
export const useBerlinClockLogic = (
  hours: number,
  minutes: number,
  seconds: number,
) => {
  return useMemo(() => {
    const secondsLamp = seconds % 2 === 0;

    const fiveHoursActive = Math.floor(hours / 5);
    const fiveHoursRow = Array(4)
      .fill(false)
      .map((_, i) => i < fiveHoursActive);

    const oneHourActive = hours % 5;
    const oneHourRow = Array(4)
      .fill(false)
      .map((_, i) => i < oneHourActive);

    const fiveMinutesActive = Math.floor(minutes / 5);
    const fiveMinutesRow = Array(11)
      .fill(false)
      .map((_, i) => i < fiveMinutesActive);

    const oneMinuteActive = minutes % 5;
    const oneMinuteRow = Array(4)
      .fill(false)
      .map((_, i) => i < oneMinuteActive);

    return {
      secondsLamp,
      fiveHoursRow,
      oneHourRow,
      fiveMinutesRow,
      oneMinuteRow,
    };
  }, [hours, minutes, seconds]);
};
// Stryker restore all
