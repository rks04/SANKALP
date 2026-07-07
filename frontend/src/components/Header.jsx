import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <div className="w-full flex justify-center pt-6 px-4 sticky top-0 z-50 pointer-events-none">
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass-card rounded-full px-6 h-14 flex items-center justify-between pointer-events-auto w-full max-w-4xl mx-auto shadow-lg shadow-[var(--color-brand-primary)]/5"
      >
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-accent)] flex items-center justify-center text-white shadow-md group-hover:shadow-[var(--color-brand-primary)]/40 transition-shadow">
            <Sparkles size={14} />
          </div>
          <h1 className="font-bold text-[var(--color-brand-text)] tracking-tight">AI Project Manager</h1>
        </Link>
        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-secondary)] hidden sm:block">
          Powered by Gemini AI
        </div>
      </motion.header>
    </div>
  );
}
