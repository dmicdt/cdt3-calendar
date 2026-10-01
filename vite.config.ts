import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { INITIAL_EVENTS, CALENDAR_END } from './constants';
import { buildICS, FEED_FILENAME } from './services/icsService';

/**
 * Writes the subscribable calendar feed into the build output, so GitHub Pages
 * serves it as a plain static file at <site>/cdt-cohort3.ics. Subscribers'
 * calendar apps re-fetch that URL, which is why editing constants.ts and pushing
 * is enough to update everybody's calendar.
 */
const icsFeed = (): Plugin => ({
  name: 'cdt-ics-feed',
  buildStart() {
    const events = INITIAL_EVENTS.filter(e => e.date <= CALENDAR_END);
    this.emitFile({
      type: 'asset',
      fileName: FEED_FILENAME,
      source: buildICS(events, { stamp: new Date() }),
    });
    console.log(`\n  ✓ calendar feed: ${FEED_FILENAME} (${events.length} events)\n`);
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), icsFeed()],
  // 'base: ./' ensures the app works if hosted at root (dmicdt.github.io)
  // or a subdirectory (dmicdt.github.io/planner)
  base: '/cdt3-calendar/',
  build: {
    outDir: 'dist',
  }
});
