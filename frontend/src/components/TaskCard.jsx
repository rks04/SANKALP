import { motion } from 'framer-motion';
import { Calendar, User, CheckCircle2, Edit2, Trash2 } from 'lucide-react';

export default function TaskCard({ task, index, onToggleStatus, onEdit, onDelete }) {
  const isCompleted = task.status === 'Completed';

  const priorityStyles = {
    High: { dot: 'bg-[var(--color-brand-danger)]', text: 'text-[var(--color-brand-danger)]', bg: 'bg-[var(--color-brand-danger)]/10' },
    Medium: { dot: 'bg-[var(--color-brand-warning)]', text: 'text-[var(--color-brand-warning)]', bg: 'bg-[var(--color-brand-warning)]/10' },
    Low: { dot: 'bg-[var(--color-brand-success)]', text: 'text-[var(--color-brand-success)]', bg: 'bg-[var(--color-brand-success)]/10' },
  };

  const pStyle = priorityStyles[task.priority] || priorityStyles.Medium;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.08)' }}
      className={`glass-card rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden transition-all duration-300 group ${
        isCompleted ? 'opacity-50 grayscale-[0.5]' : ''
      }`}
    >
      {/* Top row: Priority and Actions */}
      <div className="flex justify-between items-center">
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 ${pStyle.bg} ${pStyle.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${pStyle.dot}`}></span>
          {task.priority}
        </div>
        
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={onEdit}
            className="p-1.5 text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)]/10 rounded-md transition-colors"
            title="Edit Task"
          >
            <Edit2 size={15} />
          </button>
          <button 
            onClick={onDelete}
            className="p-1.5 text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-danger)] hover:bg-[var(--color-brand-danger)]/10 rounded-md transition-colors"
            title="Delete Task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Task Text */}
      <div className="flex items-start gap-3 mt-1">
        <button 
          onClick={onToggleStatus}
          className="mt-1 flex-shrink-0 focus:outline-none rounded-full"
        >
          {isCompleted ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
              <CheckCircle2 className="text-[var(--color-brand-success)]" size={22} />
            </motion.div>
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-[var(--color-brand-secondary)]/40 hover:border-[var(--color-brand-success)] hover:bg-[var(--color-brand-success)]/10 transition-colors"></div>
          )}
        </button>
        
        <h3 className={`text-[var(--color-brand-text)] font-semibold text-[15px] leading-relaxed ${
          isCompleted ? 'line-through text-[var(--color-brand-secondary)]' : ''
        }`}>
          {task.task}
        </h3>
      </div>

      {/* Meta info: Owner and Date */}
      <div className="flex flex-wrap items-center justify-between mt-auto pt-4 border-t border-[var(--color-brand-border)]/50 text-xs font-semibold text-[var(--color-brand-secondary)]">
        {task.owner ? (
          <div className="flex items-center gap-1.5 text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/5 px-2 py-1 rounded-md">
            <User size={13} />
            <span>{task.owner}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 opacity-50 px-2 py-1">
            <User size={13} />
            <span>Unassigned</span>
          </div>
        )}
        
        {task.due_date ? (
          <div className="flex items-center gap-1.5 bg-black/5 px-2 py-1 rounded-md">
            <Calendar size={13} />
            <span>{task.due_date}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 opacity-50 px-2 py-1">
            <Calendar size={13} />
            <span>No deadline</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
