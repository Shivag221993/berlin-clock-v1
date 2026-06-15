import { useBerlinClock } from '../hooks/useBerlinClock';
import './BerlinClock.css';

export function BerlinClock() {
  const {
    digitalTime
  } = useBerlinClock();

  return (
    <div className="berlin-clock-container">
      <h2 className="berlin-clock-title">Berlin Clock</h2>

      <div className="berlin-clock-digital">{digitalTime}</div>
    </div>
  );
}