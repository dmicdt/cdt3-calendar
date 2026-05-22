import { CalendarEvent } from './types';

export const HOLIDAYS: Record<string, string> = {
  '2026-12-25': 'Christmas Day', '2026-12-26': 'Boxing Day',
  '2026-12-29': 'Uni Closure', '2026-12-30': 'Uni Closure', '2026-12-31': 'Uni Closure',
  '2027-01-01': 'New Year’s Day', '2027-01-02': 'VC Day',
  '2027-04-02': 'Uni Closure', '2027-04-03': 'Good Friday', '2027-04-06': 'Easter Monday',
  '2027-04-07': 'Uni Closure', '2027-04-08': 'Uni Closure',
  '2027-05-04': 'Early May Bank Holiday', '2027-05-25': 'Spring Bank Holiday', 
  '2027-08-31': 'August Bank Holiday',
  // University of Surrey 2027/27 winter closure
  '2027-12-24': "Vice-Chancellor's discretionary day",
  '2027-12-25': 'Christmas Day',
  '2027-12-28': 'Boxing Day (substitute day)',
  '2027-12-29': 'Uni Closure',
  '2027-12-30': 'Uni Closure',
  '2027-12-31': 'Uni Closure',
};

// Helper to generate unique IDs
const id = () => Math.random().toString(36).substr(2, 9);

