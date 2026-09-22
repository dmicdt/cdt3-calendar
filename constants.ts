import { CalendarEvent, EventType } from './types';

export const HOLIDAYS: Record<string, string> = {
  // Winter vacation at RHUL & Surrey begins Thu 24 Dec 2026 (per Sem 1 training plan)
  '2026-12-24': 'Winter Vacation',
  '2026-12-25': 'Christmas Day', '2026-12-26': 'Boxing Day',
  '2026-12-28': 'Boxing Day (substitute day)',
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
  // ============================================================
  // SEMESTER 1 — from "CDT Cohort 3 Training Plan" (Sem 1 sheet)
  // ============================================================

  // --- Induction Week 1 (w/c 28 Sep 2026) ---
  { id: id(), date: "2026-10-01", time: "10:00-16:00", title: "CDT Induction Day 1", location: "Surrey 21BA02", type: "core" },
  { id: id(), date: "2026-10-02", time: "10:00-12:00", title: "Induction Day 2 – What's a PhD?", location: "RHUL Windsor Building 0-04", type: "core" },
  { id: id(), date: "2026-10-02", time: "12:00-13:00", title: "Induction Lunch", location: "RHUL Shilling Level 2 Foyer", type: "core" },
  { id: id(), date: "2026-10-02", time: "13:00-14:00", title: "RHUL Tour", location: "RHUL", type: "core" },

  // --- Induction Week 2 / AI Bootcamp (w/c 5 Oct 2026) ---
  { id: id(), date: "2026-10-05", time: "", title: "Individual research", location: "-", type: "research" },
  { id: id(), date: "2026-10-06", time: "10:00-15:30", title: "AI Bootcamp Day 1", location: "Surrey 35BA00", type: "ai" },
  { id: id(), date: "2026-10-07", time: "10:00-15:30", title: "AI Bootcamp Day 2", location: "Surrey 35BA00", type: "ai" },
  { id: id(), date: "2026-10-08", time: "10:00-15:30", title: "AI Bootcamp Day 3", location: "Surrey 35BA00", type: "ai" },

  // --- Week 3 (w/c 12 Oct 2026) ---
  { id: id(), date: "2026-10-13", time: "10:00-13:00", title: "Creative Practice – Introduction to Miro", location: "RHUL Arts External Seminar Room", type: "creative" },
  { id: id(), date: "2026-10-13", time: "13:00-14:00", title: "Lunch (provided)", location: "RHUL", type: "core" },
  { id: id(), date: "2026-10-13", time: "14:00-16:00", title: "Supervisors Networking Event", location: "RHUL (room TBC)", type: "core" },
  { id: id(), date: "2026-10-14", time: "10:00-15:00", title: "Inclusive Research Session 1", location: "Surrey 35BA00", type: "inclusion" },
  { id: id(), date: "2026-10-15", time: "10:00-13:00", title: "AI Bootcamp++", location: "Surrey 35BA00", type: "ai", mandatory: true },
  { id: id(), date: "2026-10-15", time: "13:00-14:00", title: "Lunch (to book)", location: "Surrey", type: "core" },
  { id: id(), date: "2026-10-15", time: "14:00-16:00", title: "Supervisors Networking Event", location: "Surrey 21BA02 & 35BA00", type: "core" },

  // --- Week 4 (w/c 19 Oct 2026) ---
  { id: id(), date: "2026-10-20", time: "10:00-13:00", title: "Creative Practice – Sprint Process", location: "RHUL Arts External Seminar Room", type: "creative" },
  { id: id(), date: "2026-10-21", time: "10:00-13:00", title: "Inclusive Research Session 2", location: "Surrey 35BA00", type: "inclusion" },
  { id: id(), date: "2026-10-21", time: "13:00-15:30", title: "Lunch + Researcher Development (good practice with Cohorts 1 & 2)", location: "Surrey", type: "development" },
  { id: id(), date: "2026-10-22", time: "10:00-13:00", title: "AI Bootcamp++", location: "Surrey 35BA00", type: "ai", mandatory: true },
  { id: id(), date: "2026-10-22", time: "14:00-16:00", title: "Researcher Development – PAI Induction (TBC) or Internal Seminar", location: "Surrey 35BA02", type: "development" },

  // --- Week 5 (w/c 26 Oct 2026) ---
  { id: id(), date: "2026-10-27", time: "10:00-13:00", title: "Creative Practice – Serious Games", location: "RHUL Arts External Seminar Room", type: "creative" },
  { id: id(), date: "2026-10-28", time: "10:00-16:00", title: "Open Inclusion", location: "Surrey 35BA00 or 21BA02", type: "inclusion" },
  { id: id(), date: "2026-10-29", time: "10:00-13:00", title: "AI Bootcamp++", location: "Surrey 35BA00", type: "ai", mandatory: true },
  { id: id(), date: "2026-10-29", time: "14:00-16:00", title: "Researcher Development – Research Methods (Quantitative)", location: "Surrey 35BA00", type: "development" },

  // --- Week 6 (w/c 2 Nov 2026) ---
  { id: id(), date: "2026-11-03", time: "10:00-13:00", title: "Creative Practice – Who is it for? Rethinking audience and user research", location: "RHUL Arts External Seminar Room", type: "creative" },
  { id: id(), date: "2026-11-04", time: "10:00-13:00", title: "Inclusive Research Session 3", location: "Surrey 35BA00", type: "inclusion" },
  { id: id(), date: "2026-11-04", time: "14:00-16:00", title: "Researcher Development – Cohort Building", location: "Surrey 35BA00", type: "development" },
  { id: id(), date: "2026-11-05", time: "10:00-13:00", title: "AI Bootcamp++", location: "Surrey 35BA00", type: "ai", mandatory: true },
  { id: id(), date: "2026-11-05", time: "14:00-16:00", title: "Researcher Development – Research Methods (Qualitative & Mixed)", location: "Surrey 35BA00", type: "development" },

  // --- Week 7 (w/c 9 Nov 2026) ---
  { id: id(), date: "2026-11-10", time: "10:00-13:00", title: "Creative Practice – Working with Audiences", location: "RHUL Arts External Seminar Room", type: "creative" },
  { id: id(), date: "2026-11-11", time: "All Day", title: "CDT Conference / IAB", location: "Surrey", type: "core" },
  { id: id(), date: "2026-11-12", time: "10:00-13:00", title: "AI Bootcamp++", location: "Surrey 35BA00", type: "ai", mandatory: true },
  { id: id(), date: "2026-11-12", time: "14:00-16:00", title: "Researcher Development – Presentation Skills", location: "Surrey 35BA00", type: "development" },

  // --- Mini Challenge Week 1 (w/c 16 Nov 2026) ---
  { id: id(), date: "2026-11-17", time: "All Day", title: "Mini Challenge – Hackathon Session", location: "Surrey 21BA02 (TBC 02IFH01)", type: "challenge" },
  { id: id(), date: "2026-11-18", time: "10:00-16:00", title: "Mini Challenge – Hackathon Prep", location: "TBC", type: "challenge" },
  { id: id(), date: "2026-11-19", time: "10:00-16:00", title: "Mini Challenge – Hackathon Prep", location: "TBC", type: "challenge" },
  { id: id(), date: "2026-11-20", time: "All Day", title: "Mini Challenge – Google Event kick-off", location: "TBC", type: "challenge" },

  // (Mini Challenge Week 2, 23–27 Nov, is generated by addRange below)

  // --- Week 10 (w/c 30 Nov 2026) ---
  { id: id(), date: "2026-12-01", time: "10:00-14:00", title: "Creative Practice – Creative Bootcamp", location: "RHUL", type: "creative" },
  { id: id(), date: "2026-12-02", time: "10:00-13:00", title: "Inclusive Research Session 4", location: "Surrey 35BA00", type: "inclusion" },
  { id: id(), date: "2026-12-02", time: "14:00-15:00", title: "Guest Lecture", location: "Surrey", type: "core" },
  { id: id(), date: "2026-12-03", time: "10:00-15:30", title: "Ethics Bootcamp – Ethics Foundations", location: "Surrey 35BA00", type: "ethics" },

  // --- Week 11 (w/c 7 Dec 2026) ---
  { id: id(), date: "2026-12-05", time: "16:00-17:00", title: "Open Inclusion Assessment 1 deadline", location: "-", type: "inclusion" },
  { id: id(), date: "2026-12-08", time: "All Day", title: "CVMP, London (optional – attendance TBC)", location: "London", type: "core" },
  { id: id(), date: "2026-12-09", time: "All Day", title: "CVMP, London (optional – attendance TBC)", location: "London", type: "core" },
  { id: id(), date: "2026-12-10", time: "10:00-15:30", title: "Ethics Bootcamp – Ethics Session for all cohorts", location: "Surrey 35BA00", type: "ethics" },

  // --- Week 12 (w/c 14 Dec 2026) ---
  { id: id(), date: "2026-12-14", time: "10:00-13:00", title: "Creative Practice – VP Workshop", location: "RHUL Futures Studio", type: "creative" },

  // Winter vacation at RHUL & Surrey begins 24 Dec 2026 (see HOLIDAYS above)

// ------------- 2027 (unchanged – not covered by the Sem 1 sheet) -----------------
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
const addRange = (
  start: string,
  end: string,
  title: string,
  type: EventType,
  location: string = 'Various'
) => {
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
                     location: location,
                     type: type,
                     time: 'All Day'
                 });
             }
        }
        curr.setDate(curr.getDate() + 1);
    }
};

addRange('2026-11-23', '2026-11-27', 'Mini Challenge Hackathon', 'challenge', 'RHUL Futures Studio & Shilling Meeting Rooms');
addRange('2027-04-21', '2027-05-28', 'Main Challenge', 'challenge');

// Individual research days from the Semester 1 training plan.
// Rendered in grey via the 'research' event type.
const RESEARCH_DAYS = [
  '2026-10-09', '2026-10-12', '2026-10-16', '2026-10-19', '2026-10-23', '2026-10-26', '2026-10-30',
  '2026-11-02', '2026-11-06', '2026-11-09', '2026-11-13', '2026-11-16', '2026-11-30',
  '2026-12-04', '2026-12-07', '2026-12-11',
  '2026-12-15', '2026-12-16', '2026-12-17', '2026-12-18',
  '2026-12-21', '2026-12-22', '2026-12-23',
];

RESEARCH_DAYS.forEach((date) => {
  if (!INITIAL_EVENTS.find((e) => e.date === date)) {
    INITIAL_EVENTS.push({
      id: id(),
      date,
      time: '',
      title: 'Individual research',
      location: '-',
      type: 'research',
    });
  }
});
