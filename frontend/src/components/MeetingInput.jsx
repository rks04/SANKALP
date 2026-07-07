import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function MeetingInput({ onGenerate, isGenerating }) {
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notes.trim() || isGenerating) return;
    onGenerate(notes);
  };

  return (
    <motion.div 
      className="w-full glass-card rounded-2xl p-6 sm:p-8 relative"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="notes" className="text-sm font-semibold text-[var(--color-brand-text)] flex items-center gap-2">
            Paste Meeting Notes
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-accent)] rounded-xl opacity-0 group-focus-within:opacity-20 transition duration-500 blur"></div>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Riya will complete the login UI by Friday. Jay will integrate authentication..."
              className="w-full h-48 sm:h-64 glass-input rounded-xl p-4 text-base focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)] resize-none relative z-10 placeholder:text-[var(--color-brand-secondary)]/50 transition-all text-[var(--color-brand-text)]"
              disabled={isGenerating}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!notes.trim() || isGenerating}
          className="self-end bg-[var(--color-brand-primary)] hover:bg-[#5356E5] text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-md shadow-[var(--color-brand-primary)]/20"
        >
          {isGenerating ? (
            <>
              <Sparkles size={18} className="animate-pulse" />
              Generating...
            </>
          ) : (
            <>
              Generate Tasks
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
