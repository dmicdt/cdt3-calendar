import React from 'react';
import { WeekData, CalendarEvent, EVENT_COLORS } from '../types';
import { Calendar as CalIcon, MapPin } from 'lucide-react';

interface AgendaViewProps {
  weeks: WeekData[];
  onEventClick: (e: CalendarEvent) => void;
}

type DayData = WeekData['days'][number];

export const AgendaView: React.FC<AgendaViewProps> = ({ weeks, onEventClick }) => {
  // Flatten data for list view, removing empty days for cleaner mobile exp
  const daysWithEvents = weeks.flatMap(w => w.days).filter(d => d.events.length > 0 || d.isHoliday);

  // Group by Month
  const grouped = daysWithEvents.reduce((acc, day) => {
      const month = day.date.toLocaleString('default', { month: 'long', year: 'numeric' });
      if(!acc[month]) acc[month] = [];
      acc[month].push(day);
      return acc;
  }, {} as Record<string, DayData[]>);

  return (
    <div className="space-y-8 pb-20">
        {Object.entries(grouped).map(([month, days]: [string, DayData[]]) => (
            <div key={month}>
                <h3 className="sticky top-0 bg-[#f8f9fa]/95 backdrop-blur py-3 text-lg font-bold text-[#003366] border-b border-gray-200 z-10">
                    {month}
                </h3>
                <div className="space-y-3 mt-4">
                    {days.map((day) => (
                        <div key={day.dateStr} className={`relative flex gap-4 ${day.isToday ? 'bg-blue-50/50 -mx-2 px-2 rounded-lg' : ''}`}>
                            <div className="flex flex-col items-center min-w-[3.5rem] pt-1">
                                <span className="text-xs font-semibold text-gray-400 uppercase">
                                    {day.date.toLocaleString('default', { weekday: 'short'})}
                                </span>
                                <span className={`text-xl font-bold ${day.isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                                    {day.date.getDate()}
                                </span>
                            </div>
                            
                            <div className="flex-1 space-y-2 pb-4 border-b border-gray-100 last:border-0">
                                {day.isHoliday ? (
                                    <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-2">
                                        🎉 {day.holidayName}
                                    </div>
                                ) : (
                                    day.events.map(event => {
                                        const colors = EVENT_COLORS[event.type];
                                        return (
                                            <div 
                                                key={event.id}
                                                onClick={() => onEventClick(event)}
                                                className={`${colors.bg} ${colors.border} border-l-4 rounded-r-md p-3 shadow-sm active:scale-[0.98] transition-transform cursor-pointer`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-gray-800 text-sm">{event.title}</h4>
                                                    {event.type === 'challenge' && (
                                                        <span className="text-[10px] uppercase font-bold bg-amber-200 text-amber-900 px-1 rounded ml-2">Sup. Input</span>
                                                    )}
                                                </div>
                                                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
                                                    {event.time && <span className="flex items-center gap-1"><CalIcon size={12}/> {event.time}</span>}
                                                    {event.location && <span className="flex items-center gap-1 italic"><MapPin size={12}/> {event.location}</span>}
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
  );
};