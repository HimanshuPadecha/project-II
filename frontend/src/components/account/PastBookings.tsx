import React from 'react';

const PastBookings: React.FC = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="material-icons text-slate-400">history</span>
          Past Bookings
        </h2>
        <div className="flex gap-2 hidden sm:flex">
          <button className="px-4 py-1.5 text-xs font-bold border border-slate-200 dark:border-border-dark rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Last 6 Months</button>
          <button className="px-4 py-1.5 text-xs font-bold border border-slate-200 dark:border-border-dark rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Download All</button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-border-dark">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Journey Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Train / PNR</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Route</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
              <td className="px-6 py-4">
                <p className="font-semibold">Sep 15, 2023</p>
                <p className="text-xs text-slate-500">Friday</p>
              </td>
              <td className="px-6 py-4">
                <p className="font-semibold">Shatabdi Exp (12001)</p>
                <p className="text-xs text-primary font-bold">PNR: 876-2345671</p>
              </td>
              <td className="px-6 py-4">
                <p className="font-semibold">BCT → NDLS</p>
                <p className="text-xs text-slate-500">12h 45m journey</p>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  COMPLETED
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" title="Download E-Ticket">
                  <span className="material-icons text-xl">download</span>
                </button>
              </td>
            </tr>
            
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
              <td className="px-6 py-4">
                <p className="font-semibold">Aug 28, 2023</p>
                <p className="text-xs text-slate-500">Monday</p>
              </td>
              <td className="px-6 py-4">
                <p className="font-semibold">Rajdhani Exp (12431)</p>
                <p className="text-xs text-primary font-bold">PNR: 654-9871234</p>
              </td>
              <td className="px-6 py-4">
                <p className="font-semibold">NZM → TVC</p>
                <p className="text-xs text-slate-500">42h 10m journey</p>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  CANCELLED
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" title="View Details">
                  <span className="material-icons text-xl">visibility</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="p-4 flex justify-center border-t border-slate-100 dark:border-border-dark bg-slate-50/30 dark:bg-slate-800/10">
          <button className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Show More Bookings</button>
        </div>
      </div>
    </section>
  );
};

export default PastBookings;
