import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SecondsLamp } from "../component/SecondsLamp";

describe("SecondsLamp - Comprehensive Mutation Killers", () => {
  it("should render the element with base classes intact", () => {
    const { container } = render(<SecondsLamp isEven={true} />);
    const element = container.querySelector('[data-testid="seconds-lamp"]');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("berlin-clock-lamp");
    expect(element).toHaveClass("berlin-clock-seconds");
  });

  it('should strictly apply "lamp-red" and omit "lamp-off" when isEven is true', () => {
    const { container } = render(<SecondsLamp isEven={true} />);
    const element = container.querySelector('[data-testid="seconds-lamp"]');

    expect(element).toHaveClass("lamp-red");
    expect(element).not.toHaveClass("lamp-off");
  });

  it('should strictly apply "lamp-off" and omit "lamp-red" when isEven is false', () => {
    const { container } = render(<SecondsLamp isEven={false} />);
    const element = container.querySelector('[data-testid="seconds-lamp"]');

    expect(element).toHaveClass("lamp-off");
    expect(element).not.toHaveClass("lamp-red");
  });

  it("should correctly handle rapid live properties rerendering toggles", () => {
    const { container, rerender } = render(<SecondsLamp isEven={true} />);
    const element = container.querySelector('[data-testid="seconds-lamp"]');
    expect(element).toHaveClass("lamp-red");

    rerender(<SecondsLamp isEven={false} />);
    expect(element).toHaveClass("lamp-off");
    expect(element).not.toHaveClass("lamp-red");

    rerender(<SecondsLamp isEven={true} />);
    expect(element).toHaveClass("lamp-red");
    expect(element).not.toHaveClass("lamp-off");
  });
});
