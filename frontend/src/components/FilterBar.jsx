import { motion } from 'framer-motion';

export default function FilterBar({ 
  owners, filterOwner, setFilterOwner, 
  filterPriority, setFilterPriority, 
  filterStatus, setFilterStatus 
}) {
  
  const Pill = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
        active 
          ? 'text-white' 
          : 'text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-text)] hover:bg-black/5'
      }`}
    >
      {active && (
        <motion.div
          layoutId={`activePillBg-${children}`}
          className="absolute inset-0 bg-[var(--color-brand-text)] rounded-full shadow-md"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );

  return (
    <div className="flex flex-col gap-6 py-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full p-4 glass-card rounded-2xl">
        
        {/* Status Filter */}
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

        {/* Priority Filter */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-[var(--color-brand-secondary)] tracking-widest uppercase ml-1">Priority</span>
          <div className="flex gap-1">
            {['All', 'High', 'Medium', 'Low'].map(p => (
              <Pill key={p} active={filterPriority === p} onClick={() => setFilterPriority(p)}>
                {p}
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
