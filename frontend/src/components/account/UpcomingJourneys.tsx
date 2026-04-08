import React from 'react';

const UpcomingJourneys: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="material-icons text-primary">event_upcoming</span>
          Upcoming Journeys
        </h2>
        <button className="text-primary font-semibold hover:underline">View All</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Ticket Card 1 */}
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 border-b border-slate-100 dark:border-border-dark flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">PNR NUMBER</p>
              <p className="text-lg font-bold text-primary">421-9876543</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded-full">CONFIRMED</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="text-center">
                <h3 className="text-3xl font-black">NDLS</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">NEW DELHI</p>
                <p className="text-sm font-bold mt-2">06:00 AM</p>
              </div>
              <div className="flex-1 px-8 relative flex flex-col items-center">
                <p className="text-xs text-slate-400 font-bold mb-2">TRAIN 12002</p>
                <div className="w-full h-[2px] bg-slate-200 dark:bg-slate-700 relative">
                  <span className="material-icons absolute left-1/2 -translate-x-1/2 -top-3 text-primary bg-white dark:bg-surface-dark px-2">train</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">6h 30m Duration</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-black">BCT</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">MUMBAI CENTRAL</p>
                <p className="text-sm font-bold mt-2">12:30 PM</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-slate-100 dark:border-border-dark">
              <div>
                <p className="text-xs text-slate-500">Date</p>
                <p className="font-semibold">Oct 24, 2023</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Class</p>
                <p className="font-semibold">Exec. Chair Car (EC)</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Seat</p>
                <p className="font-semibold">C1, 42 (Window)</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-primary text-white py-2.5 rounded-lg font-bold text-sm hover:bg-blue-600 transition-colors">Download E-Ticket</button>
            <button className="px-6 py-2.5 border border-red-200 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-bold text-sm transition-colors">Cancel</button>
          </div>
        </div>

        {/* Ticket Card 2 */}
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 border-b border-slate-100 dark:border-border-dark flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">PNR NUMBER</p>
              <p className="text-lg font-bold text-primary">210-4567890</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-full">RAC 2</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="text-center">
                <h3 className="text-3xl font-black">MAS</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">CHENNAI CENTRAL</p>
                <p className="text-sm font-bold mt-2">08:15 PM</p>
              </div>
              <div className="flex-1 px-8 relative flex flex-col items-center">
                <p className="text-xs text-slate-400 font-bold mb-2">TRAIN 22625</p>
                <div className="w-full h-[2px] bg-slate-200 dark:bg-slate-700 relative">
                  <span className="material-icons absolute left-1/2 -translate-x-1/2 -top-3 text-primary bg-white dark:bg-surface-dark px-2">train</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">5h 00m Duration</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-black">SBC</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">KSR BENGALURU</p>
                <p className="text-sm font-bold mt-2">01:15 AM</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-slate-100 dark:border-border-dark">
              <div>
                <p className="text-xs text-slate-500">Date</p>
                <p className="font-semibold">Nov 02, 2023</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Class</p>
                <p className="font-semibold">AC 3 Tier (3A)</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Coach</p>
                <p className="font-semibold">B4, RAC 2</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-primary text-white py-2.5 rounded-lg font-bold text-sm hover:bg-blue-600 transition-colors">Download E-Ticket</button>
            <button className="px-6 py-2.5 border border-red-200 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-bold text-sm transition-colors">Cancel</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingJourneys;
