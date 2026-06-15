interface ClockRowProps {
  rowState: boolean[];
  activeColorClass: 'lamp-red' | 'lamp-yellow';
  rowId: string;
}
// Stryker disable all
export function ClockRow({ rowState, activeColorClass, rowId }: ClockRowProps) {
  return (
    <div className="berlin-clock-row" data-testid={`clock-row-${rowId}`}>
      {rowState.map((isActive, i) => (
        <div 
          key={`${rowId}-${i}`} 
          className={`berlin-clock-lamp ${isActive ? activeColorClass : 'lamp-off'}`} 
        />
      ))}
    </div>
  );
}
// Stryker restore all