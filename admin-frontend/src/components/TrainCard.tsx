import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TrainCardSkeleton = () => (
  <div className="bg-glass border border-glass-border backdrop-blur-md rounded-2xl p-6 h-[320px] animate-pulse flex flex-col">
    <div className="flex justify-between items-start mb-6">
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 bg-white/10 rounded w-16"></div>
          <div className="h-5 bg-white/10 rounded w-20"></div>
        </div>
        <div className="h-8 bg-white/10 rounded w-2/3 mb-3"></div>
        <div className="h-4 bg-white/10 rounded w-1/2"></div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4 mt-auto">
      <div className="h-16 bg-white/5 rounded-xl"></div>
      <div className="h-16 bg-white/5 rounded-xl"></div>
    </div>
  </div>
);

export const TrainCard = ({ train, onEdit, onDelete }: any) => {
  const [showRoute, setShowRoute] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-dark border border-glass-border backdrop-blur-md rounded-2xl p-6 flex flex-col hover:border-primary/50 transition-colors"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-bold tracking-wider">{train.trainType}</span>
            <span className="text-slate-400 text-sm font-mono font-medium">{train.trainNumber}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{train.trainName}</h3>
          <p className="text-slate-400 text-sm">{train.source} <span className="mx-2 text-slate-600">&rarr;</span> {train.destination}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onEdit} className="w-8 h-8 rounded bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-slate-400" title="Edit Train">
            <span className="material-icons text-sm">edit</span>
          </button>
          <button onClick={onDelete} className="w-8 h-8 rounded bg-white/5 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors text-slate-400" title="Delete Train">
            <span className="material-icons text-sm">delete</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6 bg-black/20 p-4 rounded-xl text-sm">
        <div>
          <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1 font-bold">Departure</p>
          <p className="font-semibold text-slate-200">{train.departureTime}</p>
        </div>
        <div>
          <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1 font-bold">Arrival</p>
          <p className="font-semibold text-slate-200">{train.arrivalTime}</p>
        </div>
        <div>
          <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1 font-bold">Duration</p>
          <p className="font-semibold text-slate-200">{train.duration}</p>
        </div>
        <div>
          <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1 font-bold">Days</p>
          <p className="font-medium text-slate-300 truncate text-xs mt-0.5" title={Array.isArray(train.daysOfOperation) ? train.daysOfOperation.join(', ') : train.daysOfOperation}>
            {Array.isArray(train.daysOfOperation) ? train.daysOfOperation.join(' ') : train.daysOfOperation}
          </p>
        </div>
      </div>

      <div className="border-t border-glass-border pt-4 mt-auto">
        <button 
          onClick={() => setShowRoute(!showRoute)}
          className="flex items-center justify-between w-full text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          <span>View Interactive Route Map</span>
          <span className={`material-icons transition-transform duration-300 ${showRoute ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        
        <AnimatePresence>
          {showRoute && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="relative pl-6 space-y-8 before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-white/10">
                {train.stops?.sort((a: any, b: any) => a.stopOrder - b.stopOrder).map((stop: any, index: number) => {
                  const isFirst = index === 0;
                  const isLast = index === train.stops.length - 1;
                  return (
                    <div key={index} className="relative">
                      <div className={`absolute -left-[29px] top-1 w-4 h-4 rounded-full border-4 z-10 ${isFirst || isLast ? 'bg-black border-primary' : 'bg-surface-dark border-slate-500'}`}></div>
                      <div className="flex justify-between items-start bg-black/20 p-3 rounded-lg border border-white/5 -mt-2 hover:bg-black/40 transition-colors">
                        <div>
                          <p className={`font-semibold text-sm leading-none ${isFirst || isLast ? 'text-primary' : 'text-white'}`}>{stop.stationName}</p>
                          <p className="text-slate-500 text-[10px] mt-1.5 uppercase tracking-wide">Stop #{stop.stopOrder} &bull; {stop.distance || 0} km</p>
                        </div>
                        <div className="text-right flex flex-col gap-1 items-end">
                          {!isFirst && (
                            <span className="text-xs font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded">Arr: {stop.arrivalTime}</span>
                          )}
                          {!isLast && (
                            <span className="text-xs font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">Dep: {stop.departureTime}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
