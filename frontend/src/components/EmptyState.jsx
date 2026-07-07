import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center px-4"
    >
      <div className="w-20 h-20 bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] rounded-full flex items-center justify-center mb-6">
        <ClipboardList size={32} />
      </div>
      <h3 className="text-xl font-semibold text-[var(--color-brand-text)] mb-2">No tasks generated yet</h3>
      <p className="text-[var(--color-brand-secondary)] max-w-md mb-8">
        Paste your meeting notes to extract actionable tasks, owners, and deadlines automatically.
      </p>
      <Link 
        to="/"
        className="bg-[var(--color-brand-primary)] text-white hover:bg-[#5356E5] px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
      >
        Paste Meeting Notes
      </Link>
    </motion.div>
  );
}
