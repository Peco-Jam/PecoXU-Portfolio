import React, { useEffect, useState } from 'react';
import { ArrowUpToLine, Moon, Sun } from 'lucide-react';
import { PROFILE } from '../data';

interface TopBannerProps {
  onNameClick: () => void;
  onTopClick: () => void;
}

export default function TopBanner({ onNameClick, onTopClick }: TopBannerProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial preference
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white/40 dark:bg-black/50 backdrop-blur-2xl saturate-150 z-50 border-b border-black/5 dark:border-white/10 flex items-center justify-between px-4 md:px-5 lg:px-8 transition-all duration-500">
      <div className="flex items-center gap-3 md:gap-4">
        <button 
          onClick={onNameClick}
          className="text-[18px] md:text-[24px] leading-tight font-[500] tracking-tight uppercase text-[#111] dark:text-white/90 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-105"
        >
          {PROFILE.name}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button 
          onClick={onTopClick}
          className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
          aria-label="Back to top"
        >
          <ArrowUpToLine className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
