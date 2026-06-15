import { useBerlinClock } from '../hooks/useBerlinClock';
import { SecondsLamp } from './SecondsLamp';
import { ClockRow } from './ClockRow';
import './BerlinClock.css';

export function BerlinClock() {
  const {
    digitalTime,
    secondsLamp,
    fiveHoursRow,
    oneHourRow,
  } = useBerlinClock();

  return (
    <div className="berlin-clock-container">
      <h2 className="berlin-clock-title">Berlin Clock</h2>
      
      <SecondsLamp isEven={secondsLamp} />

      <ClockRow rowState={fiveHoursRow} activeColorClass="lamp-red" rowId="5h" />

      <ClockRow rowState={oneHourRow} activeColorClass="lamp-red" rowId="1h" />

      <div className="berlin-clock-digital">{digitalTime}</div>
    </div>
  );
}