import { CalendarEvent, WeekData, EventType } from '../types';
import { HOLIDAYS } from '../constants';
import { buildICS } from './icsService';

export const generateAcademicYear = (startDate: string, endDate: string, events: CalendarEvent[]): WeekData[] => {
  const weeks: WeekData[] = [];
  let current = new Date(startDate);
  const end = new Date(endDate);
  // Normalize to Monday of the start week if not already
  const day = current.getDay();
  const diff = current.getDate() - day + (day === 0 ? -6 : 1); 
  current = new Date(current.setDate(diff));

  let weekCount = 1;

  while (current <= end) {
    const weekStart = new Date(current);
    const weekDays = [];

    for (let i = 0; i < 5; i++) {
      const dayDate = new Date(current);
      // Advance current global pointer for next loop
      current.setDate(current.getDate() + 1);

      const iso = dayDate.toISOString().split('T')[0];
      const dayEvents = events.filter(e => e.date === iso);
      const isHoliday = !!HOLIDAYS[iso];
      const isToday = new Date().toISOString().split('T')[0] === iso;

      weekDays.push({
        date: dayDate,
        dateStr: iso,
        events: dayEvents,
        isHoliday,
        holidayName: HOLIDAYS[iso],
        isToday
      });
    }

    // Skip weekends for next iteration loop start
    current.setDate(current.getDate() + 2);

    weeks.push({
      weekStart: weekStart,
      weekLabel: `Week ${weekCount}`,
      days: weekDays
    });
    weekCount++;
  }
  return weeks;
};

/**
 * One-off download of a .ics file. The subscribable feed is generated at build
 * time instead — see services/icsService.ts and vite.config.ts.
 */
export const generateICS = (events: CalendarEvent[], fileName: string = 'cdt-calendar.ics') => {
  const icsContent = buildICS(events, { subscribable: false });
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(link.href);
};
