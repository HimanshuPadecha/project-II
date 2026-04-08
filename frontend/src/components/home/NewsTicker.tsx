import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { api } from '../../api/axios';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

interface Alert {
  id: string;
  message: string;
  type: string;
  active: boolean;
}

const NewsTicker: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await api.get('/alerts');
        if (response.data?.response?.success) {
          const activeAlerts = response.data.response.data.filter((alert: Alert) => alert.active);
          setAlerts(activeAlerts);
        }
      } catch (err) {
        console.error("Failed to fetch alerts", err);
      }
    };
    fetchAlerts();
  }, []);

  if (alerts.length === 0) return null;

  return (
    <motion.div variants={itemVariants} className="mt-16 bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-4">
      <span className="bg-primary px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-white shrink-0">News Alert</span>
      <div className="overflow-hidden whitespace-nowrap flex space-x-12">
        {alerts.map((alert) => (
          <p key={alert.id} className="text-sm text-primary animate-pulse inline-block">
            {alert.message}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

export default NewsTicker;
