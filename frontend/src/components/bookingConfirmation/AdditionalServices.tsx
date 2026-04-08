import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const AdditionalServices: React.FC = () => {
  return (
    <motion.div variants={itemVariants} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 p-6 rounded-xl hover:border-primary/30 transition-all cursor-pointer">
        <span className="material-icons-round text-primary mb-3">restaurant</span>
        <h6 className="font-bold mb-1">Pre-book Meals</h6>
        <p className="text-xs text-slate-500">Choose from a variety of cuisines for your journey.</p>
      </div>
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 p-6 rounded-xl hover:border-primary/30 transition-all cursor-pointer">
        <span className="material-icons-round text-primary mb-3">hotel</span>
        <h6 className="font-bold mb-1">Stay at Stations</h6>
        <p className="text-xs text-slate-500">Book IRCTC retiring rooms or nearby hotels.</p>
      </div>
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 p-6 rounded-xl hover:border-primary/30 transition-all cursor-pointer">
        <span className="material-icons-round text-primary mb-3">security</span>
        <h6 className="font-bold mb-1">Travel Insurance</h6>
        <p className="text-xs text-slate-500">Your journey is covered under policy #INS-120.</p>
      </div>
    </motion.div>
  );
};

export default AdditionalServices;
