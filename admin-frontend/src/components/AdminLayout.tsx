import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Outlet, Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export const AdminLayout: React.FC = () => {
  const { isAdminAuth } = useAdmin();

  if (!isAdminAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-background-dark p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
