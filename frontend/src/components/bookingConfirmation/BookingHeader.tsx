import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

interface BookingHeaderProps {
  bookingResponse: any;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ bookingResponse }) => {
  return (
    <motion.div variants={itemVariants}>
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
          <span className="material-icons text-3xl">check_circle</span>
        </div>
        <h2 className="text-4xl font-extrabold mb-2 tracking-tight">Booking Successful</h2>
        <p className="text-slate-500 dark:text-slate-400">Your journey has been confirmed. A copy of this ticket has been sent to your email.</p>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary rounded-lg">
            <span className="material-icons text-white">confirmation_number</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-bold">Passenger Name Record</p>
            <h3 className="text-3xl font-mono font-bold tracking-tighter">{bookingResponse.pnrNumber}</h3>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
          <span className="material-icons text-primary text-sm">verified</span>
          <span className="text-sm font-medium">Verified by IRCTC</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingHeader;
