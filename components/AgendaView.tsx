import React from 'react';
import { WeekData, CalendarEvent, EVENT_COLORS } from '../types';
import { Calendar as CalIcon, MapPin } from 'lucide-react';

interface AgendaViewProps {
  weeks: WeekData[];
  todayStr: string;
  onEventClick: (e: CalendarEvent) => void;
}

type DayData = WeekData['days'][number];

export const AgendaView: React.FC<AgendaViewProps> = ({ weeks, todayStr, onEventClick }) => {
  // Flatten data for list view, removing empty days for cleaner mobile exp (always keep today)
  const daysWithEvents = weeks.flatMap(w => w.days).filter(d => d.events.length > 0 || d.isHoliday || d.dateStr === todayStr);

  // Group by Month
  const grouped = daysWithEvents.reduce((acc, day) => {
      const month = day.date.toLocaleString('en-GB', { month: 'long', year: 'numeric' });
      if(!acc[month]) acc[month] = [];
      acc[month].push(day);
      return acc;
  }, {} as Record<string, DayData[]>);

  return (
    <div className="space-y-8 pb-20">
        {Object.entries(grouped).map(([month, days]: [string, DayData[]]) => (
            <div key={month}>
                <h3 className="bg-[#f8f9fa]/95 dark:bg-slate-950/95 backdrop-blur py-3 text-lg font-bold text-[#003366] dark:text-[#D4AF37] border-b border-gray-200 dark:border-slate-800">
                    {month}
                </h3>
                <div className="space-y-3 mt-4">
                    {days.map((day) => {
                        const isToday = day.dateStr === todayStr;
                        const isPast = day.dateStr < todayStr;
                        return (
                        <div
                            key={day.dateStr}
                            data-date={day.dateStr}
                            className={`relative flex gap-4 scroll-mt-64 ${isToday ? 'bg-amber-50 dark:bg-[#D4AF37]/10 ring-2 ring-[#D4AF37] -mx-2 px-2 py-2 rounded-lg' : ''} ${isPast ? 'opacity-50' : ''}`}
                        >
                            <div className="flex flex-col items-center min-w-[3.5rem] pt-1">
                                <span className={`text-xs font-semibold uppercase ${isToday ? 'text-[#a8861a] dark:text-[#D4AF37]' : 'text-gray-400 dark:text-slate-500'}`}>
                                    {day.date.toLocaleString('en-GB', { weekday: 'short'})}
                                </span>
                                <span className={`text-xl font-bold ${isToday ? 'text-slate-900 bg-[#D4AF37] rounded-md px-2' : 'text-gray-800 dark:text-slate-100'}`}>
                                    {day.date.getDate()}
                                </span>
                                {isToday && <span className="mt-1 text-[9px] font-extrabold uppercase tracking-wider text-[#a8861a] dark:text-[#D4AF37]">Today</span>}
                            </div>

                            <div className="flex-1 space-y-2 pb-4 border-b border-gray-200 dark:border-slate-800 last:border-0">
                                {day.isHoliday ? (
                                    <div className="bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-300 p-3 rounded-lg text-sm font-medium border border-red-200 dark:border-red-500/30 flex items-center gap-2">
                                        🎉 {day.holidayName}
                                    </div>
                                ) : day.events.length === 0 ? (
                                    <div className="text-sm text-gray-400 dark:text-slate-500 italic p-3">No scheduled sessions today</div>
                                ) : (
                                    day.events.map(event => {
                                        const colors = EVENT_COLORS[event.type];
                                        return (
                                            <div
                                                key={event.id}
                                                onClick={() => onEventClick(event)}
                                                className={`${colors.bg} ${colors.border} border-l-4 rounded-r-md p-3 shadow-sm hover:shadow-md dark:hover:brightness-125 active:scale-[0.98] transition cursor-pointer`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-gray-800 dark:text-slate-100 text-sm">{event.title}</h4>
                                                    {event.type === 'challenge' && (
                                                        <span className="text-[10px] uppercase font-bold bg-amber-200 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 px-1 rounded ml-2">Sup. Input</span>
                                                    )}
                                                </div>
                                                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-slate-400">
                                                    {event.time && <span className="flex items-center gap-1"><CalIcon size={12}/> {event.time}</span>}
                                                    {event.location && <span className="flex items-center gap-1 italic"><MapPin size={12}/> {event.location}</span>}
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        ))}
    </div>
  );
};
