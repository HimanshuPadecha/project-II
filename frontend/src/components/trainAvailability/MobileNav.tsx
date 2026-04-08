import React from 'react';
import { motion } from 'framer-motion';

const MobileNav: React.FC = () => {
  return (
    <>
      <div className="h-20 lg:hidden"></div>
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 lg:hidden flex justify-around p-3 z-50"
      >
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-icons">search</span>
          <span className="text-[10px] font-bold">Search</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-icons">confirmation_number</span>
          <span className="text-[10px] font-bold">My Bookings</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-icons">account_circle</span>
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </motion.div>
    </>
  );
};

export default MobileNav;
