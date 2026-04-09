import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from './api/axios';
import BookingHeader from './components/bookingConfirmation/BookingHeader';
import TicketDetails from './components/bookingConfirmation/TicketDetails';
import AdditionalServices from './components/bookingConfirmation/AdditionalServices';
import BookingFooter from './components/bookingConfirmation/BookingFooter';
import Footer from './components/home/Footer';

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingResponse, train, selectedClass } = location.state || {};

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBooking, setActiveBooking] = useState<any>(null);

  useEffect(() => {
    // Determine initial active state from a direct payment success routing
    if (bookingResponse && train && selectedClass && !activeBooking) {
      setActiveBooking({
        ...bookingResponse,
        train,
        className: selectedClass.className
      });
    }

    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/my-bookings');
        if (res.data?.success || res.status === 200) {
          const data = res.data.data || res.data.response?.data || res.data;
          if (Array.isArray(data)) {
             setBookings(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []); // Run fetch once on mount

  const handleSelectBooking = (bk: any) => {
    setActiveBooking({
      ...bk,
      className: bk.className
    });
    // Scroll to top when opening details
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setActiveBooking(null);
    // Clear the router location state to avoid re-triggering logic on reload
    navigate(location.pathname, { replace: true, state: {} });
  };

  const renderListView = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (bookings.length === 0) {
      return (
        <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
          <span className="material-icons text-6xl text-slate-600 mb-4">receipt_long</span>
          <h2 className="text-xl font-bold mb-2">No Bookings Found</h2>
          <p className="text-slate-400">You haven't made any train bookings yet.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="material-icons text-primary text-3xl">history</span>
          My Bookings
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((bk) => (
            <motion.div 
              key={bk._id}
              whileHover={{ scale: 1.01 }}
              onClick={() => handleSelectBooking(bk)}
              className="bg-surface-dark border border-primary/20 hover:border-primary/50 cursor-pointer p-6 rounded-xl transition-all shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 group"
            >
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">PNR: {bk.pnrNumber}</span>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${bk.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' : bk.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>{bk.status}</span>
                </div>
                <h3 className="text-xl font-bold">{bk.train?.trainNumber} - {bk.train?.trainName}</h3>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-slate-400 mt-2">
                  <span>{bk.train?.source?.split('(')[0].trim()} → {bk.train?.destination?.split('(')[0].trim()}</span>
                  <span>•</span>
                  <span>{new Date(bk.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'})}</span>
                  <span>•</span>
                  <span className="text-slate-300 font-semibold">{bk.className}</span>
                </div>
              </div>
              
              <div className="text-right w-full md:w-auto mt-4 md:mt-0 flex justify-between md:flex-col items-center md:items-end">
                <span className="text-xl font-black text-white">₹{bk.fareBreakdown?.totalAmount.toFixed(2)}</span>
                <span className="text-primary text-xs font-bold flex items-center gap-1 group-hover:underline mt-1 bg-primary/10 px-3 py-1.5 rounded-lg">
                  View Ticket
                  <span className="material-icons text-sm">chevron_right</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

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
        {activeBooking ? (
          <motion.div 
             key="details-view"
             initial="hidden" 
             animate="visible" 
             variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
             }}
          >
             <motion.button variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} onClick={handleBackToList} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider bg-surface-dark px-4 py-2 rounded-lg border border-white/5 shadow-md w-fit print:hidden">
               <span className="material-icons text-sm">arrow_back</span> Back to My Bookings
             </motion.button>
             <BookingHeader bookingResponse={activeBooking} />
             <TicketDetails bookingResponse={activeBooking} train={activeBooking.train} selectedClass={{ className: activeBooking.className }} />
             <div className="print:hidden">
               <AdditionalServices />
               <BookingFooter />
             </div>
          </motion.div>
        ) : (
          <motion.div 
             key="list-view"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
          >
            {renderListView()}
          </motion.div>
        )}
      </motion.main>

      <div className="print:hidden">
         <Footer />
      </div>
    </div>
  );
}

export default BookingConfirmation;
