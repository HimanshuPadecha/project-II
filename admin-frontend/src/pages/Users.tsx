import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../api/axios';
import { TableSkeleton } from '../components/TableSkeleton';

export const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        setUsers(res.data.response.data);
      } catch (err) {
        console.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-3xl font-bold mb-8">User Management</h1>
      
      <div className="bg-glass border border-glass-border backdrop-blur-md rounded-xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-glass-border">
                <th className="p-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">Username</th>
                <th className="p-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">Email</th>
                <th className="p-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">Joined Date</th>
                <th className="p-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">Saved Passengers</th>
                <th className="p-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">Searches</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {loading ? (
                <TableSkeleton columns={5} />
              ) : users.length === 0 ? (
                <tr><td colSpan={5} className="text-center p-8 text-slate-400">No users found.</td></tr>
              ) : (
                users.map(user => (
                  <tr key={user._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold text-primary">{user.username}</td>
                    <td className="p-4 text-slate-200">{user.email || 'N/A'}</td>
                    <td className="p-4 text-slate-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-slate-200">{user.savedPassengers?.length || 0}</td>
                    <td className="p-4 text-slate-200">{user.recentSearches?.length || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
