import React from 'react';
import { motion } from 'framer-motion';
import SidebarFilters from './components/trainAvailability/SidebarFilters';
import TrainList from './components/trainAvailability/TrainList';
import MobileNav from './components/trainAvailability/MobileNav';

const TrainAvailability: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #1e293b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 10px;
        }
      ` }} />

      <motion.main 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.1
            }
          }
        }}
        className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-8"
      >
        <SidebarFilters />
        <TrainList />
      </motion.main>

      <MobileNav />
    </div>
  );
};

export default TrainAvailability;
