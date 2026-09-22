import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  try {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; // light is the default
  } catch {
    return 'light';
  }
};

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#020617' : '#003366');
    try { localStorage.setItem('theme', theme); } catch { /* storage unavailable */ }
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="flex items-center justify-center gap-2 w-full sm:w-auto px-3 py-2 rounded-lg text-sm font-medium border transition-colors
                 border-gray-200 text-gray-600 hover:bg-gray-100
                 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {isDark ? <Sun size={16} className="text-[#D4AF37]" /> : <Moon size={16} />}
      <span className="sm:hidden">{isDark ? 'Light theme' : 'Dark theme'}</span>
    </button>
  );
};
