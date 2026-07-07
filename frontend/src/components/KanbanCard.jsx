import { Calendar, MoreHorizontal } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Draggable } from '@hello-pangea/dnd';

export default function KanbanCard({ task, index, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const priorityStyles = {
    High: { bg: 'bg-[#4A3B32]', text: 'text-[#EBE5D9]' },
    Medium: { bg: 'bg-[#8B7355]', text: 'text-[#EBE5D9]' },
    Low: { bg: 'bg-[#D4C4B7]', text: 'text-[#3D352F]' },
  };

  const pStyle = priorityStyles[task.priority] || priorityStyles.Medium;

  // Handle clicking outside the menu to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  // Extract initials for the avatar
  const getInitials = (name) => {
    if (!name || name === 'Unassigned') return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Generate a consistent color based on the owner's name
  const getAvatarColor = (name) => {
    if (!name || name === 'Unassigned') return 'bg-[#7A6A5E]';
    const colors = ['bg-[#3D352F]', 'bg-[#5A4D43]', 'bg-[#7A6A5E]', 'bg-[#8B7355]'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-[var(--color-brand-card)] border border-[var(--color-brand-border)]/50 rounded-xl p-4 flex flex-col gap-4 relative group transition-all ${
            snapshot.isDragging ? 'shadow-xl shadow-[var(--color-brand-primary)]/10 z-50 ring-2 ring-[var(--color-brand-primary)]' : 'shadow-sm hover:shadow-md hover:-translate-y-0.5'
          }`}
        >
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-[var(--color-brand-text)] font-semibold text-sm leading-snug line-clamp-3">
              {task.task}
            </h3>
            <div className={`flex-shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${pStyle.bg} ${pStyle.text}`}>
              {task.priority}
            </div>
          </div>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${getAvatarColor(task.owner)}`}>
            {getInitials(task.owner)}
          </div>
          <span className="text-xs font-medium text-[var(--color-brand-secondary)]">
            {task.owner || 'Unassigned'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {task.due_date && (
            <div className="flex items-center gap-1 text-[10px] font-medium text-[var(--color-brand-secondary)]">
              <Calendar size={12} />
              <span>{task.due_date}</span>
            </div>
          )}
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-text)] hover:bg-[var(--color-brand-border)]/50 rounded transition-colors"
            >
              <MoreHorizontal size={14} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-[var(--color-brand-bg)] border border-[var(--color-brand-border)] rounded-lg shadow-xl z-50 overflow-hidden flex flex-col">
                <button
                  onClick={() => { onEdit(); setMenuOpen(false); }}
                  className="px-3 py-2 text-xs text-left text-[var(--color-brand-text)] hover:bg-[var(--color-brand-border)]/50 transition-colors"
                >
                  Edit Task
                </button>
                <button
                  onClick={() => { onDelete(); setMenuOpen(false); }}
                  className="px-3 py-2 text-xs text-left text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
        </div>
      )}
    </Draggable>
  );
}
