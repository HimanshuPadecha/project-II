import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const QuickAccess: React.FC = () => {
  return (
    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {/* PNR Status Card */}
      <div className="glass-card rounded-xl p-6 hover:bg-white/[0.06] transition-all">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-icons text-primary">analytics</span>
          </div>
          <div>
            <h3 className="text-lg font-bold">PNR Status</h3>
            <p className="text-sm text-slate-400">Check current booking status of your ticket</p>
          </div>
        </div>
        <div className="flex gap-3">
          <input className="flex-1 bg-white/5 border-white/10 rounded-lg py-3 px-4 focus:ring-primary focus:border-primary text-white" maxLength={10} placeholder="Enter 10-digit PNR" type="text" />
          <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors">Check Status</button>
        </div>
      </div>

      {/* Live Train Status Card */}
      <div className="glass-card rounded-xl p-6 hover:bg-white/[0.06] transition-all">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-saffron/20 flex items-center justify-center">
            <span className="material-icons text-saffron">sensors</span>
          </div>
          <div>
            <h3 className="text-lg font-bold">Live Train Status</h3>
            <p className="text-sm text-slate-400">Track your train in real-time on the map</p>
          </div>
        </div>
        <div className="flex gap-3">
          <input className="flex-1 bg-white/5 border-white/10 rounded-lg py-3 px-4 focus:ring-primary focus:border-primary text-white" placeholder="Train Name or Number" type="text" />
          <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors">Track Live</button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickAccess;
