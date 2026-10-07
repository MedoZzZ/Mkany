import React, { useState } from 'react';
import { Sprout, Layers, Gauge, Package, Bell, ArrowRight, ChevronDown, Building2, Scale } from 'lucide-react';
import { useAppRoute } from '../common/RouteContext';
import { FarmsPage } from './pages/FarmsPage';
import { GreenhousesPage } from './pages/GreenhousesPage';
import { CyclesPage } from './pages/CyclesPage';
import { ReadingsPage } from './pages/ReadingsPage';
import { AlertsPage } from './pages/AlertsPage';
import { mockGreenhouseZones } from '../../data/mockData';

export const AgricultureDashboard: React.FC = () => {
  const { currentPath, navigate } = useAppRoute();
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const getActiveTab = () => {
    if (currentPath.includes('/farms')) return 'farms';
    if (currentPath.includes('/greenhouses')) return 'greenhouses';
    if (currentPath.includes('/cycles')) return 'cycles';
    if (currentPath.includes('/readings')) return 'readings';
    if (currentPath.includes('/alerts')) return 'alerts';
    return 'farms'; // default
  };

  const activeTab = getActiveTab();

  return (
    <div
      id="agriculture-view"
      className="min-h-screen flex flex-col font-cairo"
      style={{ backgroundColor: '#F0F0F0', color: '#1C1C1C' }} // Light AgTech Canvas
    >
      <header
        id="ag-header"
        className="w-full border-b sticky top-0 z-30 shadow-sm"
        style={{ backgroundColor: '#FFFFFF', borderColor: '#D4D4D4' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 transition-colors font-mono bg-white hover:bg-[#F5F5F5]"
              style={{ color: '#00897B', border: '1px solid #D4D4D4', borderRadius: '3px' }}
            >
              <ArrowRight size={15} strokeWidth={2} />
              <span className="hidden sm:inline">MAIN_SYS</span>
            </button>
            <div className="h-5 w-px bg-[#D4D4D4]" />

            {/* Sub-system Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 transition-colors hover:bg-[#F5F5F5]"
                style={{ border: '1px solid #D4D4D4', borderRadius: '3px', backgroundColor: '#FFFFFF' }}
              >
                <Sprout size={16} color="#00897B" />
                <span className="text-xs font-bold text-[#1C1C1C] font-mono uppercase hidden sm:inline">AGRI_SECTOR</span>
                <ChevronDown size={14} className="text-[#636363]" />
              </button>

              {isSwitcherOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 border z-50 overflow-hidden bg-white shadow-md" style={{ borderColor: '#D4D4D4', borderRadius: '3px' }}>
                  <button onClick={() => navigate('/real-estate')} className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-[#EBF5FF] transition-colors text-right border-b bg-white" style={{ borderColor: '#D8DDE6' }}>
                    <Building2 size={14} color="#0070D2" />
                    <span className="text-xs font-bold text-[#16325C] font-cairo">القطاع العقاري</span>
                  </button>
                  <button onClick={() => navigate('/legal')} className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-[#E8F0FE] transition-colors text-right bg-white">
                    <Scale size={14} color="#0F62FE" />
                    <span className="text-xs font-bold text-[#161616] font-plex">الشؤون القانونية</span>
                  </button>
                </div>
              )}
            </div>

            <div className="h-5 w-px bg-[#D4D4D4]" />
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#636363] font-semibold font-mono tracking-wider hidden md:block">
                  MKANY AGRI-SYSTEMS / HMI_CONTROL_PANEL
                </span>
                <h1 className="text-sm md:text-base font-bold text-[#1C1C1C] leading-none uppercase">
                  مركز التحكم البيئي والصوب
                </h1>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-[#F5F5F5] border border-[#D4D4D4] font-mono text-xs font-bold text-[#9E9E9E] flex items-center gap-2 rounded-[2px]">
              <span className="w-2 h-2 rounded-full bg-[#9E9E9E]"></span>
              SYS_NOMINAL
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 border-t" style={{ borderColor: '#E5E5E5', backgroundColor: '#FAFAFA' }}>
          {[
            { id: 'farms', path: '/agriculture/farms', label: 'المزارع (FARMS)', icon: Layers },
            { id: 'greenhouses', path: '/agriculture/greenhouses', label: 'الصوب (ZONES)', icon: Sprout },
            { id: 'cycles', path: '/agriculture/cycles', label: 'الدورات (CYCLES)', icon: Package },
            { id: 'readings', path: '/agriculture/readings', label: 'القياسات (TELEMETRY)', icon: Gauge },
            { id: 'alerts', path: '/agriculture/alerts', label: 'الإنذارات (ALERTS)', icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-colors relative font-mono ${
                  isActive
                    ? 'bg-[#E0F2F1] text-[#00897B] border-b-2 border-[#00897B]'
                    : 'text-[#636363] hover:text-[#1C1C1C] hover:bg-[#F5F5F5]'
                }`}
              >
                <Icon size={16} strokeWidth={2} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-5 w-full flex-1 flex flex-col gap-4">
        {activeTab === 'farms' && <FarmsPage />}
        {activeTab === 'greenhouses' && <GreenhousesPage />}
        {activeTab === 'cycles' && <CyclesPage />}
        {activeTab === 'readings' && <ReadingsPage />}
        {activeTab === 'alerts' && <AlertsPage />}
      </main>
    </div>
  );
};