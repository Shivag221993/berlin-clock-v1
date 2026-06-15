import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ClockControls } from '../component/ClockControls';

describe('ClockControls - User Interaction & Input Event Killers', () => {
  let mockSetIsCustomMode: (mode: boolean) => void;
  let mockSetCustomTime: (time: string) => void;

  beforeEach(() => {
    mockSetIsCustomMode = vi.fn<(mode: boolean) => void>();
    mockSetCustomTime = vi.fn<(time: string) => void>();
  });

  it('should render the checkbox control block cleanly by default', () => {
    const { getByLabelText, queryByLabelText } = render(
      <ClockControls 
        isCustomMode={false} 
        customTime="12:00:00" 
        setIsCustomMode={mockSetIsCustomMode} 
        setCustomTime={mockSetCustomTime} 
      />
    );

    expect(getByLabelText('Enable Custom Time')).toBeInTheDocument();
    expect(getByLabelText('Enable Custom Time')).not.toBeChecked();
    expect(queryByLabelText('Set Time (HH:mm:ss)')).not.toBeInTheDocument();
  });

  it('should show the time text field input only when custom mode is true', () => {
    const { getByLabelText } = render(
      <ClockControls 
        isCustomMode={true} 
        customTime="18:45:15" 
        setIsCustomMode={mockSetIsCustomMode} 
        setCustomTime={mockSetCustomTime} 
      />
    );

    const checkbox = getByLabelText('Enable Custom Time');
    const timeInput = getByLabelText('Set Time (HH:mm:ss)');

    expect(checkbox).toBeChecked();
    expect(timeInput).toBeInTheDocument();
    expect(timeInput).toHaveValue('18:45:15');
    expect(timeInput).toHaveAttribute('placeholder', '12:00:00');
  });

  it('should fire the exact structural callback payload when clicking the checkbox toggle', () => {
    const { getByLabelText } = render(
      <ClockControls 
        isCustomMode={false} 
        customTime="12:00:00" 
        setIsCustomMode={mockSetIsCustomMode} 
        setCustomTime={mockSetCustomTime} 
      />
    );

    const checkbox = getByLabelText('Enable Custom Time');
    fireEvent.click(checkbox);

    expect(mockSetIsCustomMode).toHaveBeenCalledTimes(1);
    expect(mockSetIsCustomMode).toHaveBeenCalledWith(true);
  });

  it('should emit the explicit text content values through parameters upon value updates', () => {
    const { getByLabelText } = render(
      <ClockControls 
        isCustomMode={true} 
        customTime="00:00:00" 
        setIsCustomMode={mockSetIsCustomMode} 
        setCustomTime={mockSetCustomTime} 
      />
    );

    const timeInput = getByLabelText('Set Time (HH:mm:ss)');
    fireEvent.change(timeInput, { target: { value: '23:59:59' } });

    expect(mockSetCustomTime).toHaveBeenCalledTimes(1);
    expect(mockSetCustomTime).toHaveBeenCalledWith('23:59:59');
  });
});