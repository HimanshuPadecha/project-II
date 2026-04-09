import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './components/home/Footer';

const faqs = [
  {
    question: "How far in advance can I book a ticket?",
    answer: "You can book tickets up to 120 days in advance of the journey date. For certain special trains, this period might vary."
  },
  {
    question: "What is the cancellation policy?",
    answer: "Cancellations made 48 hours before departure are eligible for a full refund minus a small processing fee. Cancellations within 48 hours are subject to higher deductions based on the time remaining."
  },
  {
    question: "Can I transfer my ticket to someone else?",
    answer: "No, tickets are non-transferable. Ensure that the passenger details match the valid ID proof carried during the journey."
  },
  {
    question: "How do I get my PNR status?",
    answer: "You can check your PNR status from the 'Account' section after logging in, or look securely at the top of the Home page in the Quick Access menu."
  },
  {
    question: "What should I do if my payment fails but money is deducted?",
    answer: "In most cases, the amount is automatically refunded to your original payment method within 3-5 business days. If you don't receive it, please Contact Us with your transaction ID."
  }
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-[#101522] min-h-screen flex flex-col pt-10">
      <main className="flex-grow max-w-3xl mx-auto px-6 py-12 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-400">Find answers to the most common questions about booking with RailExpress.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
                <span className={`material-icons text-primary transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0 text-slate-300 border-t border-white/5 mt-2 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400">Still have questions?</p>
          <button onClick={() => window.location.href='/contact'} className="mt-4 text-primary font-medium hover:underline flex items-center justify-center gap-1 mx-auto">
            Contact Support <span className="material-icons text-sm">arrow_forward</span>
          </button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
