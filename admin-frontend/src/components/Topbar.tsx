import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { api } from '../api/axios';
import { useNavigate } from 'react-router-dom';

export const Topbar: React.FC = () => {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch(e) {
      console.error(e);
    }
    logout();
    navigate('/login');
  };

  return (
    <div className="h-[70px] border-b border-glass-border flex items-center justify-end px-8 bg-glass">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-background-dark px-4 py-2 rounded-full border border-glass-border">
          <span className="material-icons text-primary text-xl">account_circle</span>
          <span className="text-sm font-medium">{admin?.username || 'Admin'}</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-500 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <span className="material-icons text-xl">logout</span>
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
};
