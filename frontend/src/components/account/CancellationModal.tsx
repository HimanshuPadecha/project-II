import React from 'react';

const CancellationModal: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
      <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-border-dark">
        <div className="p-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-icons text-red-500 text-3xl">report_problem</span>
          </div>
          <h3 className="text-xl font-bold text-center mb-2">Cancel Ticket?</h3>
          <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-8">
            Are you sure you want to cancel PNR <b>421-9876543</b>? 
            A cancellation fee of <span className="text-red-500 font-bold">₹240</span> will be deducted as per IRCTC refund policy.
          </p>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block px-1">Reason for cancellation</span>
              <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-border-dark rounded-lg text-sm focus:ring-primary">
                <option>Plan changed</option>
                <option>Booked another train</option>
                <option>Personal emergency</option>
                <option>Other</option>
              </select>
            </label>
          </div>
        </div>
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex gap-3">
          <button className="flex-1 px-4 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl font-bold transition-all">Keep Ticket</button>
          <button className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all">Confirm Cancellation</button>
        </div>
      </div>
    </div>
  );
};

export default CancellationModal;
