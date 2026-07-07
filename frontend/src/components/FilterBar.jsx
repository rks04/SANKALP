import { motion } from 'framer-motion';

export default function FilterBar({ 
  owners, filterOwner, setFilterOwner, 
  filterPriority, setFilterPriority, 
  filterStatus, setFilterStatus,
  viewMode
}) {
  
  const Pill = ({ active, onClick, children, activeClass = 'bg-[var(--color-brand-text)] text-[var(--color-brand-bg)]' }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
        active 
          ? `${activeClass} shadow-md` 
          : 'bg-transparent text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-border)] hover:text-[var(--color-brand-text)]'
      }`}
    >
      {children}
    </button>
  );

  const getPriorityClass = (priority) => {
    if (priority === 'High') return 'bg-[#4A3B32] text-[#EBE5D9]';
    if (priority === 'Medium') return 'bg-[#8B7355] text-[#EBE5D9]';
    if (priority === 'Low') return 'bg-[#D4C4B7] text-[#3D352F]';
    return 'bg-[var(--color-brand-text)] text-[var(--color-brand-bg)]';
  };

  return (
    <div className="flex flex-col gap-6 py-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full p-4 glass-card rounded-2xl">
        
        {/* Status Filter (Hidden in Kanban mode) */}
        {viewMode !== 'kanban' && (
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-[var(--color-brand-secondary)] tracking-widest uppercase ml-1">Status</span>
            <div className="flex gap-1">
              {['All', 'Pending', 'Completed'].map(status => (
                <Pill key={status} active={filterStatus === status} onClick={() => setFilterStatus(status)}>
                  {status}
                </Pill>
              ))}
            </div>
          </div>
        )}

        {/* Priority Filter */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-[var(--color-brand-secondary)] tracking-widest uppercase ml-1">Priority</span>
          <div className="flex gap-1">
            {['All', 'High', 'Medium', 'Low'].map(priority => (
              <Pill 
                key={priority} 
                active={filterPriority === priority} 
                onClick={() => setFilterPriority(priority)}
                activeClass={getPriorityClass(priority)}
              >
                {priority}
              </Pill>
            ))}
          </div>
        </div>

        {/* Owner Filter */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-[var(--color-brand-secondary)] tracking-widest uppercase ml-1">Owner</span>
          <div className="flex gap-1 flex-wrap">
            {owners.map(owner => (
              <Pill key={owner} active={filterOwner === owner} onClick={() => setFilterOwner(owner)}>
                {owner}
              </Pill>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
