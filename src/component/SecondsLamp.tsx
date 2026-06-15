interface SecondsLampProps {
  isEven: boolean;
}

export function SecondsLamp({ isEven }: SecondsLampProps) {
  return (
    <div 
      className={`berlin-clock-lamp berlin-clock-seconds ${isEven ? 'lamp-red' : 'lamp-off'}`} 
      data-testid="seconds-lamp"
    />
  );
}