import React, { useState } from 'react';
import { Direction, UserProfile } from '../../types';
import {
  Building2,
  ChevronDown,
  LayoutGrid,
  Search,
  Filter,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
  Sparkles,
  CreditCard,
  FileText,
  BedDouble,
  Maximize2,
  CheckCircle2,
  Clock,
  Compass,
} from 'lucide-react';

interface RealEstateScreenProps {
  user: UserProfile;
  direction: Direction;
  onOpenSwitcher: () => void;
  onReturnToHub: () => void;
}

export const RealEstateScreen: React.FC<RealEstateScreenProps> = ({
  user,
  direction,
  onOpenSwitcher,
  onReturnToHub,
}) => {
  const isRtl = direction === 'rtl';
  const [activeTab, setActiveTab] = useState<'inventory' | 'installments' | 'contracts'>('inventory');
  const [selectedPhase, setSelectedPhase] = useState('all');

  // Representative high-end property units
  const properties = [
    {
      id: 'UNIT-V104',
      titleAr: 'فيلا مستقلة فاخرة — سكاي لاين ريزيدنس',
      titleEn: 'Standalone Sky Villa — Skyline Residence',
      locationAr: 'التجمع الخامس — القاهرة الجديدة',
      locationEn: 'New Cairo — Fifth Settlement',
      area: '480 m²',
      bedrooms: 5,
      price: '18,500,000.00',
      downPayment: '1,850,000.00',
      quarterlyInstallment: '520,312.50',
      status: 'available',
      statusAr: 'متاح للبيع',
      statusEn: 'Available',
      delivery: 'Q4 2027',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'UNIT-P208',
      titleAr: 'بنتهاوس دوبلكس بإطلالة بحرية بانورامية',
      titleEn: 'Duplex Penthouse — Azure Bay Resort',
      locationAr: 'الساحل الشمالي — خليج رأس الحكمة',
      locationEn: 'North Coast — Ras El Hekma',
      area: '340 m²',
      bedrooms: 4,
      price: '14,200,000.00',
      downPayment: '1,420,000.00',
      quarterlyInstallment: '399,375.00',
      status: 'reserved',
      statusAr: 'تم الحجز المبدئي',
      statusEn: 'Reserved',
      delivery: 'Q2 2028',
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'UNIT-C301',
      titleAr: 'مقر إداري ومساحة تجارية راقية',
      titleEn: 'Executive Commercial Suite — Financial Plaza',
      locationAr: 'العاصمة الإدارية الجديدة — حي المال',
      locationEn: 'New Administrative Capital — CBD',
      area: '215 m²',
      bedrooms: 0,
      price: '9,850,000.00',
      downPayment: '985,000.00',
      quarterlyInstallment: '277,031.25',
      status: 'available',
      statusAr: 'متاح للبيع',
      statusEn: 'Available',
      delivery: 'Q1 2027',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  // Airy installment schedule records
  const installmentSchedules = [
    {
      id: 'INST-8821',
      unitId: 'UNIT-V104',
      clientAr: 'م. أحمد الشناوي',
      clientEn: 'Eng. Ahmed El-Shennawy',
      dueDate: '2026-09-15',
      amount: '520,312.50',
      status: 'pending',
      statusAr: 'مستحق قريباً',
      statusEn: 'Upcoming',
      statusColor: '#D97706',
    },
    {
      id: 'INST-8820',
      unitId: 'UNIT-P208',
      clientAr: 'د. ياسمين فؤاد',
      clientEn: 'Dr. Yasmine Fouad',
      dueDate: '2026-08-01',
      amount: '399,375.00',
      status: 'cleared',
      statusAr: 'تم السداد',
      statusEn: 'Cleared',
      statusColor: '#059669',
    },
    {
      id: 'INST-8819',
      unitId: 'UNIT-C301',
      clientAr: 'شركة النماء للاستشارات',
      clientEn: 'Al-Namaa Consulting Group',
      dueDate: '2026-07-15',
      amount: '277,031.25',
      status: 'cleared',
      statusAr: 'تم السداد',
      statusEn: 'Cleared',
      statusColor: '#059669',
    },
    {
      id: 'INST-8818',
      unitId: 'UNIT-V102',
      clientAr: 'السيد طارق المنصوري',
      clientEn: 'Mr. Tarek El-Mansoury',
      dueDate: '2026-06-15',
      amount: '485,000.00',
      status: 'cleared',
      statusAr: 'تم السداد',
      statusEn: 'Cleared',
      statusColor: '#059669',
    },
  ];

  return (
    <div
      id="re-domain-container"
      className="min-h-screen w-full flex flex-col font-re-ar selection:bg-[#C86A4C]/20"
      style={{
        backgroundColor: '#FDFBF7',
        color: '#4A4B50',
      }}
    >
      {/* =====================================================================
          TOP NAVBAR WITH MEGA-MENUS (Navigation Pattern Decision for Real Estate)
          ===================================================================== */}
      <header
        className="sticky top-0 z-40 bg-[#FFFFFF] px-6 py-4"
        style={{
          borderBottom: '1px solid #EAE6DF',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Left/Right Project Switcher & Brand */}
          <div className="flex items-center gap-6">
            {/* Top Navbar Switcher Dropdown Button */}
            <button
              id="re-project-switcher-btn"
              onClick={onOpenSwitcher}
              className="flex items-center gap-3 px-4 py-2 bg-[#FDFBF7] hover:bg-[#F5F2EB] text-[#1A1E23] font-bold text-xs transition-colors group"
              style={{
                borderRadius: '4px',
                border: '1px solid #EAE6DF',
              }}
              title="Switch Workspace"
            >
              <div
                className="w-6 h-6 bg-[#1A1E23] text-white flex items-center justify-center font-bold text-[10px]"
                style={{ borderRadius: '2px' }}
              >
                RE
              </div>
              <div className="text-start">
                <span className="block text-[9px] uppercase tracking-widest text-[#7E868F] font-mono-data leading-none">
                  MKANY ERP
                </span>
                <span className="block text-xs font-bold text-[#1A1E23] leading-tight">
                  {isRtl ? 'التطوير العقاري' : 'Real Estate'}
                </span>
              </div>
              <ChevronDown size={14} className="text-[#C86A4C] group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Hub Return Button */}
            <button
              id="re-back-to-hub-btn"
              onClick={onReturnToHub}
              className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#7E868F] hover:text-[#1A1E23] hover:bg-[#FDFBF7] transition-colors"
              style={{ borderRadius: '4px' }}
            >
              <LayoutGrid size={14} className="text-[#C86A4C]" />
              <span>{isRtl ? 'البوابة المركزية' : 'Master Hub'}</span>
            </button>

            {/* Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1 ps-4" style={{ borderInlineStart: '1px solid #EAE6DF' }}>
              {[
                { id: 'inventory', labelAr: 'مخزون الوحدات المعمارية', labelEn: 'Unit Inventory' },
                { id: 'installments', labelAr: 'جداول التدفقات والأقساط', labelEn: 'Installments' },
                { id: 'contracts', labelAr: 'العقود والملكية', labelEn: 'Contracts' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-bold transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#1A1E23] bg-[#FDFBF7]'
                      : 'text-[#7E868F] hover:text-[#1A1E23]'
                  }`}
                  style={{
                    borderRadius: '4px',
                    border: activeTab === tab.id ? '1px solid #EAE6DF' : '1px solid transparent',
                  }}
                >
                  {isRtl ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </nav>
          </div>

          {/* Right/Left Utilities: Financial Summary Indicator */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-end">
              <span className="text-[10px] uppercase text-[#7E868F] tracking-widest font-mono-data block">
                {isRtl ? 'إجمالي محفظة المبيعات' : 'Total Asset Portfolio'}
              </span>
              <span className="text-xs font-bold text-[#1A1E23] font-mono-data">
                42,550,000.00 EGP
              </span>
            </div>

            <button
              onClick={onOpenSwitcher}
              className="px-4 py-2 bg-[#1A1E23] hover:bg-[#2D333B] text-white text-xs font-bold transition-all"
              style={{
                borderRadius: '4px',
              }}
            >
              {isRtl ? 'تبديل النطاق' : 'Switch Domain'}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          MAIN EDITORIAL CONTENT CONTAINER (32px to 48px Spacing Gaps)
          ===================================================================== */}
      <main className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 space-y-14">
        {/* Editorial Section Header: Playfair/Tajawal Light Display */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8"
          style={{ borderBottom: '1px solid #EAE6DF' }}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#C86A4C] font-semibold mb-2 tracking-widest uppercase font-mono-data">
              <Compass size={14} strokeWidth={1.5} />
              <span>{isRtl ? 'المحفظة العقارية والمشروعات' : 'Architectural Portfolio'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1E23] tracking-tight font-re-display leading-tight">
              {isRtl ? 'المشروعات السكنية والتجارية الفاخرة' : 'Signature Developments & Unit Inventory'}
            </h2>
            <p className="text-sm text-[#7E868F] mt-2 leading-relaxed font-re-latin">
              {isRtl
                ? 'استعراض معماري للوحدات المتاحة، حسابات جداول الأقساط الربع سنوية، وحالة التخصيص'
                : 'High-end visual showcase of residential villas, penthouses, and executive suites.'}
            </p>
          </div>

          {/* Search and Filters with 4px architectural styling */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                size={16}
                strokeWidth={1.5}
                className="absolute inset-y-0 start-3 my-auto text-[#7E868F]"
              />
              <input
                type="text"
                placeholder={isRtl ? 'بحث برمز الوحدة أو المشروع...' : 'Search unit code, phase...'}
                className="ps-9 pe-4 py-2.5 bg-[#FFFFFF] text-xs text-[#1A1E23] outline-none focus:border-[#1A1E23] w-56 sm:w-64 transition-all"
                style={{
                  borderRadius: '4px',
                  border: '1px solid #EAE6DF',
                }}
              />
            </div>

            <button
              className="p-2.5 bg-[#FFFFFF] text-[#7E868F] hover:text-[#1A1E23]"
              style={{
                borderRadius: '4px',
                border: '1px solid #EAE6DF',
              }}
            >
              <Filter size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* ===================================================================
            VISUAL UNIT INVENTORY CARDS (4px Radius, 0 12px 40px Shadow)
            =================================================================== */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#7E868F] font-mono-data">
              {isRtl ? 'الوحدات المعروضة للتخصيص' : 'Curated Units Showcase'}
            </h3>
            <span className="text-xs text-[#1A1E23] font-semibold">
              {properties.length} {isRtl ? 'وحدات معروضة' : 'Properties Available'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <div
                key={prop.id}
                id={`re-card-${prop.id}`}
                className="group bg-[#FFFFFF] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderRadius: '4px',
                  border: '1px solid #EAE6DF',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)',
                }}
              >
                {/* 50% Height Architectural Photography */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-200">
                  <img
                    src={prop.imageUrl}
                    alt={prop.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Frosted glass status badge */}
                  <div className="absolute top-3 end-3">
                    <span
                      className={`px-3 py-1 rounded-sm text-xs font-bold backdrop-blur-md border ${
                        prop.status === 'available'
                          ? 'bg-emerald-950/80 text-emerald-100 border-emerald-500/40'
                          : 'bg-amber-950/80 text-amber-100 border-amber-500/40'
                      }`}
                    >
                      {isRtl ? prop.statusAr : prop.statusEn}
                    </span>
                  </div>

                  {/* Inset Unit Code */}
                  <div className="absolute bottom-3 start-3">
                    <span
                      className="px-2.5 py-1 bg-[#1A1E23]/90 backdrop-blur-md text-white text-[11px] font-mono-data font-bold tracking-wider"
                      style={{ borderRadius: '2px' }}
                    >
                      {prop.id}
                    </span>
                  </div>
                </div>

                {/* Card Content & Monospace Price */}
                <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#7E868F] mb-2">
                      <MapPin size={13} strokeWidth={1.5} className="text-[#C86A4C]" />
                      <span>{isRtl ? prop.locationAr : prop.locationEn}</span>
                    </div>

                    <h4 className="text-lg font-bold text-[#1A1E23] leading-snug">
                      {isRtl ? prop.titleAr : prop.titleEn}
                    </h4>

                    <div
                      className="flex items-center gap-4 mt-4 pt-4 text-xs text-[#7E868F]"
                      style={{ borderTop: '1px solid #EAE6DF' }}
                    >
                      <span className="flex items-center gap-1">
                        <Maximize2 size={13} strokeWidth={1.5} />
                        <span className="font-mono-data">{prop.area}</span>
                      </span>
                      {prop.bedrooms > 0 && (
                        <span className="flex items-center gap-1">
                          <BedDouble size={13} strokeWidth={1.5} />
                          <span>{prop.bedrooms} {isRtl ? 'غرف' : 'Beds'}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock size={13} strokeWidth={1.5} />
                        <span>{prop.delivery}</span>
                      </span>
                    </div>
                  </div>

                  {/* Massive Monospace Price token: re-price (24px JetBrains Mono) */}
                  <div
                    className="pt-5 flex items-end justify-between"
                    style={{ borderTop: '1px solid #EAE6DF' }}
                  >
                    <div>
                      <span className="text-[10px] uppercase text-[#7E868F] tracking-widest font-mono-data block">
                        {isRtl ? 'السعر الإجمالي' : 'Total Price'}
                      </span>
                      <span className="text-xl sm:text-2xl font-normal font-mono-data text-[#1A1E23]">
                        {prop.price}{' '}
                        <span className="text-xs font-semibold text-[#7E868F]">EGP</span>
                      </span>
                    </div>

                    <button
                      onClick={() => alert(isRtl ? `تم فتح ملف حجز الوحدة ${prop.id}` : `Opened booking file for unit ${prop.id}`)}
                      className="w-9 h-9 bg-[#1A1E23] hover:bg-[#C86A4C] text-white flex items-center justify-center transition-colors shadow-sm"
                      style={{ borderRadius: '4px' }}
                      title="View Details"
                    >
                      <ArrowUpRight size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            AIRY INSTALLMENT SCHEDULE TABLE (4px Radius, 1px #EAE6DF border)
            =================================================================== */}
        <section
          className="bg-[#FFFFFF] p-8"
          style={{
            borderRadius: '4px',
            border: '1px solid #EAE6DF',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4"
            style={{ borderBottom: '1px solid #EAE6DF' }}
          >
            <div>
              <div className="flex items-center gap-2">
                <CreditCard size={18} strokeWidth={1.5} className="text-[#C86A4C]" />
                <h3 className="text-xl font-bold text-[#1A1E23]">
                  {isRtl ? 'جدول التدفقات المالية واستحقاق الأقساط' : 'Installment Cashflow Ledger'}
                </h3>
              </div>
              <p className="text-xs text-[#7E868F] mt-1">
                {isRtl ? 'متابعة الدفعات الربع سنوية واستحقاقات العملاء' : 'Quarterly customer schedule and payment clearance'}
              </p>
            </div>

            <span
              className="self-start sm:self-auto text-xs font-mono-data text-[#7E868F] px-3 py-1 bg-[#FDFBF7]"
              style={{ borderRadius: '2px', border: '1px solid #EAE6DF' }}
            >
              SYSTEM_DATE: 2026-08-18
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr
                  className="text-[#7E868F] uppercase tracking-widest font-mono-data text-[11px]"
                  style={{ borderBottom: '1px solid #EAE6DF' }}
                >
                  <th className="py-4 px-4 text-start font-semibold">
                    {isRtl ? 'رمز القسط' : 'Schedule ID'}
                  </th>
                  <th className="py-4 px-4 text-start font-semibold">
                    {isRtl ? 'الوحدة المعمارية' : 'Property Unit'}
                  </th>
                  <th className="py-4 px-4 text-start font-semibold">
                    {isRtl ? 'اسم المشتري / العميل' : 'Client Name'}
                  </th>
                  <th className="py-4 px-4 text-start font-semibold">
                    {isRtl ? 'تاريخ الاستحقاق' : 'Due Date'}
                  </th>
                  <th className="py-4 px-4 text-end font-semibold">
                    {isRtl ? 'مبلغ القسط (ج.م)' : 'Amount (EGP)'}
                  </th>
                  <th className="py-4 px-4 text-center font-semibold">
                    {isRtl ? 'حالة السداد' : 'Status'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE6DF]">
                {installmentSchedules.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FDFBF7] transition-colors">
                    <td className="py-4 px-4 font-mono-data font-bold text-[#1A1E23]">
                      {item.id}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className="px-2 py-0.5 bg-[#FDFBF7] font-mono-data text-xs text-[#1A1E23]"
                        style={{ borderRadius: '2px', border: '1px solid #EAE6DF' }}
                      >
                        {item.unitId}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#1A1E23]">
                      {isRtl ? item.clientAr : item.clientEn}
                    </td>
                    <td className="py-4 px-4 font-mono-data text-[#7E868F]">
                      {item.dueDate}
                    </td>
                    {/* Financial figure strictly right-aligned JetBrains Mono */}
                    <td className="py-4 px-4 text-end font-mono-data font-bold text-sm text-[#1A1E23]">
                      {item.amount}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold"
                        style={{
                          backgroundColor: item.status === 'cleared' ? '#2D7A5D15' : '#C86A4C15',
                          color: item.status === 'cleared' ? '#2D7A5D' : '#C86A4C',
                          borderRadius: '2px',
                        }}
                      >
                        {item.status === 'cleared' ? (
                          <CheckCircle2 size={12} strokeWidth={1.5} />
                        ) : (
                          <Clock size={12} strokeWidth={1.5} />
                        )}
                        <span>{isRtl ? item.statusAr : item.statusEn}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};
