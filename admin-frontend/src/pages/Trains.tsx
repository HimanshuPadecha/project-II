import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../api/axios';
import { TrainCard, TrainCardSkeleton } from '../components/TrainCard';

export const Trains: React.FC = () => {
  const [trains, setTrains] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    trainType: 'EXPRESS',
    daysOfOperation: 'Daily',
    departureTime: '',
    arrivalTime: '',
    duration: '',
  });

  const fetchTrains = async () => {
    try {
      const res = await api.get('/trains');
      setTrains(res.data.response?.data || []);
    } catch (err) {
      console.error("Failed to fetch trains");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      trainNumber: '', trainName: '', source: '', destination: '', trainType: 'EXPRESS', daysOfOperation: 'Daily', departureTime: '', arrivalTime: '', duration: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (train: any) => {
    setEditingId(train._id);
    setFormData({
      trainNumber: train.trainNumber || '',
      trainName: train.trainName || '',
      source: train.source || '',
      destination: train.destination || '',
      trainType: train.trainType || 'EXPRESS',
      daysOfOperation: Array.isArray(train.daysOfOperation) ? train.daysOfOperation.join(', ') : train.daysOfOperation || 'Daily',
      departureTime: train.departureTime || '',
      arrivalTime: train.arrivalTime || '',
      duration: train.duration || '',
    });
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setDeleteConfirmationId(id);
  };

  const executeDelete = async () => {
    if (!deleteConfirmationId) return;
    try {
      await api.delete(`/train/${deleteConfirmationId}`);
      setDeleteConfirmationId(null);
      fetchTrains();
    } catch(err) {
      alert("Failed to delete train");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert comma string to array for backend
    const payload = {
      ...formData,
      daysOfOperation: formData.daysOfOperation.split(',').map(s => s.trim()),
      // Mocking nested arrays to satisfy backend ITrain schema dynamically
      stops: [
        { stationName: formData.source, arrivalTime: formData.departureTime, departureTime: formData.departureTime, stopOrder: 1 },
        { stationName: formData.destination, arrivalTime: formData.arrivalTime, departureTime: formData.arrivalTime, stopOrder: 2 }
      ],
      classes: [
        { className: 'SL', fare: 500, totalSeats: 100, availableSeats: 100 },
        { className: '3A', fare: 1200, totalSeats: 50, availableSeats: 50 }
      ]
    };

    try {
      if (editingId) {
        await api.put(`/train/${editingId}`, payload);
      } else {
        await api.post(`/train`, payload);
      }
      setIsModalOpen(false);
      fetchTrains();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to save train");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Train Management</h1>
        <button onClick={openAddModal} className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-all flex items-center gap-2">
          <span className="material-icons text-xl">add</span>
          Add Train
        </button>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
          <TrainCardSkeleton />
          <TrainCardSkeleton />
          <TrainCardSkeleton />
        </div>
      ) : trains.length === 0 ? (
        <div className="bg-glass border border-glass-border backdrop-blur-md rounded-xl p-8 text-center text-slate-400">
          No trains found.
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
          {trains.map(train => (
            <TrainCard key={train._id} train={train} onEdit={() => openEditModal(train)} onDelete={() => confirmDelete(train._id)} />
          ))}
        </div>
      )}

      {/* Train Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-dark border border-glass-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-glass-border">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="material-icons text-primary">{editingId ? 'edit' : 'train'}</span>
                  {editingId ? 'Edit Train' : 'Add New Train'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  <span className="material-icons">close</span>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form id="trainForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1 block uppercase tracking-wider">Train Number</label>
                    <input required type="text" className="w-full bg-black/40 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" value={formData.trainNumber} onChange={e => setFormData({...formData, trainNumber: e.target.value})} disabled={!!editingId} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1 block uppercase tracking-wider">Train Name</label>
                    <input required type="text" className="w-full bg-black/40 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" value={formData.trainName} onChange={e => setFormData({...formData, trainName: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1 block uppercase tracking-wider">Source Station</label>
                    <input required type="text" className="w-full bg-black/40 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1 block uppercase tracking-wider">Destination</label>
                    <input required type="text" className="w-full bg-black/40 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1 block uppercase tracking-wider">Departure (HH:MM)</label>
                    <input required type="text" placeholder="08:00" className="w-full bg-black/40 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" value={formData.departureTime} onChange={e => setFormData({...formData, departureTime: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1 block uppercase tracking-wider">Arrival (HH:MM)</label>
                    <input required type="text" placeholder="18:30" className="w-full bg-black/40 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" value={formData.arrivalTime} onChange={e => setFormData({...formData, arrivalTime: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1 block uppercase tracking-wider">Duration</label>
                    <input required type="text" placeholder="10h 30m" className="w-full bg-black/40 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1 block uppercase tracking-wider">Train Type</label>
                    <select required className="w-full bg-black/40 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" value={formData.trainType} onChange={e => setFormData({...formData, trainType: e.target.value})}>
                      <option value="EXPRESS">Express</option>
                      <option value="SUPERFAST">Superfast</option>
                      <option value="PASSENGER">Passenger</option>
                      <option value="VANDE_BHARAT">Vande Bharat</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-400 mb-1 block uppercase tracking-wider">Days of Operation (Comma separated)</label>
                    <input required type="text" placeholder="Monday, Tuesday or Daily" className="w-full bg-black/40 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" value={formData.daysOfOperation} onChange={e => setFormData({...formData, daysOfOperation: e.target.value})} />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-glass-border bg-black/20 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-slate-300 hover:bg-glass transition-colors">Cancel</button>
                <button type="submit" form="trainForm" className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 rounded-lg transition-all flex items-center gap-2">
                  <span className="material-icons text-sm">save</span>
                  Save Train
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Delete Confirmation Modal Overlay */}
      <AnimatePresence>
        {deleteConfirmationId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface-dark border border-red-500/30 w-full max-w-md rounded-2xl shadow-2xl shadow-red-500/10 overflow-hidden flex flex-col"
            >
              <div className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                  <span className="material-icons text-red-500 text-3xl">warning</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Delete Train?</h2>
                <p className="text-slate-400">
                  Are you absolutely sure you want to delete this train? This action cannot be undone and will remove it from all active schedules.
                </p>
              </div>

              <div className="p-6 border-t border-glass-border bg-black/20 flex justify-center gap-4">
                <button 
                  onClick={() => setDeleteConfirmationId(null)} 
                  className="px-6 py-2 rounded-lg font-semibold text-slate-300 bg-glass hover:bg-white/10 transition-colors w-full"
                >
                  Cancel
                </button>
                <button 
                  onClick={executeDelete} 
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-all flex items-center justify-center gap-2 w-full"
                >
                  <span className="material-icons text-sm">delete_forever</span>
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
