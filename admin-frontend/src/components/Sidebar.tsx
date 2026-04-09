import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-glass border-r border-glass-border p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="material-icons text-white text-xl">admin_panel_settings</span>
        </div>
        <h2 className="text-xl font-bold">Admin<span className="text-primary">Panel</span></h2>
      </div>

      <nav className="mt-8 flex flex-col gap-2">
        {[
          { path: '/', icon: 'dashboard', label: 'Dashboard' },
          { path: '/users', icon: 'people', label: 'Users' },
          { path: '/bookings', icon: 'receipt_long', label: 'Bookings' },
          { path: '/trains', icon: 'train', label: 'Trains' },
        ].map((item, idx) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <NavLink 
              to={item.path} 
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-slate-400 hover:bg-glass hover:text-slate-200"
                }`
              }
              end={item.path === '/'}
            >
              <span className="material-icons text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>
    </div>
  );
};
