import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Activity, Zap } from 'lucide-react';

const InputForm = ({ onPredict, loading }) => {
  const [formData, setFormData] = useState({
    heart_rate: '75',
    gsr: '0.45'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict({
      heart_rate: parseFloat(formData.heart_rate),
      gsr: parseFloat(formData.gsr)
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="manual-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label><Activity size={14} /> Heart Rate (BPM)</label>
        <input
          type="number"
          name="heart_rate"
          value={formData.heart_rate}
          onChange={handleChange}
          required
          step="0.1"
        />
      </div>
      <div className="input-group">
        <label><Zap size={14} /> GSR (µS)</label>
        <input
          type="number"
          name="gsr"
          value={formData.gsr}
          onChange={handleChange}
          required
          step="0.01"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="manual-submit-btn"
        disabled={loading}
      >
        {loading ? "AI Processing..." : "Execute Analysis"}
      </motion.button>
    </form>
  );
};

export default InputForm;
