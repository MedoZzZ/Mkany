import React, { useState } from 'react';
import { Direction, UserProfile } from '../../types';
import {
  Search,
  AlertOctagon,
  FileText,
  Gavel,
  Clock,
  LayoutGrid,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Building,
  Shield,
  FolderOpen,
  DollarSign,
  UserCheck,
  ExternalLink,
  Plus,
} from 'lucide-react';

interface LegalScreenProps {
  user: UserProfile;
  direction: Direction;
  onOpenSwitcher: () => void;
  onReturnToHub: () => void;
}

export const LegalScreen: React.FC<LegalScreenProps> = ({
  user,
  direction,
  onOpenSwitcher,
  onReturnToHub,
}) => {
  const isRtl = direction === 'rtl';
  const [selectedCaseId, setSelectedCaseId] = useState('CASE-2026-1049');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('cases');

  // Litigations & Docket Cases
  const cases = [
    {
      id: 'CASE-2026-1049',
      caseNumber: '1049/2026 ق.ع',
      courtAr: 'محكمة استئناف القاهرة — الدائرة التجارية الرابعة',
      courtEn: 'Cairo Court of Appeal — 4th Commercial Circuit',
      titleAr: 'دعوى بطلان شرط تحكيمي وإثبات أحقية التعاقد',
      titleEn: 'Arbitration Clause Invalidation & Contract Entitlement',
      clientAr: 'شركة الدلتا للاستثمار والإنشاءات',
      clientEn: 'Delta Investment & Construction SAE',
      nextHearingDate: '2026-08-19 09:30',
      hoursRemaining: 18, // < 24h critical deadline!
      status: 'hearing_critical',
      statusAr: 'جلسة حتمية حرجة',
      statusEn: 'Peremptory Hearing',
      retainerBalance: '185,000.00',
      trustFees: '45,000.00',
      opposingCounselAr: 'مكتب المستشار رءوف عبد الباقي',
      opposingCounselEn: 'Raouf Abdel-Baqi Law Firm',
      judgeAr: 'المستشار د. محمود عزت الروبي',
      judgeEn: 'Judge Dr. Mahmoud Ezzat',
      memoExcerptAr:
        'بناءً على صحيفة الاستئناف المودعة بقلم كتاب المحكمة، يطلب المستأنف أصلياً إلغاء الحكم المستأنف والقضاء مجدداً بصحة ونفاذ ملحق العقد التنفيذي المؤرخ في ٢٠٢٤/١١/١٥ مع إلزام المستأنف ضده بالمصروفات ومقابل أتعاب المحاماة الفعلية عملاً بأحكام قانون المرافعات المدنية والتجارية.',
      memoExcerptEn:
        'Based on the appellate brief filed with the court clerk, the appellant primarily petitions to vacate the appealed ruling and enter judgment validating the executive contract addendum dated 15/11/2024, assessing court costs and legal fees against the appellee pursuant to the Code of Civil Procedure.',
    },
    {
      id: 'CASE-2026-0982',
      caseNumber: '982/2026 مدني كلي',
      courtAr: 'محكمة جنوب الجيزة الابتدائية — دائرة التعويضات',
      courtEn: 'South Giza Court of First Instance — Tort Division',
      titleAr: 'مطالبة بتعويض مالي عن الإخلال بالتسليم الإنشائي',
      titleEn: 'Tort Claim for Construction Delivery Default',
      clientAr: 'مجموعة المها للتطوير العقاري',
      clientEn: 'Al-Maha Real Estate Group',
      nextHearingDate: '2026-09-04 10:00',
      hoursRemaining: 410,
      status: 'pending_expert',
      statusAr: 'مؤجلة لورود تقرير الخبراء',
      statusEn: 'Expert Report Pending',
      retainerBalance: '92,500.00',
      trustFees: '22,000.00',
      opposingCounselAr: 'المحامي إبراهيم الدسوقي',
      opposingCounselEn: 'Ibrahim El-Desouky, Esq.',
      judgeAr: 'المستشار سمير الجزار',
      judgeEn: 'Judge Samir El-Gazzar',
      memoExcerptAr:
        'قررت المحكمة تمكين مكتب خبراء وزارة العدل من فحص المعاينة الهندسية على الطبيعة لتحديد قيمة الأعمال المنفذة ومطابقتها للمواصفات الفنية المعتمدة قبل الفصل في شق التعويض الجابر للضرر.',
      memoExcerptEn:
        'The court ordered the Ministry of Justice Expert Bureau to conduct an engineering site inspection to assess completed works against technical specifications prior to ruling on compensatory damages.',
    },
    {
      id: 'CASE-2026-0814',
      caseNumber: '814/2026 تجاري',
      courtAr: 'المحكمة الاقتصادية — الدائرة الاستئنافية الأولى',
      courtEn: 'Economic Court — First Appellate Circuit',
      titleAr: 'نزاع حماية الملكية الفكرية والعلامة التجارية',
      titleEn: 'Trademark Infringement & Intellectual Property Dispute',
      clientAr: 'مؤسسة النور العالمية للتجارة',
      clientEn: 'Al-Nour Global Trading Est.',
      nextHearingDate: '2026-09-12 11:00',
      hoursRemaining: 600,
      status: 'briefs_exchange',
      statusAr: 'تبادل مذكرات ومستندات',
      statusEn: 'Briefs Exchange',
      retainerBalance: '140,000.00',
      trustFees: '30,000.00',
      opposingCounselAr: 'مكتب الشورى للاستشارات القانونية',
      opposingCounselEn: 'Al-Shura Legal Consultants',
      judgeAr: 'المستشار أحمد فراج',
      judgeEn: 'Judge Ahmed Farag',
      memoExcerptAr:
        'مذكرة رد على الدفع بعدم قبول الدعوى لرفعها من غير ذي صفة، مع إرفاق السجل التجاري وشهادة تسجيل العلامة الصادرة من مصلحة التسجيل التجاري.',
      memoExcerptEn:
        'Rebuttal memorandum regarding standing to sue, accompanied by commercial register extract and certified trademark registry certificates.',
    },
  ];

  const currentCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  return (
    <div
      id="legal-domain-container"
      className="min-h-screen w-full flex font-legal-ar selection:bg-[var(--legal-accent)]/20"
      style={{
        backgroundColor: 'var(--legal-bg)',
        color: 'var(--legal-text)',
      }}
    >
      {/* =====================================================================
          SLIM SIDEBAR (Legal Navigation Decision: Slim Sidebar + Bottom Switcher)
          ===================================================================== */}
      <aside
        id="legal-sidebar"
        className="w-16 sm:w-20 flex flex-col justify-between items-center py-4 z-30"
        style={{
          backgroundColor: 'var(--legal-surface)',
          borderInlineEnd: '1px solid var(--legal-border)',
          boxShadow: 'none',
        }}
      >
        {/* Top Logo */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 flex items-center justify-center font-bold text-xs"
            style={{
              backgroundColor: 'var(--legal-primary)',
              color: 'var(--legal-surface)',
              border: '1px solid var(--legal-primary)',
            }}
          >
            LEX
          </div>

          {/* Nav Icons: Solid filled icons, 20px */}
          <nav className="flex flex-col items-center gap-2 pt-4">
            {[
              { id: 'cases', icon: FolderOpen, titleAr: 'ملفات القضايا', titleEn: 'Cases' },
              { id: 'dockets', icon: Gavel, titleAr: 'الجلسات والمحاكم', titleEn: 'Hearings' },
              { id: 'ledger', icon: DollarSign, titleAr: 'حسابات الأتعاب', titleEn: 'Ledger' },
              { id: 'clients', icon: UserCheck, titleAr: 'سجل الموكلين', titleEn: 'Clients' },
            ].map((item) => {
              const IconComp = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  id={`legal-nav-${item.id}`}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-11 h-11 flex items-center justify-center transition-colors`}
                  style={{
                    backgroundColor: isActive ? 'var(--legal-primary)' : 'var(--legal-surface)',
                    color: isActive ? 'var(--legal-surface)' : 'var(--legal-text)',
                    border: isActive ? '1px solid var(--legal-primary)' : '1px solid var(--legal-border)',
                  }}
                  title={isRtl ? item.titleAr : item.titleEn}
                >
                  <IconComp size={18} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom of Sidebar: Stark MKANY Switcher Icon per Legal Token Spec */}
        <div className="flex flex-col items-center gap-3">
          <button
            id="legal-back-to-hub-btn"
            onClick={onReturnToHub}
            className="w-11 h-11 flex items-center justify-center transition-colors hover:bg-slate-50"
            style={{
              backgroundColor: 'var(--legal-surface)',
              color: 'var(--legal-text)',
              border: '1px solid var(--legal-border)',
            }}
            title={isRtl ? 'العودة إلى البوابة (Hub)' : 'Return to Hub'}
          >
            <LayoutGrid size={18} />
          </button>

          {/* Stark MKANY Logo button at bottom of slim sidebar */}
          <button
            id="legal-project-switcher-btn"
            onClick={onOpenSwitcher}
            className="w-11 h-11 flex items-center justify-center font-bold text-xs transition-colors hover:opacity-90"
            style={{
              backgroundColor: 'var(--legal-accent)',
              color: 'var(--legal-surface)',
              border: '1px solid var(--legal-accent)',
            }}
            title="MKANY Domain Switcher"
          >
            MK
          </button>
        </div>
      </aside>

      {/* =====================================================================
          MAIN LEGAL WORKSPACE: DUAL TOP BAR + THREE-PANE CASE WORKSPACE
          ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden" style={{ backgroundColor: 'var(--legal-bg)' }}>
        {/* ACTION TOP BAR: Global Search + Deadline Notification Center */}
        <header
          className="px-5 py-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 z-20"
          style={{ backgroundColor: 'var(--legal-surface)', borderBottom: '1px solid var(--legal-border)' }}
        >
          {/* Global Case Search Box */}
          <div className="flex-1 max-w-xl flex items-center gap-2.5">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute inset-y-0 start-3 my-auto text-[#6B7280]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isRtl
                    ? 'بحث فوري برقم القضية، المحكمة، أو اسم الموكل (مثال: 1049/2026)...'
                    : 'Instant search by case docket number, court, or client name...'
                }
                className="w-full text-xs ps-9 pe-3 py-2 outline-none font-mono-data placeholder-[#6B7280] transition-colors focus:ring-1 focus:ring-[var(--legal-primary)]"
                style={{
                  backgroundColor: 'var(--legal-surface)',
                  color: 'var(--legal-text)',
                  border: '1px solid var(--legal-border)',
                }}
              />
            </div>

            <button
              onClick={() => alert(isRtl ? 'تم فتح نموذج تسجيل صحيفة دعوى جديدة' : 'Opened new litigation dossier form')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap hover:opacity-90"
              style={{ backgroundColor: 'var(--legal-primary)', color: 'var(--legal-surface)' }}
            >
              <Plus size={14} />
              <span>{isRtl ? 'قيد دعوى جديدة' : 'New Docket'}</span>
            </button>
          </div>

          {/* Deadline Notification Center (Flashing Sealing Wax Red if < 24h) */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold"
              style={{
                backgroundColor: 'rgba(139, 30, 30, 0.1)',
                color: 'var(--legal-accent)',
                border: '1px solid var(--legal-accent)',
              }}
            >
              <AlertOctagon size={16} className="animate-pulse" />
              <span>
                {isRtl
                  ? 'تنبيه موعد حتمي: مرافعة خلال ١٨ ساعة'
                  : 'CRITICAL DEADLINE: Hearing in 18 hrs'}
              </span>
            </div>

            <button
              onClick={onOpenSwitcher}
              className="hidden sm:inline-block px-3.5 py-1.5 text-xs font-bold transition-colors hover:bg-slate-50"
              style={{
                backgroundColor: 'var(--legal-surface)',
                color: 'var(--legal-primary)',
                border: '1px solid var(--legal-border)',
              }}
            >
              {isRtl ? 'تبديل النطاق' : 'Switch Workspace'}
            </button>
          </div>
        </header>

        {/* ===================================================================
            MULTI-PANE CASE WORKSPACE (Multi-Pane: Docket List -> Dossier Brief)
            =================================================================== */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Pane 1: Rigid Docket Cases Table (Visible Grid Lines, High Density) */}
          <div
            className="w-full lg:w-5/12 flex flex-col overflow-hidden"
            style={{ backgroundColor: 'var(--legal-surface)', borderInlineEnd: '1px solid var(--legal-border)' }}
          >
            <div
              className="p-3.5 flex items-center justify-between"
              style={{ backgroundColor: 'var(--legal-bg)', borderBottom: '1px solid var(--legal-border)' }}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--legal-text)' }}>
                {isRtl ? 'جدول القضايا المنظورة والجلسات' : 'Active Litigation Dockets'}
              </h3>
              <span className="text-[11px] font-mono-data font-bold text-[#6B7280]">
                COUNT: {cases.length}
              </span>
            </div>

            {/* Rigid Table with hairline borders */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr
                    className="text-[11px] font-bold"
                    style={{ backgroundColor: 'var(--legal-surface)', color: '#4B5563', borderBottom: '1px solid var(--legal-border)' }}
                  >
                    <th className="py-2.5 px-3 text-start" style={{ borderInlineEnd: '1px solid var(--legal-border)' }}>
                      {isRtl ? 'رقم القضية والمحكمة' : 'Case & Court'}
                    </th>
                    <th className="py-2.5 px-3 text-start" style={{ borderInlineEnd: '1px solid var(--legal-border)' }}>
                      {isRtl ? 'الموكل' : 'Client'}
                    </th>
                    <th className="py-2.5 px-3 text-center" style={{ borderInlineEnd: '1px solid var(--legal-border)' }}>
                      {isRtl ? 'الجلسة القادمة' : 'Next Date'}
                    </th>
                    <th className="py-2.5 px-3 text-center">
                      {isRtl ? 'الحالة' : 'Status'}
                    </th>
                  </tr>
                </thead>
                <tbody style={{ divideColor: 'var(--legal-border)', borderBottomColor: 'var(--legal-border)' }}>
                  {cases.map((item) => {
                    const isSelected = item.id === selectedCaseId;
                    const isCritical = item.hoursRemaining < 24;

                    return (
                      <tr
                        key={item.id}
                        id={`legal-case-row-${item.id}`}
                        onClick={() => setSelectedCaseId(item.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-slate-100'
                            : 'hover:bg-slate-50'
                        }`}
                        style={{ borderBottom: '1px solid var(--legal-border)' }}
                      >
                        <td className="py-3 px-3" style={{ borderInlineEnd: '1px solid var(--legal-border)' }}>
                          <div className="font-bold font-mono-data" style={{ color: 'var(--legal-text)' }}>
                            {item.caseNumber}
                          </div>
                          <div className="text-[11px] truncate max-w-[180px]" style={{ color: '#4B5563' }}>
                            {isRtl ? item.courtAr : item.courtEn}
                          </div>
                        </td>

                        <td className="py-3 px-3 font-semibold" style={{ color: 'var(--legal-text)', borderInlineEnd: '1px solid var(--legal-border)' }}>
                          {isRtl ? item.clientAr : item.clientEn}
                        </td>

                        <td className="py-3 px-3 text-center font-mono-data" style={{ borderInlineEnd: '1px solid var(--legal-border)' }}>
                          <span
                            className={
                              isCritical
                                ? 'font-bold'
                                : ''
                            }
                            style={{ color: isCritical ? 'var(--legal-accent)' : 'var(--legal-text)' }}
                          >
                            {item.nextHearingDate.split(' ')[0]}
                          </span>
                          <div className="text-[10px]" style={{ color: '#6B7280' }}>
                            {item.nextHearingDate.split(' ')[1]}
                          </div>
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span
                            className="inline-block px-2 py-0.5 text-[10px] font-bold"
                            style={{
                              backgroundColor: isCritical ? 'rgba(139, 30, 30, 0.1)' : 'rgba(11, 27, 43, 0.05)',
                              color: isCritical ? 'var(--legal-accent)' : 'var(--legal-primary)',
                              border: isCritical ? '1px solid var(--legal-accent)' : '1px solid var(--legal-primary)',
                            }}
                          >
                            {isRtl ? item.statusAr : item.statusEn}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pane 2: Case Dossier & Court Brief */}
          <div className="w-full lg:w-7/12 flex flex-col overflow-y-auto p-6 space-y-6" style={{ backgroundColor: 'var(--legal-bg)' }}>
            {/* Case Title Bar */}
            <div className="pb-4" style={{ borderBottom: '1px solid var(--legal-border)' }}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 text-xs font-mono-data font-bold"
                  style={{ backgroundColor: 'var(--legal-primary)', color: 'var(--legal-surface)', border: '1px solid var(--legal-primary)' }}
                >
                  {currentCase.caseNumber}
                </span>
                <span className="text-xs font-mono-data" style={{ color: '#6B7280' }}>
                  REF_ID: {currentCase.id}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold leading-snug" style={{ color: 'var(--legal-text)' }}>
                {isRtl ? currentCase.titleAr : currentCase.titleEn}
              </h2>
              <p className="text-xs font-semibold mt-1" style={{ color: '#4B5563' }}>
                {isRtl ? currentCase.courtAr : currentCase.courtEn}
              </p>
            </div>

            {/* Critical Deadline Alert Banner (if applicable) */}
            {currentCase.hoursRemaining < 24 && (
              <div
                className="p-4 flex items-center justify-between"
                style={{
                  backgroundColor: 'rgba(139, 30, 30, 0.1)',
                  color: 'var(--legal-accent)',
                  border: '1px solid var(--legal-accent)',
                }}
              >
                <div className="flex items-center gap-3">
                  <AlertOctagon size={20} />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      {isRtl ? 'تنبيه موعد جلسة حتمي مهدور الأثر' : 'Peremptory Court Hearing Notice'}
                    </h4>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--legal-text)' }}>
                      {isRtl
                        ? 'متبقي أقل من ٢٤ ساعة على انعقاد الجلسة. يجب إيداع أصل حافظة المستندات وسداد رسوم الإعلان.'
                        : 'Under 24 hours remaining. File original evidence dossier and service receipts.'}
                    </p>
                  </div>
                </div>
                <span
                  className="font-mono-data font-bold text-sm px-3 py-1"
                  style={{ backgroundColor: 'var(--legal-accent)', color: 'var(--legal-surface)' }}
                >
                  18h 00m
                </span>
              </div>
            )}

            {/* Case Parameters Grid: 0px Radius per tokens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="p-4"
                style={{ backgroundColor: 'var(--legal-surface)', border: '1px solid var(--legal-border)' }}
              >
                <span className="text-[11px] font-semibold block mb-1" style={{ color: '#6B7280' }}>
                  {isRtl ? 'الموكل وصفته في الدعوى' : 'Client & Party Capacity'}
                </span>
                <div className="text-xs font-bold" style={{ color: 'var(--legal-text)' }}>
                  {isRtl ? currentCase.clientAr : currentCase.clientEn}
                </div>
                <span className="text-[10px] font-bold block mt-1 font-mono-data" style={{ color: 'var(--legal-primary)' }}>
                  {isRtl ? '(المستأنف / المدعي)' : '(Appellant / Plaintiff)'}
                </span>
              </div>

              <div
                className="p-4"
                style={{ backgroundColor: 'var(--legal-surface)', border: '1px solid var(--legal-border)' }}
              >
                <span className="text-[11px] font-semibold block mb-1" style={{ color: '#6B7280' }}>
                  {isRtl ? 'الخصم ومحامي الخصم' : 'Opposing Party & Counsel'}
                </span>
                <div className="text-xs font-bold" style={{ color: 'var(--legal-text)' }}>
                  {isRtl ? currentCase.opposingCounselAr : currentCase.opposingCounselEn}
                </div>
                <span className="text-[10px] font-mono-data block mt-1" style={{ color: '#6B7280' }}>
                  {isRtl ? 'هيئة الدفاع المقابلة' : 'Defense Counsel'}
                </span>
              </div>

              <div
                className="p-4"
                style={{ backgroundColor: 'var(--legal-surface)', border: '1px solid var(--legal-border)' }}
              >
                <span className="text-[11px] font-semibold block mb-1" style={{ color: '#6B7280' }}>
                  {isRtl ? 'الدائرة القضائية ورئيس المحكمة' : 'Judicial Circuit & Judge'}
                </span>
                <div className="text-xs font-bold" style={{ color: 'var(--legal-text)' }}>
                  {isRtl ? currentCase.judgeAr : currentCase.judgeEn}
                </div>
              </div>

              {/* Financial Monospace Rule: JetBrains Mono and Right-Aligned */}
              <div
                className="p-4 flex flex-col justify-between"
                style={{ backgroundColor: 'var(--legal-surface)', border: '1px solid var(--legal-border)' }}
              >
                <span className="text-[11px] font-semibold block mb-1" style={{ color: '#6B7280' }}>
                  {isRtl ? 'رصيد أمانة الأتعاب المحصلة' : 'Client Trust Retainer Balance'}
                </span>
                <div className="text-end font-mono-data font-bold text-sm" style={{ color: 'var(--legal-primary)' }}>
                  {currentCase.retainerBalance}{' '}
                  <span className="text-[10px]" style={{ color: '#6B7280' }}>EGP</span>
                </div>
              </div>
            </div>

            {/* Legal Document Memo (Noto Naskh Arabic, 16px, line-height 1.8) */}
            <div
              className="p-6 space-y-4"
              style={{ backgroundColor: 'var(--legal-surface)', border: '1px solid var(--legal-border)' }}
            >
              <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid var(--legal-border)' }}>
                <div className="flex items-center gap-2">
                  <FileText size={16} style={{ color: 'var(--legal-primary)' }} />
                  <h4 className="text-xs font-bold" style={{ color: 'var(--legal-text)' }}>
                    {isRtl ? 'مستخلص المذكرة الشارحة للدفاع' : 'Litigation Brief Extract'}
                  </h4>
                </div>
                <span className="text-[10px] font-mono-data" style={{ color: '#6B7280' }}>
                  DOC_PAGES: 12
                </span>
              </div>

              <div className="text-base leading-[1.8] font-legal-doc text-justify" style={{ color: 'var(--legal-text)' }}>
                {isRtl ? currentCase.memoExcerptAr : currentCase.memoExcerptEn}
              </div>

              <div
                className="pt-4 flex items-center justify-between text-xs"
                style={{ borderTop: '1px solid var(--legal-border)', color: 'var(--legal-primary)' }}
              >
                <a
                  href="#dossier"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1.5 font-bold hover:underline"
                >
                  <span>{isRtl ? 'تحميل النص الكامل للمذكرة والمستندات (PDF)' : 'Download Full Legal Brief (PDF)'}</span>
                  <ExternalLink size={13} />
                </a>
                <span className="font-mono-data text-[11px]" style={{ color: '#6B7280' }}>
                  VERIFIED HASH: SHA-256
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
