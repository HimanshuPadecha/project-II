import React from 'react';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-glass border border-glass-border backdrop-blur-md rounded-xl p-6 flex flex-col gap-2">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="material-icons text-primary">people</span>
            <span className="font-semibold">Total Users</span>
          </div>
          <h2 className="text-4xl font-bold text-white mt-2">Active</h2>
          <p className="text-sm text-green-500">+12% this week</p>
        </div>
        
        <div className="bg-glass border border-glass-border backdrop-blur-md rounded-xl p-6 flex flex-col gap-2">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="material-icons text-primary">receipt_long</span>
            <span className="font-semibold">Total Bookings</span>
          </div>
          <h2 className="text-4xl font-bold text-white mt-2">Tracking</h2>
          <p className="text-sm text-green-500">Operations Normal</p>
        </div>

        <div className="bg-glass border border-glass-border backdrop-blur-md rounded-xl p-6 flex flex-col gap-2">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="material-icons text-primary">train</span>
            <span className="font-semibold">Active Trains</span>
          </div>
          <h2 className="text-4xl font-bold text-white mt-2">Routing</h2>
          <p className="text-sm text-slate-400">All systems go</p>
        </div>
      </div>
      
      <div className="bg-glass border border-glass-border backdrop-blur-md rounded-xl min-h-[300px] flex items-center justify-center">
        <div className="text-center text-slate-400">
          <span className="material-icons text-5xl mb-4 opacity-50">insights</span>
          <h3 className="text-xl font-medium text-white mb-1">Revenue Graph Placeholder</h3>
          <p className="text-sm">Charts module can be mounted here.</p>
        </div>
      </div>
    </motion.div>
  );
};
