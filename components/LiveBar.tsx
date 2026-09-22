import React, { useMemo } from 'react';
import { Clock, Timer } from 'lucide-react';
import { CalendarEvent, EVENT_COLORS, EVENT_LABELS } from '../types';
import { LONDON_TZ, formatCountdown, getEventWindow, useNow } from '../services/timeService';

interface LiveBarProps {
  events: CalendarEvent[];
  onEventClick: (e: CalendarEvent) => void;
}

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: LONDON_TZ, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
});
const timeFmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: LONDON_TZ, hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23', timeZoneName: 'short',
});
const whenFmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: LONDON_TZ, weekday: 'short', day: 'numeric', month: 'short',
});

export const LiveBar: React.FC<LiveBarProps> = ({ events, onEventClick }) => {
  // Only this component ticks every second, so the big calendar grid doesn't re-render.
  const now = useNow(1000);

  const windows = useMemo(
    () => events
      .filter(e => e.type !== 'research' && e.type !== 'holiday')
      .map(getEventWindow)
      .sort((a, b) => a.start.getTime() - b.start.getTime()),
    [events]
  );

  const current = windows.find(w => w.start <= now && now < w.end);
  const next = windows.find(w => w.start > now);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-200 dark:border-slate-800 text-sm">
      {/* London clock */}
      <div className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
        <Clock size={16} className="text-[#a8861a] dark:text-[#D4AF37] shrink-0" />
        <span className="font-medium">{dateFmt.format(now)}</span>
        <span className="font-mono tabular-nums font-bold text-[#003366] dark:text-slate-50">{timeFmt.format(now)}</span>
        <span className="text-gray-400 dark:text-slate-500 text-xs">London</span>
      </div>

      {/* Now / next */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
        {current && (
          <button
            onClick={() => onEventClick(current.event)}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors min-w-0"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-xs font-bold uppercase shrink-0">Now</span>
            <span className="truncate max-w-[16rem]">{current.event.title}</span>
          </button>
        )}

        {next ? (
          <button
            onClick={() => onEventClick(next.event)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full border ${EVENT_COLORS[next.event.type].bg} ${EVENT_COLORS[next.event.type].border} hover:shadow-md dark:hover:brightness-125 transition min-w-0`}
            title={`${EVENT_LABELS[next.event.type]} · ${next.event.location}`}
          >
            <Timer size={14} className={`${EVENT_COLORS[next.event.type].text} shrink-0`} />
            <span className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 shrink-0">Next</span>
            <span className="truncate max-w-[18rem] text-gray-800 dark:text-slate-100">{next.event.title}</span>
            <span className="text-xs text-gray-500 dark:text-slate-400 shrink-0 hidden sm:inline">
              {whenFmt.format(next.start)}{next.allDay ? '' : `, ${next.event.time?.split(/[-–—]/)[0]}`}
            </span>
            <span className={`font-mono tabular-nums font-bold shrink-0 ${EVENT_COLORS[next.event.type].text}`}>
              {formatCountdown(next.start.getTime() - now.getTime())}
            </span>
          </button>
        ) : (
          <span className="text-gray-400 dark:text-slate-500 italic">No upcoming events</span>
        )}
      </div>
    </div>
  );
};
