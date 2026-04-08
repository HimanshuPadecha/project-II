import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const NewsTicker: React.FC = () => {
  return (
    <motion.div variants={itemVariants} className="mt-16 bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-4">
      <span className="bg-primary px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-white shrink-0">News Alert</span>
      <div className="overflow-hidden whitespace-nowrap">
        <p className="text-sm text-primary animate-pulse">Special Winter Holiday trains announced for New Delhi - Shimla route. Bookings open tomorrow 8:00 AM.</p>
      </div>
    </motion.div>
  );
};

export default NewsTicker;
