import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const TrainList: React.FC = () => {
  return (
    <section className="col-span-12 lg:col-span-9 space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
        <p className="text-slate-500 font-medium">Showing <span className="text-slate-900 dark:text-white">12 trains</span> from New Delhi to Mumbai</p>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold text-slate-400">Sort by:</span>
          <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer text-primary">
            <option>Departure Time</option>
            <option>Duration</option>
            <option>Earliest Arrival</option>
          </select>
        </div>
      </motion.div>

      {/* Train Card 1 (Rajdhani) */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all group">
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold">12424 - NDLS RAJDHANI</h3>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Superfast</span>
              </div>
              <p className="text-slate-500 text-sm font-medium">Runs on: <span className="text-primary">M T W T F S S</span></p>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold">16:30</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">New Delhi</p>
              </div>
              <div className="flex flex-col items-center min-w-[120px]">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">12h 15m</p>
                <div className="w-full h-px bg-slate-200 dark:bg-slate-800 relative">
                  <div className="absolute -top-1 left-0 w-2 h-2 rounded-full border-2 border-primary bg-background-dark"></div>
                  <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-primary"></div>
                  <span className="material-icons absolute left-1/2 -translate-x-1/2 -top-3 text-primary text-lg">train</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Non-stop</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">04:45</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Mumbai Central</p>
              </div>
            </div>
          </div>

          {/* Class Toggles */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[150px] p-4 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm">3 Tier AC (3A)</span>
                <span className="text-primary font-bold text-lg">₹2,450</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-bold text-emerald-500 uppercase">Available 0145</span>
              </div>
            </div>
            
            <div className="flex-1 min-w-[150px] p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/30">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm text-slate-400">2 Tier AC (2A)</span>
                <span className="font-bold text-lg text-slate-400">₹3,890</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-xs font-bold text-amber-500 uppercase">RAC 12</span>
              </div>
            </div>
            
            <div className="flex-1 min-w-[150px] p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/30">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm text-slate-400">1st Class AC (1A)</span>
                <span className="font-bold text-lg text-slate-400">₹5,200</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-xs font-bold text-red-500 uppercase">WL 45</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <div className="flex gap-4">
            <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
              <span className="material-icons text-sm">history</span>
              Probablity
            </button>
            <button className="text-xs font-bold text-slate-400 flex items-center gap-1 hover:text-slate-200">
              <span className="material-icons text-sm">route</span>
              View Route
            </button>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-10 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
            Book Now
          </button>
        </div>
      </motion.div>

      {/* Train Card 2 (Duronto) */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all group">
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold">12268 - BCT DURONTO</h3>
                <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Duronto</span>
              </div>
              <p className="text-slate-500 text-sm font-medium">Runs on: <span className="text-primary">M T W T F S S</span></p>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold">23:40</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">New Delhi</p>
              </div>
              <div className="flex flex-col items-center min-w-[120px]">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">11h 05m</p>
                <div className="w-full h-px bg-slate-200 dark:bg-slate-800 relative">
                  <div className="absolute -top-1 left-0 w-2 h-2 rounded-full border-2 border-primary bg-background-dark"></div>
                  <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-primary"></div>
                  <span className="material-icons absolute left-1/2 -translate-x-1/2 -top-3 text-primary text-lg">electric_bolt</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Non-stop</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">10:45</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Mumbai Central</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[150px] p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/30">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm">3 Tier AC (3A)</span>
                <span className="font-bold text-lg">₹2,100</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-bold text-emerald-500 uppercase">Available 0023</span>
              </div>
            </div>
            
            <div className="flex-1 min-w-[150px] p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/30">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm">2 Tier AC (2A)</span>
                <span className="font-bold text-lg">₹3,450</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-bold text-emerald-500 uppercase">Available 0012</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <div className="flex gap-4">
            <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
              <span className="material-icons text-sm">history</span>
              Probablity
            </button>
            <button className="text-xs font-bold text-slate-400 flex items-center gap-1 hover:text-slate-200">
              <span className="material-icons text-sm">route</span>
              View Route
            </button>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-10 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
            Book Now
          </button>
        </div>
      </motion.div>

      {/* Train Card 3 (Express) */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all group">
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold">12952 - AUGUST KRANTI</h3>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Express</span>
              </div>
              <p className="text-slate-500 text-sm font-medium">Runs on: <span className="text-primary">M T W T F S S</span></p>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold">17:15</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">New Delhi</p>
              </div>
              <div className="flex flex-col items-center min-w-[120px]">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">17h 45m</p>
                <div className="w-full h-px bg-slate-200 dark:bg-slate-800 relative">
                  <div className="absolute -top-1 left-0 w-2 h-2 rounded-full border-2 border-primary bg-background-dark"></div>
                  <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-primary"></div>
                  
                  <div className="absolute left-1/4 top-0 w-1 h-1 rounded-full bg-slate-400"></div>
                  <div className="absolute left-1/2 top-0 w-1 h-1 rounded-full bg-slate-400"></div>
                  <div className="absolute right-1/4 top-0 w-1 h-1 rounded-full bg-slate-400"></div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">6 Stops</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">11:00</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Mumbai Central</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[150px] p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/30">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm">Sleeper (SL)</span>
                <span className="font-bold text-lg">₹750</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-xs font-bold text-red-500 uppercase">WL 122</span>
              </div>
            </div>
            
            <div className="flex-1 min-w-[150px] p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/30">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm">3 Tier AC (3A)</span>
                <span className="font-bold text-lg">₹1,850</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-xs font-bold text-amber-500 uppercase">RAC 04</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <div className="flex gap-4">
            <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
              <span className="material-icons text-sm">history</span>
              Probablity
            </button>
            <button className="text-xs font-bold text-slate-400 flex items-center gap-1 hover:text-slate-200">
              <span className="material-icons text-sm">route</span>
              View Route
            </button>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-10 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
            Book Now
          </button>
        </div>
      </motion.div>

      {/* Ad/Promo Card */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-xl h-32 flex items-center bg-gradient-to-r from-primary to-blue-700 p-8 text-white group cursor-pointer">
        <div className="relative z-10">
          <h4 className="text-xl font-bold mb-1">Upgrade to IRCTC Premium</h4>
          <p className="text-sm opacity-90">Enjoy zero cancellation fees and instant refunds on all bookings.</p>
        </div>
        <div className="absolute right-0 top-0 h-full opacity-20 pointer-events-none transform translate-x-1/4 group-hover:scale-110 transition-transform">
          <span className="material-icons text-[160px]">stars</span>
        </div>
        <button className="ml-auto relative z-10 bg-white text-primary font-bold px-6 py-2 rounded-full text-sm">Get Started</button>
      </motion.div>
    </section>
  );
};

export default TrainList;
