import React, { useState, useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { api } from '../../api/axios';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const StationInput = ({ 
  label, 
  icon, 
  placeholder, 
  value, 
  onChange 
}: { 
  label: string, 
  icon: string, 
  placeholder: string, 
  value: string, 
  onChange: (val: string) => void 
}) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query || query.length < 2 || query === value) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await api.get(`/trains/stations?query=${query}`);
        if (response.data?.response?.success) {
          setSuggestions(response.data.response.data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Failed to fetch stations", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</label>
      <div className="relative group">
        <span className="material-icons absolute left-3 top-3 text-primary text-xl">{icon}</span>
        <input 
          className="w-full bg-white/5 border-white/10 rounded-lg py-3 pl-11 pr-10 focus:ring-primary focus:border-primary text-white placeholder-slate-500 transition-colors" 
          placeholder={placeholder} 
          type="text" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
             <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {isOpen && suggestions.length > 0 && (
          <ul className="absolute z-50 w-full mt-2 bg-[#1a1f2c] border border-white/10 rounded-lg shadow-2xl max-h-60 overflow-y-auto top-full custom-scrollbar backdrop-blur-xl">
            {suggestions.map((station, idx) => (
              <li 
                key={idx}
                className="px-4 py-3 hover:bg-white/10 cursor-pointer text-slate-300 hover:text-white transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
                onClick={() => {
                  setQuery(station);
                  onChange(station);
                  setIsOpen(false);
                }}
              >
                <span className="material-icons text-primary/70 text-sm">train</span>
                <span className="truncate">{station}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

import { useNavigate } from 'react-router-dom';

const SearchPanel: React.FC = () => {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [date, setDate] = useState("");
  const [travelClass, setTravelClass] = useState("ALL");
  const [trainType, setTrainType] = useState("ALL");
  const [flexibleDate, setFlexibleDate] = useState(false);
  const [availableBerth, setAvailableBerth] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // Get today's date in YYYY-MM-DD format to restrict past dates
  const today = new Date().toISOString().split('T')[0];

  const handleSwap = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleSearch = async () => {
    if (!fromStation || !toStation) {
      // Basic validation
      return;
    }

    try {
      setIsSearching(true);
      const response = await api.post('/trains/search', {
        source: fromStation,
        destination: toStation,
        date: (!flexibleDate && date) ? date : undefined,
        travelClass,
        trainType,
        availableBerth
      });

      if (response.data?.response?.success) {
        
        // Push Search to history
        api.post('/users/recent-searches', {
          source: fromStation,
          destination: toStation,
          date: (!flexibleDate && date) ? date : new Date().toISOString().split('T')[0]
        }).catch(err => console.error("Failed to save recent search", err));

        const matchingTrains = response.data.response.data;
        // Redirect to availability page, passing the fetched trains and search params via state
        navigate('/train-availability', { 
          state: { 
            trains: matchingTrains,
            searchParams: { fromStation, toStation, date, travelClass, trainType, flexibleDate, availableBerth }
          } 
        });
      }
    } catch (error) {
      console.error("Failed to search trains", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 shadow-2xl relative z-10 hover-lift">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Station From/To */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <StationInput 
            label="From Station" 
            icon="location_on" 
            placeholder="NDLS - New Delhi" 
            value={fromStation} 
            onChange={setFromStation} 
          />
          
          <button 
            type="button"
            className="absolute left-1/2 top-10 -translate-x-1/2 w-10 h-10 bg-[#1a1f2c] border border-white/10 rounded-full flex items-center justify-center z-10 hover:border-primary hover:text-primary transition-all text-slate-400 shadow-lg group"
            onClick={handleSwap}
          >
            <span className="material-icons text-lg group-hover:rotate-180 transition-transform duration-300">swap_horiz</span>
          </button>
          
          <StationInput 
            label="To Station" 
            icon="near_me" 
            placeholder="BCT - Mumbai Central" 
            value={toStation} 
            onChange={setToStation} 
          />
        </div>

        {/* Date Picker */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Journey Date</label>
          <div className="relative">
            <span className="material-icons absolute left-3 top-3 text-primary text-xl">calendar_today</span>
            <input 
              className="w-full bg-white/5 border-white/10 rounded-lg py-3 pl-11 focus:ring-primary focus:border-primary text-white [color-scheme:dark] transition-colors" 
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* Class Select */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Travel Class</label>
          <div className="relative">
            <span className="material-icons absolute left-3 top-3 text-primary text-xl">airline_seat_recline_extra</span>
            <select 
              className="w-full bg-white/5 border-white/10 rounded-lg py-3 pl-11 pr-10 focus:ring-primary focus:border-primary text-white appearance-none transition-colors" 
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
            >
              <option value="ALL" className="bg-[#1a1f2c] text-white">All Classes</option>
              <option value="1A" className="bg-[#1a1f2c] text-white">AC First Class (1A)</option>
              <option value="2A" className="bg-[#1a1f2c] text-white">AC 2 Tier (2A)</option>
              <option value="3A" className="bg-[#1a1f2c] text-white">AC 3 Tier (3A)</option>
              <option value="SL" className="bg-[#1a1f2c] text-white">Sleeper (SL)</option>
            </select>
            <span className="material-icons absolute right-3 top-3 text-slate-500 pointer-events-none">expand_more</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {/* Train Type Select */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Train Type</label>
          <div className="relative">
            <span className="material-icons absolute left-3 top-3 text-primary text-xl">train</span>
            <select 
              className="w-full bg-white/5 border-white/10 rounded-lg py-3 pl-11 pr-10 focus:ring-primary focus:border-primary text-white appearance-none transition-colors" 
              value={trainType}
              onChange={(e) => setTrainType(e.target.value)}
            >
              <option value="ALL" className="bg-[#1a1f2c] text-white">All Types</option>
              <option value="SUPERFAST" className="bg-[#1a1f2c] text-white">Superfast</option>
              <option value="EXPRESS" className="bg-[#1a1f2c] text-white">Express</option>
              <option value="DURONTO" className="bg-[#1a1f2c] text-white">Duronto</option>
              <option value="RAJDHANI" className="bg-[#1a1f2c] text-white">Rajdhani</option>
              <option value="SHATABDI" className="bg-[#1a1f2c] text-white">Shatabdi</option>
              <option value="VANDE BHARAT" className="bg-[#1a1f2c] text-white">Vande Bharat</option>
            </select>
            <span className="material-icons absolute right-3 top-3 text-slate-500 pointer-events-none">expand_more</span>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="lg:col-span-2 flex items-center gap-6 pt-6 opacity-0">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-offset-background-dark transition-colors" 
              type="checkbox" 
              checked={flexibleDate}
              onChange={(e) => setFlexibleDate(e.target.checked)}
            />
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Flexible with Date</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-offset-background-dark transition-colors" 
              type="checkbox" 
              checked={availableBerth}
              onChange={(e) => setAvailableBerth(e.target.checked)}
            />
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Train with Available Berth</span>
          </label>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            className="gradient-btn w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 text-white hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] transition-all disabled:opacity-75"
          >
            {isSearching ? (
              <span className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <span>SEARCH TRAINS</span>
                <span className="material-icons">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchPanel;