export const INITIAL_EVENTS: CalendarEvent[] = [
  // OCT 2026 - Induction Week
  { id: id(), date: "2026-10-01", time: "9:45-17:30", title: "CDT Induction Day 1", location: "Surrey 21BA02", type: "core" },
  { id: id(), date: "2026-10-02", time: "10:30-12:00", title: "RHUL Doctoral School Induction", location: "RHUL Davison 104", type: "core" },
  { id: id(), date: "2026-10-02", time: "10:00-13:00", title: "Surrey Registration", location: "Hive & 23BA02", type: "core" },
  { id: id(), date: "2026-10-02", time: "14:00-16:00", title: "What's a PhD?", location: "Online", type: "core" },
  { id: id(), date: "2026-10-03", time: "10:00-13:00", title: "Introduction to Inclusion", location: "RHUL Windsor 103", type: "inclusion" },
  { id: id(), date: "2026-10-03", time: "13:00-15:00", title: "Welcome to RHUL Lunch", location: "RHUL StoryFutures", type: "core" },
  
  // AI BOOTCAMP
  { id: id(), date: "2026-10-06", time: "9:45-15:30", title: "AI Bootcamp", location: "Surrey 03AA01", type: "ai" },
  { id: id(), date: "2026-10-07", time: "9:45-15:30", title: "AI Bootcamp", location: "Surrey 03AA01", type: "ai" },
  { id: id(), date: "2026-10-08", time: "9:00-10:00", title: "PhD Research with Adrian", location: "35BA00 / Online", type: "core" },
  { id: id(), date: "2026-10-08", time: "13:00-15:30", title: "AI Bootcamp", location: "Surrey 03AA01", type: "ai" },
  { id: id(), date: "2026-10-09", time: "9:45-15:30", title: "AI Bootcamp", location: "Surrey 03AA01", type: "ai" },
  { id: id(), date: "2026-10-10", time: "9:45-15:30", title: "AI Bootcamp", location: "Surrey 03AA01", type: "ai" },

  // OCT Mid
  { id: id(), date: "2026-10-14", time: "10:00-13:00", title: "Inclusive Creative Practice", location: "RHUL Lamar Lab", type: "inclusion" },
  { id: id(), date: "2026-10-14", time: "13:00-14:30", title: "Supervisors Networking Lunch", location: "RHUL", type: "core" },
  
  { id: id(), date: "2026-10-15", time: "10:00-16:00", title: "Open Inclusion (in person)", location: "Surrey 21BA02", type: "inclusion" },
  
  { id: id(), date: "2026-10-16", time: "13:00-14:30", title: "Supervisors Networking Lunch", location: "Surrey", type: "core" },
  { id: id(), date: "2026-10-16", time: "09:30-12:00", title: "AI Bootcamp++", location: "Surrey 21BA02", type: "ai", mandatory: true },
  
  // OCT Late
  { id: id(), date: "2026-10-20", time: "10:00-12:30", title: "Welcome to your Doctorate", location: "Surrey", type: "core" },
  
  { id: id(), date: "2026-10-21", time: "10:00-13:00", title: "Inclusive Creative Practice", location: "RHUL Lamar Lab", type: "inclusion" },
  { id: id(), date: "2026-10-21", time: "14:00-15:30", title: "Introduction to Miro", location: "RHUL Lamar Lab", type: "core" },
  
  { id: id(), date: "2026-10-22", time: "09:00-10:00", title: "Individual PhD Research with Adrian", location: "Surrey 21BA02", type: "core" },
  { id: id(), date: "2026-10-22", time: "10:00-13:00", title: "What's a PhD with Cohort 1", location: "Surrey 21BA02", type: "core" },
  { id: id(), date: "2026-10-22", time: "14:00-16:00", title: "Doctoral College Induction (Surrey Researchers)", location: "Surrey", type: "core" },

  { id: id(), date: "2026-10-23", time: "13:00-16:00", title: "FEPS PGR Induction (Surrey Researchers)", location: "Surrey", type: "core" },
  { id: id(), date: "2026-10-23", time: "10:00-12:00", title: "AI Bootcamp++", location: "Surrey 21BA02", type: "ai", mandatory: true },

  { id: id(), date: "2026-10-28", time: "10:00-13:00", title: "Inclusive Creative Practice", location: "RHUL Lamar Lab", type: "inclusion" },
  
  { id: id(), date: "2026-10-29", time: "09:00-11:00", title: "CVSSP & PAI Induction", location: "Surrey 21BA02", type: "core" },
  { id: id(), date: "2026-10-29", time: "11:30-16:00", title: "Team Activity", location: "Surrey 21BA02", type: "core" },

  { id: id(), date: "2026-10-30", time: "12:00-13:00", title: "AI Surgery (optional)", location: "Surrey 21BA02", type: "ai" },
  { id: id(), date: "2026-10-30", time: "14:00-16:00", title: "What’s a PhD? Research Methods - Quants", location: "Surrey 21BA02", type: "core" },

  // NOV
  { id: id(), date: "2026-11-04", time: "14:00-15:00", title: "Drop-in with Open Inclusion", location: "Online", type: "inclusion" },

  { id: id(), date: "2026-11-05", time: "", title: "Individual PhD Research with Adrian", location: "21BA02 or online", type: "core" },
  { id: id(), date: "2026-11-05", time: "10:00-13:30", title: "Open Inclusion Session", location: "Online", type: "inclusion" },

  { id: id(), date: "2026-11-06", time: "10:00-12:00", title: "AI Bootcamp++", location: "Surrey 35BA00", type: "ai", mandatory: true },
  { id: id(), date: "2026-11-06", time: "14:00-16:00", title: "Mini Challenge prep", location: "Surrey 21BA02", type: "core" },

  { id: id(), date: "2026-11-11", time: "10:00-13:00", title: "Inclusive Creative Practice", location: "RHUL Lamar Lab", type: "inclusion" },
  { id: id(), date: "2026-11-11", time: "14:00-15:00", title: "Open Inclusion Drop in", location: "Online", type: "inclusion" },

  { id: id(), date: "2026-11-12", time: "10:00-13:30", title: "Open Inclusion Sessions", location: "Online", type: "inclusion" },

  { id: id(), date: "2026-11-13", time: "10:00-12:00", title: "AI Bootcamp++", location: "Surrey 21BA02", type: "ai", mandatory: true },
  { id: id(), date: "2026-11-13", time: "12:00-13:00", title: "AI Surgery (optional)", location: "Surrey 21BA02", type: "ai" },
  { id: id(), date: "2026-11-13", time: "14:00-16:00", title: "What’s a PhD? Research Methods – Qual", location: "Surrey 21BA02", type: "core" },

  // DEC
  { id: id(), date: "2026-12-02", time: "10:00-13:00", title: "Inclusive Creative Practice", location: "RHUL Lamar Lab", type: "inclusion" },
  { id: id(), date: "2026-12-02", time: "14:00-15:00", title: "Open Inclusion Drop in", location: "Online", type: "inclusion" },

  { id: id(), date: "2026-12-03", time: "All Day", title: "CVMP (optional)", location: "TBD", type: "core" },
  { id: id(), date: "2026-12-04", time: "All Day", title: "CVMP (optional)", location: "TBD", type: "core" },
  { id: id(), date: "2026-12-05", time: "16:00-17:00", title: "Open Inclusion Assessment 1 deadline", location: "-", type: "inclusion" },

  { id: id(), date: "2026-12-09", time: "10:00-13:00", title: "Inclusive Creative Practice", location: "RHUL Lamar Lab", type: "inclusion" },
  { id: id(), date: "2026-12-09", time: "14:00-15:00", title: "Open Inclusion Drop in", location: "Online", type: "inclusion" },

  { id: id(), date: "2026-12-10", time: "10:00-13:30", title: "Open Inclusion Session", location: "Online", type: "inclusion" },

  { id: id(), date: "2026-12-11", time: "11:00-12:00", title: "External Seminar", location: "Surrey 21BA02", type: "core" },
  { id: id(), date: "2026-12-11", time: "13:30-14:30", title: "Practice-based PhD (optional)", location: "Online", type: "core" },
  { id: id(), date: "2026-12-11", time: "15:00-16:00", title: "What's a PhD?", location: "Online", type: "core" },
  
  { id: id(), date: "2026-12-16", time: "14:00-15:00", title: "Open Inclusion Drop in", location: "Online", type: "inclusion" },

  { id: id(), date: "2026-12-17", time: "10:00-13:30", title: "Open Inclusion Session", location: "Online", type: "inclusion" },

// ------------- 2027 -----------------
  { id: id(), date: "2027-01-08", time: "15:00-16:00", title: "Open Inclusion Drop in", location: "Online", type: "inclusion" },
  { id: id(), date: "2027-01-13", time: "11:00-11:45", title: "Mini Challenge Feedback -- Creative Equity", location: "Online", type: "core" },
  { id: id(), date: "2027-01-13", time: "12:00-12:45", title: "Mini Challenge Feedback -- Learning Difference Adaptation", location: "Online", type: "core" },
  { id: id(), date: "2027-01-13", time: "13:00-13:45", title: "Mini Challenge Feedback -- Media Archive Discoverability", location: "Online", type: "core" },
  { id: id(), date: "2027-01-13", time: "15:30-16:15", title: "Mini Challenge Feedback -- Adapting to Emotion", location: "Online", type: "core" },
  { id: id(), date: "2027-01-15", time: "16:00-17:00", title: "Open Inclusion Assessment 2 deadline", location: "-", type: "inclusion" },
  { id: id(), date: "2027-01-16", time: "14:00-14:45", title: "Mini Challenge Feedback -- Community Driven Futures", location: "Online", type: "core" },
  
  // CHALLENGES (Simulating ranges with explicit entries for simplicity of the example)
  { id: id(), date: "2027-01-19", time: "", title: "CDT Industry Event", location: "Google London", type: "challenge" },
  
  // ETHICS
  { id: id(), date: "2027-01-20", time: "10:00-16:00", title: "Ethics Bootcamp", location: "21BA02", type: "ethics" },
  { id: id(), date: "2027-01-21", time: "10:00-16:00", title: "Ethics Bootcamp", location: "21BA02", type: "ethics" },
  { id: id(), date: "2027-01-22", time: "10:00-16:00", title: "Ethics Bootcamp", location: "21BA02", type: "ethics" },

  // AI SURGERIES
  { id: id(), date: "2027-01-29", time: "11:00-12:30", title: "AI Surgery (optional)", location: "21BA02", type: "ai" },
  { id: id(), date: "2027-02-05", time: "11:00-12:30", title: "AI Surgery (optional)", location: "32BA00", type: "ai" },
  { id: id(), date: "2027-02-12", time: "11:00-12:30", title: "AI Surgery (optional)", location: "32BA00", type: "ai" },

  // RRI
  { id: id(), date: "2027-03-12", time: "09:00-17:00", title: "RRI with Orbit Day 1", location: "21BA02", type: "ethics" },
  { id: id(), date: "2027-03-19", time: "09:00-17:00", title: "RRI with Orbit Day 2", location: "21BA02", type: "ethics" },

  // Optional
  { id: id(), date: "2027-03-26", time: "11:00-12:45", title: "Academic Writing and Research Good Practice (optional)", location: "21BA02", type: "core" },
  { id: id(), date: "2027-03-31", time: "11:00-12:30", title: "Industry Skills Sharing by Tom Grey (optional)", location: "21BA02", type: "core" },

  { id: id(), date: "2027-04-20", time: "All Day", title: "Spring Challenges kick-off event (Please see calendar invite for more details)", location: "Shilling Building, RHUL", type: "challenge" },
  { id: id(), date: "2027-05-29", time: "All Day", title: "CDT Spring Challenge Final Presentations (Please see calendar invite for more details)", location: "Surrey 02IFH01", type: "challenge" },

  { id: id(), date: "2027-06-04", time: "13:30-14:30", title: "External Seminar with Philip McLauchlan", location: "21BA02", type: "core" },
];

// Helper to fill in ranges (Mini Challenge, etc)
const addRange = (start: string, end: string, title: string, type: 'core' | 'challenge') => {
    let curr = new Date(start);
    const stop = new Date(end);
    while (curr <= stop) {
        const d = curr.getDay();
        const iso = curr.toISOString().split('T')[0];
        if (d !== 0 && d !== 6 && !HOLIDAYS[iso]) {
             // Avoid adding duplicates if already manually added above
             if(!INITIAL_EVENTS.find(e => e.date === iso)) {
                 INITIAL_EVENTS.push({
                     id: id(),
                     date: iso,
                     title: title,
                     location: 'Various',
                     type: type,
                     time: 'All Day'
                 });
             }
        }
        curr.setDate(curr.getDate() + 1);
    }
};

addRange('2026-11-17', '2026-11-28', 'Mini Challenge', 'challenge');
addRange('2027-04-21', '2027-05-28', 'Main Challenge', 'challenge');
