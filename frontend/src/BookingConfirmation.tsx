import React from 'react';
import { motion } from 'framer-motion';
import BookingHeader from './components/bookingConfirmation/BookingHeader';
import TicketDetails from './components/bookingConfirmation/TicketDetails';
import AdditionalServices from './components/bookingConfirmation/AdditionalServices';
import BookingFooter from './components/bookingConfirmation/BookingFooter';

const BookingConfirmation: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-effect {
            background: rgba(13, 108, 242, 0.1);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .ticket-cutout {
            position: relative;
        }
        .ticket-cutout::before, .ticket-cutout::after {
            content: '';
            position: absolute;
            width: 24px;
            height: 24px;
            background: #101722;
            border-radius: 50%;
            top: 50%;
            transform: translateY(-50%);
        }
        .ticket-cutout::before { left: -12px; }
        .ticket-cutout::after { right: -12px; }
        .dashed-line {
            border-top: 2px dashed rgba(255, 255, 255, 0.1);
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
        className="max-w-4xl mx-auto px-6 py-12"
      >
        <BookingHeader />
        <TicketDetails />
        <AdditionalServices />
        <BookingFooter />
      </motion.main>
    </div>
  );
}

export default BookingConfirmation;
