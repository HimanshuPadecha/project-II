import React from 'react';

const AccountSidebar: React.FC = () => {
  return (
    <aside className="w-72 bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-border-dark flex flex-col absolute left-0 top-0 h-full z-30 xl:fixed xl:top-20 xl:h-[calc(100vh-80px)]">
      <nav className="flex-1 px-4 py-8 space-y-2">
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white font-medium transition-all" href="#">
          <span className="material-icons text-sm">dashboard</span>
          My Bookings
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" href="#">
          <span className="material-icons text-sm">person</span>
          Profile
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" href="#">
          <span className="material-icons text-sm">confirmation_number</span>
          PNR Status
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" href="#">
          <span className="material-icons text-sm">history</span>
          Transaction History
        </a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" href="#">
          <span className="material-icons text-sm">settings</span>
          Settings
        </a>
      </nav>
      
      <div className="p-4 mt-auto border-t border-slate-200 dark:border-border-dark">
        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-4">
          <img alt="User Avatar" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgfVckKvHRNVGaMjG8JqUrXExoBTyjqIfjn_GF2dQvIczmKD2qWLEdoE7OgoBnohB8PkH6AdacmHgzJvtnbjwFeg-EMOuI3lFkgM9LnHuihCrqDgkHELlj8qsNJ1qk3Ka42qhHS_69ppRACUYqfdqYGW5LsPxVJ9L-_yLiK8DxqrRN9obOdhjZS4WStKtFy_rjlFG_UUOBK_AJLBw5xTfFw3dmVJRK0c7y3kSKJpgWEMDeR5F-gJNeYfxHO1QiMCq6XJu6kmeH_iwK" />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">Rajesh Kumar</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Platinum Member</p>
          </div>
        </div>
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium">
          <span className="material-icons text-sm">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AccountSidebar;
