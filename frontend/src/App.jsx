import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import Tasks from './pages/Tasks';

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] text-[var(--color-brand-text)] flex flex-col font-sans relative overflow-hidden selection:bg-[var(--color-brand-primary)] selection:text-white">

      
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
