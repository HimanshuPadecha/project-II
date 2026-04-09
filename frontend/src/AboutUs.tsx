import React from 'react';
import { motion } from 'framer-motion';
import Footer from './components/home/Footer';

const AboutUs: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const features = [
    { icon: 'speed', title: 'Lightning Fast', desc: 'Book tickets in under 2 minutes.' },
    { icon: 'security', title: 'Secure Payments', desc: 'Your transactions are 100% protected.' },
    { icon: 'support_agent', title: '24/7 Support', desc: 'Always here to assist with your journey.' }
  ];

  return (
    <div className="bg-[#101522] min-h-screen flex flex-col pt-10">
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Redefining Train Travel</h1>
            <p className="text-lg text-slate-400">
              RailExpress is on a mission to make train ticket booking seamless, fast, and reliable. We believe your journey should start smoothly before you even board the train.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">5M+</h3>
              <p className="text-slate-300">Tickets Booked</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">99.9%</h3>
              <p className="text-slate-300">Uptime</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">4.8/5</h3>
              <p className="text-slate-300">User Rating</p>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <h2 className="text-3xl font-bold text-center text-white mb-10">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feat, idx) => (
                <div key={idx} className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                    <span className="material-icons text-primary text-2xl">{feat.icon}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">{feat.title}</h4>
                  <p className="text-slate-400">{feat.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </main>

      {/* Abstract background */}
      <div className="fixed bottom-0 left-0 w-full h-1/2 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent"></div>
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/20 to-transparent"></div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
