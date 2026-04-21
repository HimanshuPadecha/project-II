import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../api/axios';
import { TableSkeleton } from '../components/TableSkeleton';

export const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings');
        setBookings(res.data.response.data);
      } catch (err) {
        console.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-3xl font-bold mb-8">Booking Records</h1>
      
      <div className="bg-glass border border-glass-border backdrop-blur-md rounded-xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-glass-border">
                <th className="p-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">Booking ID / PNR</th>
                <th className="p-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">User</th>
                <th className="p-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">Train</th>
                <th className="p-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">Status</th>
                <th className="p-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">Journey Date</th>
                <th className="p-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">Total Fare</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {loading ? (
                <TableSkeleton columns={6} />
              ) : bookings.length === 0 ? (
                <tr><td colSpan={6} className="text-center p-8 text-slate-400">No bookings found.</td></tr>
              ) : (
                bookings.map(booking => (
                  <tr key={booking._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-slate-400">{booking.pnrNumber || booking._id}</td>
                    <td className="p-4 font-semibold text-slate-100">{booking.user?.username || 'Unknown'}</td>
                    <td className="p-4 text-slate-200">{booking.train?.trainNumber || booking.train || 'N/A'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${booking.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-500' : booking.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>
                        {booking.status || 'UNKNOWN'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{new Date(booking.dateOfJourney).toLocaleDateString()}</td>
                    <td className="p-4 font-semibold text-primary">₹{booking.fareBreakdown?.totalAmount?.toFixed(2) || '0.00'}</td>
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
