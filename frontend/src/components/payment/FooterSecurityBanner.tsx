import React from 'react';
import { motion } from 'framer-motion';

const FooterSecurityBanner: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-12 py-8 border-t border-slate-800 bg-surface-dark/30"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
            <img alt="Visa" className="h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkFwMmmy8BykIyHvnn9JJhPu_vtCt4GiZ-d3NkT52KH9Yr0U8u5K0TXjROOlVM7aaMkldS6gKqJcPumoyS46H3nOPiiepg-8EM4N3g4PsFY2piJ6VHZ594UN85ukB0DtzDNwAOmJouxfym76c6TpjBF1E9dk9PhHvkEaEss_tk7rRRd03wKtmJLaFdBKzj0Znqm7ItuUqa54SsWBgp_PfH5eBqeHKc0DfStmtfNISOnF0yieCEi4ZHMxyMJpnCevgpsJ7o8wcE_OKm" />
          </div>
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
            <img alt="Mastercard" className="h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsyPYeoIvMIcGNrb8ykelo58xAyaXDWWOcnCxCsTaN8CBK8warnm954iT1ZBcGG6i3e1OIaqRH0rnxltE4WtNdpVPOFdgZG6r34EFQ0VDbvbaYvnjdWCtbNXA2XrygeerrXx9cUJ8sqVxWT9xn-IInqMZOzPucVcVeP_gbJNDtF99_6NXME4tMX6oc_mk_oeobLCrbBHg_G4SWds18CuZ7zMM9jYMLkrs-EMgYHWQSTvpCGAOWz26aGXeGON29ZiIW5mH8dO2oAgsa" />
          </div>
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
            <img alt="RuPay" className="h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfZXqPBK4BkJtmIUjLEs1ZlZkSa6t_fhQsEEkOvIGH-aE0YohkTz9MaFPuHjhXZbUMCBT1Mml2z-A_XTdHFn71_3x1Ci66kmGCKCF4koZ7QMnf7JIrQZDI7vzdafGjIu_k6qVbP-tdGozVrzv2kHNi3VGcxTmpUS0wyIrp6T6mndLLjPuZdCn106YvzwOMLIRyxzPx5O0-f1LBTkrnYhjRK_jsa9XSPa4ZzZqu85O-D0iPkUPkhL6IDh1nCxdDdIsRmLe_ljxH_Wdg" />
          </div>
        </div>
        <div className="text-[10px] text-slate-500 text-center md:text-right">
          <p>© 2024 Indian Railway Catering and Tourism Corporation Ltd. All Rights Reserved.</p>
          <p className="mt-1">Managed by CRIS - Center for Railway Information Systems</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default FooterSecurityBanner;
