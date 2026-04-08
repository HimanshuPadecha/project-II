import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const FareSummary: React.FC = () => {
  return (
    <motion.div variants={itemVariants} className="lg:col-span-4 sticky top-24">
      <div className="glass-card rounded-xl overflow-hidden border-white/10 shadow-2xl">
        <div className="bg-primary/10 p-4 border-b border-white/10">
          <h3 className="font-bold flex items-center gap-2">
            <span className="material-icons text-primary text-lg">receipt_long</span>
            Fare Summary
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Base Fare (1 Adult)</span>
            <span className="font-semibold">₹1,445.00</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Superfast Charge</span>
            <span className="font-semibold">₹45.00</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Reservation Charge</span>
            <span className="font-semibold">₹60.00</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Travel Insurance</span>
            <span className="font-semibold">₹0.35</span>
          </div>
          <div className="flex justify-between items-center text-sm pb-2 border-b border-white/10">
            <span className="text-slate-400">GST (5%)</span>
            <span className="font-semibold">₹77.50</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div>
              <span className="block text-[10px] font-bold text-primary uppercase tracking-wider">Total Payable Amount</span>
              <span className="text-2xl font-black text-white">₹1,627.85</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block leading-tight">Incl. all taxes &amp;<br />service charges</span>
            </div>
          </div>
          <div className="pt-4 space-y-3">
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
              PROCEED TO PAYMENT
              <span className="material-icons text-lg">arrow_forward</span>
            </button>
            <div className="flex items-center gap-2 justify-center py-2 px-3 bg-white/5 rounded-lg border border-white/5">
              <span className="material-icons text-amber-500 text-sm">info</span>
              <span className="text-[10px] text-slate-400">By proceeding, you agree to IRCTC T&amp;Cs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Offers/Promo Card */}
      <div className="mt-6 glass-card rounded-xl p-4 border-dashed border-primary/30 bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-icons text-primary text-xl">local_offer</span>
          </div>
          <div>
            <h4 className="text-sm font-bold">Apply Coupon Code</h4>
            <p className="text-[10px] text-slate-400">Save up to ₹200 on this booking</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <input className="flex-1 glass-input rounded-lg px-3 py-2 text-xs uppercase font-bold focus:ring-0" placeholder="Enter code" type="text" />
          <button className="px-4 py-2 bg-white/10 text-xs font-bold rounded-lg hover:bg-white/20 transition-all">APPLY</button>
        </div>
      </div>

      {/* Trusted Badge */}
      <div className="mt-8 flex items-center justify-center gap-6 opacity-40 grayscale">
        <img className="h-8 object-contain" alt="Official IRCTC Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd0y_HqZAQVWbrgg0ehVjhAHnQuCrNNE9Vd7jexnTjyRY7jJxP6MDtFiAa1rDSewVyN5AWBPh3WJ_we2HxVdDDSwVEfniyO072XYcLMvVT_qRBcgvBYGDGYQRtdIhMeL2O3VsuBuDF1kb1UQen0-jg0r2t8nx7IKQwKDSKJEAp_TOlWvfz1Y4O9hXitTdQGntd3qN2IT_YwrWvRU7Rh_Lxyg3QYmEQE4ITNpPjqavFLpzarsx8qpiISVfiEfb9WX5wgZSrYCqPvy3s" />
        <img className="h-4 object-contain" alt="PCI DSS Compliance Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVo6GRDL7UYIBFlpQPghiClC45XNxZDY-y33BrSq8_3RGu7IWORawP_TsuMVxwsP6t1mNkvP1kLaCciMsJKb2VpJEDZl6jEaMOvXeK2kGtcjy9AhpCLz7LN1wIv3t9BUGoT24bXjojKlJK0cbdQUNwgbB-hL_bG7j8vc3L45lzxO5Vv_z01tFeVvO225X0D_2KnVU2Crfruh-FlTXE4sZ8rRF2DLLNOtxnQBum5Bw_KTFYvDQTPwiVzQEDdO60LBpK6sPKlhkwV_df" />
        <div className="flex flex-col items-center">
          <span className="material-icons text-xl">verified_user</span>
          <span className="text-[8px] font-bold">SECURE</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FareSummary;
