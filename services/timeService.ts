import { useEffect, useState } from 'react';
import { londonDateStr } from './londonTime';

// Pure time helpers live in londonTime.ts (no React), so they can also be used
// by the build script that generates the subscribable .ics feed.
export * from './londonTime';

/** Ticking clock. */
export const useNow = (intervalMs = 1000): Date => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
};

/** London date string that rolls over at midnight without re-rendering every second. */
export const useLondonToday = (): string => {
  const [today, setToday] = useState(() => londonDateStr());
  useEffect(() => {
    const id = setInterval(() => {
      const t = londonDateStr();
      setToday(prev => (prev === t ? prev : t));
    }, 30_000);
    return () => clearInterval(id);
  }, []);
  return today;
};
