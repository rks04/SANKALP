import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Hourglass, PlayCircle, CheckCircle2, XCircle, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import KanbanCard from './KanbanCard';

export default function KanbanBoard({ tasks, onDragEnd, onEdit, onDelete }) {
  const columns = [
    { id: 'Pending', label: 'Pending', icon: <Hourglass size={14} /> },
    { id: 'In Progress', label: 'In Progress', icon: <PlayCircle size={14} /> },
    { id: 'Completed', label: 'Completed', icon: <CheckCircle2 size={14} /> },
    { id: 'Cancelled', label: 'Cancelled', icon: <XCircle size={14} /> },
  ];

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 324; // 300px min-width + 24px gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full h-full group">
      {/* Scroll Arrows */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-[26px] -translate-y-1/2 -ml-2 sm:-ml-4 z-10 p-1.5 bg-[var(--color-brand-card)] border border-[var(--color-brand-border)] rounded-full shadow-lg text-[var(--color-brand-text)] hover:bg-[var(--color-brand-border)] transition-all hidden md:flex opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={20} />
      </button>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-[26px] -translate-y-1/2 -mr-2 sm:-mr-4 z-10 p-1.5 bg-[var(--color-brand-card)] border border-[var(--color-brand-border)] rounded-full shadow-lg text-[var(--color-brand-text)] hover:bg-[var(--color-brand-border)] transition-all hidden md:flex opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={20} />
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 w-full h-full overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {columns.map(column => {
          const columnTasks = tasks.filter(t => t.status === column.id);
          
          return (
            <div key={column.id} className="flex-1 min-w-[300px] snap-center flex flex-col gap-4">
              {/* Column Header */}
              <div className="flex items-center justify-between bg-[var(--color-brand-card)] backdrop-blur-md rounded-xl p-3 border border-[var(--color-brand-border)]">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--color-brand-secondary)] opacity-80">{column.icon}</span>
                  <h3 className="font-bold text-sm tracking-wide text-[var(--color-brand-text)]">
                    {column.label}
                  </h3>
                  <span className="ml-2 bg-[var(--color-brand-border)]/50 text-[var(--color-brand-secondary)] text-xs font-semibold px-2 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
                <button className="text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-text)] transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Column Tasks */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                    className={`flex flex-col gap-3 min-h-[150px] p-2 -mx-2 rounded-xl transition-colors ${snapshot.isDraggingOver ? 'bg-[var(--color-brand-border)]/20' : ''}`}
                  >
                    {columnTasks.map((task, index) => (
                      <KanbanCard 
                        key={task.id} 
                        task={task}
                        index={index}
                        onEdit={() => onEdit(task)}
                        onDelete={() => onDelete(task.id)}
                      />
                    ))}
                    {provided.placeholder}
                    
                    {columnTasks.length === 0 && !snapshot.isDraggingOver && (
                      <div className="w-full py-8 border-2 border-dashed border-[var(--color-brand-border)] rounded-xl flex items-center justify-center text-[var(--color-brand-secondary)] text-xs font-medium">
                        Drop tasks here
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
        </div>
      </DragDropContext>
    </div>
  );
}
