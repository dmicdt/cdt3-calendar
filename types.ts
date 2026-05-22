export type EventType = 'core' | 'ai' | 'ethics' | 'challenge' | 'holiday' | 'research' | 'inclusion';

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

export const EVENT_COLORS: Record<EventType, { bg: string; border: string; text: string }> = {
  core: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-900' },
  inclusion: { bg: 'bg-rose-50', border: 'border-rose-500', text: 'text-rose-900' },
  ai: { bg: 'bg-purple-50', border: 'border-purple-600', text: 'text-purple-900' },
  ethics: { bg: 'bg-teal-50', border: 'border-teal-600', text: 'text-teal-900' },
  challenge: { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-900' },
  holiday: { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-800' },
  research: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-400' },
};