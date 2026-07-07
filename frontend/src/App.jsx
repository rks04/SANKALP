import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import Tasks from './pages/Tasks';

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] text-[var(--color-brand-text)] flex flex-col font-sans relative overflow-hidden selection:bg-[var(--color-brand-primary)] selection:text-white">
      {/* Calm, slow-moving ambient pearlescent background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[var(--color-brand-primary)] blur-[140px] rounded-full pointer-events-none mix-blend-multiply"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -60, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[var(--color-brand-accent)] blur-[140px] rounded-full pointer-events-none mix-blend-multiply"
      />
      
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 relative z-10 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
