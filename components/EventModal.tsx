import React from 'react';
import { CalendarEvent, EVENT_COLORS, EVENT_LABELS } from '../types';
import { generateICS } from '../services/dateService';
import { X, MapPin, Clock, Calendar as CalIcon, BookOpen } from 'lucide-react';

interface EventModalProps {
  event: CalendarEvent | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  const colors = EVENT_COLORS[event.type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className={`${colors.bg} px-6 py-4 border-b ${colors.border} flex justify-between items-start`}>
            <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${colors.text} px-2 py-1 bg-white/60 dark:bg-black/30 rounded-full mb-2 inline-block`}>
                    {EVENT_LABELS[event.type]}
                </span>
                <h2 className="text-xl font-bold text-[#003366] dark:text-slate-50 leading-tight">{event.title}</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-600 dark:text-slate-300" />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-600 dark:text-slate-300">
                <CalIcon className="w-5 h-5 text-gray-400 dark:text-slate-500" />
                <span className="font-medium">{new Date(`${event.date}T12:00:00Z`).toLocaleDateString('en-GB', { timeZone: 'Europe/London', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}</span>
            </div>
            
            {event.time && (
                <div className="flex items-center gap-3 text-gray-600 dark:text-slate-300">
                    <Clock className="w-5 h-5 text-gray-400 dark:text-slate-500" />
                    <span>{event.time}</span>
                </div>
            )}

            <div className="flex items-center gap-3 text-gray-600 dark:text-slate-300">
                <MapPin className="w-5 h-5 text-gray-400 dark:text-slate-500" />
                <span>{event.location || 'Location TBD'}</span>
            </div>

            <hr className="my-4 border-gray-200 dark:border-slate-800" />

            <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-slate-100 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> 
                    Session Details
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
                    This session is part of the core CDT curriculum. 
                    {event.type === 'challenge' && " Requires active supervisor engagement."}
                    {event.type === 'ai' && " Please bring your laptop with Python installed."}
                </p>
                {event.mandatory && (
                    <div className="mt-2 text-xs font-semibold text-red-800 dark:text-red-300 bg-red-50 dark:bg-red-500/10 inline-block px-2 py-1 rounded">
                        * Attendance Mandatory
                    </div>
                )}
            </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-slate-950/60 flex justify-end gap-3 border-t border-gray-200 dark:border-slate-800">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-500 dark:text-slate-400 font-medium hover:text-gray-900 dark:hover:text-slate-100">
                Close
            </button>
            <button 
                onClick={() => generateICS([event], `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`)}
                className="px-4 py-2 text-sm bg-[#003366] text-white hover:bg-[#002244] dark:bg-[#D4AF37] dark:text-slate-900 dark:hover:bg-[#e0bd4a] font-bold rounded-md transition-colors shadow-sm"
            >
                Add to Calendar
            </button>
        </div>
      </div>
    </div>
  );
};