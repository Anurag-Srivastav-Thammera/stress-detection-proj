import React from 'react';
import { Brain, Info, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const AIInsights = ({ analysis, color }) => {
  if (!analysis) return (
    <div className="insight-card glass-panel empty">
        <div className="empty-state-side">
            <Brain size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <p>Select 'Begin Prediction' to generate AI insights.</p>
        </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="insight-card glass-panel"
    >
      <div className="insight-header">
        <span className="label">Assessment Level</span>
        <h2 style={{ color: color }}>{analysis.stress_level}</h2>
      </div>

      <div className="insight-body">
        <div className="explanation-section">
          <p className="explanation-text">{analysis.explanation}</p>
        </div>

        <div className="recommendations-section">
          <h4 style={{ marginBottom: '1rem', fontSize: '0.85rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Recommended Protocols
          </h4>
          <div className="recommendations-list">
            {analysis.recommendations.map((rec, i) => (
              <div key={i} className="recommendation-item">
                <div className="rec-icon">
                  <ShieldCheck size={18} />
                </div>
                <div className="rec-text">{rec}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIInsights;
