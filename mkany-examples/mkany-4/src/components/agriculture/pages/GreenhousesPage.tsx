import React, { useState } from 'react';
import { Play, Pause, AlertTriangle, Settings, ChevronLeft, Droplets, Thermometer, Sprout, Wind } from 'lucide-react';
import { useAppRoute } from '../../common/RouteContext';
import { mockGreenhouseZones as mockGreenhouses } from '../../../data/mockData';

export const GreenhousesPage: React.FC = () => {
  const { currentPath, navigate } = useAppRoute();

  const pathParts = currentPath.split('/');
  const ghId = pathParts[3]; // /agriculture/greenhouses/gh1

  if (ghId) {
    const gh = mockGreenhouses.find(g => g.id === ghId);
    if (!gh) return <div className="text-[#1C1C1C]">SYSTEM_ERR: ZONE_NOT_FOUND</div>;

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs">
          <button onClick={() => navigate('/agriculture/greenhouses')} className="text-[#00897B] hover:underline">
            &lt; BACK_TO_ZONES
          </button>
          <span className="text-[#555555]">|</span>
          <span className="text-[#1C1C1C]">{gh.code}</span>
        </div>

        <div className="bg-white border border-[#D4D4D4] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#1C1C1C] font-mono flex items-center gap-3">
              {gh.code}
              {gh.status === 'normal' && <span className="px-2 py-0.5 text-xs bg-[#F5F5F5] text-[#9E9E9E]">SYS_NOMINAL</span>}
              {gh.status === 'attention_required' && <span className="px-2 py-0.5 text-xs bg-[#FFF3E0] text-[#1C1C1C]">ATTN_REQ</span>}
              {gh.status === 'critical_alarm' && <span className="px-2 py-0.5 text-xs bg-[#C62828] text-[#FFFFFF] animate-pulse">CRIT_ALERT</span>}
            </h2>
            <div className="text-sm text-[#636363] mt-2 font-mono">
              CROP_ACTIVE: <span className="text-[#1C1C1C]">{gh.cropType}</span> | CYCLE: {gh.cycleCode}
            </div>
          </div>
          
          <div className="flex gap-2">
             <button className="h-10 px-4 flex items-center gap-2 bg-[#F5F5F5] text-[#1C1C1C] hover:bg-[#E5E5E5] border border-[#D4D4D4] font-mono text-xs font-bold transition-colors">
               <Settings size={14} />
               <span>CFG_PARAMETERS</span>
             </button>
             {gh.status === 'normal' ? (
                <button className="h-10 px-4 flex items-center gap-2 bg-[#FFF3E0] text-[#E65100] border border-[#FFCC80] hover:bg-[#FFE0B2] font-mono text-xs font-bold transition-colors">
                  <Pause size={14} />
                  <span>HALT_SYS</span>
                </button>
             ) : (
                <button className="h-10 px-4 flex items-center gap-2 bg-[#00897B] text-[#FFFFFF] hover:bg-[#00796B] font-mono text-xs font-bold transition-colors">
                  <Play size={14} />
                  <span>INIT_CYCLE</span>
                </button>
             )}
          </div>
        </div>

        {/* Telemetry Dashboard for this GH */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
           <div className="bg-white border border-[#D4D4D4] p-4 flex flex-col items-center justify-center relative overflow-hidden group">
             <Thermometer size={24} className="text-[#C62828] mb-2 opacity-80" />
             <div className="text-[#636363] text-[10px] font-mono mb-1">TEMP_SENSOR_01</div>
             <div className="text-2xl font-bold font-mono text-[#1C1C1C]">{gh.temp}°C</div>
             <div className="w-full h-1 bg-[#E5E5E5] absolute bottom-0 left-0">
               <div className="h-full bg-[#C62828]" style={{ width: `${(gh.temp / 40) * 100}%` }}></div>
             </div>
           </div>
           <div className="bg-white border border-[#D4D4D4] p-4 flex flex-col items-center justify-center relative overflow-hidden">
             <Droplets size={24} className="text-[#00897B] mb-2 opacity-80" />
             <div className="text-[#636363] text-[10px] font-mono mb-1">HUMID_SENSOR_01</div>
             <div className="text-2xl font-bold font-mono text-[#1C1C1C]">{gh.humidity}%</div>
             <div className="w-full h-1 bg-[#E5E5E5] absolute bottom-0 left-0">
               <div className="h-full bg-[#00897B]" style={{ width: `${gh.humidity}%` }}></div>
             </div>
           </div>
           <div className="bg-white border border-[#D4D4D4] p-4 flex flex-col items-center justify-center relative overflow-hidden">
             <Wind size={24} className="text-[#E65100] mb-2 opacity-80" />
             <div className="text-[#636363] text-[10px] font-mono mb-1">EC_LEVEL</div>
             <div className="text-2xl font-bold font-mono text-[#1C1C1C]">{gh.ec}</div>
             <div className="w-full h-1 bg-[#E5E5E5] absolute bottom-0 left-0">
               <div className="h-full bg-[#FFF3E0]" style={{ width: `${(gh.ec / 5) * 100}%` }}></div>
             </div>
           </div>
           <div className="bg-white border border-[#D4D4D4] p-4 flex flex-col items-center justify-center relative overflow-hidden">
             <Sprout size={24} className="text-[#00897B] mb-2 opacity-80" />
             <div className="text-[#636363] text-[10px] font-mono mb-1">SOIL_MOIST_PCT</div>
             <div className="text-2xl font-bold font-mono text-[#1C1C1C]">64%</div>
             <div className="w-full h-1 bg-[#E5E5E5] absolute bottom-0 left-0">
               <div className="h-full bg-[#00897B]" style={{ width: `64%` }}></div>
             </div>
           </div>
        </div>

        <div className="bg-white border border-[#D4D4D4] p-4 mt-2">
           <h3 className="text-xs font-bold text-[#636363] font-mono mb-4 border-b border-[#D4D4D4] pb-2">CMD_LOG // RECENT_EVENTS</h3>
           <div className="font-mono text-[11px] space-y-2">
             <div className="flex text-[#636363]"><span className="w-24 text-[#00897B]">14:02:44Z</span> <span className="w-20 text-[#E65100]">SYSTEM</span> <span>AUTO_ADJ_VENTILATION (VAL_34%)</span></div>
             <div className="flex text-[#636363]"><span className="w-24 text-[#00897B]">13:45:10Z</span> <span className="w-20 text-[#00897B]">OPR_USR</span> <span>MANUAL_OVERRIDE_IRRIGATION_Z1</span></div>
             <div className="flex text-[#636363]"><span className="w-24 text-[#00897B]">11:00:05Z</span> <span className="w-20 text-[#E65100]">SYSTEM</span> <span>ROUTINE_TELEMETRY_SYNC_OK</span></div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Control Actions & Master Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-[#D4D4D4]">
        <div className="flex items-center gap-4">
          <button className="h-9 px-4 flex items-center justify-center gap-2 font-mono text-xs font-bold bg-[#FFFFFF] text-[#1C1C1C] border border-[#D4D4D4] hover:bg-[#F5F5F5] transition-colors">
            <Settings size={14} />
            <span>GLOBAL_CFG</span>
          </button>
          <div className="h-6 w-px bg-[#E5E5E5]" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#636363] font-mono">STATUS_FLT:</span>
            {['ALL', 'RUNNING', 'ALERT', 'IDLE'].map((s) => (
              <button
                key={s}
                className="px-2 py-1 text-[10px] font-mono font-bold transition-colors"
                style={{
                  backgroundColor: s === 'ALL' ? '#00897B' : '#FFFFFF',
                  color: s === 'ALL' ? '#FFFFFF' : '#636363',
                  border: '1px solid #D4D4D4',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button className="h-9 px-4 flex items-center justify-center gap-2 font-mono text-xs font-bold bg-[#00897B] text-[#FFFFFF] hover:bg-[#00796B] transition-colors">
          <Play size={14} />
          <span>START_ALL_CYCLES</span>
        </button>
      </div>

      {/* Grid of Greenhouses (SCADA style Panels) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockGreenhouses.map((gh) => (
          <div
            key={gh.id}
            onClick={() => navigate(`/agriculture/greenhouses/${gh.id}`)}
            className="flex flex-col bg-white border cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            style={{
              borderColor: gh.status === 'critical_alarm' ? '#EF9A9A' : '#D4D4D4',
            }}
          >
            {/* Panel Header */}
            <div className="p-3 flex items-center justify-between border-b border-[#D4D4D4] bg-[#FAFAFA]">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-mono text-[#1C1C1C]">{gh.code}</span>
                {gh.status === 'normal' && <span className="w-2 h-2 rounded-full bg-[#9E9E9E]" title="Normal" />}
                {gh.status === 'critical_alarm' && <span className="w-2 h-2 rounded-full bg-[#C62828] animate-pulse" title="Critical Alert" />}
                {gh.status === 'attention_required' && <span className="w-2 h-2 rounded-full bg-[#FFF3E0]" title="Attention Required" />}
              </div>
              <button className="text-[#00897B] hover:text-[#1C1C1C] transition-colors">
                <ChevronLeft size={16} />
              </button>
            </div>

            {/* Panel Body: Telemetry Metrics */}
            <div className="p-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#636363] font-mono">TEMP_C</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <Thermometer size={12} className={gh.temp > 28 ? 'text-[#C62828]' : 'text-[#636363]'} />
                  <span className={`text-xl font-bold font-mono ${gh.temp > 28 ? 'text-[#C62828]' : 'text-[#1C1C1C]'}`}>
                    {gh.temp}°
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] text-[#636363] font-mono">HUMID_%</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <Droplets size={12} className={gh.humidity < 60 ? 'text-[#E65100]' : 'text-[#636363]'} />
                  <span className={`text-xl font-bold font-mono ${gh.humidity < 60 ? 'text-[#E65100]' : 'text-[#1C1C1C]'}`}>
                    {gh.humidity}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] text-[#636363] font-mono">EC_LEVEL</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-bold font-mono text-[#1C1C1C]">{gh.ec}</span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] text-[#636363] font-mono">CROP_TYPE</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-sm font-bold font-cairo text-[#1C1C1C] truncate" title={gh.cropType}>{gh.cropType}</span>
                </div>
              </div>
            </div>

            {/* Panel Footer: Status / Action */}
            <div className="px-4 py-2 border-t border-[#D4D4D4] bg-[#F5F5F5] flex justify-between items-center text-[10px] font-mono">
              <span className="text-[#636363]">CYCLE: {gh.cycleCode}</span>
              {gh.status === 'critical_alarm' && (
                <div className="flex items-center gap-1 text-[#C62828]">
                  <AlertTriangle size={12} />
                  <span>TEMP_OOB_ERR</span>
                </div>
              )}
              {gh.status !== 'critical_alarm' && (
                <span className="text-[#9E9E9E]">SYS_NOMINAL</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};