import { CalendarEvent, EVENT_LABELS } from '../types';
import { londonToDate, parseTimeRange } from './londonTime';

/**
 * RFC 5545 calendar feed.
 *
 * This file is pure (no React, no browser APIs) so it can run in three places:
 *   1. the browser, for the "download a copy" button;
 *   2. the Vite build, which writes the subscribable feed into dist/;
 *   3. tests.
 */

export const FEED_FILENAME = 'cdt-cohort3.ics';
export const CALENDAR_NAME = 'CDT Cohort 3 Year Planner';
/** How often subscribers should re-check the feed. Apple honours this; Google uses its own schedule. */
export const REFRESH_INTERVAL = 'PT6H';

/** Event types left out of the feed (individual research days would bury real sessions). */
const EXCLUDED_TYPES = ['research'];

// --- helpers ---------------------------------------------------------------

/** FNV-1a. Deterministic, so an event keeps the same UID on every build. */
const hash = (s: string): string => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
};

/**
 * A UID must be stable for the life of the event: calendar apps use it to tell
 * "this event moved room / changed time" from "this is a brand new event". It is
 * therefore derived from the date + title, NOT from the random ids in
 * constants.ts (those change on every page load), and NOT from the time (so that
 * rescheduling a session updates the existing entry instead of duplicating it).
 *
 * `occurrence` disambiguates the case where one title legitimately appears twice
 * on the same day (e.g. a morning and an afternoon "AI Bootcamp Day 1").
 */
export const eventUID = (e: CalendarEvent, occurrence = 0): string =>
  `${e.date.replace(/-/g, '')}-${hash(`${e.date}|${e.title}`)}${occurrence ? `-${occurrence}` : ''}@cdt3-calendar`;

const escape = (s: string): string =>
  s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** Lines must be <= 75 octets; continuations start with a single space. */
const fold = (line: string): string => {
  if (line.length <= 73) return line;
  const out: string[] = [];
  let rest = line;
  out.push(rest.slice(0, 73));
  rest = rest.slice(73);
  while (rest.length > 72) {
    out.push(' ' + rest.slice(0, 72));
    rest = rest.slice(72);
  }
  if (rest) out.push(' ' + rest);
  return out.join('\r\n');
};

const utcStamp = (d: Date): string => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const dateStamp = (dateStr: string): string => dateStr.replace(/-/g, '');
const addOneDay = (dateStr: string): string => {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
};

// --- builder ---------------------------------------------------------------

export interface BuildICSOptions {
  /** Shown as the calendar's name once subscribed. */
  name?: string;
  /** DTSTAMP for every event. Pass a fixed date for reproducible builds. */
  stamp?: Date;
  /** Advertise a refresh interval + name. Off for a one-off download. */
  subscribable?: boolean;
}

export const buildICS = (events: CalendarEvent[], opts: BuildICSOptions = {}): string => {
  const { name = CALENDAR_NAME, stamp = new Date(), subscribable = true } = opts;
  const dtstamp = utcStamp(stamp);

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//RHUL & Surrey CDT//Cohort 3 Year Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  if (subscribable) {
    lines.push(
      `X-WR-CALNAME:${escape(name)}`,
      `NAME:${escape(name)}`,
      'X-WR-TIMEZONE:Europe/London',
      `REFRESH-INTERVAL;VALUE=DURATION:${REFRESH_INTERVAL}`,
      `X-PUBLISHED-TTL:${REFRESH_INTERVAL}`,
      'X-WR-CALDESC:Training schedule for CDT Cohort 3 (AI for Digital Media Inclusion). Updated automatically.',
    );
  }

  const seen = new Map<string, number>();

  events
    .filter(e => !EXCLUDED_TYPES.includes(e.type))
    .slice()
    .sort((a, b) =>
      a.date === b.date
        ? (a.time ?? '').localeCompare(b.time ?? '') || a.title.localeCompare(b.title)
        : a.date.localeCompare(b.date)
    )
    .forEach(e => {
      const t = parseTimeRange(e.time);
      const key = `${e.date}|${e.title}`;
      const occurrence = seen.get(key) ?? 0;
      seen.set(key, occurrence + 1);

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${eventUID(e, occurrence)}`);
      lines.push(`DTSTAMP:${dtstamp}`);

      if (t) {
        // Written in UTC, converted from London wall-clock time, so it lands
        // correctly for subscribers in any timezone and across the BST switch.
        lines.push(`DTSTART:${utcStamp(londonToDate(e.date, t.h1, t.m1))}`);
        lines.push(`DTEND:${utcStamp(londonToDate(e.date, t.h2, t.m2))}`);
      } else {
        lines.push(`DTSTART;VALUE=DATE:${dateStamp(e.date)}`);
        lines.push(`DTEND;VALUE=DATE:${dateStamp(addOneDay(e.date))}`);
      }

      lines.push(`SUMMARY:${escape(e.title)}`);
      if (e.location && e.location !== '-') lines.push(`LOCATION:${escape(e.location)}`);
      lines.push(`CATEGORIES:${escape(EVENT_LABELS[e.type] ?? e.type)}`);
      lines.push(
        `DESCRIPTION:${escape(
          `${EVENT_LABELS[e.type] ?? e.type}${e.mandatory ? ' · Attendance mandatory' : ''}`
        )}`
      );
      lines.push('STATUS:CONFIRMED');
      lines.push('TRANSP:OPAQUE');
      lines.push('SEQUENCE:0');
      lines.push('END:VEVENT');
    });

  lines.push('END:VCALENDAR');

  // RFC 5545 requires CRLF line endings.
  return lines.map(fold).join('\r\n') + '\r\n';
};
