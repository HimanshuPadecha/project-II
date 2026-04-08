import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const RecentSearches: React.FC = () => {
  return (
    <motion.div variants={itemVariants} className="mt-16 border-t border-white/10 pt-10">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xl font-bold flex items-center gap-2">
          <span className="material-icons text-primary">history</span>
          Recent Searches
        </h4>
        <button className="text-primary hover:underline text-sm font-medium">Clear All</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 cursor-pointer">
          <p className="text-xs text-slate-500 font-bold mb-1">DEC 24, 2023</p>
          <div className="flex items-center justify-between">
            <span className="font-bold">NDLS</span>
            <span className="material-icons text-sm text-slate-600">arrow_forward</span>
            <span className="font-bold">BCT</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">New Delhi to Mumbai Central</p>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 cursor-pointer">
          <p className="text-xs text-slate-500 font-bold mb-1">DEC 28, 2023</p>
          <div className="flex items-center justify-between">
            <span className="font-bold">HWH</span>
            <span className="material-icons text-sm text-slate-600">arrow_forward</span>
            <span className="font-bold">MAS</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Howrah to Chennai Central</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentSearches;
