import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { BerlinClock } from "../component/BerlinClock";

describe("BerlinClock - Semantic HTML & Structural Validation Tests", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const mockDate = new Date(2026, 5, 14, 12, 34, 56);
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render a valid main container element block with correct classes", () => {
    const { container } = render(<BerlinClock />);
    const mainWrapper = container.firstChild as HTMLElement;

    expect(mainWrapper).not.toBeNull();
    expect(mainWrapper.tagName.toLowerCase()).toBe("div");
    expect(mainWrapper).toHaveClass("berlin-clock-container");
  });

  it("should include a clear, semantic semantic h2 header title text description", () => {
    const { container } = render(<BerlinClock />);
    const title = container.querySelector("h2");

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("berlin-clock-title");
    expect(title?.textContent).toBe("Berlin Clock");
  });

  it("should contain a semantic text block showing the digital time backup", () => {
    const { container } = render(<BerlinClock />);
    const digitalDisplay = container.querySelector(".berlin-clock-digital");

    expect(digitalDisplay).toBeInTheDocument();
    expect(digitalDisplay?.tagName.toLowerCase()).toBe("div");
    expect(digitalDisplay?.textContent).toBe("12:34:56");
  });
});
