import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MeetingInput from '../components/MeetingInput';
import LoadingOverlay from '../components/LoadingOverlay';
import { generateTasks } from '../services/api';

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGenerate = async (notes) => {
    setIsGenerating(true);
    setError('');
    try {
      await generateTasks(notes);
      navigate('/tasks');
    } catch (err) {
      console.error('Failed to generate tasks:', err);
      setError('Failed to generate tasks. Please ensure the backend is running and Gemini API key is set.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full"
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-semibold text-[var(--color-brand-text)] mb-3 tracking-tight">Turn meeting notes into structured project tasks.</h2>
        <p className="text-[var(--color-brand-secondary)] text-lg">AI extracts tasks, owners, priorities and deadlines automatically.</p>
      </div>

      <MeetingInput onGenerate={handleGenerate} isGenerating={isGenerating} />
      
      {error && (
        <div className="mt-4 p-4 bg-[var(--color-brand-danger)]/10 text-[var(--color-brand-danger)] rounded-xl border border-[var(--color-brand-danger)]/20 w-full text-center font-medium">
          {error}
        </div>
      )}
      
      {isGenerating && <LoadingOverlay />}
    </motion.div>
  );
}
