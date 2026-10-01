import React, { useState } from 'react';
import { X, Copy, Check, Download, Apple, CalendarPlus, Info } from 'lucide-react';
import { CalendarEvent } from '../types';
import { generateICS } from '../services/dateService';
import { FEED_FILENAME } from '../services/icsService';

interface SubscribeModalProps {
  events: CalendarEvent[];
  onClose: () => void;
}

/**
 * The feed is a static file written into dist/ at build time (see vite.config.ts),
 * so the URL is simply the site URL + filename.
 *   https://  — what Google and Outlook on the web ask for
 *   webcal:// — the same file; clicking it opens the desktop calendar app directly
 */
const feedHttpUrl = () => {
  const base = `${window.location.origin}${import.meta.env.BASE_URL}`.replace(/\/+$/, '/');
  return `${base}${FEED_FILENAME}`;
};

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ events, onClose }) => {
  const [copied, setCopied] = useState(false);
  const httpUrl = feedHttpUrl();
  const webcalUrl = httpUrl.replace(/^https?:/, 'webcal:');
  const googleUrl = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcalUrl)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(httpUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this calendar address:', httpUrl);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#a8861a] dark:text-[#D4AF37]">
              Stay in sync
            </span>
            <h2 className="text-xl font-bold text-[#003366] dark:text-slate-50 leading-tight">
              Subscribe to the CDT calendar
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-600 dark:text-slate-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
            Subscribing links your calendar to this planner. When a session moves, a room changes
            or Semester&nbsp;2 is added, it updates in your calendar automatically — no need to
            download anything again.
          </p>

          <div className="space-y-2">
            <a
              href={webcalUrl}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Apple size={18} className="text-gray-700 dark:text-slate-300 shrink-0" />
              <span className="text-sm font-medium text-gray-800 dark:text-slate-100">Apple Calendar / Outlook desktop</span>
            </a>

            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              <CalendarPlus size={18} className="text-gray-700 dark:text-slate-300 shrink-0" />
              <span className="text-sm font-medium text-gray-800 dark:text-slate-100">Google Calendar</span>
            </a>
          </div>

          {/* Manual URL */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
              Or paste this address into any calendar app
            </label>
            <div className="flex gap-2">
              <input
                readOnly
                value={httpUrl}
                onFocus={e => e.currentTarget.select()}
                className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 text-xs font-mono text-gray-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-[#003366] dark:focus:ring-[#D4AF37]"
              />
              <button
                onClick={copy}
                className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold bg-[#003366] hover:bg-[#002244] text-white dark:bg-[#D4AF37] dark:hover:bg-[#e0bd4a] dark:text-slate-900 transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="flex items-start gap-2 text-xs text-gray-500 dark:text-slate-500">
              <Info size={14} className="shrink-0 mt-0.5" />
              In Outlook on the web choose “Add calendar → Subscribe from web”. Apple checks for
              changes roughly hourly; Google can take up to a day.
            </p>
          </div>

          <hr className="border-gray-100 dark:border-slate-800" />

          {/* One-off download */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100">Prefer a one-off copy?</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Downloads a snapshot that will not update later.
              </p>
            </div>
            <button
              onClick={() => generateICS(events, FEED_FILENAME)}
              className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Download size={16} /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
