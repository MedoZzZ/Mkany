import React, { useState } from 'react';
import { Building2, Home, FileText, Clock, DollarSign, Filter, Plus, ArrowRight, CheckCircle2, AlertCircle, Layers, Percent, ChevronDown, Scale, Sprout } from 'lucide-react';
import { useAppRoute } from '../common/RouteContext';
import { ProjectsPage } from './pages/ProjectsPage';
import { InventoryPage } from './pages/InventoryPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { ContractsPage } from './pages/ContractsPage';
import { CommissionsPage } from './pages/CommissionsPage';

export const RealEstateDashboard: React.FC = () => {
  const { currentPath, navigate } = useAppRoute();
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

    const formatCurrency = (val: number) => {
    return (
      <span className="inline-flex flex-row-reverse items-center justify-end gap-1 w-full" dir="ltr">
        <span className="font-cairo text-[10px]">ج.م</span>
        <span className="font-mono">{new Intl.NumberFormat('en-US').format(val)}</span>
      </span>
    );
  };

  const getActiveTab = () => {
    if (currentPath.includes('/projects')) return 'projects';
    if (currentPath.includes('/reservations')) return 'reservations';
    if (currentPath.includes('/contracts')) return 'contracts';
    if (currentPath.includes('/commissions')) return 'commissions';
    return 'inventory'; // default is units
  };

  const activeTab = getActiveTab();

  return (
    <div
      id="real-estate-view"
      className="min-h-screen flex flex-col font-cairo"
      style={{ backgroundColor: '#F4F6F9', color: '#16325C' }}
    >
      <header id="re-header" className="w-full bg-white border-b sticky top-0 z-30" style={{ borderColor: '#D8DDE6' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded transition-colors hover:bg-[#EBF5FF]"
              style={{ color: '#0070D2', borderRadius: '4px', border: '1px solid #D8DDE6' }}
            >
              <ArrowRight size={14} />
              <span className="hidden sm:inline">الرئيسية</span>
            </button>
            <div className="h-4 w-px bg-[#D8DDE6]" />

            {/* Sub-system Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 transition-colors hover:bg-[#EBF5FF]"
                style={{ border: '1px solid #D8DDE6', borderRadius: '4px', backgroundColor: '#FFFFFF' }}
              >
                <Building2 size={16} color="#0070D2" />
                <span className="text-xs font-bold text-[#16325C] hidden sm:inline">القطاع العقاري</span>
                <ChevronDown size={14} className="text-[#54698D]" />
              </button>

              {isSwitcherOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border z-50 overflow-hidden" style={{ borderColor: '#D8DDE6', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <button onClick={() => navigate('/legal')} className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-[#E8F0FE] transition-colors text-right border-b" style={{ borderColor: '#F0F0F0' }}>
                    <Scale size={14} color="#0F62FE" />
                    <span className="text-xs font-bold text-[#161616] font-plex">الشؤون القانونية</span>
                  </button>
                  <button onClick={() => navigate('/agriculture')} className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-[#2A2A2A] transition-colors text-right bg-[#1C1C1C]">
                    <Sprout size={14} color="#4CAF50" />
                    <span className="text-xs font-bold text-[#E0E0E0] font-mono-code">القطاع الزراعي</span>
                  </button>
                </div>
              )}
            </div>

            <div className="h-4 w-px bg-[#D8DDE6]" />

            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-[#54698D] hidden md:block">نظام مجموعة مكاني / قطاع التطوير والاستثمار العقاري</span>
                <h1 className="text-sm md:text-lg font-bold font-syne text-[#16325C] leading-tight">إدارة المبيعات ومخزون الوحدات</h1>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-3 text-xs font-semibold flex items-center gap-1.5 transition-colors" style={{ backgroundColor: '#FFFFFF', color: '#0070D2', border: '1px solid #0070D2', borderRadius: '4px' }}>
              <Filter size={14} />
              <span>تصدير المخزون</span>
            </button>
            <button className="h-9 px-3.5 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors hover:bg-[#005FB2]" style={{ backgroundColor: '#0070D2', borderRadius: '4px' }}>
              <Plus size={14} />
              <span>تسجيل حجز جديد</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 border-t" style={{ borderColor: '#D8DDE6' }}>
          {[
            { id: 'projects', path: '/real-estate/projects', label: 'المشاريع (3)', icon: Layers },
            { id: 'inventory', path: '/real-estate/units', label: 'مخزون الوحدات (8)', icon: Home },
            { id: 'reservations', path: '/real-estate/reservations', label: 'الحجوزات النشطة (3)', icon: Clock },
            { id: 'contracts', path: '/real-estate/contracts', label: 'العقود والأقساط (3)', icon: FileText },
            { id: 'commissions', path: '/real-estate/commissions', label: 'العمولات وتوزيع الأرباح', icon: Percent },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-all relative ${isActive ? 'text-[#0070D2]' : 'text-[#54698D] hover:text-[#16325C]'}`}
              >
                <Icon size={15} strokeWidth={1.5} />
                <span>{tab.label}</span>
                {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0070D2]" />}
              </button>
            );
          })}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 w-full flex-1 flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white border" style={{ borderColor: '#D8DDE6', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.10)' }}>
            <div className="flex items-center justify-between text-xs text-[#54698D]">
              <span>إجمالي قيمة المخزون</span>
              <Building2 size={16} className="text-[#0070D2]" />
            </div>
            <div className="mt-2 text-xl font-bold font-mono-numbers text-[#16325C]">{formatCurrency(60800000)}</div>
            <div className="mt-1 text-[11px] text-[#54698D] flex items-center gap-1"><span>8 وحدات في 3 مشاريع سكنية وإدارية</span></div>
          </div>
          <div className="p-4 bg-white border" style={{ borderColor: '#D8DDE6', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.10)' }}>
            <div className="flex items-center justify-between text-xs text-[#54698D]">
              <span>الوحدات المتاحة للبيع</span>
              <CheckCircle2 size={16} className="text-[#04844B]" />
            </div>
            <div className="mt-2 text-xl font-bold font-mono-numbers text-[#04844B]">3 وحدات (37.5%)</div>
            <div className="mt-1 text-[11px] text-[#54698D]">جاهزة للعرض والحجز الفوري</div>
          </div>
          <div className="p-4 bg-white border" style={{ borderColor: '#D8DDE6', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.10)' }}>
            <div className="flex items-center justify-between text-xs text-[#54698D]">
              <span>حجوزات بمهلة TTL نشطة</span>
              <Clock size={16} className="text-[#E87800]" />
            </div>
            <div className="mt-2 text-xl font-bold font-mono-numbers text-[#E87800]">2 وحدات</div>
            <div className="mt-1 text-[11px] text-[#54698D]">أقرب حجز ينتهي خلال 14 ساعة</div>
          </div>
          <div className="p-4 bg-white border" style={{ borderColor: '#D8DDE6', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.10)' }}>
            <div className="flex items-center justify-between text-xs text-[#54698D]">
              <span>تحصيلات الأقساط المستحقة</span>
              <DollarSign size={16} className="text-[#0070D2]" />
            </div>
            <div className="mt-2 text-xl font-bold font-mono-numbers text-[#16325C]">{formatCurrency(1220000)}</div>
            <div className="mt-1 text-[11px] text-[#C23934] flex items-center gap-1">
              <AlertCircle size={12} />
              <span>قسط واحد متأخر بقيمة 625,000 ج.م</span>
            </div>
          </div>
        </div>

        {activeTab === 'inventory' && <InventoryPage />}
        {activeTab === 'reservations' && <ReservationsPage />}
        {activeTab === 'contracts' && <ContractsPage />}
        {activeTab === 'commissions' && <CommissionsPage />}
        {activeTab === 'projects' && <ProjectsPage />}
      </main>
    </div>
  );
};
