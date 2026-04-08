import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const SearchPanel: React.FC = () => {
  return (
    <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 shadow-2xl relative">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Station From/To */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">From Station</label>
            <div className="relative group">
              <span className="material-icons absolute left-3 top-3 text-primary text-xl">location_on</span>
              <input className="w-full bg-white/5 border-white/10 rounded-lg py-3 pl-11 focus:ring-primary focus:border-primary text-white placeholder-slate-500" placeholder="NDLS - New Delhi" type="text" />
            </div>
          </div>
          <button className="absolute left-1/2 top-10 -translate-x-1/2 w-10 h-10 bg-background-dark border border-white/10 rounded-full flex items-center justify-center z-10 hover:border-primary transition-colors text-primary shadow-lg">
            <span className="material-icons text-lg">swap_horiz</span>
          </button>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">To Station</label>
            <div className="relative group">
              <span className="material-icons absolute left-3 top-3 text-primary text-xl">near_me</span>
              <input className="w-full bg-white/5 border-white/10 rounded-lg py-3 pl-11 focus:ring-primary focus:border-primary text-white placeholder-slate-500" placeholder="BCT - Mumbai Central" type="text" />
            </div>
          </div>
        </div>

        {/* Date Picker */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Journey Date</label>
          <div className="relative">
            <span className="material-icons absolute left-3 top-3 text-primary text-xl">calendar_today</span>
            <input className="w-full bg-white/5 border-white/10 rounded-lg py-3 pl-11 focus:ring-primary focus:border-primary text-white [color-scheme:dark]" type="date" />
          </div>
        </div>

        {/* Class Select */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Travel Class</label>
          <div className="relative">
            <span className="material-icons absolute left-3 top-3 text-primary text-xl">airline_seat_recline_extra</span>
            <select className="w-full bg-white/5 border-white/10 rounded-lg py-3 pl-11 pr-10 focus:ring-primary focus:border-primary text-white appearance-none" defaultValue="3A">
              <option value="ALL">All Classes</option>
              <option value="1A">AC First Class (1A)</option>
              <option value="2A">AC 2 Tier (2A)</option>
              <option value="3A">AC 3 Tier (3A)</option>
              <option value="SL">Sleeper (SL)</option>
            </select>
            <span className="material-icons absolute right-3 top-3 text-slate-500 pointer-events-none">expand_more</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {/* Quota Select */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Quota</label>
          <div className="relative">
            <span className="material-icons absolute left-3 top-3 text-primary text-xl">confirmation_number</span>
            <select className="w-full bg-white/5 border-white/10 rounded-lg py-3 pl-11 pr-10 focus:ring-primary focus:border-primary text-white appearance-none" defaultValue="GN">
              <option value="GN">General</option>
              <option value="TQ">Tatkal</option>
              <option value="SS">Ladies</option>
              <option value="SR">Senior Citizen</option>
            </select>
            <span className="material-icons absolute right-3 top-3 text-slate-500 pointer-events-none">expand_more</span>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="lg:col-span-2 flex items-center gap-6 pt-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-offset-background-dark" type="checkbox" />
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Flexible with Date</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-offset-background-dark" type="checkbox" />
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Train with Available Berth</span>
          </label>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button className="gradient-btn w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 text-white">
            <span>SEARCH TRAINS</span>
            <span className="material-icons">arrow_forward</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchPanel;
