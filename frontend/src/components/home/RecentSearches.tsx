import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

interface RecentSearch {
  source: string;
  destination: string;
  date: string;
  _id: string;
}

const RecentSearches: React.FC = () => {
  const [searches, setSearches] = useState<RecentSearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthError, setIsAuthError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const res = await api.get('/users/recent-searches');
        if (res.data?.response?.success) {
          setSearches(res.data.response.data);
        }
      } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 404) {
          setIsAuthError(true);
        }
        console.error("Failed to fetch recent searches", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearches();
  }, []);

  if (isLoading) return null;

  const handleSearchClick = async (search: RecentSearch) => {
    const searchDate = search.date ? new Date(search.date).toISOString().split('T')[0] : '';
    try {
      const response = await api.post('/trains/search', {
        source: search.source,
        destination: search.destination,
        date: searchDate
      });
      if (response.data?.response?.success) {
         navigate('/train-availability', {
           state: {
             trains: response.data.response.data,
             searchParams: { fromStation: search.source, toStation: search.destination, date: searchDate }
           }
         });
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <motion.div variants={itemVariants} className="mt-16 border-t border-white/10 pt-10">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xl font-bold flex items-center gap-2">
          <span className="material-icons text-primary">history</span>
          Recent Searches
        </h4>
      </div>

      {isAuthError ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center max-w-xl mx-auto">
          <span className="material-icons text-5xl text-slate-500 mb-4 block">lock_person</span>
          <h5 className="text-xl font-bold text-white mb-2">Login to Sync Your Searches</h5>
          <p className="text-sm text-slate-400 mb-6">Create an account or login to automatically save and quickly access your recent routes across all your devices.</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
          >
            <span className="material-icons text-sm">login</span>
            Login Now
          </button>
        </div>
      ) : searches.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center max-w-xl mx-auto">
          <span className="material-icons text-5xl text-slate-500 mb-4 block">history</span>
          <h5 className="text-lg font-bold text-white mb-2">No Searches Yet</h5>
          <p className="text-sm text-slate-400">You haven't searched for any trains recently. Your search history will appear here once you start exploring routes!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {searches.map((search) => {
            const dateObj = new Date(search.date);
            const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
            
            return (
              <div 
                key={search._id} 
                className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 cursor-pointer transition-colors"
                onClick={() => handleSearchClick(search)}
              >
                <p className="text-xs text-slate-500 font-bold mb-1">{formattedDate}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold truncate" title={search.source}>{search.source.split(' ')[0]}</span>
                  <span className="material-icons text-sm text-slate-600 mx-2">arrow_forward</span>
                  <span className="font-bold truncate" title={search.destination}>{search.destination.split(' ')[0]}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 truncate" title={`${search.source} to ${search.destination}`}>
                  {search.source.split(' ')[0]} to {search.destination.split(' ')[0]}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default RecentSearches;
