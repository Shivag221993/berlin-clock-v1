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

  it("should verify the correct HTML element layout order for all 4 horizontal time rows", () => {
    const { container } = render(<BerlinClock />);
    const rows = container.querySelectorAll(".berlin-clock-row");

    expect(rows).toHaveLength(4);

    expect(rows[0]).toHaveAttribute("data-testid", "clock-row-5h");
    expect(rows[1]).toHaveAttribute("data-testid", "clock-row-1h");
    expect(rows[2]).toHaveAttribute("data-testid", "clock-row-5m");
    expect(rows[3]).toHaveAttribute("data-testid", "clock-row-1m");
  });

  it("should validate child node distributions inside the rows match the grid specifications", () => {
    const { getByTestId } = render(<BerlinClock />);

    expect(getByTestId("clock-row-5h").children).toHaveLength(4);
    expect(getByTestId("clock-row-1h").children).toHaveLength(4);
    expect(getByTestId("clock-row-5m").children).toHaveLength(11);
    expect(getByTestId("clock-row-1m").children).toHaveLength(4);
  });

  it("should contain a semantic text block showing the digital time backup", () => {
    const { container } = render(<BerlinClock />);
    const digitalDisplay = container.querySelector(".berlin-clock-digital");

    expect(digitalDisplay).toBeInTheDocument();
    expect(digitalDisplay?.tagName.toLowerCase()).toBe("div");
    expect(digitalDisplay?.textContent).toBe("12:34:56");
  });

  it("should maintain strict HTML Accessibility standards for form elements and matching labels", () => {
    const { container } = render(<BerlinClock />);
    const checkboxLabel = container.querySelector('label[for="mode-checkbox"]');
    const checkboxInput = container.querySelector('input[id="mode-checkbox"]');

    expect(checkboxLabel).toBeInTheDocument();
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput).toHaveAttribute("type", "checkbox");
    expect(checkboxLabel?.textContent).toBe("Enable Custom Time");
  });

  it("should assert that all interactive control inputs are clustered inside a dedicated wrapper", () => {
    const { container } = render(<BerlinClock />);
    const controlWrapper = container.querySelector(".berlin-clock-controls");

    expect(controlWrapper).toBeInTheDocument();
    expect(controlWrapper?.children.length).toBeGreaterThanOrEqual(1);
  });
});
