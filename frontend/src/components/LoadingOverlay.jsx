import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

const steps = [
  "Reading Meeting Notes...",
  "Extracting Tasks",
  "Finding Owners",
  "Detecting Deadlines",
  "Assigning Priorities",
  "Generating Task List..."
];

export default function LoadingOverlay() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Simulate step progression
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 600); // Progress every 600ms

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(247,248,252,0.8)] backdrop-blur-sm"
    >
      <div className="glass-card rounded-2xl p-8 w-full max-w-md mx-4 shadow-xl flex flex-col">
        <h3 className="text-xl font-semibold text-[var(--color-brand-text)] mb-6 text-center">Analyzing Meeting Notes...</h3>
        
        <div className="flex flex-col gap-4">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isPending = index > currentStepIndex;
            
            return (
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isPending ? 0.4 : 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                {isCompleted ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle2 className="text-[var(--color-brand-success)]" size={20} />
                  </motion.div>
                ) : isCurrent ? (
                  <Loader2 className="text-[var(--color-brand-primary)] animate-spin" size={20} />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-[var(--color-brand-border)]"></div>
                )}
                <span className={`text-sm font-medium ${isCurrent || isCompleted ? 'text-[var(--color-brand-text)]' : 'text-[var(--color-brand-secondary)]'}`}>
                  {step}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
