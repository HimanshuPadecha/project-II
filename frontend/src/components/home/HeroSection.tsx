import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const HeroSection: React.FC = () => {
  return (
    <>
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-saffron/5 rounded-full blur-[120px]"></div>
      
      <motion.div variants={itemVariants} className="max-w-3xl mb-12">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight">Your Journey, <br/><span className="text-primary">Simplified &amp; Elegant.</span></h1>
        <p className="text-lg text-slate-400">Experience the next generation of Indian Railways booking with seamless speed and premium reliability.</p>
      </motion.div>
    </>
  );
};

export default HeroSection;
