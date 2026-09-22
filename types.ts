export type EventType =
  | 'core'
  | 'ai'
  | 'ethics'
  | 'challenge'
  | 'holiday'
  | 'research'
  | 'inclusion'
  | 'creative'
  | 'development';

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  time?: string;
  title: string;
  location: string;
  type: EventType;
  mandatory?: boolean;
}

export interface WeekData {
  weekStart: Date;
  weekLabel: string; // e.g., "Week 1" or "Oct 06"
  days: {
    date: Date;
    dateStr: string;
    events: CalendarEvent[];
    isHoliday: boolean;
    holidayName?: string;
    isToday: boolean;
  }[];
}

// Palette: hues spaced around the colour wheel so every category is easy to tell apart.
// blue (220°) · violet (260°) · fuchsia (295°) · pink (330°) · red (0°, holiday)
// amber (45°) · lime (85°) · teal (175°) · gray (neutral, individual research)
export const EVENT_COLORS: Record<EventType, { bg: string; border: string; text: string }> = {
  core:        { bg: 'bg-blue-50',    border: 'border-blue-600',    text: 'text-blue-900' },
  development: { bg: 'bg-lime-50',    border: 'border-lime-600',    text: 'text-lime-900' },
  ai:          { bg: 'bg-violet-50',  border: 'border-violet-600',  text: 'text-violet-900' },
  creative:    { bg: 'bg-fuchsia-50', border: 'border-fuchsia-600', text: 'text-fuchsia-900' },
  inclusion:   { bg: 'bg-pink-50',    border: 'border-pink-500',    text: 'text-pink-900' },
  ethics:      { bg: 'bg-teal-50',    border: 'border-teal-600',    text: 'text-teal-900' },
  challenge:   { bg: 'bg-amber-50',   border: 'border-amber-500',   text: 'text-amber-900' },
  holiday:     { bg: 'bg-red-50',     border: 'border-red-500',     text: 'text-red-800' },
  research:    { bg: 'bg-gray-50',    border: 'border-gray-200',    text: 'text-gray-400' },
};
