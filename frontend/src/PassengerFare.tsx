import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Navigate } from 'react-router-dom';
import TrainInfoBanner from './components/passengerFare/TrainInfoBanner';
import PassengerForms from './components/passengerFare/PassengerForms';
import FareSummary from './components/passengerFare/FareSummary';
import FooterDisclaimer from './components/passengerFare/FooterDisclaimer';

export interface PassengerInfo {
  id: string;
  name: string;
  age: string;
  gender: string;
  berth: string;
}

const PassengerFare: React.FC = () => {
  const location = useLocation();
  const { train, selectedClass } = location.state || {};
  
  const [passengers, setPassengers] = useState<PassengerInfo[]>([
    { id: 'initial-1', name: '', age: '', gender: 'MALE', berth: '' }
  ]);
  const [hasInsurance, setHasInsurance] = useState<boolean>(true);
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');

  if (!train || !selectedClass) {
    // Failsafe if user navigates here directly missing payload
    return <Navigate to="/" replace />;
  }

  const validPassengerCount = passengers.filter(p => p.name.trim().length > 0).length;

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
        <TrainInfoBanner train={train} selectedClass={selectedClass} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <PassengerForms 
            passengers={passengers} 
            setPassengers={setPassengers} 
            hasInsurance={hasInsurance} 
            setHasInsurance={setHasInsurance} 
            contactEmail={contactEmail}
            setContactEmail={setContactEmail}
            contactPhone={contactPhone}
            setContactPhone={setContactPhone}
          />
          <FareSummary 
            train={train} 
            selectedClass={selectedClass} 
            passengerCount={validPassengerCount} 
            hasInsurance={hasInsurance} 
            passengers={passengers.filter(p => p.name.trim().length > 0)}
            contactEmail={contactEmail}
            contactPhone={contactPhone}
          />
        </div>
      </motion.main>

      <FooterDisclaimer />
    </div>
  );
};

export default PassengerFare;
