import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ClockRow } from "../component/ClockRow";

describe("ClockRow - Exhaustive Matrix Positional Tests", () => {
  const rowId = "test-matrix-row";

  it("should render the wrapper block with the explicit test identifier", () => {
    const { getByTestId } = render(
      <ClockRow rowState={[false]} activeColorClass="lamp-red" rowId={rowId} />,
    );
    expect(getByTestId(`clock-row-${rowId}`)).toBeInTheDocument();
  });

  it("should render an empty node list without throwing if rowState array is completely empty", () => {
    const { getByTestId } = render(
      <ClockRow rowState={[]} activeColorClass="lamp-red" rowId={rowId} />,
    );
    const wrapper = getByTestId(`clock-row-${rowId}`);
    expect(wrapper.children).toHaveLength(0);
  });

  it("should kill index alignment mutants by verifying precise boolean-to-class arrays matching", () => {
    const alternatingState = [true, false, true, false, true];
    const { getByTestId } = render(
      <ClockRow
        rowState={alternatingState}
        activeColorClass="lamp-yellow"
        rowId={rowId}
      />,
    );

    const wrapper = getByTestId(`clock-row-${rowId}`);
    const lamps = wrapper.children;
    expect(lamps).toHaveLength(5);

    expect(lamps[0]).toHaveClass("lamp-yellow");
    expect(lamps[1]).toHaveClass("lamp-off");
    expect(lamps[2]).toHaveClass("lamp-yellow");
    expect(lamps[3]).toHaveClass("lamp-off");
    expect(lamps[4]).toHaveClass("lamp-yellow");
  });

  it("should safely enforce alternative red configuration color themes across the entire array map", () => {
    const totalState = [true, true];
    const { getByTestId } = render(
      <ClockRow
        rowState={totalState}
        activeColorClass="lamp-red"
        rowId={rowId}
      />,
    );

    const wrapper = getByTestId(`clock-row-${rowId}`);
    const lamps = wrapper.children;

    expect(lamps[0]).toHaveClass("lamp-red");
    expect(lamps[0]).not.toHaveClass("lamp-yellow");
    expect(lamps[1]).toHaveClass("lamp-red");
    expect(lamps[1]).not.toHaveClass("lamp-yellow");
  });
});
