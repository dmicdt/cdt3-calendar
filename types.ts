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

// Palette with light + dark variants. Hues are spaced around the colour wheel so every
// category is easy to tell apart: blue · lime · violet · fuchsia · pink · teal · amber · red · grey
export const EVENT_COLORS: Record<EventType, { bg: string; border: string; text: string }> = {
  core:        { bg: 'bg-blue-50 dark:bg-blue-500/10',       border: 'border-blue-600 dark:border-blue-500',       text: 'text-blue-900 dark:text-blue-300' },
  development: { bg: 'bg-lime-50 dark:bg-lime-500/10',       border: 'border-lime-600 dark:border-lime-500',       text: 'text-lime-900 dark:text-lime-300' },
  ai:          { bg: 'bg-violet-50 dark:bg-violet-500/10',   border: 'border-violet-600 dark:border-violet-500',   text: 'text-violet-900 dark:text-violet-300' },
  creative:    { bg: 'bg-fuchsia-50 dark:bg-fuchsia-500/10', border: 'border-fuchsia-600 dark:border-fuchsia-500', text: 'text-fuchsia-900 dark:text-fuchsia-300' },
  inclusion:   { bg: 'bg-pink-50 dark:bg-pink-500/10',       border: 'border-pink-500 dark:border-pink-400',       text: 'text-pink-900 dark:text-pink-300' },
  ethics:      { bg: 'bg-teal-50 dark:bg-teal-500/10',       border: 'border-teal-600 dark:border-teal-400',       text: 'text-teal-900 dark:text-teal-300' },
  challenge:   { bg: 'bg-amber-50 dark:bg-amber-500/10',     border: 'border-amber-500 dark:border-amber-400',     text: 'text-amber-900 dark:text-amber-300' },
  holiday:     { bg: 'bg-red-50 dark:bg-red-500/10',         border: 'border-red-500',                             text: 'text-red-800 dark:text-red-300' },
  research:    { bg: 'bg-gray-50 dark:bg-slate-800/40',      border: 'border-gray-200 dark:border-slate-700',      text: 'text-gray-400 dark:text-slate-500' },
};


// Categories shown in the filter bar and dashboard, in display order.
export const FILTER_TYPES: EventType[] = [
  'core', 'development', 'ai', 'creative', 'inclusion', 'ethics', 'challenge',
];

export const EVENT_LABELS: Record<EventType, string> = {
  core: 'Core',
  development: 'Researcher Development',
  ai: 'AI',
  creative: 'Creative Practice',
  inclusion: 'Inclusion',
  ethics: 'Ethics',
  challenge: 'Challenge',
  holiday: 'Holiday',
  research: 'Individual Research',
};

// Solid hex versions of the palette above (for charts, which can't use Tailwind classes).
export const EVENT_HEX: Record<EventType, string> = {
  core: '#3b82f6',        // blue-500
  development: '#84cc16', // lime-500
  ai: '#8b5cf6',          // violet-500
  creative: '#d946ef',    // fuchsia-500
  inclusion: '#f472b6',   // pink-400
  ethics: '#2dd4bf',      // teal-400
  challenge: '#fbbf24',   // amber-400
  holiday: '#ef4444',     // red-500
  research: '#64748b',    // slate-500
};
