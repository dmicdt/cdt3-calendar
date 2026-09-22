import { useEffect, useState } from 'react';
import { CalendarEvent } from '../types';

export const LONDON_TZ = 'Europe/London';

const partsFmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: LONDON_TZ,
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hourCycle: 'h23',
});

const getParts = (d: Date) => {
  const o: Record<string, string> = {};
  for (const p of partsFmt.formatToParts(d)) o[p.type] = p.value;
  return o;
};

/** Today's date in London as YYYY-MM-DD (correct regardless of the viewer's timezone). */
export const londonDateStr = (d: Date = new Date()): string => {
  const p = getParts(d);
  return `${p.year}-${p.month}-${p.day}`;
};

/** Convert a London wall-clock time (e.g. 2026-10-06 10:00) to a real instant, GMT/BST aware. */
export const londonToDate = (dateStr: string, hour = 0, minute = 0): Date => {
  const [y, mo, da] = dateStr.split('-').map(Number);
  const guess = Date.UTC(y, mo - 1, da, hour, minute);
  const p = getParts(new Date(guess));
  const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return new Date(guess - (asUTC - guess));
};

export interface EventWindow {
  event: CalendarEvent;
  start: Date;
  end: Date;
  allDay: boolean;
}

/** Start/end of an event. "All Day" or untimed events are treated as 09:00–17:00. */
export const getEventWindow = (event: CalendarEvent): EventWindow => {
  const t = (event.time || '').replace(/[–—]/g, '-');
  const m = t.match(/(\d{1,2})[:.](\d{2})\s*-\s*(\d{1,2})[:.](\d{2})/);
  if (m) {
    return {
      event,
      start: londonToDate(event.date, +m[1], +m[2]),
      end: londonToDate(event.date, +m[3], +m[4]),
      allDay: false,
    };
  }
  return { event, start: londonToDate(event.date, 9, 0), end: londonToDate(event.date, 17, 0), allDay: true };
};

export const formatCountdown = (ms: number): string => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return d > 0 ? `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s` : `${pad(h)}h ${pad(m)}m ${pad(s)}s`;
};

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
