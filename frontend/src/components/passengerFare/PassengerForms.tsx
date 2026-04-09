import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { type PassengerInfo } from '../../PassengerFare';
import { api } from '../../api/axios';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

interface PassengerFormsProps {
  passengers: PassengerInfo[];
  setPassengers: React.Dispatch<React.SetStateAction<PassengerInfo[]>>;
  hasInsurance: boolean;
  setHasInsurance: React.Dispatch<React.SetStateAction<boolean>>;
  contactEmail: string;
  setContactEmail: React.Dispatch<React.SetStateAction<string>>;
  contactPhone: string;
  setContactPhone: React.Dispatch<React.SetStateAction<string>>;
}

const PassengerForms: React.FC<PassengerFormsProps> = ({ 
  passengers, setPassengers, hasInsurance, setHasInsurance,
  contactEmail, setContactEmail, contactPhone, setContactPhone
}) => {
  const [savedDBPassengers, setSavedDBPassengers] = useState<any[]>([]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await api.get('/users/saved-passengers');
        if (res.data?.response?.success) {
          setSavedDBPassengers(res.data.response.data);
        }
      } catch(err) {
        console.error("Failed to load generic saved passengers", err);
      }
    };
    fetchSaved();
  }, []);

  const handleSelectSaved = (saved: any) => {
    const emptyIndex = passengers.findIndex(p => p.name.trim() === '');
    
    if (emptyIndex !== -1) {
      setPassengers(prev => {
        const newArr = [...prev];
        newArr[emptyIndex] = {
           ...newArr[emptyIndex],
           name: saved.fullName,
           age: saved.age.toString(),
           gender: saved.gender,
           berth: saved.berthPreference || ''
        };
        return newArr;
      });
    } else {
      if (passengers.length >= 6) return;
      setPassengers(prev => [
        ...prev,
        {
           id: Date.now().toString(),
           name: saved.fullName,
           age: saved.age.toString(),
           gender: saved.gender,
           berth: saved.berthPreference || ''
        }
      ]);
    }
    setIsSavedModalOpen(false);
  };

  const updatePassenger = (id: string, field: keyof PassengerInfo, value: string) => {
    setPassengers(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const canAddPassenger = passengers.every(p => {
    const ageNum = parseInt(p.age);
    return p.name.trim().length > 0 && !isNaN(ageNum) && ageNum > 0 && ageNum <= 120;
  });

  const addPassenger = async () => {
    if (passengers.length >= 6) return; // Limit standard booking to 6
    if (!canAddPassenger) return; // Only allow adding sequentially 

    // Auto sync latest passenger into DB seamlessly!
    const lastP = passengers[passengers.length - 1];
    if (lastP && lastP.name) {
      try {
        await api.post('/users/saved-passengers', {
          fullName: lastP.name,
          age: lastP.age,
          gender: lastP.gender,
          berthPreference: lastP.berth
        });
        
        // Refresh silently ensuring Modal receives active sync immediately
        const res = await api.get('/users/saved-passengers');
        if (res.data?.response?.success) {
          setSavedDBPassengers(res.data.response.data);
        }
      } catch (err) {
        console.error("Failed to sync passenger to DB", err);
      }
    }

    setPassengers(prev => [
      ...prev, 
      { id: Date.now().toString(), name: '', age: '', gender: 'MALE', berth: '' }
    ]);
  };

  return (
    <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
      <section>
        <div className="flex items-center justify-between mb-4 relative z-40">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="material-icons text-primary">groups</span>
            Passenger Details
          </h3>
          <button 
            onClick={() => setIsSavedModalOpen(!isSavedModalOpen)}
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            <span className="material-icons text-sm">history</span>
            Choose from Saved
          </button>
          
          {isSavedModalOpen && (
            <div className="absolute right-0 top-10 w-72 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl p-4 z-50">
              <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Your Saved Passengers</h4>
              {savedDBPassengers.length === 0 ? (
                <p className="text-sm text-slate-500 italic">No saved passengers found. They are automatically saved when you add passengers.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {savedDBPassengers.map(sp => (
                     <div 
                       key={sp._id || sp.fullName} 
                       onClick={() => handleSelectSaved(sp)}
                       className="p-3 bg-white/5 hover:bg-primary/20 rounded-lg cursor-pointer border border-transparent hover:border-primary/30 transition-all"
                     >
                       <p className="text-sm font-bold text-white">{sp.fullName}</p>
                       <p className="text-[10px] text-slate-400 font-medium">Age: {sp.age} Yrs • {sp.gender} {sp.berthPreference ? `• ${sp.berthPreference}` : ''}</p>
                     </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {passengers.map((passenger, index) => (
          <div key={passenger.id} className="glass-card rounded-xl p-6 mb-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/40"></div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-1 flex items-start justify-center pt-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary border border-primary/20">{index + 1}</span>
              </div>
              <div className="md:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full md:col-span-1">
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Full Name (as per ID)</label>
                  <input 
                    value={passenger.name}
                    onChange={(e) => updatePassenger(passenger.id, 'name', e.target.value)}
                    className="w-full glass-input rounded-lg px-4 py-3 text-sm focus:ring-0" 
                    placeholder="Enter passenger name" 
                    type="text" 
                  />
                </div>
                <div className="md:col-span-1 flex gap-4">
                  <div className="w-1/3">
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Age</label>
                    <input 
                      value={passenger.age}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          updatePassenger(passenger.id, 'age', '');
                          return;
                        }
                        const num = parseInt(val, 10);
                        if (!isNaN(num) && num > 0 && num <= 120) {
                          updatePassenger(passenger.id, 'age', num.toString());
                        }
                      }}
                      className="w-full glass-input rounded-lg px-4 py-3 text-sm focus:ring-0" 
                      placeholder="Age" 
                      type="number" 
                      min="1"
                      max="120"
                    />
                  </div>
                  <div className="w-2/3">
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Gender</label>
                    <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
                      {['MALE', 'FEMALE', 'TG'].map(g => (
                        <button 
                          key={g}
                          onClick={() => updatePassenger(passenger.id, 'gender', g)}
                          className={`flex-1 py-2 text-xs font-bold rounded-md ${passenger.gender === g ? 'bg-primary text-white' : 'hover:bg-white/5 text-slate-400'}`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-span-full">
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Berth Preference</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { id: 'LOWER', icon: 'vertical_align_bottom', label: 'LOWER' },
                      { id: 'MIDDLE', icon: 'reorder', label: 'MIDDLE' },
                      { id: 'UPPER', icon: 'vertical_align_top', label: 'UPPER' },
                      { id: 'SIDE L', icon: 'align_horizontal_left', label: 'SIDE L' },
                      { id: 'SIDE U', icon: 'align_horizontal_right', label: 'SIDE U' }
                    ].map(pref => (
                      <button 
                        key={pref.id}
                        onClick={() => updatePassenger(passenger.id, 'berth', pref.id)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${passenger.berth === pref.id ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 hover:border-white/20 text-slate-400'}`}
                      >
                        <span className="material-icons text-xl">{pref.icon}</span>
                        <span className="text-[10px] font-bold">{pref.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={addPassenger} 
          disabled={!canAddPassenger || passengers.length >= 6}
          className={`w-full py-4 border-2 border-dashed rounded-xl transition-all flex items-center justify-center gap-2 
            ${(!canAddPassenger || passengers.length >= 6) 
              ? 'border-white/5 bg-white/5 opacity-50 cursor-not-allowed text-slate-600' 
              : 'border-white/10 hover:border-primary/50 hover:bg-primary/5 group cursor-pointer'}`}
        >
          <span className={`material-icons ${canAddPassenger ? 'text-slate-500 group-hover:text-primary' : ''}`}>add_circle_outline</span>
          <span className={`font-bold ${canAddPassenger ? 'text-slate-500 group-hover:text-primary' : ''}`}>Add Another Passenger</span>
        </button>
      </section>

      {/* Contact Information */}
      <section>
        <h3 className="text-lg font-bold flex items-center gap-2 mb-4 mt-8">
          <span className="material-icons text-primary">contact_mail</span>
          Contact Information
        </h3>
        <div className="glass-card rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Mobile Number</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold border-r border-white/10 pr-3">+91</span>
              <input 
                className="w-full glass-input rounded-lg pl-16 pr-4 py-3 text-sm focus:ring-0" 
                type="tel" 
                placeholder="Enter 10-digit mobile number" 
                value={contactPhone}
                maxLength={10}
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setContactPhone(val);
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Email Address</label>
            <input 
              className="w-full glass-input rounded-lg px-4 py-3 text-sm focus:ring-0" 
              type="email" 
              placeholder="Enter email address" 
              value={contactEmail}
              onChange={e => setContactEmail(e.target.value)}
            />
          </div>
          <p className="col-span-full text-[11px] text-slate-500 italic">Ticket details will be sent to this mobile number and email address.</p>
        </div>
      </section>

      {/* Travel Insurance & Preferences */}
      <section className="mt-8">
        <div className="glass-card rounded-xl p-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/20 rounded-lg">
              <span className="material-icons text-primary">security</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">Travel Insurance (₹0.35 per person)</h4>
              <p className="text-xs text-slate-400 mt-1">Protect your journey with comprehensive travel insurance coverage.</p>
              <div className="mt-4 flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    checked={hasInsurance}
                    onChange={() => setHasInsurance(true)}
                    className="w-4 h-4 text-primary bg-background-dark border-white/10 focus:ring-offset-background-dark" 
                    name="insurance" type="radio" 
                  />
                  <span className="text-sm font-medium">Yes, I accept the insurance</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    checked={!hasInsurance}
                    onChange={() => setHasInsurance(false)}
                    className="w-4 h-4 text-primary bg-background-dark border-white/10 focus:ring-offset-background-dark" 
                    name="insurance" type="radio" 
                  />
                  <span className="text-sm font-medium">No, I don't want insurance</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default PassengerForms;
