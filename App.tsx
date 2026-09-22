import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { INITIAL_EVENTS } from './constants';
import { generateAcademicYear, generateICS } from './services/dateService';
import { useLondonToday } from './services/timeService';
import { EventModal } from './components/EventModal';
import { AgendaView } from './components/AgendaView';
import { LiveBar } from './components/LiveBar';
import { ThemeToggle } from './components/ThemeToggle';
import { CalendarEvent, EventType, EVENT_COLORS, EVENT_LABELS, FILTER_TYPES } from './types';
import {
    Download,
    Search,
    LayoutGrid,
    List,
    Crosshair,
    Calendar as CalendarIcon
} from 'lucide-react';

// YYYY-MM-DD + n days (pure date maths, timezone-safe)
const addDays = (dateStr: string, n: number) => {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

const App: React.FC = () => {
  const [view, setView] = useState<'calendar' | 'agenda'>('calendar');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<EventType | 'all'>('all');
  const todayStr = useLondonToday();

  // Filter Logic
  const filteredEvents = useMemo(() => {
    return INITIAL_EVENTS.filter(e => {
      const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            e.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || e.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType]);

  const weeks = useMemo(() => {
    // We pass filteredEvents to generate the grid.
    // Note: This hides the event from the grid but keeps the date cell.
    return generateAcademicYear('2026-09-29', '2028-01-01', filteredEvents);
  }, [filteredEvents]);

  // Scroll to today (or the next day shown if today isn't on the calendar, e.g. a weekend)
  const scrollToToday = useCallback((behavior: ScrollBehavior = 'smooth') => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-date]'))
      .filter(el => el.offsetParent !== null);
    const target = els.find(el => (el.dataset.date ?? '') >= todayStr);
    target?.scrollIntoView({ behavior, block: 'center' });
  }, [todayStr]);

  useEffect(() => {
    const t = setTimeout(() => scrollToToday('auto'), 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans">

      {/* Header */}
      <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-200 dark:border-slate-800 sticky top-0 z-30 shadow-lg dark:shadow-black/20">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-3">

          {/* Live clock + next event countdown */}
          <LiveBar events={INITIAL_EVENTS} onEventClick={setSelectedEvent} />

          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

            {/* Brand */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="h-12 w-1.5 bg-[#D4AF37] rounded-full hidden sm:block"></div>
                <div>
                    <h1 className="text-xl lg:text-2xl font-extrabold text-[#003366] dark:text-slate-50 uppercase tracking-tight leading-none">
                        CDT Year Planner
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 font-medium mt-1">
                        <span className="bg-[#003366] text-white dark:bg-[#D4AF37] dark:text-slate-900 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">26/27</span>
                        <span>AI for Digital Media Inclusion</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">

                {/* Search */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-[#003366] dark:focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* View Toggles */}
                <div className="flex bg-gray-100 dark:bg-slate-950 p-1 rounded-lg border border-gray-200 dark:border-slate-700 w-full sm:w-auto">
                    <button
                        onClick={() => setView('calendar')}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all ${view === 'calendar' ? 'bg-white text-[#003366] shadow-sm dark:bg-slate-700 dark:text-white' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'}`}
                    >
                        <CalendarIcon size={16} /> <span className="hidden sm:inline">Grid</span>
                    </button>
                    <button
                        onClick={() => setView('agenda')}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all ${view === 'agenda' ? 'bg-white text-[#003366] shadow-sm dark:bg-slate-700 dark:text-white' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'}`}
                    >
                        <List size={16} /> <span className="hidden sm:inline">Agenda</span>
                    </button>
                </div>

                {/* Light / dark theme */}
                <ThemeToggle />

                {/* Jump to today */}
                <button
                    onClick={() => scrollToToday()}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-3 py-2 rounded-lg text-sm font-bold border border-[#003366]/40 text-[#003366] hover:bg-[#003366]/5 dark:border-[#D4AF37]/60 dark:text-[#D4AF37] dark:hover:bg-[#D4AF37]/10 transition-colors"
                >
                    <Crosshair size={16} /> Today
                </button>

                <button
                    onClick={() => generateICS(filteredEvents)}
                    className="hidden sm:flex items-center gap-2 bg-[#003366] hover:bg-[#002244] text-white dark:bg-[#D4AF37] dark:hover:bg-[#e0bd4a] dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
                >
                    <Download size={16} /> Export ICS
                </button>
            </div>
          </div>

          {/* Filter Bar (Horizontal Scroll on mobile) */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
             <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap border transition-colors ${filterType === 'all' ? 'bg-gray-800 text-white border-gray-800 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100' : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-500'}`}
             >
                All Events
             </button>
             {FILTER_TYPES.map(type => (
                 <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap border transition-colors ${filterType === type ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-gray-400 dark:ring-slate-300' : ''} ${EVENT_COLORS[type].bg} ${EVENT_COLORS[type].text} ${EVENT_COLORS[type].border}`}
                 >
                    <span className={`w-2 h-2 rounded-full bg-current`}></span>
                    {EVENT_LABELS[type]}
                 </button>
             ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8">

        {view === 'agenda' && <AgendaView weeks={weeks} todayStr={todayStr} onEventClick={setSelectedEvent} />}

        {view === 'calendar' && (
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden hidden lg:block">
                {/* Grid Header */}
                <div className="grid grid-cols-[80px_repeat(5,1fr)] bg-[#003366] dark:bg-[#0f2744] text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider text-center border-b border-gray-200 dark:border-slate-800">
                    <div className="p-3 border-r border-white/10">Week</div>
                    <div className="p-3 border-r border-white/10">Monday</div>
                    <div className="p-3 border-r border-white/10">Tuesday</div>
                    <div className="p-3 border-r border-white/10">Wednesday</div>
                    <div className="p-3 border-r border-white/10">Thursday</div>
                    <div className="p-3">Friday</div>
                </div>

                {/* Grid Body */}
                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                    {weeks.map((week, wIndex) => {
                        const monday = week.days[0].dateStr;
                        const isThisWeek = todayStr >= monday && todayStr <= addDays(monday, 6);
                        return (
                        <div key={wIndex} className={`grid grid-cols-[80px_repeat(5,1fr)] group transition-colors min-h-[120px] ${isThisWeek ? 'bg-amber-50/60 dark:bg-[#D4AF37]/[0.06]' : 'hover:bg-yellow-50/40 dark:hover:bg-white/[0.02]'}`}>
                            {/* Week Label */}
                            <div className={`p-2 border-r border-gray-200 dark:border-slate-800 flex flex-col justify-center items-center text-center ${isThisWeek ? 'border-l-4 border-l-[#D4AF37]' : ''}`}>
                                <span className="text-xs font-bold text-[#a8861a] dark:text-[#D4AF37] block mb-1">{week.weekLabel}</span>
                                <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">{week.weekStart.toLocaleDateString('en-GB', {day:'numeric', month:'short'})}</span>
                                {isThisWeek && (
                                    <span className="mt-1 text-[9px] font-bold uppercase bg-[#D4AF37] text-slate-900 px-1.5 py-0.5 rounded">This week</span>
                                )}
                            </div>

                            {/* Days */}
                            {week.days.map((day, dIndex) => {
                                const isToday = day.dateStr === todayStr;
                                const isPast = day.dateStr < todayStr;
                                return (
                                <div
                                    key={dIndex}
                                    data-date={day.dateStr}
                                    className={`p-2 border-r border-gray-200 dark:border-slate-800 last:border-r-0 relative flex flex-col gap-2 scroll-mt-48 ${isToday ? 'bg-amber-50 dark:bg-[#D4AF37]/10 ring-2 ring-inset ring-[#D4AF37] shadow-[0_0_24px_rgba(212,175,55,0.25)] z-10' : ''} ${isPast ? 'opacity-50' : ''}`}
                                >
                                    {/* Date Number */}
                                    <div className="flex justify-between items-center">
                                        <span className={`text-[10px] font-bold ${isToday ? 'text-slate-900 bg-[#D4AF37] px-1.5 py-0.5 rounded-md' : 'text-gray-400 dark:text-slate-500'}`}>
                                            {day.date.getDate()}
                                        </span>
                                        {isToday && (
                                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#a8861a] dark:text-[#D4AF37] animate-pulse">Today</span>
                                        )}
                                    </div>

                                    {/* Events */}
                                    {day.dateStr < '2026-10-01' ? (
                                        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-slate-800/30 rounded border border-dashed border-gray-200 dark:border-slate-700">
                                        </div>
                                    ) : day.isHoliday ? (
                                        <div className="flex-1 flex items-center justify-center p-2 text-center bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-300 text-xs font-bold rounded border border-dashed border-red-200 dark:border-red-500/30">
                                            {day.holidayName}
                                        </div>
                                    ) : day.events.length > 0 ? (
                                        day.events.map(event => {
                                            const colors = EVENT_COLORS[event.type];
                                            return (
                                                <button
                                                    key={event.id}
                                                    onClick={() => setSelectedEvent(event)}
                                                    className={`text-left w-full p-1.5 rounded border-l-[3px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 ${colors.border} ${filteredEvents.find(e=>e.id===event.id) ? 'opacity-100' : 'opacity-20 grayscale'}`}
                                                >
                                                    <div className={`text-[10px] font-bold mb-0.5 ${colors.text}`}>{event.time}</div>
                                                    <div className="text-[11px] font-bold text-gray-800 dark:text-slate-100 leading-tight line-clamp-2">{event.title}</div>
                                                    {event.location && <div className="text-[9px] text-gray-500 dark:text-slate-400 italic mt-0.5 truncate">{event.location}</div>}
                                                </button>
                                            )
                                        })
                                    ) : (
                                        <div className="flex-1 flex items-center justify-center">
                                            <span className="text-[10px] text-gray-300 dark:text-slate-600 font-medium italic">PhD Research</span>
                                        </div>
                                    )}
                                </div>
                            )})}
                        </div>
                    )})}
                    {/* Final Row */}
                    <div className="grid grid-cols-[80px_repeat(5,1fr)] bg-gray-50 dark:bg-slate-900/60 min-h-[60px]">
                        <div className="col-span-6 flex items-center justify-center p-4 text-sm text-gray-400 dark:text-slate-500 italic font-medium">
                             Summer Period (Jun 2027 - Sep 2027) — Focus on Individual PhD Research
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* View switch hint for mobile/desktop mismatch */}
        {view === 'calendar' && (
            <div className="lg:hidden text-center mt-10 p-8 bg-white dark:bg-slate-900 rounded-xl shadow border border-gray-200 dark:border-slate-800">
                <LayoutGrid className="mx-auto h-12 w-12 text-gray-300 dark:text-slate-600 mb-3"/>
                <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">Switch to Agenda View</h3>
                <p className="text-gray-500 dark:text-slate-400 mb-4">The grid view is optimized for desktop screens. For the best mobile experience, use the Agenda view.</p>
                <button onClick={() => setView('agenda')} className="bg-[#003366] text-white dark:bg-[#D4AF37] dark:text-slate-900 px-6 py-2 rounded-lg font-bold">Switch View</button>
            </div>
        )}

      </main>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
};

export default App;
