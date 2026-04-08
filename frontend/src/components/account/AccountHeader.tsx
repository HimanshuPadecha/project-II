import React from 'react';

const AccountHeader: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
      <div>
        <h1 className="text-3xl font-bold">Namaste, Rajesh!</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">You have 2 upcoming journeys scheduled.</p>
      </div>
      <div className="flex gap-4">
        <div className="relative group">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input className="pl-10 pr-4 py-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary w-full md:w-64 outline-none transition-all" placeholder="Search PNR or Train..." type="text" />
        </div>
        <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark relative">
          <span className="material-icons text-slate-600 dark:text-slate-400">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark"></span>
        </button>
      </div>
    </header>
  );
};

export default AccountHeader;
