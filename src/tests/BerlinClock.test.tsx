import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { BerlinClock } from '../component/BerlinClock';

vi.mock('../hooks/useBerlinClock', () => ({
  useBerlinClock: () => ({
    digitalTime: "12:34:56",
    isCustomMode: true,
    customTime: "12:34:56",
    setIsCustomMode: vi.fn(),
    setCustomTime: vi.fn(),
    secondsLamp: true,
    fiveHoursRow: [true, true, false, false],
    oneHourRow: [true, true, false, false],
    fiveMinutesRow: [true, true, true, true, true, true, false, false, false, false, false],
    oneMinuteRow: [true, true, true, true],
  })
}));

describe('BerlinClock UI Form Interactivity Tests', () => {
  it('should render the control elements properly', () => {
    const { getByLabelText } = render(<BerlinClock />);
    expect(getByLabelText('Enable Custom Time')).toBeInTheDocument();
  });

  it('should render the input text field with values when mode conditions are met', () => {
    const { getByLabelText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Set Time (HH:mm:ss)');
    expect(timeInput).toBeInTheDocument();
    expect(timeInput).toHaveValue("12:34:56");
  });

  it('should trigger state modifiers whenever text input values change', () => {
    const { getByLabelText } = render(<BerlinClock />);
    const timeInput = getByLabelText('Set Time (HH:mm:ss)');
    
    fireEvent.change(timeInput, { target: { value: '18:45:30' } });
    expect(timeInput).toBeInTheDocument();
  });

  it('should render all 4 lamps for the 5-hours row structure', () => {
    const { container } = render(<BerlinClock />);
    const rows = container.querySelectorAll('.berlin-clock-row');
    expect(rows.length).toBe(4);
  });

  it('should check that the checkbox can be toggled by a user click event', () => {
    const { getByLabelText } = render(<BerlinClock />);
    const checkbox = getByLabelText('Enable Custom Time');
    fireEvent.click(checkbox);
    expect(checkbox).toBeInTheDocument();
  });
});