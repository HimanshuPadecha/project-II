import React from 'react';
import { motion } from 'framer-motion';

const FooterDisclaimer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-12 border-t border-white/10 py-8 bg-background-dark/30"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h5 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">About IRCTC</h5>
            <p className="text-xs text-slate-500 leading-relaxed">
              Indian Railway Catering and Tourism Corporation Ltd. is a central public sector enterprise under the Ministry of Railways, Government of India.
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">Quick Links</h5>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a className="text-xs text-slate-500 hover:text-primary" href="#">Refund Rules</a>
              <a className="text-xs text-slate-500 hover:text-primary" href="#">Train Schedule</a>
              <a className="text-xs text-slate-500 hover:text-primary" href="#">Coach Layout</a>
              <a className="text-xs text-slate-500 hover:text-primary" href="#">Quota Info</a>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <h5 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">Customer Care</h5>
            <p className="text-sm font-bold text-primary">0755-6610661, 0755-4090600</p>
            <p className="text-xs text-slate-500">etickets@irctc.co.in</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-slate-600">Copyright © 2024 - IRCTC. All Rights Reserved. Designed for modern travel.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default FooterDisclaimer;
