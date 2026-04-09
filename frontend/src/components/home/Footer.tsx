import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-navy-deep/80 border-t border-white/10 py-12 px-6 relative z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-icons text-white text-sm">train</span>
            </div>
            <span className="text-lg font-bold tracking-tight">Rail<span className="text-primary">Express</span></span>
          </div>
          <p className="text-sm text-slate-500">© 2023 CRIS - RailExpress Portal. All rights reserved.</p>
        </div>
        
        <div className="flex gap-12 text-sm text-slate-400">
          <div className="space-y-2 flex flex-col">
            <h5 className="text-white font-semibold mb-2">Support</h5>
            <Link to="/faq" className="hover:text-primary transition-colors cursor-pointer py-1">Help / FAQ</Link>
            <Link to="/contact" className="hover:text-primary transition-colors cursor-pointer py-1">Contact Us</Link>
          </div>
          <div className="space-y-2 flex flex-col">
            <h5 className="text-white font-semibold mb-2">About</h5>
            <Link to="/about" className="hover:text-primary transition-colors cursor-pointer py-1">About Us</Link>
            <Link to="/" className="hover:text-primary transition-colors cursor-pointer py-1">Home</Link>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer">
            <img className="w-5 h-5" alt="Facebook Icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-z-5mXtwkEzjKVJjjzPnUod5a0JgKhSn_b9QJIz2RslFxn7Ws50G-hATv868U3H5x5L4klkBJJA_KNlPGhstBT-XPFZUdPkjV3MlTgqdQdCWwr36hEKCcDi_YLdubhE51qAenjhM9jYLcz5Hn1n96K3ASbafSFlLqOK7MkJe6JTSiEvepT0ztNUAeYWDO_3QQ-X92NvfUQyBR7b7mIiqLeBwV8wgIdikf-eKJ2Q_RrM4RzC5DpzNfMcvERuxm5rkJ2ElEOfPECNRf" />
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer">
            <img className="w-5 h-5" alt="Twitter Icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFoB112XyD2idCFsoIJ9gHXv-c52LS6JKxQpnmiPTXjLnIuMXvPvclXChRVMxv3xd3dRCoamuokL_Ek4VT1OUKg7MMD50HNmf5zRN_5aT6Clc1nIQ8TsEPRBzoRN00-drQEYdfmR-V_mVXdg71w6J52G00MwVrlNiIubwKF66SB6gNJl3Klb29CkET5nK3pDXuW7lyF2mnggPa4j_VJ2nrmOE4hXJP2bVKzqa3ATlQccIOWd94McvaE3dCkTsFp7wP1PdF3hZNXJBo" />
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer">
            <img className="w-5 h-5" alt="Instagram Icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKGN8ApMov9YQzQPfREY7A6vi7wR1U6gVb9nENNG31itfiKnbSS2m7tOkF-21VShT_CyjV7D43lfjQdX8PHy4u4SRSHMrtDGdIPwp6csj5OG1z7j4RPqGRjLHDlYQdQqFkgDhI5g3S0QQWRKdhrK9Ebyv4_w4D3DJ-5BotQvpfCgCoI-5KQWdKnG4n-CUgEt99XwgKZ0dl6qmvT-jj6GNg46hzpuhGjLbHUGUoBioBRlu6EKGFcwRr2oPEkvaN9Rud0YfGOTztlhGK" />
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
