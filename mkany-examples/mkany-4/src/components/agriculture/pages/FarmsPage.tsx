import React from 'react';
import { Leaf, Droplets, Thermometer, Wind } from 'lucide-react';
import { useAppRoute } from '../../common/RouteContext';

export const FarmsPage: React.FC = () => {
  const { navigate } = useAppRoute();

  const mockFarms = [
    { id: 'f1', name: 'مزرعة الوادي (طريق الإسكندرية الصحراوي)', area: '500 فدان', greenhouses: 12, status: 'operational', activeAlerts: 0, cropType: 'خضروات تصديرية' },
    { id: 'f2', name: 'مزرعة الصالحية', area: '1200 فدان', greenhouses: 45, status: 'warning', activeAlerts: 3, cropType: 'موالح وفواكه' },
    { id: 'f3', name: 'مشروع توشكى الحيوي', area: '3000 فدان', greenhouses: 0, status: 'maintenance', activeAlerts: 1, cropType: 'قمح عضوي' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-[#D4D4D4] p-4 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-[#1C1C1C] font-mono uppercase tracking-wider">M21_FARMS_DASHBOARD</h3>
          <p className="text-xs text-[#636363] mt-1 font-mono">OVERVIEW OF ALL REGISTERED AGRICULTURAL ZONES</p>
        </div>
        <button className="h-8 px-4 text-xs font-bold text-white bg-[#00897B] hover:bg-[#00796B] uppercase font-mono flex items-center gap-2">
          <span>+ ADD_FARM_ZONE</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockFarms.map((farm) => (
          <div key={farm.id} className="bg-white border border-[#D4D4D4] flex flex-col cursor-pointer shadow-sm hover:shadow-md transition-shadow transition-colors" onClick={() => navigate('/agriculture/greenhouses')}>
            <div className="p-3 border-b border-[#D4D4D4] flex justify-between items-center bg-[#FAFAFA]">
              <span className="text-sm font-bold text-[#1C1C1C]">{farm.name}</span>
              {farm.status === 'operational' && <span className="px-2 py-0.5 text-[10px] font-bold text-[#1C1C1C] bg-[#4CAF50] font-mono">OPR_NORMAL</span>}
              {farm.status === 'warning' && <span className="px-2 py-0.5 text-[10px] font-bold text-[#1C1C1C] bg-[#FFC107] font-mono animate-pulse">WRN_ACTIVE</span>}
              {farm.status === 'maintenance' && <span className="px-2 py-0.5 text-[10px] font-bold text-[#1C1C1C] bg-[#607D8B] font-mono">SYS_MAINT</span>}
            </div>
            
            <div className="p-4 flex-1">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-[#636363] font-mono mb-1">TOTAL_AREA</div>
                  <div className="text-[#1C1C1C] font-bold font-mono flex flex-row-reverse justify-end gap-1" dir="ltr"><span className="font-cairo text-[10px]">فدان</span><span>{farm.area.replace('فدان', '')}</span></div>
                </div>
                <div>
                  <div className="text-[#636363] font-mono mb-1">GREENHOUSES</div>
                  <div className="text-[#00897B] font-bold font-mono flex flex-row-reverse justify-end gap-1" dir="ltr"><span className="font-cairo text-[10px]">ZONES</span><span>{farm.greenhouses}</span></div>
                </div>
                <div>
                  <div className="text-[#636363] font-mono mb-1">MAIN_CROP</div>
                  <div className="text-[#1C1C1C] font-bold">{farm.cropType}</div>
                </div>
                <div>
                  <div className="text-[#636363] font-mono mb-1">ACTV_ALERTS</div>
                  <div className={`font-bold font-mono ${farm.activeAlerts > 0 ? 'text-[#C62828]' : 'text-[#9E9E9E]'}`}>
                    {farm.activeAlerts} {farm.activeAlerts > 0 ? 'WARNINGS' : 'NONE'}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2 border-t border-[#D4D4D4] bg-[#F5F5F5] flex justify-between text-[#636363]">
              <div className="flex gap-3">
                <Thermometer size={14} />
                <Droplets size={14} />
                <Wind size={14} />
              </div>
              <span className="text-[10px] font-mono">VIEW_TELEMETRY &rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};