import React from 'react';
import { Terminal } from 'lucide-react';

const SystemLog = ({ logs }) => {
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="log-card glass-panel">
      <div className="card-header">
        <h3><Terminal size={18} /> Engine Operations</h3>
      </div>
      <div className="log-content" ref={scrollRef}>
        {logs.map((log, index) => (
          <div key={index} className="log-entry">
            <span className="log-time">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
            <span className="log-msg">{log.message}</span>
          </div>
        ))}
        {logs.length === 0 && <div className="empty-log">Awaiting sensor data...</div>}
      </div>
    </div>
  );
};

export default SystemLog;
