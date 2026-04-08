import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const PassengerForms: React.FC = () => {
  return (
    <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="material-icons text-primary">groups</span>
            Passenger Details
          </h3>
          <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
            <span className="material-icons text-sm">history</span>
            Choose from Saved
          </button>
        </div>

        {/* Passenger 1 Card */}
        <div className="glass-card rounded-xl p-6 mb-4 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary/40"></div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-1 flex items-start justify-center pt-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary border border-primary/20">1</span>
            </div>
            <div className="md:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-full md:col-span-1">
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Full Name (as per ID)</label>
                <input className="w-full glass-input rounded-lg px-4 py-3 text-sm focus:ring-0" placeholder="Enter passenger name" type="text" />
              </div>
              <div className="md:col-span-1 flex gap-4">
                <div className="w-1/3">
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Age</label>
                  <input className="w-full glass-input rounded-lg px-4 py-3 text-sm focus:ring-0" placeholder="Age" type="number" />
                </div>
                <div className="w-2/3">
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Gender</label>
                  <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
                    <button className="flex-1 py-2 text-xs font-bold rounded-md bg-primary text-white">MALE</button>
                    <button className="flex-1 py-2 text-xs font-bold rounded-md hover:bg-white/5 text-slate-400">FEMALE</button>
                    <button className="flex-1 py-2 text-xs font-bold rounded-md hover:bg-white/5 text-slate-400">TG</button>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Berth Preference</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <button className="flex flex-col items-center gap-1 p-3 rounded-lg border border-primary bg-primary/10 text-primary">
                    <span className="material-icons text-xl">vertical_align_bottom</span>
                    <span className="text-[10px] font-bold">LOWER</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 p-3 rounded-lg border border-white/10 hover:border-white/20 text-slate-400 transition-all">
                    <span className="material-icons text-xl">reorder</span>
                    <span className="text-[10px] font-bold">MIDDLE</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 p-3 rounded-lg border border-white/10 hover:border-white/20 text-slate-400 transition-all">
                    <span className="material-icons text-xl">vertical_align_top</span>
                    <span className="text-[10px] font-bold">UPPER</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 p-3 rounded-lg border border-white/10 hover:border-white/20 text-slate-400 transition-all">
                    <span className="material-icons text-xl">align_horizontal_left</span>
                    <span className="text-[10px] font-bold">SIDE L</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 p-3 rounded-lg border border-white/10 hover:border-white/20 text-slate-400 transition-all">
                    <span className="material-icons text-xl">align_horizontal_right</span>
                    <span className="text-[10px] font-bold">SIDE U</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Passenger Button */}
        <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all group flex items-center justify-center gap-2">
          <span className="material-icons text-slate-500 group-hover:text-primary">add_circle_outline</span>
          <span className="font-bold text-slate-500 group-hover:text-primary">Add Another Passenger</span>
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
              <input className="w-full glass-input rounded-lg pl-16 pr-4 py-3 text-sm focus:ring-0" type="tel" defaultValue="9876543210" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Email Address</label>
            <input className="w-full glass-input rounded-lg px-4 py-3 text-sm focus:ring-0" type="email" defaultValue="passenger@email.com" />
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
                  <input defaultChecked className="w-4 h-4 text-primary bg-background-dark border-white/10 focus:ring-offset-background-dark" name="insurance" type="radio" />
                  <span className="text-sm font-medium">Yes, I accept the insurance</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="w-4 h-4 text-primary bg-background-dark border-white/10 focus:ring-offset-background-dark" name="insurance" type="radio" />
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
