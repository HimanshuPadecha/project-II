import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

interface TrainInfoProps {
  train: any;
  selectedClass: any;
}

const TrainInfoBanner: React.FC<TrainInfoProps> = ({ train, selectedClass }) => {
  const availabilityStr = selectedClass.availableSeats > 20 ? `AVAILABLE - ${selectedClass.availableSeats.toString().padStart(3, '0')}` : (selectedClass.availableSeats > 0 ? `RAC - ${selectedClass.availableSeats}` : `WL - ${Math.abs(selectedClass.availableSeats) + 1}`);
  const statusColorClass = selectedClass.availableSeats > 20 ? 'text-emerald-500' : (selectedClass.availableSeats > 0 ? 'text-amber-500' : 'text-red-500');
  const dotColorClass = selectedClass.availableSeats > 20 ? 'bg-emerald-500' : (selectedClass.availableSeats > 0 ? 'bg-amber-500' : 'bg-red-500');

  return (
    <motion.div variants={itemVariants} className="glass-card rounded-xl p-6 mb-8 flex flex-wrap items-center justify-between gap-6 border-l-4 border-l-primary">
      <div className="flex items-center gap-6">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Train Details</span>
          <h2 className="text-xl font-bold">{train.trainNumber} - {train.trainName}</h2>
          <p className="text-sm text-slate-400">{train.source} → {train.destination}</p>
        </div>
        <div className="h-10 w-px bg-white/10 hidden sm:block"></div>
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Class &amp; Quota</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded uppercase">{selectedClass.className}</span>
            <span className="px-2 py-0.5 bg-white/10 text-slate-300 text-xs font-bold rounded">GENERAL</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <span className={`text-xs font-semibold uppercase tracking-wider ${statusColorClass}`}>Availability Status</span>
          <div className="flex items-center gap-2 mt-1 justify-end">
            <span className={`w-2 h-2 rounded-full ${dotColorClass}`}></span>
            <span className={`font-bold ${statusColorClass}`}>{availabilityStr}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrainInfoBanner;
