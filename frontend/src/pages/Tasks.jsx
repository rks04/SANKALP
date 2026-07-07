import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Plus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import EditModal from '../components/EditModal';
import { getTasks, updateTask, deleteTask, exportToCSV } from '../services/api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filterOwner, setFilterOwner] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Derive available owners for the filter
  const owners = ['All', ...new Set(tasks.map(t => t.owner).filter(Boolean))];

  // Filtering logic
  const filteredTasks = tasks.filter(t => {
    const matchOwner = filterOwner === 'All' || t.owner === filterOwner;
    const matchPriority = filterPriority === 'All' || t.priority === filterPriority;
    const matchStatus = filterStatus === 'All' || t.status === filterStatus;
    return matchOwner && matchPriority && matchStatus;
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
          <Link to="/" className="flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-[var(--color-brand-border)] hover:bg-white/80 transition-colors px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-brand-text)]">
            <Plus size={16} />
            <span>New Notes</span>
          </Link>
          <button 
            onClick={handleExportCSV}
            disabled={tasks.length === 0}
            className="flex items-center gap-2 bg-[var(--color-brand-text)] text-white hover:opacity-90 transition-all px-4 py-2 rounded-lg text-sm font-medium shadow-sm disabled:opacity-50"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {tasks.length > 0 && (
        <FilterBar 
          owners={owners} 
          filterOwner={filterOwner} setFilterOwner={setFilterOwner}
          filterPriority={filterPriority} setFilterPriority={setFilterPriority}
          filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        />
      )}

      {tasks.length === 0 ? (
        <EmptyState />
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
