import { Search, Calendar, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative min-w-[140px]" ref={selectRef}>
      <div 
        className="flex items-center justify-between pl-4 pr-10 py-2 bg-[var(--color-brand-card)] border border-[var(--color-brand-border)] rounded-lg text-sm font-medium text-[var(--color-brand-text)] cursor-pointer shadow-sm hover:border-[var(--color-brand-primary)]/50 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{options.find(opt => opt.value === value)?.label || placeholder}</span>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-brand-secondary)] pointer-events-none" size={16} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full min-w-max bg-[var(--color-brand-card)] border border-[var(--color-brand-border)] rounded-xl shadow-xl overflow-hidden flex flex-col py-1 backdrop-blur-md">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                value === opt.value 
                  ? 'bg-[var(--color-brand-text)] text-[var(--color-brand-bg)] font-semibold' 
                  : 'text-[var(--color-brand-text)] hover:bg-[var(--color-brand-border)]'
              }`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function KanbanFilterBar({
  owners, filterOwner, setFilterOwner,
  filterPriority, setFilterPriority,
  filterStatus, setFilterStatus,
  searchQuery, setSearchQuery,
  filterDate, setFilterDate
}) {
  return (
    <div className="flex items-center gap-2 lg:gap-3 py-2 w-full whitespace-nowrap">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[120px] lg:min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-brand-secondary)]" size={16} />
        <input 
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-[var(--color-brand-card)] border border-[var(--color-brand-border)] rounded-lg text-sm text-[var(--color-brand-text)] placeholder-[var(--color-brand-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/50 transition-all shadow-sm"
        />
      </div>

      {/* Owners Dropdown */}
      <CustomSelect 
        value={filterOwner} 
        onChange={setFilterOwner}
        placeholder="All Owners"
        options={[
          { label: 'All Owners', value: 'All' },
          ...owners.map(o => ({ label: o, value: o }))
        ]}
      />

      {/* Priority Dropdown */}
      <CustomSelect 
        value={filterPriority} 
        onChange={setFilterPriority}
        placeholder="Priority"
        options={[
          { label: 'All Priorities', value: 'All' },
          { label: 'High', value: 'High' },
          { label: 'Medium', value: 'Medium' },
          { label: 'Low', value: 'Low' }
        ]}
      />

      {/* Status Dropdown */}
      <CustomSelect 
        value={filterStatus} 
        onChange={setFilterStatus}
        placeholder="Status"
        options={[
          { label: 'All Statuses', value: 'All' },
          { label: 'Pending', value: 'Pending' },
          { label: 'In Progress', value: 'In Progress' },
          { label: 'Completed', value: 'Completed' },
          { label: 'Cancelled', value: 'Cancelled' }
        ]}
      />

      {/* Date Filter */}
      <div className="flex items-center gap-1 bg-[var(--color-brand-card)] border border-[var(--color-brand-border)] rounded-lg px-2 py-1 shadow-sm">
        <div className="relative flex items-center">
          <input 
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="pl-2 pr-2 py-1 bg-transparent text-sm text-[var(--color-brand-text)] focus:outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert-0 dark:[&::-webkit-calendar-picker-indicator]:invert"
          />
        </div>
      </div>
    </div>
  );
}
