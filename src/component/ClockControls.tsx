interface ClockControlsProps {
  isCustomMode: boolean;
  customTime: string;
  setIsCustomMode: (mode: boolean) => void;
  setCustomTime: (time: string) => void;
}

export function ClockControls({
  isCustomMode,
  customTime,
  setIsCustomMode,
  setCustomTime,
}: ClockControlsProps) {
  return (
    <div className="berlin-clock-controls">
      <div className="control-group">
        <label htmlFor="mode-checkbox">Enable Custom Time</label>
        <input 
          id="mode-checkbox"
          type="checkbox" 
          checked={isCustomMode} 
          onChange={(e) => setIsCustomMode(e.target.checked)} 
        />
      </div>

      {isCustomMode && (
        <div className="control-group">
          <label htmlFor="time-picker">Set Time (HH:mm:ss)</label>
          <input 
            id="time-picker"
            type="text" 
            className="control-input"
            value={customTime} 
            placeholder="12:00:00"
            onChange={(e) => setCustomTime(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}