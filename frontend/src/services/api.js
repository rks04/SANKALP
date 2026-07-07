import axios from 'axios';
import Papa from 'papaparse';

const API_URL = `http://${window.location.hostname}:8000/api`;

const api = axios.create({
  baseURL: API_URL,
});

export const generateTasks = async (notes) => {
  const response = await api.post('/generate', { notes });
  return response.data;
};

export const getTasks = async (page = 1, size = 10) => {
  const response = await api.get(`/tasks?page=${page}&size=${size}`);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const exportToCSV = (tasks) => {
  if (!tasks || tasks.length === 0) return;
  
  // Format data for export
  const csvData = tasks.map(t => ({
    Task: t.task,
    Owner: t.owner || 'Unassigned',
    Deadline: t.due_date || 'No deadline',
    Priority: t.priority,
    Status: t.status
  }));
  
  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'tasks.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
