import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const BookingFooter: React.FC = () => {
  return (
    <motion.footer variants={itemVariants} className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 text-center">
      <p className="text-xs text-slate-500 mb-4">Indian Railways (IRCTC) • 24x7 Customer Support 139</p>
      <div className="flex justify-center gap-6 text-xs font-semibold text-slate-400">
        <a className="hover:text-primary transition-colors" href="#">Refund Rules</a>
        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
      </div>
    </motion.footer>
  );
};

export default BookingFooter;
