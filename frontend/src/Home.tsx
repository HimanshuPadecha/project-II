import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './components/home/HeroSection';
import SearchPanel from './components/home/SearchPanel';
import QuickAccess from './components/home/QuickAccess';
import RecentSearches from './components/home/RecentSearches';
import NewsTicker from './components/home/NewsTicker';
import Footer from './components/home/Footer';

const Home: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display rail-pattern">
      <style dangerouslySetInnerHTML={{ __html: `
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #101522;
        }
        .rail-pattern {
            background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0);
            background-size: 40px 40px;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .gradient-btn {
            background: linear-gradient(90deg, #3463ef 0%, #ff9933 100%);
            transition: all 0.3s ease;
        }
        .gradient-btn:hover {
            filter: brightness(1.1);
            box-shadow: 0 0 20px rgba(52, 99, 239, 0.4);
        }
      ` }} />

      {/* Main Content Area */}
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
        className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative z-10"
      >
        <HeroSection />
        <SearchPanel />
        <QuickAccess />
        <RecentSearches />
        <NewsTicker />
      </motion.main>

      {/* Map/Background Element Visualization */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 z-0 opacity-30 pointer-events-none">
        <img className="w-full h-full object-cover" alt="Abstract dark rail track lines with city lights background" src="/background_image.png" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
