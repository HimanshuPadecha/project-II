import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ... Card logic ...

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const TrainCard = ({ train }: { train: any }) => {
  const [selectedClass, setSelectedClass] = useState(train.classes?.[0]?.className || '');
  const [showRoute, setShowRoute] = useState(false);
  const navigate = useNavigate();
  
  const isSuperfast = train.trainType === 'SUPERFAST' || train.trainType === 'RAJDHANI' || train.trainType === 'DURONTO';
  const tagColor = train.trainType === 'DURONTO' ? 'bg-emerald-500/10 text-emerald-500' : (isSuperfast ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500');
  
  const allDays = ["M", "T", "W", "Th", "F", "S", "Su"];

  const handleBookNow = () => {
    const classData = train.classes?.find((c: any) => c.className === selectedClass);
    navigate('/passenger-fare', {
      state: {
        train,
        selectedClass: classData
      }
    });
  };

  return (
    <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all group">
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-bold">{train.trainNumber} - {train.trainName}</h3>
              <span className={`${tagColor} text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider`}>{train.trainType}</span>
            </div>
            <p className="text-slate-500 text-sm font-medium flex gap-1">Runs on: 
              {allDays.map(d => (
                <span key={d} className={train.daysOfOperation?.includes(d) ? 'text-primary' : 'text-slate-300 dark:text-slate-700'}>{d[0]}</span>
              ))}
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold">{train.departureTime}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter" title={train.source}>{train.source}</p>
            </div>
            <div className="flex flex-col items-center min-w-[120px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{train.duration}</p>
              <div className="w-full h-px bg-slate-200 dark:bg-slate-800 relative">
                <div className="absolute -top-1 left-0 w-2 h-2 rounded-full border-2 border-primary bg-background-dark"></div>
                <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-primary"></div>
                <span className={`material-icons absolute left-1/2 -translate-x-1/2 -top-3 ${isSuperfast ? 'text-primary' : 'text-slate-400'} text-lg`}>{isSuperfast ? 'electric_bolt' : 'train'}</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{(train.stops?.length > 2) ? `${train.stops.length - 2} Stops` : 'Non-stop'}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{train.arrivalTime}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter" title={train.destination}>{train.destination}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {train.classes?.map((cls: any) => {
            const availabilityStr = cls.availableSeats > 20 ? `AVAILABLE ${cls.availableSeats}` : (cls.availableSeats > 0 ? `RAC ${cls.availableSeats}` : `WL ${Math.abs(cls.availableSeats) + 1}`);
            const statusColorClass = cls.availableSeats > 20 ? 'text-emerald-500' : (cls.availableSeats > 0 ? 'text-amber-500' : 'text-red-500');
            const dotColorClass = cls.availableSeats > 20 ? 'bg-emerald-500' : (cls.availableSeats > 0 ? 'bg-amber-500' : 'bg-red-500');
            const isSelected = cls.className === selectedClass;

            return (
              <div 
                key={cls.className} 
                onClick={() => setSelectedClass(cls.className)}
                className={`flex-1 min-w-[150px] p-4 rounded-xl border ${isSelected ? 'border-2 border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30'} cursor-pointer hover:border-primary/50 transition-colors`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-bold text-sm ${isSelected ? '' : 'text-slate-400'}`}>{cls.className}</span>
                  <span className={`font-bold text-lg ${isSelected ? 'text-primary' : 'text-slate-400'}`}>₹{cls.fare || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${dotColorClass}`}></div>
                  <span className={`text-xs font-bold ${statusColorClass} uppercase`}>{availabilityStr}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Route Timeline Expandable */}
        {showRoute && train.stops && train.stops.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 24 }}
            className="pt-6 border-t border-slate-200 dark:border-slate-800"
          >
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Train Route</h4>
            <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 space-y-6 pb-2">
              {train.stops.sort((a: any, b: any) => a.stopOrder - b.stopOrder).map((stop: any, index: number) => (
                <div key={index} className="relative pl-6">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 ${index === 0 || index === train.stops.length - 1 ? 'bg-primary' : 'bg-slate-400 dark:bg-slate-600'}`}></div>
                  
                  <div className="grid grid-cols-12 gap-4 text-sm">
                    <div className="col-span-6 md:col-span-4 font-bold text-slate-700 dark:text-slate-200">
                      {stop.stationName}
                      <p className="text-xs font-normal text-slate-400 truncate">Stop {stop.stopOrder}</p>
                    </div>
                    <div className="col-span-3 text-center md:text-left">
                      <span className="text-slate-500 text-xs uppercase hidden md:inline-block md:mr-2">Arr</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-300">{stop.arrivalTime}</span>
                    </div>
                    <div className="col-span-3 text-center md:text-left">
                      <span className="text-slate-500 text-xs uppercase hidden md:inline-block md:mr-2">Dep</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-300">{stop.departureTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div className="flex gap-4">
          <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            <span className="material-icons text-sm">history</span>
            Probablity
          </button>
          <button 
            onClick={() => setShowRoute(!showRoute)}
            className={`text-xs font-bold flex items-center gap-1 transition-colors ${showRoute ? 'text-primary' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <span className="material-icons text-sm">{showRoute ? 'expand_less' : 'route'}</span>
            {showRoute ? 'Hide Route' : 'View Route'}
          </button>
        </div>
        <button onClick={handleBookNow} className="bg-primary hover:bg-primary/90 text-white px-10 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

interface TrainListProps {
  trains: any[];
  searchParams: any;
}

const TrainList: React.FC<TrainListProps> = ({ trains, searchParams }) => {
  const [sortOption, setSortOption] = useState("Departure Time");

  const parseMins = (timeStr: string) => {
    // Basic helper to convert "12h 15m" to numeric minutes for sorting
    let mins = 0;
    if (timeStr.includes('h')) mins += parseInt(timeStr.split('h')[0]) * 60;
    if (timeStr.includes('m')) mins += parseInt(timeStr.split('h')[1].replace('m', '').trim()) || 0;
    return mins;
  };

  const getSortedTrains = () => {
    if (trains.length <= 1) return trains;
    const sorted = [...trains];
    
    if (sortOption === "Departure Time") {
      sorted.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    } else if (sortOption === "Earliest Arrival") {
      sorted.sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime));
    } else if (sortOption === "Duration") {
      sorted.sort((a, b) => parseMins(a.duration) - parseMins(b.duration));
    }
    return sorted;
  };

  const sortedTrains = getSortedTrains();

  return (
    <section className="col-span-12 lg:col-span-9 space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
        <p className="text-slate-500 font-medium truncate pr-4">Showing <span className="text-slate-900 dark:text-white">{trains.length} train{trains.length !== 1 ? 's' : ''}</span> from <span className="font-bold text-slate-700 dark:text-slate-300">{searchParams.fromStation || 'Source'}</span> to <span className="font-bold text-slate-700 dark:text-slate-300">{searchParams.toStation || 'Destination'}</span></p>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold text-slate-400">Sort by:</span>
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer text-primary"
          >
            <option>Departure Time</option>
            <option>Duration</option>
            <option>Earliest Arrival</option>
          </select>
        </div>
      </motion.div>

      {sortedTrains.length === 0 ? (
         <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
           <span className="material-icons text-6xl text-slate-600 mb-4 inline-block">train</span>
           <h3 className="text-xl font-bold text-white mb-2">No Trains Found</h3>
           <p className="text-slate-400 max-w-md mx-auto">We couldn't find any trains matching your search criteria. Try adjusting your filters or date.</p>
         </div>
      ) : (
         sortedTrains.map((train: any) => (
           <TrainCard key={train._id || train.trainNumber} train={train} />
         ))
      )}

      {/* Ad/Promo Card */}
      {sortedTrains.length > 0 && (
        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-xl h-32 flex items-center bg-gradient-to-r from-primary to-blue-700 p-8 text-white group cursor-pointer">
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-1">Upgrade to IRCTC Premium</h4>
            <p className="text-sm opacity-90">Enjoy zero cancellation fees and instant refunds on all bookings.</p>
          </div>
          <div className="absolute right-0 top-0 h-full opacity-20 pointer-events-none transform translate-x-1/4 group-hover:scale-110 transition-transform">
            <span className="material-icons text-[160px]">stars</span>
          </div>
          <button className="ml-auto relative z-10 bg-white text-primary font-bold px-6 py-2 rounded-full text-sm">Get Started</button>
        </motion.div>
      )}
    </section>
  );
};

export default TrainList;
