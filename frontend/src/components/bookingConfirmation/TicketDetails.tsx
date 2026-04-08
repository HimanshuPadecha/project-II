import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const TicketDetails: React.FC = () => {
  return (
    <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4 text-primary font-semibold">
              <span className="material-icons-round text-sm">directions_train</span>
              <span className="text-sm uppercase tracking-wider">12952 • Rajdhani Express</span>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <div className="text-left">
                <h4 className="text-2xl font-bold">NDLS</h4>
                <p className="text-sm text-slate-500">New Delhi</p>
                <p className="text-lg font-semibold mt-1">16:50</p>
                <p className="text-xs text-slate-500 uppercase">Wed, 24 Oct</p>
              </div>
              
              <div className="flex-1 flex flex-col items-center px-4">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">15h 35m</p>
                <div className="w-full flex items-center gap-2">
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
                  <span className="material-icons-round text-primary text-sm">circle</span>
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Non-stop</p>
              </div>
              
              <div className="text-right">
                <h4 className="text-2xl font-bold">MMCT</h4>
                <p className="text-sm text-slate-500">Mumbai Central</p>
                <p className="text-lg font-semibold mt-1">08:25</p>
                <p className="text-xs text-slate-500 uppercase">Thu, 25 Oct</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-px md:h-24 bg-slate-200 dark:bg-white/10 hidden md:block"></div>
          
          <div className="md:w-48">
            <div className="bg-white p-2 rounded-lg inline-block shadow-lg">
              <img alt="Ticket QR" className="w-24 h-24" data-alt="Secure QR code for digital ticket verification" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACKVIAGrNjZXJcEVfZLhPKwzZ9TnLY_BdOmDFz0_Bc8wGZR9u2VBo_v3o1KVyGudmZqQc2FbyTT5MLydXfIXUyH8Gu9KcoxchrweYjS6OSTbFtCs9oVov6mZeB54yuzkDPCP8KCvYL-w3DAnkGgTfJ5sSshUkQU7tw5f0UwGXDRLfn01VeYVqdf_QdkKx0hfwEGA4c6RANCb5P36NtUOEqBuBiWVq7TBEtlI8HnhJ0sZE2TGjoV8P7vKdyAecMR9-oaoLR_2XEYNWi" />
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-center uppercase tracking-tighter">Scan for E-Ticket</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-4 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5">
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold">Class</p>
            <p className="font-semibold">3rd AC (3A)</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold">Quota</p>
            <p className="font-semibold">General</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold">Booking Date</p>
            <p className="font-semibold">12 Oct, 2023</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold">Transaction ID</p>
            <p className="font-semibold">#TXN99021</p>
          </div>
        </div>
        
        <div className="mb-2">
          <h5 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="material-icons-round text-primary text-sm">group</span>
            Passenger Details
          </h5>
          <div className="overflow-hidden border border-slate-200 dark:border-white/5 rounded-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-white/5 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold text-center">Age/Sex</th>
                  <th className="px-4 py-3 font-semibold text-center">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Coach/Berth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                <tr>
                  <td className="px-4 py-4 font-medium">Rajesh Kumar</td>
                  <td className="px-4 py-4 text-center">34 / M</td>
                  <td className="px-4 py-4 text-center"><span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded">CNF</span></td>
                  <td className="px-4 py-4 text-right font-bold">B2 / 42 (LB)</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-medium">Priya Kumar</td>
                  <td className="px-4 py-4 text-center">31 / F</td>
                  <td className="px-4 py-4 text-center"><span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded">CNF</span></td>
                  <td className="px-4 py-4 text-right font-bold">B2 / 45 (MB)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="ticket-cutout dashed-line mx-8"></div>
      
      <div className="p-8 bg-slate-50/50 dark:bg-white/[0.02]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">Total Fare Paid</p>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-semibold">₹</span>
              <span className="text-3xl font-extrabold">3,450.00</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-3 glass-effect rounded-lg font-bold text-sm flex items-center justify-center gap-2 border border-primary/20 hover:bg-primary/20 transition-all">
              <span className="material-icons-round text-sm">file_download</span>
              Download PDF
            </button>
            <button className="flex-1 md:flex-none px-6 py-3 bg-primary text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
              <span className="material-icons-round text-sm">print</span>
              Print Ticket
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketDetails;
