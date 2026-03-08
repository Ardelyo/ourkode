import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { haptics } from '../utils/haptics';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    haptics.trigger(50);
    
    // Add transition class
    document.documentElement.classList.add('theme-transitioning');
    
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }

    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 500);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#1A1A1A] text-[#F5F5F0] dark:bg-[#F5F5F0] dark:text-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}
