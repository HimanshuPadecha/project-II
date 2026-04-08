import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const SidebarFilters: React.FC = () => {
  return (
    <motion.aside variants={itemVariants} className="col-span-12 lg:col-span-3 space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-28">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg">Filters</h2>
          <button className="text-primary text-xs font-semibold uppercase tracking-wider">Clear All</button>
        </div>
        
        {/* Departure Time Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-widest">Departure Time</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-1 hover:border-primary transition-colors bg-slate-50 dark:bg-slate-800/50">
              <span className="material-icons text-lg">wb_twilight</span>
              <span className="text-[10px] font-medium uppercase">Morning</span>
              <span className="text-[10px] text-slate-500">00-06</span>
            </button>
            <button className="p-3 rounded-lg border border-primary bg-primary/10 flex flex-col items-center gap-1">
              <span className="material-icons text-lg text-primary">wb_sunny</span>
              <span className="text-[10px] font-medium uppercase text-primary">Noon</span>
              <span className="text-[10px] text-primary/70">06-12</span>
            </button>
            <button className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-1 hover:border-primary transition-colors bg-slate-50 dark:bg-slate-800/50">
              <span className="material-icons text-lg">light_mode</span>
              <span className="text-[10px] font-medium uppercase">Evening</span>
              <span className="text-[10px] text-slate-500">12-18</span>
            </button>
            <button className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-1 hover:border-primary transition-colors bg-slate-50 dark:bg-slate-800/50">
              <span className="material-icons text-lg">dark_mode</span>
              <span className="text-[10px] font-medium uppercase">Night</span>
              <span className="text-[10px] text-slate-500">18-00</span>
            </button>
          </div>
        </div>

        {/* Journey Class Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-widest">Journey Class</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Sleeper (SL)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">AC 3 Tier (3A)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">AC 2 Tier (2A)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">AC First Class (1A)</span>
            </label>
          </div>
        </div>

        {/* Train Type */}
        <div>
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-widest">Train Type</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Rajdhani</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Shatabdi</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Duronto</span>
            </label>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default SidebarFilters;
