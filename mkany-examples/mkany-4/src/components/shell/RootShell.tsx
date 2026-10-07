import React, { useState } from 'react';
import { Building2, Scale, Sprout, Search, ArrowLeft, ChevronDown } from 'lucide-react';
import { useAppRoute } from '../common/RouteContext';

export const RootShell: React.FC = () => {
  const { navigate } = useAppRoute();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProjectSwitcherOpen, setIsProjectSwitcherOpen] = useState(false);
  const [activeProject, setActiveProject] = useState("MKANY Holding");

  const subSystems = [
    {
      id: 'real-estate',
      path: '/real-estate' as const,
      name: 'إدارة العقارات',
      description: 'تتبع المشاريع، إدارة المخزون، الحجوزات، وعقود العمولات متعددة الأطراف.',
      icon: Building2,
      accentColor: '#DC2626',
      bgColor: '#FEE2E2',
      badgeClass: 'text-red-700 bg-red-50 border-red-200',
      stats: [
        { label: 'مشاريع', value: '3' },
        { label: 'وحدات', value: '8' },
        { label: 'قيمة المخزون', value: '60.8M' },
      ],
    },
    {
      id: 'legal',
      path: '/legal' as const,
      name: 'الشؤون القانونية',
      description: 'إدارة الموكلين، القضايا والملفات، الجلسات، ومواعيد السقوط والطعون.',
      icon: Scale,
      accentColor: '#1E293B',
      bgColor: '#F1F5F9',
      badgeClass: 'text-slate-700 bg-slate-50 border-slate-200',
      stats: [
        { label: 'قضايا', value: '4' },
        { label: 'جلسات', value: '3' },
        { label: 'مواعيد حرجة', value: '1' },
      ],
    },
    {
      id: 'agriculture',
      path: '/agriculture' as const,
      name: 'القطاع الزراعي',
      description: 'متابعة الصوب الهيدروبونيك، الدورات الزراعية، قراءات الحساسات، والحصاد.',
      icon: Sprout,
      accentColor: '#15803D',
      bgColor: '#DCFCE7',
      badgeClass: 'text-green-700 bg-green-50 border-green-200',
      stats: [
        { label: 'صوب', value: '3' },
        { label: 'حساسات', value: '6' },
        { label: 'دورات نشطة', value: '3' },
      ],
    },
  ];

  const filteredSystems = subSystems.filter((sys) =>
    sys.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sys.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      id="root-shell-view"
      className="min-h-screen flex flex-col justify-between font-cairo"
      style={{ backgroundColor: '#F3F4F6' }}
    >
      {/* High Density Quiet Shell Header */}
      <header
        id="sh-header"
        className="h-16 flex items-center justify-between px-6 sm:px-10 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-[#111827] rounded-lg flex items-center justify-center text-white font-bold text-xl font-syne shadow-inner">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-[#111827] font-bold text-lg tracking-tight font-syne">
              مكاني <span className="text-amber-500">ERP</span>
            </span>
            <span className="text-[11px] text-gray-500 font-medium leading-none">
              نظام التشغيل المؤسسي الموحد
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">

          {/* Project Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsProjectSwitcherOpen(!isProjectSwitcherOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors bg-white shadow-sm"
            >
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-gray-500 font-medium leading-none">الكيان الحالي</span>
                <span className="text-xs font-bold text-gray-900 leading-none">{activeProject}</span>
              </div>
              <ChevronDown size={14} className="text-gray-500" />
            </button>
            {isProjectSwitcherOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                {['MKANY Holding', 'MKANY Real Estate', 'MKANY Agriculture', 'MKANY Legal'].map(proj => (
                  <button
                    key={proj}
                    onClick={() => { setActiveProject(proj); setIsProjectSwitcherOpen(false); }}
                    className={`w-full text-right px-4 py-2 text-sm transition-colors ${activeProject === proj ? 'bg-gray-100 font-bold text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {proj}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden sm:flex flex-col items-start text-left">
            <span className="text-xs text-gray-500 font-medium">مدير النظام التنفيذي</span>
            <span className="text-sm font-bold text-gray-900 leading-none">
              أحمد الشناوي
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-700 font-bold text-xs font-syne shadow-sm">
            AS
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        id="sh-main-content"
        className="flex-1 flex flex-col items-center pt-10 sm:pt-16 pb-12 px-4 sm:px-10 w-full max-w-6xl mx-auto"
      >
        {/* Greeting & Search Shell */}
        <div className="w-full max-w-3xl text-center mb-10 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            أهلاً بك في نظام مكاني الموحد
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            منصة إدارة العمليات التشغيلية والمالية لقطاعات المجموعة
          </p>

          <div className="relative group w-full">
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
              <Search size={20} />
            </div>
            <input
              id="sh-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="ابحث عن وحدة، قضية، أو دورة زراعية..."
              className="w-full h-14 pr-12 pl-24 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#111827] focus:border-transparent outline-none text-base placeholder-gray-400 transition-all font-cairo"
            />
            <div className="absolute inset-y-0 left-4 flex items-center">
              <span className="text-xs font-mono bg-gray-100 text-gray-500 border border-gray-200 px-2 py-1 rounded shadow-inner select-none">
                Ctrl+K
              </span>
            </div>
          </div>
        </div>

        {/* 3 Sub-System Grid (High Density 3-card layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl">
          {filteredSystems.length === 0 ? (
            <div className="col-span-3 p-10 text-center bg-white border border-gray-200 rounded-2xl text-gray-500 text-sm">
              لم يتم العثور على قطاع يطابق "{searchQuery}"
            </div>
          ) : (
            filteredSystems.map((sys) => {
              const IconComponent = sys.icon;
              return (
                <div
                  key={sys.id}
                  id={`sh-card-${sys.id}`}
                  onClick={() => navigate(sys.path)}
                  className="group bg-white/70 backdrop-blur-sm border border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-xl p-6 sm:p-8 rounded-2xl transition-all cursor-pointer flex flex-col justify-between text-right"
                >
                  <div>
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110 shadow-sm"
                      style={{
                        backgroundColor: sys.bgColor,
                        color: sys.accentColor,
                      }}
                    >
                      <IconComponent size={28} strokeWidth={1.75} />
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-bold text-gray-900 font-cairo">
                        {sys.name}
                      </h2>
                      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-gray-900 group-hover:bg-gray-200 transition-colors">
                        <ArrowLeft size={14} />
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      {sys.description}
                    </p>
                  </div>

                  {/* High Density Metric Footer */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                    {sys.stats.map((st, sidx) => (
                      <div key={sidx} className="flex flex-col">
                        <span className="text-[11px] text-gray-400 font-medium">
                          {st.label}
                        </span>
                        <span
                          className="text-sm font-mono font-bold"
                          style={{ color: sys.accentColor }}
                        >
                          {st.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* High Density Bottom Information Bar */}
      <footer className="h-11 px-6 sm:px-10 border-t border-gray-200 bg-white flex items-center justify-between text-xs">
        <div className="flex gap-4 sm:gap-6 items-center">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest font-mono">
            MKANY OS v2.4.0
          </span>
          <div className="h-3 w-px bg-gray-200" />
          <span className="flex items-center gap-1.5 text-[11px] text-green-700 font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            جميع الأنظمة متصلة
          </span>
        </div>
        <div className="text-[11px] text-gray-400 font-mono hidden sm:inline">
          TIMESTAMP: 2026-08-18 11:34:22 UTC
        </div>
      </footer>
    </div>
  );
};

