import React from 'react';
import { Activity } from 'lucide-react';

export const ReadingsPage: React.FC = () => {
  const mockReadings = [
    { time: '14:30:00Z', zone: 'GH-A1', temp: 24.5, humid: 65, co2: 450, soil: 55 },
    { time: '14:25:00Z', zone: 'GH-A1', temp: 24.6, humid: 64, co2: 445, soil: 55 },
    { time: '14:20:00Z', zone: 'GH-A1', temp: 24.7, humid: 63, co2: 440, soil: 56 },
    { time: '14:30:00Z', zone: 'GH-B2', temp: 29.5, humid: 45, co2: 380, soil: 40 },
  ];

  return (
    <div className="bg-white border border-[#D4D4D4] p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-[#D4D4D4] pb-3">
        <div>
          <h3 className="text-sm font-bold text-[#1C1C1C] font-mono flex items-center gap-2">
            <Activity size={16} className="text-[#00897B]" />
            RAW_TELEMETRY_STREAM
          </h3>
          <p className="text-xs text-[#636363] font-mono mt-1">HISTORICAL SENSOR DATA LOGS</p>
        </div>
        <div className="flex gap-2">
           <button className="h-8 px-3 text-[11px] font-bold text-[#1C1C1C] bg-[#F5F5F5] hover:bg-[#E5E5E5] border border-[#D4D4D4] font-mono">EXPORT_CSV</button>
           <button className="h-8 px-3 text-[11px] font-bold text-[#E65100] bg-[#FFF3E0] border border-[#FFCC80] hover:bg-[#FFE0B2] font-mono">PAUSE_STREAM</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#FAFAFA] text-[#636363] border-b border-[#D4D4D4]">
            <tr>
              <th className="px-3 py-2 font-bold whitespace-nowrap">TIMESTAMP_UTC</th>
              <th className="px-3 py-2 font-bold whitespace-nowrap">ZONE_ID</th>
              <th className="px-3 py-2 font-bold whitespace-nowrap">TEMP_C</th>
              <th className="px-3 py-2 font-bold whitespace-nowrap">HUMID_%</th>
              <th className="px-3 py-2 font-bold whitespace-nowrap">CO2_PPM</th>
              <th className="px-3 py-2 font-bold whitespace-nowrap">SOIL_MST_%</th>
            </tr>
          </thead>
          <tbody className="text-[#1C1C1C]">
            {mockReadings.map((r, idx) => (
              <tr key={idx} className="border-b border-[#D4D4D4] hover:bg-[#F5F5F5]">
                <td className="px-3 py-3 text-[#00897B] whitespace-nowrap">{r.time}</td>
                <td className="px-3 py-3 font-bold whitespace-nowrap">{r.zone}</td>
                <td className={`px-3 py-3 whitespace-nowrap ${r.temp > 28 ? 'text-[#C62828]' : 'text-[#1C1C1C]'}`}>{r.temp.toFixed(1)}</td>
                <td className={`px-3 py-3 whitespace-nowrap ${r.humid < 50 ? 'text-[#E65100]' : 'text-[#1C1C1C]'}`}>{r.humid}</td>
                <td className="px-3 py-3 whitespace-nowrap">{r.co2}</td>
                <td className="px-3 py-3 whitespace-nowrap">{r.soil}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};