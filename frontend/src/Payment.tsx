import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import PaymentMethods from './components/payment/PaymentMethods';
import JourneySummary from './components/payment/JourneySummary';
import FooterSecurityBanner from './components/payment/FooterSecurityBanner';
import { api } from './api/axios';
import { useToast } from './context/ToastContext';

const Payment: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state;
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!bookingData) {
    return <Navigate to="/" replace />;
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    addToast('Processing payment securely...', 'info');
    
    try {
      const { train, selectedClass, passengers, contactEmail, contactPhone, fareBreakdown } = bookingData;
      const payload = {
        train: train._id,
        className: selectedClass.className,
        passengers: passengers.map((p: any) => ({
          fullName: p.name,
          age: parseInt(p.age),
          gender: p.gender,
          berthPreference: p.berth || undefined
        })),
        contactEmail,
        contactPhone,
        fareBreakdown: {
          baseFare: fareBreakdown.baseFare,
          superfastCharge: fareBreakdown.superfastCharge,
          reservationCharge: fareBreakdown.reservationCharge,
          insurance: fareBreakdown.insurance,
          gst: fareBreakdown.gst,
          totalAmount: fareBreakdown.totalAmount
        }
      };

      const res = await api.post('/bookings', payload);
      
      if (res.data?.success || res.status === 200 || res.status === 201) {
        addToast('Payment successful! Ticket booked.', 'success');
        navigate('/booking-confirmation', { 
           state: { 
             bookingResponse: res.data.data || res.data.response?.data || res.data,
             train,
             selectedClass
           } 
        });
      } else {
        addToast('Payment failed, please try again.', 'error');
      }
    } catch (error) {
      console.error("Booking error:", error);
      addToast('An error occurred. Missing required fields or network issue.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

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
          <PaymentMethods isProcessing={isProcessing} />
          <JourneySummary bookingData={bookingData} onPay={handlePayment} isProcessing={isProcessing} />
        </div>
      </motion.main>

      <FooterSecurityBanner />
    </div>
  );
};

export default Payment;
