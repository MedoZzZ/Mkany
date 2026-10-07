import React from 'react';
import { Play, Pause, RefreshCw, CheckCircle } from 'lucide-react';

export const CyclesPage: React.FC = () => {
  const mockCycles = [
    { id: 'c1', ghCode: 'GH-A1', crop: 'طماطم شيري', startDate: '2023-10-01', expectedEnd: '2024-01-15', currentDay: 45, totalDays: 105, phase: 'Flowering', health: 'Excellent' },
    { id: 'c2', ghCode: 'GH-A2', crop: 'فلفل ألوان', startDate: '2023-11-10', expectedEnd: '2024-02-28', currentDay: 5, totalDays: 110, phase: 'Seedling', health: 'Good' },
    { id: 'c3', ghCode: 'GH-B1', crop: 'خيار', startDate: '2023-09-15', expectedEnd: '2023-11-30', currentDay: 61, totalDays: 76, phase: 'Harvesting', health: 'Warning' },
  ];

  return (
    <div className="bg-white border border-[#D4D4D4] p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-[#D4D4D4] pb-3">
        <div>
          <h3 className="text-sm font-bold text-[#1C1C1C] font-mono">CROP_CYCLES_MGR</h3>
          <p className="text-xs text-[#636363] font-mono mt-1">TRACK_AND_CONTROL_PLANTING_PHASES</p>
        </div>
        <button className="h-8 px-3 text-[11px] font-bold text-white bg-[#00897B] hover:bg-[#00796B] font-mono">
          CREATE_NEW_CYCLE
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#FAFAFA] text-[#636363] border-b border-[#D4D4D4]">
            <tr>
              <th className="px-3 py-2 font-bold whitespace-nowrap">ZONE_ID</th>
              <th className="px-3 py-2 font-bold text-right font-cairo whitespace-nowrap">المحصول</th>
              <th className="px-3 py-2 font-bold whitespace-nowrap">START_DATE</th>
              <th className="px-3 py-2 font-bold whitespace-nowrap">EXP_HARVEST</th>
              <th className="px-3 py-2 font-bold min-w-[120px] whitespace-nowrap">PROGRESS</th>
              <th className="px-3 py-2 font-bold whitespace-nowrap">PHASE</th>
              <th className="px-3 py-2 font-bold whitespace-nowrap">HLTH_IDX</th>
              <th className="px-3 py-2 font-bold text-center whitespace-nowrap">CMD</th>
            </tr>
          </thead>
          <tbody className="text-[#1C1C1C]">
            {mockCycles.map((c, idx) => {
              const progressPct = Math.round((c.currentDay / c.totalDays) * 100);
              return (
                <tr key={c.id} className="border-b border-[#D4D4D4] hover:bg-[#F5F5F5]">
                  <td className="px-3 py-3 font-bold text-[#00897B] whitespace-nowrap">{c.ghCode}</td>
                  <td className="px-3 py-3 text-right font-cairo font-bold whitespace-nowrap">{c.crop}</td>
                  <td className="px-3 py-3 text-[#636363] whitespace-nowrap">{c.startDate}</td>
                  <td className="px-3 py-3 text-[#636363] whitespace-nowrap">{c.expectedEnd}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#00897B]" style={{ width: `${progressPct}%` }}></div>
                      </div>
                      <span className="text-[10px] text-[#636363]"><span dir="ltr">DAY {c.currentDay}/{c.totalDays}</span></span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[#E65100] font-bold whitespace-nowrap">{c.phase}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={`px-1.5 py-0.5 text-[10px] font-bold ${c.health === 'Warning' ? 'bg-[#FFF3E0] text-[#E65100]' : 'bg-[#E8F5E9] text-[#2E7D32]'}`}>
                      {c.health}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center flex justify-center gap-2 whitespace-nowrap">
                    <button className="text-[#636363] hover:text-[#1C1C1C]" title="Pause Cycle"><Pause size={14} /></button>
                    <button className="text-[#636363] hover:text-[#00897B]" title="Force Next Phase"><RefreshCw size={14} /></button>
                    <button className="text-[#636363] hover:text-[#00897B]" title="Mark Harvested"><CheckCircle size={14} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};