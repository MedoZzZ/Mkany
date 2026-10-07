import React, { useState } from 'react';
import { Direction, UserProfile, AppView } from '../../types';
import {
  Sprout,
  Droplets,
  Sun,
  Wind,
  Thermometer,
  Activity,
  Layers,
  ChevronDown,
  RefreshCw,
  Plus,
  ArrowRight,
  ArrowLeft,
  Calendar,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Sliders,
  Menu,
  X,
  LayoutGrid,
} from 'lucide-react';

interface AgricultureScreenProps {
  user: UserProfile;
  direction: Direction;
  onOpenSwitcher: () => void;
  onReturnToHub: () => void;
}

export const AgricultureScreen: React.FC<AgricultureScreenProps> = ({
  user,
  direction,
  onOpenSwitcher,
  onReturnToHub,
}) => {
  const isRtl = direction === 'rtl';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('telemetry');
  const [activeSector, setActiveSector] = useState('greenhouse-a');
  const [moistureTarget, setMoistureTarget] = useState('68');
  const [cycleType, setCycleType] = useState('organic');

  // Sensor telemetry data
  const sensors = [
    {
      id: 'soil-moisture',
      titleAr: 'رطوبة التربة الحيوية',
      titleEn: 'Soil Moisture Index',
      value: '68.4',
      unit: '%',
      target: '65-72%',
      statusAr: 'مثالي ورطب',
      statusEn: 'Optimal & Moist',
      color: '#059669', // emerald
      sparkline: [62, 64, 65, 67, 68, 68.4],
      icon: Droplets,
    },
    {
      id: 'temp-hvac',
      titleAr: 'درجة حرارة الصوبة',
      titleEn: 'Ambient Greenhouse Temp',
      value: '24.6',
      unit: '°C',
      target: '22-26°C',
      statusAr: 'تهوية طبيعية',
      statusEn: 'Natural Ventilation',
      color: '#D97706', // amber
      sparkline: [21.5, 22.8, 23.9, 24.1, 24.6],
      icon: Thermometer,
    },
    {
      id: 'irrigation-flow',
      titleAr: 'معدل تدفق شبكة الري',
      titleEn: 'Active Irrigation Flow',
      value: '142.8',
      unit: 'L/m',
      target: '130-150 L/m',
      statusAr: 'ضخ مستمر',
      statusEn: 'Continuous Drip',
      color: '#059669', // primary emerald
      sparkline: [120, 135, 140, 142.8],
      icon: Activity,
    },
    {
      id: 'sun-lumens',
      titleAr: 'معدل الإشعاع الشمسي',
      titleEn: 'Sun Photoperiod',
      value: '11.4',
      unit: 'hrs',
      target: '10-12 hrs',
      statusAr: 'إضاءة طبيعية',
      statusEn: 'Full Sunlight',
      color: '#D97706', // amber
      sparkline: [8.5, 9.2, 10.4, 11.4],
      icon: Sun,
    },
  ];

  // Harvest cycles table records
  const harvestRecords = [
    {
      id: 'BATCH-2026-08',
      cropAr: 'طماطم شيري عضوية (صوبة ٤)',
      cropEn: 'Organic Cherry Tomatoes (GH-4)',
      plantedDate: '2026-05-10',
      expectedYield: '4,280.00',
      unit: 'kg',
      costCenter: '18,450.00',
      status: 'harvested',
      statusAr: 'تم الحصاد',
      statusEn: 'Harvested',
      statusColor: '#059669',
      statusBg: '#ECFDF5',
    },
    {
      id: 'BATCH-2026-09',
      cropAr: 'فلفل ألوان هيدروبونيك',
      cropEn: 'Bell Peppers (Hydroponics)',
      plantedDate: '2026-06-15',
      expectedYield: '2,950.50',
      unit: 'kg',
      costCenter: '14,200.00',
      status: 'flowering',
      statusAr: 'مرحلة الإزهار',
      statusEn: 'Flowering',
      statusColor: '#D97706',
      statusBg: '#FEF3C7',
    },
    {
      id: 'BATCH-2026-10',
      cropAr: 'أعشاب عطرية وريحان إيطالي',
      cropEn: 'Italian Sweet Basil & Herbs',
      plantedDate: '2026-07-02',
      expectedYield: '1,120.00',
      unit: 'kg',
      costCenter: '7,890.00',
      status: 'vegetative',
      statusAr: 'في طور النمو',
      statusEn: 'Vegetative',
      statusColor: '#0284C7',
      statusBg: '#F0F9FF',
    },
    {
      id: 'BATCH-2026-11',
      cropAr: 'خيار صيف مبكر (قطاع B)',
      cropEn: 'Summer Cucumber (Sector B)',
      plantedDate: '2026-07-20',
      expectedYield: '5,600.00',
      unit: 'kg',
      costCenter: '21,300.00',
      status: 'vegetative',
      statusAr: 'في طور النمو',
      statusEn: 'Vegetative',
      statusColor: '#0284C7',
      statusBg: '#F0F9FF',
    },
  ];

  return (
    <div
      id="ag-domain-container"
      className="min-h-screen w-full flex font-ag-ui"
      style={{
        backgroundColor: '#EBE8DF',
        color: '#2D3D33',
      }}
    >
      {/* =====================================================================
          PERSISTENT THICK SIDEBAR (2px solid #D6D2C4 earthy border)
          ===================================================================== */}
      <aside
        id="ag-sidebar"
        className={`fixed lg:static inset-y-0 ${
          isRtl ? 'right-0' : 'left-0'
        } z-40 w-72 bg-[#F6F5F0] p-5 flex flex-col justify-between transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen
            ? 'translate-x-0'
            : isRtl
            ? 'translate-x-full'
            : '-translate-x-full'
        }`}
        style={{
          borderInlineEnd: '2px solid #D6D2C4',
        }}
      >
        <div className="space-y-6">
          {/* Top of Sidebar: Tactile Pill Project Switcher */}
          <div className="flex items-center justify-between pb-4" style={{ borderBottom: '2px solid #D6D2C4' }}>
            <button
              id="ag-project-switcher-btn"
              onClick={onOpenSwitcher}
              className="flex-1 flex items-center justify-between px-4 py-2.5 bg-[#EBE8DF] hover:bg-[#E2DEC8] text-[#2D3D33] font-bold text-xs transition-colors group"
              style={{
                borderRadius: '100px',
                border: '2px solid #D6D2C4',
              }}
              title="Switch project"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🌱</span>
                <span className="font-bold text-xs">
                  {isRtl ? 'الزراعة الذكية' : 'Smart Agriculture'}
                </span>
              </div>
              <ChevronDown size={14} className="text-[#3A7D44] group-hover:scale-110 transition-transform" />
            </button>

            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden ms-2 p-2 rounded-full hover:bg-[#EBE8DF] text-[#2D3D33]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Hub Jump Link */}
          <button
            id="ag-back-to-hub-btn"
            onClick={onReturnToHub}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#2D3D33] hover:bg-[#EBE8DF] transition-colors"
            style={{
              borderRadius: '100px',
              border: '2px dashed #D6D2C4',
            }}
          >
            <LayoutGrid size={15} className="text-[#E5A93D]" />
            <span>{isRtl ? 'العودة إلى البوابة (Hub)' : 'Back to Hub'}</span>
          </button>

          {/* Navigation Items with thick ag-primary border highlight */}
          <nav className="space-y-2 pt-2">
            {[
              { id: 'telemetry', labelAr: 'مؤشرات الصوب الحية', labelEn: 'Living Telemetry', icon: Activity },
              { id: 'zones', labelAr: 'إدارة قطاعات الأراضي', labelEn: 'Field & Zones', icon: Layers },
              { id: 'irrigation', labelAr: 'شبكات الري والتسميد', labelEn: 'Drip Irrigation', icon: Droplets },
              { id: 'harvest', labelAr: 'سجلات الحصاد والتكاليف', labelEn: 'Harvest & Costs', icon: Sprout },
              { id: 'climate', labelAr: 'التحكم بالمناخ والتهوية', labelEn: 'Microclimate & Sun', icon: Sun },
            ].map((item) => {
              const isActive = activeNav === item.id;
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  id={`ag-nav-${item.id}`}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold transition-all text-start rounded-xl ${
                    isActive
                      ? isRtl
                        ? 'bg-[#EBE8DF] text-[#3A7D44] border-r-4 border-[#3A7D44]'
                        : 'bg-[#EBE8DF] text-[#3A7D44] border-l-4 border-[#3A7D44]'
                      : 'text-[#2D3D33] hover:bg-[#EBE8DF]/60'
                  }`}
                  style={{
                    border: isActive ? undefined : '2px solid transparent',
                  }}
                >
                  <IconComp
                    size={17}
                    strokeWidth={2}
                    className={isActive ? 'text-[#3A7D44]' : 'text-[#8C827A]'}
                  />
                  <span>{isRtl ? item.labelAr : item.labelEn}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Field Operator status */}
        <div className="pt-4" style={{ borderTop: '2px solid #D6D2C4' }}>
          <div
            className="p-3 bg-[#EBE8DF]"
            style={{
              borderRadius: '16px',
              border: '2px solid #D6D2C4',
            }}
          >
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-bold text-[#2D3D33]">
                {isRtl ? 'محطة التحكم الميداني' : 'Field Controller'}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#3A7D44] animate-pulse" />
            </div>
            <p className="text-[10px] text-[#8C827A] font-mono-data font-semibold">
              GATEWAY: AG-NODE-04 [ONLINE]
            </p>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================================
          MAIN DASHBOARD WORKSPACE (Earthy Sand Canvas #EBE8DF)
          ===================================================================== */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
        {/* Top Header: Title, Breadcrumb, Sector selector & Pill Actions */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4" style={{ borderBottom: '2px solid #D6D2C4' }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 bg-[#F6F5F0] text-[#2D3D33]"
              style={{ borderRadius: '100px', border: '2px solid #D6D2C4' }}
              aria-label="Toggle navigation"
            >
              <Menu size={18} />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs text-[#8C827A] font-semibold mb-1">
                <span>{isRtl ? 'مجمع الصوب الزراعية المتطورة' : 'Advanced Greenhouse Complex'}</span>
                <span>/</span>
                <span className="text-[#3A7D44] font-bold">
                  {isRtl ? 'القطاع الحيوي رقم ٤' : 'Bio-Sector 04'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D3D33] tracking-tight">
                {isRtl ? 'لوحة القيادة البيئية ومستشعرات التربة' : 'Living Greenhouse Command Center'}
              </h2>
            </div>
          </div>

          {/* Sector Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'greenhouse-a', labelAr: 'صوبة هيدروبونيك A', labelEn: 'GH-A Hydroponic' },
              { id: 'greenhouse-b', labelAr: 'مشتل البذور B', labelEn: 'GH-B Seed Nursery' },
              { id: 'field-c', labelAr: 'حقول مكشوفة C', labelEn: 'Field-C Open Plot' },
            ].map((sector) => (
              <button
                key={sector.id}
                onClick={() => setActiveSector(sector.id)}
                className={`px-4 py-2 text-xs font-bold transition-all ${
                  activeSector === sector.id
                    ? 'bg-[#3A7D44] text-white'
                    : 'bg-[#F6F5F0] text-[#2D3D33] hover:bg-[#EBE8DF]'
                }`}
                style={{
                  borderRadius: '100px',
                  border: '2px solid #D6D2C4',
                }}
              >
                {isRtl ? sector.labelAr : sector.labelEn}
              </button>
            ))}

            <button
              onClick={onOpenSwitcher}
              className="px-4 py-2 text-xs font-bold bg-[#F6F5F0] text-[#2D3D33] hover:bg-[#EBE8DF] flex items-center gap-1.5"
              style={{
                borderRadius: '100px',
                border: '2px solid #D6D2C4',
              }}
            >
              <RefreshCw size={13} className="text-[#3A7D44]" />
              <span>{isRtl ? 'تبديل المشروع' : 'Switch Project'}</span>
            </button>
          </div>
        </header>

        {/* ===================================================================
            IOT PHYSICAL SENSOR TELEMETRY CARDS (Flat, 2px border, 16px radius)
            =================================================================== */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#2D3D33] uppercase tracking-wider">
              {isRtl ? 'قراءات المستشعرات الحية (محدث الآن)' : 'Live Physical IoT Telemetry (Real-time)'}
            </h3>
            <span className="text-xs text-[#8C827A] font-mono-data font-bold">
              POLL_INTERVAL: 2.5s
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sensors.map((sensor) => {
              const IconComponent = sensor.icon;
              return (
                <div
                  key={sensor.id}
                  id={`ag-sensor-${sensor.id}`}
                  className="bg-[#F6F5F0] p-5 flex flex-col justify-between"
                  style={{
                    borderRadius: '16px',
                    border: '2px solid #D6D2C4',
                    boxShadow: 'none',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 flex items-center justify-center"
                      style={{
                        backgroundColor: '#EBE8DF',
                        color: sensor.color === '#059669' ? '#3A7D44' : '#E5A93D',
                        borderRadius: '100px',
                        border: '2px solid #D6D2C4',
                      }}
                    >
                      <IconComponent size={18} strokeWidth={2} />
                    </div>
                    <span
                      className="text-[11px] font-bold px-2.5 py-1"
                      style={{
                        backgroundColor: '#EBE8DF',
                        color: '#2D3D33',
                        borderRadius: '100px',
                        border: '1.5px solid #D6D2C4',
                      }}
                    >
                      {isRtl ? sensor.statusAr : sensor.statusEn}
                    </span>
                  </div>

                  {/* Sensor Value: 40px JetBrains Mono */}
                  <div className="my-2">
                    <div className="text-xs font-semibold text-[#8C827A] mb-1">
                      {isRtl ? sensor.titleAr : sensor.titleEn}
                    </div>
                    <div className="flex items-baseline justify-end gap-1.5">
                      <span className="text-3xl sm:text-4xl font-bold font-mono-data tracking-tight text-[#2D3D33]">
                        {sensor.value}
                      </span>
                      <span className="text-sm font-bold font-mono-data text-[#8C827A]">
                        {sensor.unit}
                      </span>
                    </div>
                  </div>

                  {/* Target Spec */}
                  <div
                    className="pt-3 mt-2 flex items-center justify-between text-[11px]"
                    style={{ borderTop: '2px solid #D6D2C4' }}
                  >
                    <span className="text-[#8C827A] font-medium">
                      {isRtl ? 'المعدل المستهدف:' : 'Target:'}
                    </span>
                    <span className="font-mono-data font-bold text-[#2D3D33]">
                      {sensor.target}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            TWO-COLUMN SECTION: FIELD CONTROLLER FORM + HARVEST YIELD TABLE
            =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Microclimate & Soil Adjustment Pill Form */}
          <div
            className="bg-[#F6F5F0] p-6 flex flex-col justify-between"
            style={{
              borderRadius: '16px',
              border: '2px solid #D6D2C4',
              boxShadow: 'none',
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sliders size={18} className="text-[#3A7D44]" />
                <h3 className="text-base font-bold text-[#2D3D33]">
                  {isRtl ? 'معايرة المعاملات الحيوية' : 'Bio-Climate Adjustment'}
                </h3>
              </div>
              <p className="text-xs text-[#8C827A] mb-5 leading-relaxed">
                {isRtl
                  ? 'ضبط حدود تشغيل شبكات الرذاذ والمراوح الحيوية للقطاع'
                  : 'Configure automatic misting triggers and fan thresholds'}
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D3D33] mb-1.5">
                    {isRtl ? 'الرطوبة النسبية المستهدفة (%)' : 'Target Soil Moisture (%)'}
                  </label>
                  <input
                    type="number"
                    value={moistureTarget}
                    onChange={(e) => setMoistureTarget(e.target.value)}
                    className="w-full bg-[#EBE8DF] text-[#2D3D33] text-xs px-4 py-2.5 outline-none transition-all font-mono-data text-end font-bold"
                    style={{
                      borderRadius: '100px',
                      border: '2px solid #D6D2C4',
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D3D33] mb-1.5">
                    {isRtl ? 'نظام التسميد الحيوي' : 'Fertigation Protocol'}
                  </label>
                  <select
                    value={cycleType}
                    onChange={(e) => setCycleType(e.target.value)}
                    className="w-full bg-[#EBE8DF] text-[#2D3D33] text-xs px-4 py-2.5 outline-none transition-all font-semibold"
                    style={{
                      borderRadius: '100px',
                      border: '2px solid #D6D2C4',
                    }}
                  >
                    <option value="organic">
                      {isRtl ? 'تسميد عضوي NPK طبيعي (Formula A)' : 'Organic NPK Bio-Formula A'}
                    </option>
                    <option value="hydro">
                      {isRtl ? 'محاليل هيدروبونيك متوازنة' : 'Balanced Hydroponic Solution'}
                    </option>
                    <option value="low-water">
                      {isRtl ? 'بروتوكول توفير المياه الذكي' : 'Smart Water Conservation Mode'}
                    </option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => alert(isRtl ? 'تم إرسال إعدادات المعايرة لمحطة التحكم بنجاح!' : 'Calibration parameters successfully synced to IoT gateway!')}
                    className="w-full py-3 px-4 bg-[#3A7D44] hover:bg-[#2F6537] text-white text-xs font-bold transition-all shadow-sm"
                    style={{ borderRadius: '100px' }}
                  >
                    {isRtl ? 'تطبيق المعايير على الصوبة' : 'Apply Sector Parameters'}
                  </button>
                </div>
              </form>
            </div>

            <div
              className="mt-6 pt-4 text-[11px] text-[#8C827A] flex items-center gap-2"
              style={{ borderTop: '2px solid #D6D2C4' }}
            >
              <CheckCircle size={15} className="text-[#3A7D44]" />
              <span className="font-bold">{isRtl ? 'المحطة متزامنة مع خوادم السحابة' : 'Sensor node synchronized'}</span>
            </div>
          </div>

          {/* Harvest Yields & Financial Cost Center Table */}
          <div
            className="lg:col-span-2 bg-[#F6F5F0] p-6 flex flex-col justify-between"
            style={{
              borderRadius: '16px',
              border: '2px solid #D6D2C4',
              boxShadow: 'none',
            }}
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#2D3D33]">
                    {isRtl ? 'سجل دورات المحاصيل وتكاليف الإنتاج' : 'Crop Cycles & Cost Center Ledger'}
                  </h3>
                  <p className="text-xs text-[#8C827A]">
                    {isRtl ? 'متابعة المحصول المتوقع والتكلفة التشغيلية' : 'Expected yield and operational expenditure'}
                  </p>
                </div>

                <span
                  className="self-start sm:self-auto px-3.5 py-1.5 bg-[#EBE8DF] text-xs font-mono-data font-bold text-[#2D3D33]"
                  style={{
                    borderRadius: '100px',
                    border: '2px solid #D6D2C4',
                  }}
                >
                  TOTAL_ACTIVE: 4 BATCHES
                </span>
              </div>

              {/* Table with earthy 2px border #D6D2C4 */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr style={{ borderBottom: '2px solid #D6D2C4' }} className="text-[#8C827A]">
                      <th className="py-3 px-3 text-start font-bold">
                        {isRtl ? 'رمز الدفعة والمحصول' : 'Batch & Crop'}
                      </th>
                      <th className="py-3 px-3 text-start font-bold">
                        {isRtl ? 'تاريخ الغرس' : 'Planted'}
                      </th>
                      <th className="py-3 px-3 text-end font-bold">
                        {isRtl ? 'المحصول (كجم)' : 'Yield (kg)'}
                      </th>
                      <th className="py-3 px-3 text-end font-bold">
                        {isRtl ? 'مركز التكلفة (ج.م)' : 'Cost Center (EGP)'}
                      </th>
                      <th className="py-3 px-3 text-center font-bold">
                        {isRtl ? 'حالة الدورة' : 'Cycle Status'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D6D2C4]">
                    {harvestRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-[#EBE8DF]/50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-[#2D3D33]">
                            {isRtl ? rec.cropAr : rec.cropEn}
                          </div>
                          <span className="text-[10px] text-[#8C827A] font-mono-data font-semibold">
                            {rec.id}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono-data text-[#2D3D33] font-semibold">
                          {rec.plantedDate}
                        </td>
                        {/* Financial and data figures strictly right-aligned JetBrains Mono */}
                        <td className="py-3 px-3 text-end font-mono-data font-bold text-[#2D3D33]">
                          {rec.expectedYield}
                        </td>
                        <td className="py-3 px-3 text-end font-mono-data font-bold text-[#3A7D44]">
                          {rec.costCenter}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className="inline-block px-3 py-1 text-[11px] font-bold"
                            style={{
                              backgroundColor: '#EBE8DF',
                              color: rec.status === 'harvested' ? '#3A7D44' : '#E5A93D',
                              borderRadius: '100px',
                              border: '1.5px solid #D6D2C4',
                            }}
                          >
                            {isRtl ? rec.statusAr : rec.statusEn}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table Footer Metrics */}
            <div
              className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between text-xs gap-2"
              style={{ borderTop: '2px solid #D6D2C4' }}
            >
              <span className="text-[#8C827A] font-semibold">
                {isRtl ? 'إجمالي المحصول المتوقع لموسم الحصاد الحالي:' : 'Cumulative harvest projection:'}
              </span>
              <span className="font-mono-data font-bold text-sm text-[#3A7D44]">
                13,950.50 KG • 61,840.00 EGP
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
