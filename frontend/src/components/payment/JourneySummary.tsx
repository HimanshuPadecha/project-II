import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const JourneySummary: React.FC = () => {
  return (
    <motion.div variants={itemVariants} className="lg:col-span-4">
      <div className="sticky top-28 space-y-6">
        {/* Journey Summary Card */}
        <div className="bg-surface-dark rounded-xl border border-primary/10 overflow-hidden shadow-2xl shadow-black/50">
          <div className="bg-primary/10 px-6 py-4 border-b border-primary/20">
            <h3 className="font-bold flex items-center justify-between">
              Journey Summary
              <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded">PNR: 4210984532</span>
            </h3>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400 mb-1">NDLS • New Delhi</p>
                <p className="font-bold text-lg leading-tight">16:15</p>
                <p className="text-[10px] text-slate-500">Wed, 24 May</p>
              </div>
              <div className="flex flex-col items-center flex-1 px-4 pt-4">
                <div className="w-full flex items-center gap-1">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-primary to-slate-700 border-dashed border-t border-slate-500"></div>
                  <span className="material-icons text-primary text-sm">train</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-primary to-slate-700 border-dashed border-t border-slate-500"></div>
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                </div>
                <span className="text-[10px] text-slate-500 mt-1">12h 45m</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 mb-1">BOM • Mumbai Central</p>
                <p className="font-bold text-lg leading-tight">05:00</p>
                <p className="text-[10px] text-slate-500">Thu, 25 May</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="material-icons text-slate-500 text-base">airline_seat_recline_extra</span>
                <span className="text-slate-300">2AC • Rajdhani Exp</span>
              </div>
              <div className="text-slate-300">2 Passengers</div>
            </div>
          </div>
          
          {/* Price Breakdown */}
          <div className="p-6 bg-background-dark/50 border-t border-slate-700/50 space-y-3">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Base Fare</span>
              <span>₹4,240.00</span>
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>Convenience Fee (incl. GST)</span>
              <span>₹11.80</span>
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>Travel Insurance</span>
              <span>₹0.70</span>
            </div>
            
            <div className="pt-3 border-t border-slate-700 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold uppercase text-slate-500 tracking-wider">Total Payable</p>
                <p className="text-3xl font-extrabold text-accent-green">₹4,252.50</p>
              </div>
              <div className="h-10 w-10 rounded-full border border-accent-green/30 flex items-center justify-center">
                <span className="material-icons text-accent-green">payments</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all pay-glow active:scale-[0.98]">
              PAY SECURELY NOW
              <span className="material-icons text-sm">lock</span>
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-4 px-6 leading-relaxed">
              By clicking Pay Now, you agree to the IRCTC <span className="text-primary underline">Terms &amp; Conditions</span> and <span className="text-primary underline">Privacy Policy</span>.
            </p>
          </div>
        </div>

        {/* Offers / Help */}
        <div className="bg-accent-green/5 rounded-xl border border-accent-green/20 p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center flex-shrink-0">
            <span className="material-icons text-accent-green">local_offer</span>
          </div>
          <div>
            <p className="text-xs font-bold text-accent-green">RAIL50 applied!</p>
            <p className="text-[10px] text-slate-400">You saved ₹50 on convenience fee with this transaction.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JourneySummary;
