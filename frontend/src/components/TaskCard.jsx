import { motion } from 'framer-motion';
import { Calendar, User, CheckCircle2, Edit2, Trash2 } from 'lucide-react';

export default function TaskCard({ task, index, onToggleStatus, onEdit, onDelete }) {
  const isCompleted = task.status === 'Completed';

  const priorityStyles = {
    High: { bg: 'bg-[#4A3B32]', text: 'text-[#EBE5D9]' },
    Medium: { bg: 'bg-[#8B7355]', text: 'text-[#EBE5D9]' },
    Low: { bg: 'bg-[#D4C4B7]', text: 'text-[#3D352F]' },
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
        isCompleted ? 'bg-[var(--color-brand-accent)]/40' : ''
      }`}
    >
      {/* Top row: Priority and Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${pStyle.bg} ${pStyle.text}`}>
            {task.priority}
          </div>
          
          <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
            task.status === 'Completed' ? 'bg-[var(--color-brand-secondary)]/10 text-[var(--color-brand-secondary)] border-[var(--color-brand-secondary)]/20' :
            task.status === 'In Progress' ? 'bg-[var(--color-brand-border)]/50 text-[var(--color-brand-text)] border-[var(--color-brand-border)]' :
            task.status === 'Cancelled' ? 'bg-black/5 dark:bg-white/5 text-[var(--color-brand-secondary)] border-transparent opacity-70' :
            'bg-[#4A3B32]/5 dark:bg-[#EBE5D9]/5 text-[#7A6A5E] dark:text-[#B09983] border-[#4A3B32]/10 dark:border-[#EBE5D9]/10'
          }`}>
            {task.status}
          </div>
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
              <CheckCircle2 className="text-[var(--color-brand-text)]" size={22} />
            </motion.div>
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-[var(--color-brand-secondary)]/40 hover:border-[#8B7355] hover:bg-[#8B7355]/10 transition-colors"></div>
          )}
        </button>
        
        <h3 className={`text-[var(--color-brand-text)] font-semibold text-[15px] leading-relaxed ${
          isCompleted ? 'line-through text-[var(--color-brand-secondary)]' : ''
        }`}>
          {task.task}
        </h3>
      </div>

      {/* Meta info: Owner and Date */}
      <div className="flex flex-wrap items-center justify-between mt-auto pt-4 border-t border-[var(--color-brand-border)] text-xs font-semibold text-[var(--color-brand-secondary)]">
        {task.owner ? (
          <div className="flex items-center gap-1.5 text-[var(--color-brand-text)] bg-[var(--color-brand-border)]/50 px-2.5 py-1.5 rounded-md">
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
          <div className="flex items-center gap-1.5 bg-[var(--color-brand-border)]/30 text-[var(--color-brand-secondary)] px-2.5 py-1.5 rounded-md">
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
