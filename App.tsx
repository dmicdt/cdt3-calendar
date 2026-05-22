import React, { useState, useMemo } from 'react';
import { INITIAL_EVENTS } from './constants';
import { generateAcademicYear, generateICS } from './services/dateService';
import { EventModal } from './components/EventModal';
import { AgendaView } from './components/AgendaView';
import { CalendarEvent, EventType, EVENT_COLORS } from './types';
import { 
    Download, 
    Search, 
    LayoutGrid, 
    List, 
    Calendar as CalendarIcon
} from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'calendar' | 'agenda'>('calendar');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<EventType | 'all'>('all');

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
    return generateAcademicYear('2025-09-29', '2027-01-01', filteredEvents);
  }, [filteredEvents]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            
            {/* Brand */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="h-12 w-1.5 bg-[#D4AF37] rounded-full hidden sm:block"></div>
                <div>
                    <h1 className="text-xl lg:text-2xl font-extrabold text-[#003366] uppercase tracking-tight leading-none">
                        CDT Year Planner
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-1">
                        <span className="bg-[#003366] text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">25/26</span>
                        <span>AI for Digital Media Inclusion</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                
                {/* Search */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search events..." 
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#003366] focus:border-transparent outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* View Toggles */}
                <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 w-full sm:w-auto">
                    <button 
                        onClick={() => setView('calendar')}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all ${view === 'calendar' ? 'bg-white text-[#003366] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <CalendarIcon size={16} /> <span className="hidden sm:inline">Grid</span>
                    </button>
                    <button 
                        onClick={() => setView('agenda')}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all ${view === 'agenda' ? 'bg-white text-[#003366] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <List size={16} /> <span className="hidden sm:inline">Agenda</span>
                    </button>
                </div>

                <button 
                    onClick={() => generateICS(filteredEvents)}
                    className="hidden sm:flex items-center gap-2 bg-[#003366] hover:bg-[#002244] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
                >
                    <Download size={16} /> Export ICS
                </button>
            </div>
          </div>

          {/* Filter Bar (Horizontal Scroll on mobile) */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
             <button 
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap border transition-colors ${filterType === 'all' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
             >
                All Events
             </button>
             {(['core', 'ai', 'inclusion', 'ethics', 'challenge'] as EventType[]).map(type => (
                 <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap border transition-colors ${filterType === type ? 'ring-2 ring-offset-1 ring-gray-300' : ''} ${EVENT_COLORS[type].bg} ${EVENT_COLORS[type].text} ${EVENT_COLORS[type].border}`}
                 >
                    <span className={`w-2 h-2 rounded-full bg-current`}></span>
                    {type}
                 </button>
             ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8">
        
        {view === 'agenda' && <AgendaView weeks={weeks} onEventClick={setSelectedEvent} />}

        {view === 'calendar' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hidden lg:block">
                {/* Grid Header */}
                <div className="grid grid-cols-[80px_repeat(5,1fr)] bg-[#003366] text-white text-xs font-bold uppercase tracking-wider text-center border-b border-[#004080]">
                    <div className="p-3 border-r border-white/10">Week</div>
                    <div className="p-3 border-r border-white/10">Monday</div>
                    <div className="p-3 border-r border-white/10">Tuesday</div>
                    <div className="p-3 border-r border-white/10">Wednesday</div>
                    <div className="p-3 border-r border-white/10">Thursday</div>
                    <div className="p-3">Friday</div>
                </div>

                {/* Grid Body */}
                <div className="divide-y divide-gray-100">
                    {weeks.map((week, wIndex) => (
                        <div key={wIndex} className="grid grid-cols-[80px_repeat(5,1fr)] group hover:bg-yellow-50/30 transition-colors min-h-[120px]">
                            {/* Week Label */}
                            <div className="p-2 border-r border-gray-100 flex flex-col justify-center items-center text-center">
                                <span className="text-xs font-bold text-[#D4AF37] block mb-1">{week.weekLabel}</span>
                                <span className="text-[10px] text-gray-400 font-mono">{week.weekStart.toLocaleDateString('en-GB', {day:'numeric', month:'short'})}</span>
                            </div>

                            {/* Days */}
                            {week.days.map((day, dIndex) => (
                                <div key={dIndex} className={`p-2 border-r border-gray-100 last:border-r-0 relative flex flex-col gap-2 ${day.isToday ? 'bg-blue-50/30' : ''}`}>
                                    {day.isToday && <div className="absolute top-0 left-0 w-full h-1 bg-[#3498db]"></div>}
                                    
                                    {/* Date Number */}
                                    <div className="flex justify-between items-start">
                                        <span className={`text-[10px] font-bold ${day.isToday ? 'text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-md' : 'text-gray-400'}`}>
                                            {day.date.getDate()}
                                        </span>
                                    </div>

                                    {/* Events */}
                                    {day.dateStr < '2025-10-01' ? (
                                        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-200">
                                        </div>
                                    ) : day.isHoliday ? (
                                        <div className="flex-1 flex items-center justify-center p-2 text-center bg-red-50 text-red-800 text-xs font-bold rounded border border-dashed border-red-200 opacity-80">
                                            {day.holidayName}
                                        </div>
                                    ) : day.events.length > 0 ? (
                                        day.events.map(event => {
                                            const colors = EVENT_COLORS[event.type];
                                            return (
                                                <button
                                                    key={event.id}
                                                    onClick={() => setSelectedEvent(event)}
                                                    className={`text-left w-full p-1.5 rounded border-l-[3px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-white ${colors.border} ${filteredEvents.find(e=>e.id===event.id) ? 'opacity-100' : 'opacity-20 grayscale'}`}
                                                >
                                                    <div className="text-[10px] font-bold text-gray-500 mb-0.5">{event.time}</div>
                                                    <div className="text-[11px] font-bold text-gray-800 leading-tight line-clamp-2">{event.title}</div>
                                                    {event.location && <div className="text-[9px] text-gray-400 italic mt-0.5 truncate">{event.location}</div>}
                                                </button>
                                            )
                                        })
                                    ) : (
                                        <div className="flex-1 flex items-center justify-center">
                                            <span className="text-[10px] text-gray-300 font-medium italic">PhD Research</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    {/* Final Row */}
                    <div className="grid grid-cols-[80px_repeat(5,1fr)] bg-gray-50 min-h-[60px]">
                        <div className="col-span-6 flex items-center justify-center p-4 text-sm text-gray-500 italic font-medium">
                             Summer Period (Jun 2026 - Sep 2026) — Focus on Individual PhD Research
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* View switch hint for mobile/desktop mismatch */}
        {view === 'calendar' && (
            <div className="lg:hidden text-center mt-10 p-8 bg-white rounded-xl shadow border border-gray-200">
                <LayoutGrid className="mx-auto h-12 w-12 text-gray-300 mb-3"/>
                <h3 className="text-lg font-bold text-gray-800">Switch to Agenda View</h3>
                <p className="text-gray-500 mb-4">The grid view is optimized for desktop screens. For the best mobile experience, use the Agenda view.</p>
                <button onClick={() => setView('agenda')} className="bg-[#003366] text-white px-6 py-2 rounded-lg font-bold">Switch View</button>
            </div>
        )}

      </main>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
};

export default App;