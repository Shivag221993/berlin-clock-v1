import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBerlinClockLogic } from "../hooks/useBerlinClockLogic";

describe("useBerlinClockLogic - Comprehensive Algorithm & Matrix Testing", () => {
  it("should handle midnight (00:00:00) correctly", () => {
    const { result } = renderHook(() => useBerlinClockLogic(0, 0, 0));
    expect(result.current.secondsLamp).toBe(true);
    expect(result.current.fiveHoursRow).toEqual([false, false, false, false]);
    expect(result.current.oneHourRow).toEqual([false, false, false, false]);
    expect(result.current.fiveMinutesRow).toEqual(Array(11).fill(false));
    expect(result.current.oneMinuteRow).toEqual([false, false, false, false]);
  });

  it("should handle odd/even seconds", () => {
    const { result: evenResult } = renderHook(() =>
      useBerlinClockLogic(0, 0, 2),
    );
    expect(evenResult.current.secondsLamp).toBe(true);

    const { result: oddResult } = renderHook(() =>
      useBerlinClockLogic(0, 0, 3),
    );
    expect(oddResult.current.secondsLamp).toBe(false);
  });

  it("should calculate hours rows correctly for 13:00:00", () => {
    const { result } = renderHook(() => useBerlinClockLogic(13, 0, 0));
    expect(result.current.fiveHoursRow).toEqual([true, true, false, false]);
    expect(result.current.oneHourRow).toEqual([true, true, true, false]);
  });

  it("should calculate minutes rows correctly for 23:37:00", () => {
    const { result } = renderHook(() => useBerlinClockLogic(23, 37, 0));
    expect(result.current.fiveMinutesRow).toEqual([
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
    ]);
    expect(result.current.oneMinuteRow).toEqual([true, true, false, false]);
  });

  it("should handle maximum time boundary (23:59:59)", () => {
    const { result } = renderHook(() => useBerlinClockLogic(23, 59, 59));
    expect(result.current.secondsLamp).toBe(false);
    expect(result.current.fiveHoursRow).toEqual([true, true, true, true]);
    expect(result.current.oneHourRow).toEqual([true, true, true, false]);
    expect(result.current.fiveMinutesRow).toEqual(Array(11).fill(true));
    expect(result.current.oneMinuteRow).toEqual([true, true, true, true]);
  });

  it("handles boundary shifts across early morning intervals (04:04:01)", () => {
    const { result } = renderHook(() => useBerlinClockLogic(4, 4, 1));
    expect(result.current.secondsLamp).toBe(false);
    expect(result.current.fiveHoursRow).toEqual([false, false, false, false]);
    expect(result.current.oneHourRow).toEqual([true, true, true, true]);
    expect(result.current.fiveMinutesRow).toEqual(Array(11).fill(false));
    expect(result.current.oneMinuteRow).toEqual([true, true, true, true]);
  });

  it("properly distributes signals across exact multipliers (15:15:00)", () => {
    const { result } = renderHook(() => useBerlinClockLogic(15, 15, 0));
    expect(result.current.fiveHoursRow).toEqual([true, true, true, false]);
    expect(result.current.oneHourRow).toEqual([false, false, false, false]);
    expect(result.current.fiveMinutesRow).toEqual([
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    expect(result.current.oneMinuteRow).toEqual([false, false, false, false]);
  });

  it("verifies exact threshold where the third, sixth, and ninth minute lamps change to red pattern indicators", () => {
    const { result: fifteenMins } = renderHook(() =>
      useBerlinClockLogic(0, 15, 0),
    );
    expect(fifteenMins.current.fiveMinutesRow[2]).toBe(true);
    expect(fifteenMins.current.fiveMinutesRow[3]).toBe(false);
    const { result: fortyFiveMins } = renderHook(() =>
      useBerlinClockLogic(0, 45, 0),
    );
    expect(fortyFiveMins.current.fiveMinutesRow[2]).toBe(true);
    expect(fortyFiveMins.current.fiveMinutesRow[5]).toBe(true);
    expect(fortyFiveMins.current.fiveMinutesRow[8]).toBe(true);
    expect(fortyFiveMins.current.fiveMinutesRow[9]).toBe(false);
  });

  it("should handle alternative standard hour configurations like exactly noon (12:00:00)", () => {
    const { result } = renderHook(() => useBerlinClockLogic(12, 0, 0));
    expect(result.current.fiveHoursRow).toEqual([true, true, false, false]);
    expect(result.current.oneHourRow).toEqual([true, true, false, false]);
  });

  it('should return completely dark rows at absolute midnight to guard array fill defaults', () => {
  const { result } = renderHook(() => useBerlinClockLogic(0, 0, 0));

  expect(result.current.fiveHoursRow).toEqual([false, false, false, false]);
  expect(result.current.oneHourRow).toEqual([false, false, false, false]);
  expect(result.current.fiveMinutesRow).toEqual(Array(11).fill(false));
  expect(result.current.oneMinuteRow).toEqual([false, false, false, false]);
});
});
