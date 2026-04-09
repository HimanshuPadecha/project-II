import React from 'react';
import { motion, type Variants } from 'framer-motion';
import type { FilterState } from '../../TrainAvailability';

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

interface SidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const SidebarFilters: React.FC<SidebarProps> = ({ filters, setFilters }) => {
  
  const handleTimeToggle = (time: 'Morning'|'Noon'|'Evening'|'Night') => {
    setFilters(prev => ({
      ...prev,
      departureTime: prev.departureTime === time ? null : time
    }));
  };

  const handleClassToggle = (className: string) => {
    setFilters(prev => ({
      ...prev,
      classes: prev.classes.includes(className) 
        ? prev.classes.filter(c => c !== className)
        : [...prev.classes, className]
    }));
  };

  const handleTypeToggle = (type: string) => {
    setFilters(prev => ({
      ...prev,
      trainTypes: prev.trainTypes.includes(type)
        ? prev.trainTypes.filter(t => t !== type)
        : [...prev.trainTypes, type]
    }));
  };

  const clearAll = () => {
    setFilters({ departureTime: null, classes: [], trainTypes: [] });
  };

  // Helper styles
  const btnStyle = (active: boolean) => active 
    ? "p-3 rounded-lg border flex flex-col items-center gap-1 transition-colors border-primary bg-primary/10" 
    : "p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-1 hover:border-primary/50 transition-colors bg-slate-50 dark:bg-slate-800/50";
  const iconStyle = (active: boolean) => active ? "text-lg text-primary" : "text-lg text-slate-500 hover:text-primary";
  const txtStyle = (active: boolean) => active ? "text-[10px] font-medium uppercase text-primary" : "text-[10px] font-medium uppercase text-slate-500";

  return (
    <motion.aside variants={itemVariants} className="col-span-12 lg:col-span-3 space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-28">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg">Filters</h2>
          <button onClick={clearAll} className="text-primary hover:underline text-xs font-semibold uppercase tracking-wider">Clear All</button>
        </div>
        
        {/* Departure Time Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-widest">Departure Time</h3>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleTimeToggle('Morning')} className={btnStyle(filters.departureTime === 'Morning')}>
              <span className={`material-icons ${iconStyle(filters.departureTime === 'Morning')}`}>wb_twilight</span>
              <span className={txtStyle(filters.departureTime === 'Morning')}>Morning</span>
              <span className={txtStyle(filters.departureTime === 'Morning')}>00-06</span>
            </button>
            <button onClick={() => handleTimeToggle('Noon')} className={btnStyle(filters.departureTime === 'Noon')}>
              <span className={`material-icons ${iconStyle(filters.departureTime === 'Noon')}`}>wb_sunny</span>
              <span className={txtStyle(filters.departureTime === 'Noon')}>Noon</span>
              <span className={txtStyle(filters.departureTime === 'Noon')}>06-12</span>
            </button>
            <button onClick={() => handleTimeToggle('Evening')} className={btnStyle(filters.departureTime === 'Evening')}>
              <span className={`material-icons ${iconStyle(filters.departureTime === 'Evening')}`}>light_mode</span>
              <span className={txtStyle(filters.departureTime === 'Evening')}>Evening</span>
              <span className={txtStyle(filters.departureTime === 'Evening')}>12-18</span>
            </button>
            <button onClick={() => handleTimeToggle('Night')} className={btnStyle(filters.departureTime === 'Night')}>
              <span className={`material-icons ${iconStyle(filters.departureTime === 'Night')}`}>dark_mode</span>
              <span className={txtStyle(filters.departureTime === 'Night')}>Night</span>
              <span className={txtStyle(filters.departureTime === 'Night')}>18-00</span>
            </button>
          </div>
        </div>

        {/* Journey Class Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-widest">Journey Class</h3>
          <div className="space-y-3">
            {[
              { id: 'SL', label: 'Sleeper (SL)' },
              { id: '3A', label: 'AC 3 Tier (3A)' },
              { id: '2A', label: 'AC 2 Tier (2A)' },
              { id: '1A', label: 'AC First Class (1A)' }
            ].map((cls) => (
              <label key={cls.id} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  checked={filters.classes.includes(cls.id)} 
                  onChange={() => handleClassToggle(cls.id)} 
                  className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" 
                  type="checkbox" 
                />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{cls.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Train Type */}
        <div>
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-widest">Train Type</h3>
          <div className="space-y-3">
            {[
              { id: 'RAJDHANI', label: 'Rajdhani' },
              { id: 'SHATABDI', label: 'Shatabdi' },
              { id: 'DURONTO', label: 'Duronto' },
              { id: 'EXPRESS', label: 'Express' },
              { id: 'SUPERFAST', label: 'Superfast' }
            ].map(type => (
              <label key={type.id} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  checked={filters.trainTypes.includes(type.id)}
                  onChange={() => handleTypeToggle(type.id)}
                  className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" 
                  type="checkbox" 
                />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{type.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default SidebarFilters;
