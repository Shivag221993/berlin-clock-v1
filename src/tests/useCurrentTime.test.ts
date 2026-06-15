import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCurrentTime } from "../hooks/useCurrentTime";

describe("useCurrentTime - Deep Lifecycle & Boundary Tests", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize with the current system time precisely", () => {
    const mockDate = new Date(2026, 5, 10, 10, 10, 10);
    vi.setSystemTime(mockDate);

    const { result } = renderHook(() => useCurrentTime());
    expect(result.current.getTime()).toBe(mockDate.getTime());
  });

  it("should progress time forwards on every interval tick precisely", () => {
    const { result } = renderHook(() => useCurrentTime());
    const initialTime = result.current.getTime();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.getTime()).toBe(initialTime + 1000);
  });

  it("should handle rapid successive ticks correctly across multiple seconds", () => {
    const mockDate = new Date(2026, 0, 1, 0, 0, 0);
    vi.setSystemTime(mockDate);
    const { result } = renderHook(() => useCurrentTime());

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.getSeconds()).toBe(5);

    act(() => {
      vi.advanceTimersByTime(55000);
    });
    expect(result.current.getMinutes()).toBe(1);
    expect(result.current.getSeconds()).toBe(0);
  });

  it("should clear the interval timer instance completely upon unmounting to prevent memory leaks", () => {
    const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");
    const { unmount } = renderHook(() => useCurrentTime());

    unmount();
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    clearIntervalSpy.mockRestore();
  });

  it("should handle year-end roll-overs cleanly without breaking structural intervals", () => {
    const boundaryDate = new Date(2026, 11, 31, 23, 59, 59);
    vi.setSystemTime(boundaryDate);
    const { result } = renderHook(() => useCurrentTime());

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.getFullYear()).toBe(2027);
    expect(result.current.getMonth()).toBe(0);
    expect(result.current.getDate()).toBe(1);
    expect(result.current.getHours()).toBe(0);
  });
});
