import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const mockAlerts = [
    { id: 'a1', time: '14:32:10Z', zone: 'GH-B2', level: 'CRITICAL', type: 'TEMP_HIGH', message: 'Temperature exceeded 28C threshold (29.5C)', status: 'UNACKNOWLEDGED' },
    { id: 'a2', time: '12:15:00Z', zone: 'GH-A1', level: 'WARNING', type: 'HUMID_LOW', message: 'Humidity dropped below 65% target (63%)', status: 'ACKNOWLEDGED' },
    { id: 'a3', time: '09:00:22Z', zone: 'SYS_CORE', level: 'INFO', type: 'MAINTENANCE', message: 'Routine database backup completed', status: 'RESOLVED' },
  ];

  return (
    <div className="bg-white border border-[#D4D4D4] p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-[#D4D4D4] pb-3">
        <div>
          <h3 className="text-sm font-bold text-[#C62828] font-mono flex items-center gap-2">
            <ShieldAlert size={16} />
            ACTIVE_SYSTEM_ALERTS
          </h3>
          <p className="text-xs text-[#636363] font-mono mt-1">AUTOMATED INCIDENT AND DEVIATION REPORTS</p>
        </div>
        <button className="h-8 px-3 text-[11px] font-bold text-[#1C1C1C] bg-[#F5F5F5] hover:bg-[#E5E5E5] font-mono">
          ACK_ALL_WARNINGS
        </button>
      </div>

      <div className="space-y-2 mt-2 font-mono text-xs">
        {mockAlerts.map(a => (
          <div key={a.id} className="p-3 border flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#FAFAFA]" style={{ borderColor: a.level === 'CRITICAL' ? '#EF9A9A' : a.level === 'WARNING' ? '#FFCC80' : '#D4D4D4' }}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {a.level === 'CRITICAL' && <AlertTriangle size={16} className="text-[#C62828]" />}
                {a.level === 'WARNING' && <AlertTriangle size={16} className="text-[#E65100]" />}
                {a.level === 'INFO' && <ShieldAlert size={16} className="text-[#1565C0]" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-bold ${a.level === 'CRITICAL' ? 'text-[#C62828]' : a.level === 'WARNING' ? 'text-[#E65100]' : 'text-[#1565C0]'}`}>
                    [{a.level}] {a.type}
                  </span>
                  <span className="text-[#636363] text-[10px]">{a.time} | ZONE: {a.zone}</span>
                </div>
                <div className="text-[#1C1C1C]">{a.message}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 text-[10px] font-bold ${a.status === 'UNACKNOWLEDGED' ? 'bg-[#C62828] text-white animate-pulse' : a.status === 'ACKNOWLEDGED' ? 'bg-[#FFF3E0] text-[#E65100]' : 'bg-[#E3F2FD] text-[#1565C0]'}`}>
                {a.status}
              </span>
              {a.status === 'UNACKNOWLEDGED' && (
                <button className="px-3 py-1 bg-[#F5F5F5] text-[#1C1C1C] hover:bg-[#E5E5E5] border border-[#D4D4D4]">
                  ACK_INCIDENT
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};