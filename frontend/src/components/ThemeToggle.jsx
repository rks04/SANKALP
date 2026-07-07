import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div 
      onClick={toggleTheme}
      className={`relative w-[110px] h-10 rounded-full cursor-pointer flex items-center px-1 transition-colors duration-500 overflow-hidden ${
        isDark ? 'bg-[#1A1816]' : 'bg-[#DCD5C9]'
      }`}
      style={{ boxShadow: 'inset 0 4px 10px rgba(0, 0, 0, 0.15)' }}
    >
      <div className="absolute inset-0 flex justify-between items-center px-3.5 pointer-events-none text-xs font-bold uppercase tracking-widest z-0">
        <span className={`transition-opacity duration-300 ${isDark ? 'opacity-100 text-[var(--color-brand-secondary)]' : 'opacity-0'}`}>Dark</span>
        <span className={`transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100 text-[var(--color-brand-secondary)]'}`}>Light</span>
      </div>
      
      <motion.div
        layout
        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border z-10 ${
          isDark 
            ? 'bg-white/10 border-white/20 backdrop-blur-md' 
            : 'bg-white/40 border-white/40 backdrop-blur-md'
        }`}
        animate={{ 
          x: isDark ? 62 : 0, 
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon size={14} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        ) : (
          <Sun size={14} className="text-[var(--color-brand-text)] drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        )}
      </motion.div>
    </div>
  );
}
