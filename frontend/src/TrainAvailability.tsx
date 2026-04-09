import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import SidebarFilters from './components/trainAvailability/SidebarFilters';
import TrainList from './components/trainAvailability/TrainList';
import MobileNav from './components/trainAvailability/MobileNav';

export interface FilterState {
  departureTime: 'Morning' | 'Noon' | 'Evening' | 'Night' | null;
  classes: string[];
  trainTypes: string[];
}

const TrainAvailability: React.FC = () => {
  const location = useLocation();
  const { trains = [], searchParams = {} } = location.state || {};

  const [filters, setFilters] = useState<FilterState>({
    departureTime: null,
    classes: [],
    trainTypes: []
  });

  const filteredTrains = useMemo(() => {
    return trains.filter((train: any) => {
      // 1. Departure Time Filter
      if (filters.departureTime) {
        let [hoursStr] = train.departureTime.split(':');
        let hours = parseInt(hoursStr, 10);
        if (filters.departureTime === 'Morning' && (hours >= 6)) return false; // 00-06
        if (filters.departureTime === 'Noon' && (hours < 6 || hours >= 12)) return false; // 06-12
        if (filters.departureTime === 'Evening' && (hours < 12 || hours >= 18)) return false; // 12-18
        if (filters.departureTime === 'Night' && (hours < 18)) return false; // 18-00
      }

      // 2. Journey Class
      if (filters.classes.length > 0) {
        const hasClass = train.classes && train.classes.some((c: any) => filters.classes.includes(c.className));
        if (!hasClass) return false;
      }

      // 3. Train Type
      if (filters.trainTypes.length > 0) {
        if (!filters.trainTypes.includes(train.trainType)) return false;
      }

      return true;
    });
  }, [trains, filters]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1e293b; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      ` }} />

      <motion.main 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
          }
        }}
        className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-8"
      >
        <SidebarFilters filters={filters} setFilters={setFilters} />
        <TrainList trains={filteredTrains} searchParams={searchParams} />
      </motion.main>

      <MobileNav />
    </div>
  );
};

export default TrainAvailability;
