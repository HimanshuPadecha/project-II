import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const TrainInfoBanner: React.FC = () => {
  return (
    <motion.div variants={itemVariants} className="glass-card rounded-xl p-6 mb-8 flex flex-wrap items-center justify-between gap-6 border-l-4 border-l-primary">
      <div className="flex items-center gap-6">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Train Details</span>
          <h2 className="text-xl font-bold">12002 - NDLS Shatabdi Express</h2>
          <p className="text-sm text-slate-400">New Delhi (NDLS) → Habibganj (HBJ)</p>
        </div>
        <div className="h-10 w-px bg-white/10"></div>
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Class &amp; Quota</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded">EXECUTIVE (EC)</span>
            <span className="px-2 py-0.5 bg-white/10 text-slate-300 text-xs font-bold rounded">GENERAL</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Availability Status</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-bold text-emerald-500">AVAILABLE - 042</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrainInfoBanner;
