import React from 'react';
import { motion } from 'framer-motion';
import PaymentMethods from './components/payment/PaymentMethods';
import JourneySummary from './components/payment/JourneySummary';
import FooterSecurityBanner from './components/payment/FooterSecurityBanner';

const Payment: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <style dangerouslySetInnerHTML={{ __html: `
        .pay-glow {
            box-shadow: 0 0 20px rgba(13, 108, 242, 0.4);
        }
        .step-active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #0d6cf2;
        }
      ` }} />

      <motion.main 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.1
            }
          }
        }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <PaymentMethods />
          <JourneySummary />
        </div>
      </motion.main>

      <FooterSecurityBanner />
    </div>
  );
};

export default Payment;
