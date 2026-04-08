import React from 'react';
import AccountSidebar from './components/account/AccountSidebar';
import AccountHeader from './components/account/AccountHeader';
import UpcomingJourneys from './components/account/UpcomingJourneys';
import PastBookings from './components/account/PastBookings';
import CancellationModal from './components/account/CancellationModal';

const Account: React.FC = () => {
  return (
    <div className="flex bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display min-h-[calc(100vh-80px)] relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      ` }} />

      <AccountSidebar />

      <main className="xl:ml-72 flex-1 p-8 lg:p-12 w-full">
        <AccountHeader />
        <UpcomingJourneys />
        <PastBookings />
      </main>

      <CancellationModal />
    </div>
  );
};

export default Account;
