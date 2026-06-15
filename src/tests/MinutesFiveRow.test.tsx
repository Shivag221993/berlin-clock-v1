import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MinutesFiveRow } from "../component/MinutesFiveRow";

describe("MinutesFiveRow - Deep Structural Modulo Verification", () => {
  it("should properly render the explicit data attribute wrapper row container", () => {
    const { getByTestId } = render(<MinutesFiveRow rowState={[false]} />);
    expect(getByTestId("clock-row-5m")).toBeInTheDocument();
  });

  it("should enforce strict color configurations across all 11 active lamp blocks", () => {
    const fullActiveMatrix = Array(11).fill(true);
    const { getByTestId } = render(
      <MinutesFiveRow rowState={fullActiveMatrix} />,
    );

    const lamps = getByTestId("clock-row-5m").children;
    expect(lamps).toHaveLength(11);

    expect(lamps[0]).toHaveClass("lamp-yellow");
    expect(lamps[1]).toHaveClass("lamp-yellow");
    expect(lamps[2]).toHaveClass("lamp-red");
    expect(lamps[3]).toHaveClass("lamp-yellow");
    expect(lamps[4]).toHaveClass("lamp-yellow");
    expect(lamps[5]).toHaveClass("lamp-red");
    expect(lamps[6]).toHaveClass("lamp-yellow");
    expect(lamps[7]).toHaveClass("lamp-yellow");
    expect(lamps[8]).toHaveClass("lamp-red");
    expect(lamps[9]).toHaveClass("lamp-yellow");
    expect(lamps[10]).toHaveClass("lamp-yellow");

    expect(lamps[0]).not.toHaveClass("lamp-red");
    expect(lamps[3]).not.toHaveClass("lamp-red");
  });

  it("should leave lamps completely dark if their status index evaluated to inactive", () => {
    const mixedMatrix = [
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
    ];
    const { getByTestId } = render(<MinutesFiveRow rowState={mixedMatrix} />);

    const lamps = getByTestId("clock-row-5m").children;

    expect(lamps[0]).toHaveClass("lamp-yellow");
    expect(lamps[1]).toHaveClass("lamp-yellow");
    expect(lamps[2]).toHaveClass("lamp-red");

    expect(lamps[3]).toHaveClass("lamp-off");
    expect(lamps[3]).not.toHaveClass("lamp-yellow");

    expect(lamps[5]).toHaveClass("lamp-off");
    expect(lamps[5]).not.toHaveClass("lamp-red");
  });
});
