import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBerlinClock } from "../hooks/useBerlinClock";

describe("useBerlinClock - Orchestration Facade & State Matrix Tests", () => {

  it("should return 2-digit zero-padded digital time strings during standard automated tracking modes", () => {
    const mockDate = new Date(2026, 5, 10, 5, 5, 4);
    vi.setSystemTime(mockDate);

    const { result } = renderHook(() => useBerlinClock());
    expect(result.current.digitalTime).toBe("05:05:04");

    vi.useRealTimers();
  });

  it("should retain custom time values when toggling mode off and back on again", () => {
    const { result } = renderHook(() => useBerlinClock());

    act(() => {
      result.current.setCustomTime("14:20:00");
      result.current.setIsCustomMode(true);
    });
    expect(result.current.digitalTime).toBe("14:20:00");

    act(() => {
      result.current.setIsCustomMode(false);
    });
    expect(result.current.digitalTime).not.toBe("14:20:00");

    act(() => {
      result.current.setIsCustomMode(true);
    });
    expect(result.current.digitalTime).toBe("14:20:00");
  });
  it("should fail if default customTime state string literal is mutated to empty", () => {
    const { result } = renderHook(() => useBerlinClock());
    expect(result.current.customTime).toBe("12:00:00");
  });
});
