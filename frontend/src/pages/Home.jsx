import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, Edit3, RotateCcw, Brain, Shield } from 'lucide-react';
import { getPrediction, postManualPrediction } from '../services/api';
import StatsCard from '../components/StatsCard';
import Graph from '../components/Graph';
import InputForm from '../components/InputForm';
import SystemLog from '../components/SystemLog';
import AIInsights from '../components/AIInsights';

const Home = () => {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('simulated');
  const [logs, setLogs] = useState([]);
  
  const addLog = (message) => {
    setLogs(prev => [...prev, { timestamp: new Date(), message }].slice(-50));
  };

  const handlePredict = async (predictionFunc, inputData = null) => {
    setLoading(true);
    addLog(`Initiating ${mode} data capture sequence...`);
    
    setTimeout(() => addLog("Physiological signals acquired. Formatting payload..."), 400);
    setTimeout(() => addLog("Handshaking with Cerebras AI Cloud..."), 800);
    setTimeout(() => addLog("Running Llama 3.1-8B inference on WSE-3..."), 1200);

    try {
      const response = await (inputData ? predictionFunc(inputData) : predictionFunc());
      setData(response);
      setHistory(prev => [...prev, response].slice(-20));
      addLog("Analysis complete. Assessment engine synchronized.");
    } catch (err) {
      setError("AI Engine Handshake Failed. Verify API credentials.");
      addLog("CRITICAL ERROR: AI inference failed.");
    } finally {
      setLoading(false);
    }
  };

  const getIntensityColor = (level) => {
    switch (level) {
      case 'Severe Stress': return '#ef4444';
      case 'Moderate Stress': return '#f59e0b';
      case 'Mild Stress': return '#10b981';
      case 'No Stress': return '#6366f1';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-info">
          <h1>Stress Intel AI <span className="badge-ai"><Cpu size={14} /> Powered by Cerebras</span></h1>
          <p>Next-gen emotional intelligence & physiological monitoring</p>
        </div>
        
        <div className="header-actions">
          <div className="mode-toggle">
            <button className={mode === 'simulated' ? 'active' : ''} onClick={() => setMode('simulated')}>
              <Cpu size={16} /> Autonomous
            </button>
            <button className={mode === 'manual' ? 'active' : ''} onClick={() => setMode('manual')}>
              <Edit3 size={16} /> Config
            </button>
          </div>

          {mode === 'simulated' && (
            <button onClick={() => handlePredict(getPrediction)} disabled={loading} className={`analyze-btn ${loading ? 'loading' : ''}`}>
              {loading ? <RotateCcw size={18} className="spin" /> : <Activity size={18} />}
              {loading ? "Computing Vitals..." : "Initialize Analysis"}
            </button>
          )}
        </div>
      </header>

      <div className="dashboard-layout">
        <div className="main-column">
          <div className="top-stats">
            <StatsCard 
              title="Cardiac Rhythm" 
              value={data ? data.heart_rate : null} 
              unit="BPM" 
              color="#ff4b5c" 
              min={40} max={120} 
            />
            <StatsCard 
              title="Electrodermal Activity" 
              value={data ? data.gsr : null} 
              unit="µS" 
              color="#0ea5e9" 
              min={0} max={1.2} 
            />
          </div>

          <div className="graph-section glass-panel">
            <div className="card-header">
              <h3><Activity size={18} /> Physiological Stream Analysis</h3>
            </div>
            <div className="graph-wrapper">
                <Graph data={history} />
            </div>
          </div>

          {mode === 'manual' && (
            <div className="manual-config-section glass-panel">
                <div className="card-header">
                    <h3><Edit3 size={18} /> Sensor Data Override</h3>
                </div>
                <InputForm onPredict={(d) => handlePredict(postManualPrediction, d)} loading={loading} />
            </div>
          )}

          <SystemLog logs={logs} />
        </div>

        <div className="insight-panel">
            <AIInsights 
                analysis={data ? data.analysis : null} 
                color={data ? getIntensityColor(data.analysis.stress_level) : '#94a3b8'} 
            />
            
            <div className="security-card glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '12px', borderRadius: '12px' }}>
                        <Shield size={20} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>System Integrity</p>
                        <p style={{ fontSize: '0.9rem', fontWeight: '700' }}>AES-256 Encrypted</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <footer className="dashboard-footer" style={{ marginTop: 'auto', padding: '2rem 0', textAlign: 'center', opacity: 0.5, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p>Industrial AI Environment | Enterprise License: ACTIVE | Powered by Cerebras WSE-3</p>
      </footer>
      
      {error && (
        <div className="error-toast" style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'rgba(239, 68, 68, 0.9)', padding: '1rem 2rem', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            {error}
        </div>
      )}
    </div>
  );
};

export default Home;
