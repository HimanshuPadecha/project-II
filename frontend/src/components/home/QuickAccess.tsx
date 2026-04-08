import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { api } from '../../api/axios';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const QuickAccess: React.FC = () => {
  // PNR State
  const [pnrInput, setPnrInput] = useState('');
  const [pnrLoading, setPnrLoading] = useState(false);
  const [pnrData, setPnrData] = useState<any>(null);
  const [pnrError, setPnrError] = useState('');

  // Live Train Status State
  const [liveTrainInput, setLiveTrainInput] = useState('');
  const [liveTrainLoading, setLiveTrainLoading] = useState(false);
  const [liveTrainData, setLiveTrainData] = useState<any>(null);
  const [liveTrainError, setLiveTrainError] = useState('');

  const checkPnrStatus = async () => {
    if (pnrInput.length !== 10) {
       setPnrError('Please enter a valid 10-digit PNR.');
       return;
    }
    setPnrLoading(true);
    setPnrError('');
    setPnrData(null);
    try {
       const res = await api.get(`/bookings/pnr/${pnrInput}`);
       if (res.data?.response?.success) {
          setPnrData(res.data.response.data);
       }
    } catch (error: any) {
       setPnrError(error.response?.data?.message || 'Invalid PNR or booking not found.');
    } finally {
       setPnrLoading(false);
    }
  };

  const checkLiveStatus = async () => {
    if (!liveTrainInput.trim()) {
       setLiveTrainError('Please enter a train number.');
       return;
    }
    setLiveTrainLoading(true);
    setLiveTrainError('');
    setLiveTrainData(null);
    try {
       const res = await api.get(`/trains/live/${liveTrainInput}`);
       if (res.data?.response?.success) {
          setLiveTrainData(res.data.response.data);
       }
    } catch (error: any) {
       setLiveTrainError(error.response?.data?.message || 'Train not found or status unavailable.');
    } finally {
       setLiveTrainLoading(false);
    }
  };

  return (
    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {/* PNR Status Card */}
      <div className="glass-card rounded-xl p-6 hover:bg-white/[0.06] transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-icons text-primary">analytics</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">PNR Status</h3>
              <p className="text-sm text-slate-400">Check current booking status of your ticket</p>
            </div>
          </div>
          <div className="flex gap-3">
            <input 
              className="flex-1 bg-white/5 border-white/10 rounded-lg py-3 px-4 focus:ring-primary focus:border-primary text-white" 
              maxLength={10} 
              placeholder="Enter 10-digit PNR" 
              type="text" 
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value.replace(/\D/g, ''))}
            />
            <button 
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center min-w-[140px]"
              onClick={checkPnrStatus}
              disabled={pnrLoading}
            >
              {pnrLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Check Status'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {pnrError && (
             <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 16 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="text-red-400 text-sm p-3 bg-red-500/10 rounded-lg border border-red-500/20 overflow-hidden">
               {pnrError}
             </motion.div>
          )}
          {pnrData && (
             <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 16 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="pt-4 border-t border-white/10 overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                   <div>
                     <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Train</p>
                     <p className="font-bold text-white text-sm">{pnrData.train.trainNumber} - {pnrData.train.trainName}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Status</p>
                     <p className={`font-bold text-sm ${pnrData.status === 'CONFIRMED' ? 'text-emerald-400' : 'text-amber-400'}`}>{pnrData.status}</p>
                   </div>
                </div>
                <div className="space-y-2 max-h-[140px] overflow-y-auto custom-scrollbar pr-2 mt-4">
                  {pnrData.passengers.map((p: any, i: number) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 p-2 rounded-lg text-sm border border-white/5">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="material-icons text-sm text-slate-500">person</span>
                        {p.firstName} {p.lastName}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${p.status === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                          {p.status}
                        </span>
                        <span className="font-mono font-bold text-white">{p.berthAllocated || 'WL'}</span>
                      </div>
                    </div>
                  ))}
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live Train Status Card */}
      <div className="glass-card rounded-xl p-6 hover:bg-white/[0.06] transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-saffron/20 flex items-center justify-center">
              <span className="material-icons text-saffron">sensors</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">Live Train Status</h3>
              <p className="text-sm text-slate-400">Track your train in real-time on the map</p>
            </div>
          </div>
          <div className="flex gap-3 mt-auto">
            <input 
              className="flex-1 bg-white/5 border-white/10 rounded-lg py-3 px-4 focus:ring-primary focus:border-primary text-white" 
              placeholder="Enter Train Number" 
              type="text" 
              value={liveTrainInput}
              onChange={(e) => setLiveTrainInput(e.target.value.replace(/\D/g, ''))}
            />
            <button 
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center min-w-[140px]"
              onClick={checkLiveStatus}
              disabled={liveTrainLoading}
            >
              {liveTrainLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Track Live'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {liveTrainError && (
             <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 16 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="text-red-400 text-sm p-3 bg-red-500/10 rounded-lg border border-red-500/20 overflow-hidden">
               {liveTrainError}
             </motion.div>
          )}
          {liveTrainData && (
             <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 16 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="pt-4 border-t border-white/10 overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                   <div>
                     <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Live Status</p>
                     <p className="font-bold text-white text-sm">{liveTrainData.trainNumber} - {liveTrainData.trainName}</p>
                   </div>
                   <div className="text-right">
                     <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded font-bold bg-saffron/20 text-saffron uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
                        {liveTrainData.statusMessage}
                     </span>
                   </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3 border border-white/5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Current Station</p>
                    <p className="font-semibold text-white truncate" title={liveTrainData.currentStation}>{liveTrainData.currentStation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase">Delay</p>
                    <p className={`font-bold ${liveTrainData.delayMinutes > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {liveTrainData.delayMinutes > 0 ? `${liveTrainData.delayMinutes} mins late` : 'On Time'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Departure</p>
                    <p className="font-semibold text-white">{liveTrainData.scheduledDeparture}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase">Arrival</p>
                    <p className="font-semibold text-white">{liveTrainData.scheduledArrival}</p>
                  </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuickAccess;
