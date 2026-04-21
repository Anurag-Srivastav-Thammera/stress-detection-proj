import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, unit, color, min, max }) => {
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  return (
    <div className="stats-card glass-panel">
      <p className="stats-card-label">{title}</p>
      <div className="stats-value-row">
        <h2 className="stats-value">{value || '--'}</h2>
        <span className="stats-unit">{unit}</span>
      </div>
      
      <div className="gauge-container">
        <motion.div 
          className="gauge-bar" 
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StatsCard;
