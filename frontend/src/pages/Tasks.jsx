import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Plus, Loader2, LayoutGrid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import KanbanBoard from '../components/KanbanBoard';
import FilterBar from '../components/FilterBar';
import KanbanFilterBar from '../components/KanbanFilterBar';
import EmptyState from '../components/EmptyState';
import EditModal from '../components/EditModal';
import { getTasks, updateTask, deleteTask, exportToCSV } from '../services/api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  
  const [filterOwner, setFilterOwner] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [page, viewMode]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks(page, viewMode === 'kanban' ? 50 : 10);
      setTasks(data.items || []);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Derive available owners for the filter
  const owners = ['All', ...new Set(tasks.map(t => t.owner).filter(Boolean))];

  // Filtering logic
  let filteredTasks = tasks.filter(task => {
    let match = true;
    if (filterOwner !== 'All' && task.owner !== filterOwner) match = false;
    if (filterPriority !== 'All' && task.priority !== filterPriority) match = false;
    if (filterStatus !== 'All' && task.status !== filterStatus) match = false;
    
    if (searchQuery && !task.task.toLowerCase().includes(searchQuery.toLowerCase())) match = false;
    
    const taskDateStr = task.due_date || task.deadline;
    if (filterDate && taskDateStr) {
      const taskDate = new Date(taskDateStr).toISOString().split('T')[0];
      if (taskDate !== filterDate) match = false;
    }

    return match;
  });

  const handleExportCSV = () => {
    exportToCSV(filteredTasks.length > 0 ? filteredTasks : tasks);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    
    try {
      await updateTask(id, { status: newStatus });
    } catch (err) {
      console.error('Failed to update status', err);
      // Revert on failure
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: currentStatus } : t));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleEditSave = async (updatedTask) => {
    try {
      const savedTask = await updateTask(updatedTask.id, updatedTask);
      setTasks(prev => prev.map(t => t.id === savedTask.id ? savedTask : t));
      setEditingTask(null);
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="animate-spin text-[var(--color-brand-primary)]" size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full pb-10 h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-[var(--color-brand-text)]">Task Manager</h2>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex bg-[var(--color-brand-card)] p-1 rounded-lg border border-[var(--color-brand-border)]">
            <button 
              onClick={() => { setViewMode('list'); setPage(1); }}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[var(--color-brand-text)] text-[var(--color-brand-bg)] shadow-sm' : 'text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-text)]'}`}
              title="List View"
            >
              <List size={16} />
            </button>
            <button 
              onClick={() => { setViewMode('kanban'); setPage(1); }}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'kanban' ? 'bg-[var(--color-brand-text)] text-[var(--color-brand-bg)] shadow-sm' : 'text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-text)]'}`}
              title="Kanban Board View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          <Link to="/" className="flex items-center gap-2 bg-[var(--color-brand-card)] backdrop-blur-sm border border-[var(--color-brand-border)] hover:bg-[var(--color-brand-border)] transition-colors px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-brand-text)]">
            <Plus size={16} />
            <span>New Notes</span>
          </Link>
          <button 
            onClick={handleExportCSV}
            disabled={tasks.length === 0}
            className="flex items-center gap-2 bg-[var(--color-brand-text)] text-[var(--color-brand-bg)] hover:opacity-90 transition-all px-4 py-2 rounded-lg text-sm font-medium shadow-sm disabled:opacity-50"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {tasks.length > 0 && (
        viewMode === 'list' ? (
          <FilterBar 
            owners={owners} 
            filterOwner={filterOwner} setFilterOwner={setFilterOwner}
            filterPriority={filterPriority} setFilterPriority={setFilterPriority}
            filterStatus={filterStatus} setFilterStatus={setFilterStatus}
            viewMode={viewMode}
          />
        ) : (
          <KanbanFilterBar
            owners={owners}
            filterOwner={filterOwner} setFilterOwner={setFilterOwner}
            filterPriority={filterPriority} setFilterPriority={setFilterPriority}
            filterStatus={filterStatus} setFilterStatus={setFilterStatus}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            filterDate={filterDate} setFilterDate={setFilterDate}
          />
        )
      )}

      {tasks.length === 0 ? (
        <EmptyState />
      ) : viewMode === 'kanban' ? (
        <div className="flex-1 mt-2">
          <KanbanBoard 
            tasks={filteredTasks} 
            onDragEnd={async (result) => {
              if (!result.destination) return;
              const { source, destination, draggableId } = result;
              if (source.droppableId === destination.droppableId) return;

              const taskId = parseInt(draggableId, 10);
              const newStatus = destination.droppableId;
              
              const oldTask = tasks.find(t => t.id === taskId);
              if (!oldTask) return;
              
              setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
              try { 
                await updateTask(taskId, { status: newStatus }); 
              } catch {
                setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: oldTask.status } : t));
              }
            }}
            onEdit={setEditingTask}
            onDelete={handleDelete}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-max">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task, index) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                index={index}
                onToggleStatus={() => handleToggleStatus(task.id, task.status)}
                onEdit={() => setEditingTask(task)}
                onDelete={() => handleDelete(task.id)}
              />
            ))}
          </AnimatePresence>
          {filteredTasks.length === 0 && tasks.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="col-span-full py-16 text-center text-[var(--color-brand-secondary)] text-lg"
            >
              No tasks match the selected filters.
            </motion.div>
          )}
        </div>
      )}

      {tasks.length > 0 && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8 pb-8">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-[var(--color-brand-card)] text-[var(--color-brand-text)] border border-[var(--color-brand-border)] hover:bg-[var(--color-brand-bg)] rounded-lg font-medium text-sm disabled:opacity-50 transition-colors shadow-sm"
          >
            Previous
          </button>
          <span className="text-sm font-bold text-[var(--color-brand-secondary)]">
            Page {page} of {totalPages}
          </span>
          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-[var(--color-brand-card)] text-[var(--color-brand-text)] border border-[var(--color-brand-border)] hover:bg-[var(--color-brand-bg)] rounded-lg font-medium text-sm disabled:opacity-50 transition-colors shadow-sm"
          >
            Next
          </button>
        </div>
      )}

      <AnimatePresence>
        {editingTask && (
          <EditModal 
            task={editingTask} 
            onClose={() => setEditingTask(null)}
            onSave={handleEditSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
