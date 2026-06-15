import { useBerlinClock } from '../hooks/useBerlinClock';
import { SecondsLamp } from './SecondsLamp';
import './BerlinClock.css';

export function BerlinClock() {
  const {
    digitalTime,
    secondsLamp
  } = useBerlinClock();

  return (
    <div className="berlin-clock-container">
      <h2 className="berlin-clock-title">Berlin Clock</h2>
      
      <SecondsLamp isEven={secondsLamp} />

      <div className="berlin-clock-digital">{digitalTime}</div>
    </div>
  );
}