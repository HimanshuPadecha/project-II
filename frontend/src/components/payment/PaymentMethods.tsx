import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

interface PaymentMethodsProps {
  isProcessing: boolean;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ isProcessing }) => {
  const [activeTab, setActiveTab] = React.useState('UPI');
  const [selectedUpi, setSelectedUpi] = React.useState('gpay');
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);

  const handleVerify = () => {
    if (!isProcessing && !isVerified) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setIsVerified(true);
      }, 1500);
    }
  };

  return (
    <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">Select Payment Method</h2>
        <div className="flex items-center gap-2 text-accent-green text-sm font-medium bg-accent-green/10 px-3 py-1 rounded-full">
          <span className="material-icons text-sm">verified_user</span>
          100% Secure Transaction
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar Tabs (Desktop) */}
        <div className="md:col-span-1 space-y-2">
          <button onClick={() => setActiveTab('UPI')} className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg transition-all ${activeTab === 'UPI' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-surface-dark text-slate-400 border border-transparent hover:border-primary/20'}`}>
            <span className="material-icons">qr_code_2</span>
            <span className="font-medium text-sm">UPI</span>
          </button>
          <button onClick={() => setActiveTab('Cards')} className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg transition-all ${activeTab === 'Cards' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-surface-dark text-slate-400 border border-transparent hover:border-primary/20'}`}>
            <span className="material-icons">credit_card</span>
            <span className="font-medium text-sm">Cards</span>
          </button>
          <button onClick={() => setActiveTab('Net Banking')} className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg transition-all ${activeTab === 'Net Banking' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-surface-dark text-slate-400 border border-transparent hover:border-primary/20'}`}>
            <span className="material-icons">account_balance</span>
            <span className="font-medium text-sm">Net Banking</span>
          </button>
          <button onClick={() => setActiveTab('Wallets')} className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg transition-all ${activeTab === 'Wallets' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-surface-dark text-slate-400 border border-transparent hover:border-primary/20'}`}>
            <span className="material-icons">account_balance_wallet</span>
            <span className="font-medium text-sm">Wallets</span>
          </button>
        </div>
        
        {/* Payment Content Area */}
        <div className="md:col-span-3 bg-surface-dark rounded-xl border border-primary/10 p-6">
          {activeTab !== 'UPI' ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <span className="material-icons text-5xl mb-4 opacity-20">construction</span>
              <p>This payment method is under integration mock.</p>
              <button onClick={() => setActiveTab('UPI')} className="mt-4 text-primary text-sm font-bold hover:underline">Switch back to UPI gateway</button>
            </div>
          ) : (
            <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Pay using UPI</h3>
              <p className="text-sm text-slate-400">Choose your preferred UPI application</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <button onClick={() => setSelectedUpi('gpay')} disabled={isProcessing} className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${selectedUpi === 'gpay' ? 'border-primary bg-primary/5' : 'border-slate-700 hover:border-primary/50'} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <div className="w-12 h-12 mb-2 flex items-center justify-center bg-white rounded-lg p-2">
                  <img alt="GPay" className="w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuZG4smD02A5sEwNXVsq2jeDY0b3UGSP44hKpYu2TnGSYP0Ie4AfMiowTIvGdy9e6FegiuaTVnOl6pfUjqMDU7E_VWLTIS5OZyFFM1t3r9ZhG4a3gTpMcFj8CNcxp8wA_LktpHOS2G_ilqGwwXaUUntdjf_GbiCaZMBJHEc-C0ICMqpkyLiO6vqLPM-utrm_xBK8a1hwfgEd2gnaoFmggs2R9CxYpW_DjMcYCygHSRFdbthQ8yfp3D_LtENo3jxoI2PGmnmguxn8xy" />
                </div>
                <span className="text-xs font-bold">Google Pay</span>
              </button>
              <button onClick={() => setSelectedUpi('phonepe')} disabled={isProcessing} className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${selectedUpi === 'phonepe' ? 'border-primary bg-primary/5' : 'border-slate-700 hover:border-primary/50'} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <div className="w-12 h-12 mb-2 flex items-center justify-center bg-[#5f259f] rounded-lg p-2">
                  <img alt="PhonePe" className="w-full invert brightness-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwmyrDKHnlP5AndG_gr9kePUhLMyMf_pdqan-MAt2miz6Cf3n8zAvyI9ZQKKnEiCNB6fQktfIvjw7UvTukxY1vXP30hKKZ7a0V0lfVmg_Ysrzr8PpEx2ZDZw5khy3r9YSpAFWtLlOk5o-nAMR8t69z40F4YiaMidcmzAVNcBJHUwCMnxQnVhR3ReXYu0MgRsx9gsmpXkz039nVmBOnbbLKo3lJDeq6hMfrmM0PeyVXcqN2V2b1LUr1GNscFz-iWemb2cwrbKd76X8N" />
                </div>
                <span className="text-xs font-bold">PhonePe</span>
              </button>
              <button onClick={() => setSelectedUpi('paytm')} disabled={isProcessing} className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${selectedUpi === 'paytm' ? 'border-primary bg-primary/5' : 'border-slate-700 hover:border-primary/50'} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <div className="w-12 h-12 mb-2 flex items-center justify-center bg-white rounded-lg p-2">
                  <img alt="Paytm" className="w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDraNiiwsx50K1AuTbiiMzmYQfahFOBtM4TM4jgDqzK25zlKEVKkEeEq3G4NmaxDb1lffX19nSpXmPalMMF92Ycn0tg5c4s0_0bR1cYD6Ny1FpgxyPYr1nwxpFBHEtPWqm4JQyKTa9Yy-sptXunB0ztZe4tTb_r3FhT58jzpHSG0I7k6pReGz-FQmEBr0FWcoPzmG21Lb-af-_mYrYTyvNsdBfFN1G9FAla_eK9s2OvndgqJoK0ZkidMQB5x8XHWAojvBNZD5DNFhZs" />
                </div>
                <span className="text-xs font-bold">Paytm</span>
              </button>
            </div>
            
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-slate-700"></div>
              <span className="flex-shrink mx-4 text-slate-500 text-xs font-medium uppercase tracking-widest">Or enter UPI ID</span>
              <div className="flex-grow border-t border-slate-700"></div>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <input className="w-full bg-background-dark border border-slate-700 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-600 pr-24" placeholder="e.g. mobile-number@upi" type="text" />
                <div onClick={handleVerify} className={`absolute right-3 top-3 text-xs font-bold text-primary select-none ${isProcessing || isVerifying || isVerified ? 'opacity-50 cursor-default' : 'hover:underline cursor-pointer'}`}>
                  {isVerified ? 'VERIFIED' : isVerifying ? 'VERIFYING...' : 'VERIFY'}
                </div>
              </div>
              <div className="flex items-start gap-3 bg-primary/5 p-4 rounded-lg border border-primary/20">
                <span className="material-icons text-primary text-sm mt-0.5">info</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A payment request will be sent to your UPI app. Please approve it within 5 minutes to complete the booking.
                </p>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Secure Badges */}
      <div className="flex flex-wrap items-center justify-center gap-8 py-6 opacity-60">
        <div className="flex items-center gap-2">
          <span className="material-icons text-xl">verified</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">PCI DSS Compliant</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-icons text-xl">lock</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">256-Bit SSL Encryption</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-icons text-xl">shield</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">IRCTC Trusted</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentMethods;
