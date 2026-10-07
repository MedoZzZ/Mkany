import React, { useState } from 'react';
import { Scale, Briefcase, Calendar, AlertOctagon, DollarSign, Users, ArrowRight, ShieldAlert, ChevronDown, Building2, Sprout, Clock } from 'lucide-react';
import { useAppRoute } from '../common/RouteContext';
import { CasesPage } from './pages/CasesPage';
import { HearingsPage } from './pages/HearingsPage';
import { DeadlinesPage } from './pages/DeadlinesPage';
import { FeesPage } from './pages/FeesPage';
import { ClientsPage } from './pages/ClientsPage';
import { mockLegalDeadlines } from '../../data/mockData';

export const LegalDashboard: React.FC = () => {
  const { currentPath, navigate } = useAppRoute();
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const getActiveTab = () => {
    if (currentPath.includes('/cases')) return 'cases';
    if (currentPath.includes('/hearings')) return 'hearings';
    if (currentPath.includes('/deadlines')) return 'deadlines';
    if (currentPath.includes('/fees')) return 'fees';
    if (currentPath.includes('/clients')) return 'clients';
    return 'cases'; // default
  };

  const activeTab = getActiveTab();

  return (
    <div
      id="legal-view"
      className="min-h-screen flex flex-col font-cairo"
      style={{ backgroundColor: '#FBFBF9', color: '#2C2A29' }}
    >
      {/* Editorial Header */}
      <header
        id="le-header"
        className="w-full bg-[#FBFBF9] border-b sticky top-0 z-30"
        style={{ borderColor: '#E6E4DD' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center w-8 h-8 transition-colors hover:bg-[#F2F0E9] border"
              style={{ color: '#2C2A29', borderColor: '#E6E4DD', borderRadius: '0px' }}
            >
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
            <div className="h-6 w-px bg-[#E6E4DD]" />
            {/* Sub-system Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
                className="flex items-center gap-2 px-3 py-1.5 transition-colors hover:bg-[#F2F0E9] border bg-white"
                style={{ borderColor: '#E6E4DD', borderRadius: '0px' }}
              >
                <Scale size={15} color="#6B2D31" strokeWidth={1.5} />
                <span className="text-sm font-bold text-[#2C2A29] font-serif hidden sm:inline">الشؤون القانونية</span>
                <ChevronDown size={14} className="text-[#66635D]" />
              </button>
              {isSwitcherOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white border z-50 overflow-hidden shadow-lg" style={{ borderColor: '#E6E4DD', borderRadius: '0px' }}>
                  <button onClick={() => navigate('/real-estate')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors text-right border-b" style={{ borderColor: '#E6E4DD' }}>
                    <Building2 size={15} color="#0070D2" strokeWidth={1.5} />
                    <span className="text-sm font-bold text-[#16325C] font-cairo">القطاع العقاري</span>
                  </button>
                  <button onClick={() => navigate('/agriculture')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors text-right">
                    <Sprout size={15} color="#4CAF50" strokeWidth={1.5} />
                    <span className="text-sm font-bold text-[#1C1C1C] font-cairo">القطاع الزراعي</span>
                  </button>
                </div>
              )}
            </div>
            <div className="h-6 w-px bg-[#E6E4DD]" />
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#66635D] font-mono tracking-wider hidden md:block uppercase">MKANY GROUP / LEGAL AFFAIRS</span>
                <h1 className="text-base md:text-xl font-bold font-serif text-[#6B2D31] leading-tight">إدارة القضايا والطعون</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-0 border-t" style={{ borderColor: '#E6E4DD', backgroundColor: '#FFFFFF' }}>
          {[
            { id: 'cases', path: '/legal/cases', label: 'القضايا والملفات (4)', icon: Briefcase },
            { id: 'hearings', path: '/legal/hearings', label: 'جدول الجلسات (3)', icon: Calendar },
            { id: 'deadlines', path: '/legal/deadlines', label: 'مواعيد السقوط والطعون (3)', icon: AlertOctagon },
            { id: 'fees', path: '/legal/fees', label: 'حسابات الموكلين والأتعاب', icon: DollarSign },
            { id: 'clients', path: '/legal/clients', label: 'سجل الموكلين والوكالات', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-serif transition-colors relative ${isActive ? 'bg-[#FBFBF9] text-[#6B2D31] font-bold' : 'text-[#66635D] hover:bg-[#FAFAFA] hover:text-[#2C2A29]'}`}
                style={{ borderRadius: '0px' }}
              >
                <Icon size={15} strokeWidth={isActive ? 2 : 1.5} />
                <span>{tab.label}</span>
                {isActive && <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#6B2D31]" />}
              </button>
            );
          })}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 w-full flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col gap-6 min-w-0">
          {activeTab === 'cases' && <CasesPage />}
          {activeTab === 'hearings' && <HearingsPage />}
          {activeTab === 'deadlines' && <DeadlinesPage />}
          {activeTab === 'fees' && <FeesPage />}
          {activeTab === 'clients' && <ClientsPage />}
        </main>

        {/* RADAR RAIL - The Operational Matrix / Zero-Missed-Deadline Engine */}
        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-4 sticky top-32 h-fit">
          <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: '#E6E4DD' }}>
            <h3 className="text-sm font-bold font-serif text-[#2C2A29] flex items-center gap-2">
              <Clock size={16} className="text-[#6B2D31]" />
              الرادار والمواعيد الإجرائية
            </h3>
            <span className="text-[10px] font-mono tracking-widest text-[#66635D]">LIVE</span>
          </div>

          <div className="flex flex-col gap-3">
            {mockLegalDeadlines.map(d => {
              const isCritical = d.daysRemaining <= 3;
              const isWarning = d.daysRemaining > 3 && d.daysRemaining <= 7;
              
              let bgColor = '#FFFFFF';
              let borderColor = '#E6E4DD';
              let textColor = '#2C2A29';
              let countdownBg = '#F2F0E9';
              let countdownText = '#66635D';
              
              if (isCritical) {
                bgColor = '#DA1E28'; // Blaring red
                borderColor = '#DA1E28';
                textColor = '#FFFFFF';
                countdownBg = '#BA1B23';
                countdownText = '#FFFFFF';
              } else if (isWarning) {
                bgColor = '#FFF9C4'; // Pale yellow
                borderColor = '#FBC02D';
                textColor = '#8A6D3B';
                countdownBg = '#FFF59D';
                countdownText = '#F57F17';
              }

              return (
                <div
                  key={d.id}
                  className="p-4 border transition-all"
                  style={{ backgroundColor: bgColor, borderColor: borderColor, borderRadius: '0px' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-mono tracking-widest px-2 py-1`} style={{ backgroundColor: countdownBg, color: countdownText }}>
                      T-MINUS <span dir="ltr" className="inline-block">{d.daysRemaining}D</span>
                    </span>
                    <span className={`text-xs font-mono`} style={{ color: isCritical ? '#FFFFFF' : '#66635D' }}>{d.dueDate}</span>
                  </div>
                  
                  <h4 className={`text-sm font-bold font-serif mb-1`} style={{ color: textColor }}>{d.deadlineType}</h4>
                  
                  <div className="flex flex-col gap-1 mt-3 text-xs" style={{ color: isCritical ? '#FFD3D6' : '#66635D' }}>
                    <div className="flex justify-between items-center">
                      <span>القضية:</span>
                      <span className={`font-mono font-bold ${isCritical ? 'text-white' : 'text-[#2C2A29]'}`}>{d.caseNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>المسؤول:</span>
                      <span className={`font-serif ${isCritical ? 'text-white' : 'text-[#2C2A29]'}`}>{d.responsiblePerson}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
};
