import React from 'react';
import { motion } from 'framer-motion';
import TrainInfoBanner from './components/passengerFare/TrainInfoBanner';
import PassengerForms from './components/passengerFare/PassengerForms';
import FareSummary from './components/passengerFare/FareSummary';
import FooterDisclaimer from './components/passengerFare/FooterDisclaimer';

const PassengerFare: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-input {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        .glass-input:focus {
            border-color: #0d6cf2;
            background: rgba(13, 108, 242, 0.05);
            outline: none;
            box-shadow: 0 0 0 2px rgba(13, 108, 242, 0.2);
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
        <TrainInfoBanner />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <PassengerForms />
          <FareSummary />
        </div>
      </motion.main>

      <FooterDisclaimer />
    </div>
  );
};

export default PassengerFare;
