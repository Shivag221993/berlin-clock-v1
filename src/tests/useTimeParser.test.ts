import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTimeParser } from "../hooks/useTimeParser";

describe("useTimeParser - Direct Mutation Killers", () => {
  const mockSystemDate = new Date(2026, 5, 15, 14, 30, 45);

  it("should fall back to raw system date properties when customTime is completely absent", () => {
    const { result } = renderHook(() => useTimeParser(mockSystemDate));
    expect(result.current).toEqual({ hours: 14, minutes: 30, seconds: 45 });
  });

  it("should treat whitespace-only custom strings as empty and fall back to system time", () => {
    const { result } = renderHook(() => useTimeParser(mockSystemDate, "   "));
    expect(result.current.hours).toBe(14);
    expect(result.current.minutes).toBe(30);
    expect(result.current.seconds).toBe(45);
  });

  it("should reject structurally over-segmented or under-segmented strings with zero arrays", () => {
    const { result: tooShort } = renderHook(() =>
      useTimeParser(mockSystemDate, "12"),
    );
    const { result: tooLong } = renderHook(() =>
      useTimeParser(mockSystemDate, "12:30:45:99"),
    );

    expect(tooShort.current).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    expect(tooLong.current).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });

  it("should completely dump data values if non-numeric characters are parsed", () => {
    const { result: letters } = renderHook(() =>
      useTimeParser(mockSystemDate, "12:ab:45"),
    );
    const { result: symbols } = renderHook(() =>
      useTimeParser(mockSystemDate, "12:30:-5"),
    );

    expect(letters.current).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    expect(symbols.current).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });

  it("should adaptively fill missing seconds fields with a strict zero literal", () => {
    const { result } = renderHook(() => useTimeParser(mockSystemDate, "21:15"));
    expect(result.current).toEqual({ hours: 21, minutes: 15, seconds: 0 });
  });

  it("should drop out-of-bounds hours, minutes, or seconds down to zero fallback status", () => {
    const { result: badHours } = renderHook(() =>
      useTimeParser(mockSystemDate, "24:00:00"),
    );
    const { result: badMinutes } = renderHook(() =>
      useTimeParser(mockSystemDate, "12:60:00"),
    );
    const { result: badSeconds } = renderHook(() =>
      useTimeParser(mockSystemDate, "12:00:61"),
    );

    expect(badHours.current).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    expect(badMinutes.current).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    expect(badSeconds.current).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });

  it("should validate and pass upper maximum threshold limits without dropping to zero", () => {
    const { result } = renderHook(() =>
      useTimeParser(mockSystemDate, "23:59:59"),
    );
    expect(result.current).toEqual({ hours: 23, minutes: 59, seconds: 59 });
  });

  it("should explicitly parse a valid timestamp wrapped in heavy whitespace padding", () => {
     const { result } = renderHook(() =>
      useTimeParser(mockSystemDate, "   12:30:00   "),
    );

    expect(result.current).toEqual({
      hours: 12,
      minutes: 30,
      seconds: 0,
    });
  });

  it("should fail validation if numeric segments contain mixed decimals or embedded spaces", () => {
    const { result: decimals } = renderHook(() =>
      useTimeParser(mockSystemDate, "12:30.5:00"),
    );
    const { result: paddedSegment } = renderHook(() =>
      useTimeParser(mockSystemDate, "12:3 0:00"),
    );

    expect(decimals.current).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    expect(paddedSegment.current).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });
});
