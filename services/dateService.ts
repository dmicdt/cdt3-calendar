import { CalendarEvent, WeekData, EventType } from '../types';
import { HOLIDAYS } from '../constants';

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

export const generateICS = (events: CalendarEvent[], fileName: string = 'cdt-calendar.ics') => {
  let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//CDT Planner//EN\n";

  events.forEach(event => {
    // Basic clean up of date YYYYMMDD
    const dateStr = event.date.replace(/-/g, '');
    let dtStart = `DTSTART;VALUE=DATE:${dateStr}`;
    let dtEnd = ''; 
    let isAllDay = true;

    // Check if time is specified and parseable
    if (event.time && event.time.toLowerCase() !== 'all day') {
        // Match HH:MM-HH:MM or HH.MM-HH.MM with optional spaces
        // Replaces en-dashes or em-dashes with hyphen just in case
        const normalizedTime = event.time.replace(/–/g, '-').replace(/—/g, '-');
        const timeMatch = normalizedTime.match(/(\d{1,2})[:\.](\d{2})\s*-\s*(\d{1,2})[:\.](\d{2})/);

        if (timeMatch) {
            isAllDay = false;
            const [_, h1, m1, h2, m2] = timeMatch;
            
            // Helper to pad time components
            const pad = (n: string) => n.length === 1 ? '0' + n : n;

            // Construct ISO time strings (Local time)
            dtStart = `DTSTART:${dateStr}T${pad(h1)}${m1}00`;
            dtEnd = `DTEND:${dateStr}T${pad(h2)}${m2}00`;
        }
    }

    icsContent += "BEGIN:VEVENT\n";
    icsContent += `${dtStart}\n`;
    if (!isAllDay && dtEnd) {
        icsContent += `${dtEnd}\n`;
    }
    icsContent += `SUMMARY:${event.title}\n`;
    if (event.location) icsContent += `LOCATION:${event.location}\n`;
    icsContent += "END:VEVENT\n";
  });

  icsContent += "END:VCALENDAR";
  
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};