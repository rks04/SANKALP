import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function EditModal({ task, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-[var(--color-brand-border)]"
      >
        <div className="flex justify-between items-center p-5 border-b border-[var(--color-brand-border)]">
          <h3 className="font-semibold text-lg text-[var(--color-brand-text)]">Edit Task</h3>
          <button onClick={onClose} className="p-1 text-[var(--color-brand-secondary)] hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-brand-text)]">Task Description</label>
            <input 
              type="text" 
              name="task" 
              value={formData.task} 
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[var(--color-brand-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--color-brand-text)]">Owner</label>
              <input 
                type="text" 
                name="owner" 
                value={formData.owner || ''} 
                onChange={handleChange}
                placeholder="Unassigned"
                className="w-full px-3 py-2 border border-[var(--color-brand-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--color-brand-text)]">Due Date</label>
              <input 
                type="text" 
                name="due_date" 
                value={formData.due_date || ''} 
                onChange={handleChange}
                placeholder="e.g. Friday"
                className="w-full px-3 py-2 border border-[var(--color-brand-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--color-brand-text)]">Priority</label>
              <select 
                name="priority" 
                value={formData.priority} 
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[var(--color-brand-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] bg-white"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--color-brand-text)]">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[var(--color-brand-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[var(--color-brand-border)]">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 font-medium text-[var(--color-brand-secondary)] hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 font-medium text-white bg-[var(--color-brand-primary)] hover:bg-[#5356E5] rounded-lg transition-colors shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
