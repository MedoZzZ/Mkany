import React, { useState } from 'react';
import { DOMAINS, AppView, Direction, UserProfile } from '../types';
import {
  Bell,
  ChevronDown,
  Sprout,
  Building2,
  Scale,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  LogOut,
  Globe,
  CheckCircle2,
} from 'lucide-react';

interface HubScreenProps {
  user: UserProfile;
  direction: Direction;
  onSelectDomain: (domain: AppView) => void;
  onLogout: () => void;
  onToggleDirection: () => void;
}

export const HubScreen: React.FC<HubScreenProps> = ({
  user,
  direction,
  onSelectDomain,
  onLogout,
  onToggleDirection,
}) => {
  const isRtl = direction === 'rtl';
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Cross-domain system notifications (Hub aggregating across domains)
  const systemAlerts = [
    {
      id: 'alert-ag',
      domain: isRtl ? 'الزراعة الذكية' : 'Smart Agriculture',
      msg: isRtl ? 'حساس رطوبة التربة (قطاع C) يحتاج معايرة' : 'Soil sensor (Sector C) requires calibration',
      time: '12m',
      type: 'warning',
      color: '#3A7D44',
    },
    {
      id: 'alert-legal',
      domain: isRtl ? 'الخدمات القانونية' : 'Legal Services',
      msg: isRtl ? 'جلسة مرافعة استئنافية غداً الساعة ٠٩:٠٠ ص' : 'Appellate court hearing tomorrow at 09:00 AM',
      time: '45m',
      type: 'critical',
      color: '#8B1E1E',
    },
    {
      id: 'alert-re',
      domain: isRtl ? 'التطوير العقاري' : 'Real Estate',
      msg: isRtl ? 'تم إيداع دفعة حجز للوحدة الفندقية V-402' : 'Reservation installment received for unit V-402',
      time: '2h',
      type: 'info',
      color: '#C86A4C',
    },
  ];

  return (
    <div
      id="mkany-hub-screen"
      className="min-h-screen w-full flex flex-col justify-between selection:bg-[#E6AC00]/30"
      style={{
        backgroundColor: 'var(--hub-bg)',
        color: 'var(--hub-text-primary)',
      }}
    >
      {/* =====================================================================
          MINIMAL TOP BAR (Hub Navigation Decision: Minimal transparent bar)
          ===================================================================== */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between z-30">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-sm tracking-wider shadow-sm" style={{ backgroundColor: 'var(--hub-text-primary)', color: 'var(--hub-accent)' }}>
            MK
          </div>
          <div>
            <span className="text-[10px] tracking-widest uppercase font-mono-data font-semibold" style={{ color: 'var(--hub-text-muted)' }}>
              Unified Enterprise Hub
            </span>
            <h1 className="text-xl font-bold tracking-tight font-hub-lat" style={{ color: 'var(--hub-text-primary)' }}>
              MKANY ERP
            </h1>
          </div>
        </div>

        {/* Action Controls: Language toggle, Notifications, User Profile */}
        <div className="flex items-center gap-4 relative">
          {/* RTL / LTR Direction Toggle */}
          <button
            id="hub-direction-toggle-btn"
            onClick={onToggleDirection}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm font-mono-data"
            style={{ backgroundColor: 'var(--hub-surface)', color: 'var(--hub-text-primary)' }}
            title="Toggle RTL / LTR"
          >
            <Globe size={14} style={{ color: 'var(--hub-text-muted)' }} />
            <span>{isRtl ? 'English (LTR)' : 'العربية (RTL)'}</span>
          </button>

          {/* Unified Cross-Domain Notification Bell */}
          <div className="relative">
            <button
              id="hub-notification-bell-btn"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="w-11 h-11 rounded-full hover:bg-slate-50 flex items-center justify-center transition-colors shadow-sm relative"
              style={{ backgroundColor: 'var(--hub-surface)', color: 'var(--hub-text-primary)' }}
              aria-label="Cross-domain notifications"
            >
              <Bell size={18} />
              {/* Notification Indicator Dot with Gold Accent */}
              <span
                className="absolute top-2.5 end-2.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                style={{ backgroundColor: 'var(--hub-accent)' }}
              />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div
                id="hub-notifications-dropdown"
                className="absolute end-0 mt-3 w-80 sm:w-96 rounded-3xl p-5 shadow-2xl z-50 text-start"
                style={{ backgroundColor: 'var(--hub-surface)', boxShadow: 'var(--shadow-hub-card)' }}
              >
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--hub-bg)' }}>
                  <div className="flex items-center gap-2">
                    <Sparkles size={15} style={{ color: 'var(--hub-accent)' }} />
                    <span className={`text-xs font-bold ${isRtl ? 'font-hub-ar' : 'font-hub-lat'}`} style={{ color: 'var(--hub-text-primary)' }}>
                      {isRtl ? 'التنبيهات المركزية المجمعة' : 'Unified Central Alerts'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-data px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--hub-bg)', color: 'var(--hub-text-muted)' }}>
                    3 unread
                  </span>
                </div>

                <div className="mt-2 max-h-72 overflow-y-auto">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="py-3 px-2 hover:bg-slate-50 rounded-xl transition-colors border-b last:border-0" style={{ borderColor: 'var(--hub-bg)' }}>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold" style={{ color: alert.color }}>
                          {alert.domain}
                        </span>
                        <span className="font-mono-data text-[10px]" style={{ color: 'var(--hub-text-muted)' }}>{alert.time}</span>
                      </div>
                      <p className={`text-xs ${isRtl ? 'font-hub-ar' : 'font-hub-lat'}`} style={{ color: 'var(--hub-text-primary)' }}>
                        {alert.msg}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill with Active MKANY Gold Accent */}
          <div className="relative">
            <button
              id="hub-user-profile-btn"
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 ps-2 pe-4 py-2 rounded-full hover:bg-slate-50 transition-all shadow-sm group"
              style={{ backgroundColor: 'var(--hub-surface)' }}
            >
              {/* User Avatar with Gold Active Indicator */}
              <div className="relative">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono-data" style={{ backgroundColor: 'var(--hub-text-primary)', color: 'var(--hub-surface)' }}>
                  {user.initials}
                </div>
                <span
                  className="absolute bottom-0 end-0 w-2.5 h-2.5 rounded-full border-2 border-white"
                  style={{ backgroundColor: 'var(--hub-accent)' }}
                  title="Active Profile"
                />
              </div>

              <div className="text-start hidden sm:block">
                <div className={`text-xs font-bold leading-none ${isRtl ? 'font-hub-ar' : 'font-hub-lat'}`} style={{ color: 'var(--hub-text-primary)' }}>
                  {isRtl ? user.name : user.nameEn}
                </div>
                <div className="text-[10px] font-mono-data leading-tight mt-0.5" style={{ color: 'var(--hub-text-muted)' }}>
                  {isRtl ? user.role : user.roleEn}
                </div>
              </div>

              <ChevronDown size={14} className="group-hover:text-black transition-colors" style={{ color: 'var(--hub-text-muted)' }} />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div
                id="hub-profile-dropdown"
                className="absolute end-0 mt-3 w-60 rounded-3xl p-3 shadow-2xl z-50 text-start"
                style={{ backgroundColor: 'var(--hub-surface)', boxShadow: 'var(--shadow-hub-card)' }}
              >
                <div className="p-3 border-b mb-1" style={{ borderColor: 'var(--hub-bg)' }}>
                  <p className="text-xs font-bold" style={{ color: 'var(--hub-text-primary)' }}>{isRtl ? user.name : user.nameEn}</p>
                  <p className="text-[11px] font-mono-data truncate" style={{ color: 'var(--hub-text-muted)' }}>{user.email}</p>
                </div>

                <button
                  id="hub-logout-btn"
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#8B1E1E] hover:bg-rose-50 rounded-2xl transition-colors"
                >
                  <LogOut size={15} />
                  <span>{isRtl ? 'تسجيل الخروج' : 'Sign Out'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =====================================================================
          CENTERED HERO & 3 MASSIVE BORDERLESS FLOATING DOMAIN CARDS
          ===================================================================== */}
      <main className="w-full max-w-7xl mx-auto px-6 pt-6 pb-16 flex-1 flex flex-col justify-center">
        {/* Editorial Welcome Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold mb-5 shadow-sm" style={{ backgroundColor: 'var(--hub-surface)', color: 'var(--hub-text-muted)' }}>
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--hub-accent)' }}
            />
            <span className={isRtl ? 'font-hub-ar' : 'font-hub-lat'}>
              {isRtl ? 'منصة مَكاني الموحدة لإدارة الموارد' : 'MKANY Central Command Center'}
            </span>
          </div>

          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 ${
              isRtl ? 'font-hub-ar' : 'font-hub-lat'
            }`}
            style={{
              color: 'var(--hub-text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: isRtl ? 1.3 : 1.15,
            }}
          >
            {isRtl ? `مرحباً بك، ${user.name}` : `Welcome back, ${user.nameEn}`}
          </h2>

          <p
            className={`text-lg sm:text-xl ${
              isRtl ? 'font-hub-ar' : 'font-hub-lat'
            }`}
            style={{ color: 'var(--hub-text-muted)', lineHeight: isRtl ? 1.7 : 1.5 }}
          >
            {isRtl
              ? 'اختر مساحة العمل للمتابعة والوصول إلى لوحة التحكم المخصصة'
              : 'Select your workspace to launch into its specialized environment'}
          </p>
        </div>

        {/* 3 Massive Borderless Floating Cards (Token: 24px radius, 48px padding, 0 24px 48px shadow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 items-stretch">
          {DOMAINS.map((domain) => {
            const IconComponent =
              domain.id === 'agriculture' ? Sprout : domain.id === 'realestate' ? Building2 : Scale;

            return (
              <div
                key={domain.id}
                id={`hub-card-${domain.id}`}
                onClick={() => onSelectDomain(domain.id)}
                className="group relative flex flex-col justify-between transition-all duration-300 ease-out cursor-pointer text-start hover:-translate-y-1.5"
                style={{
                  backgroundColor: 'var(--hub-surface)',
                  borderRadius: 'var(--radius-hub-card)',
                  boxShadow: 'var(--shadow-hub-card)',
                  border: 'none',
                  padding: '48px',
                }}
              >
                {/* Card Top: Icon & Domain Status Tag */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    {/* Domain Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                      style={{
                        backgroundColor: `${domain.primaryColor}15`,
                        color: domain.primaryColor,
                      }}
                    >
                      <IconComponent size={32} strokeWidth={2} />
                    </div>

                    {/* Domain Badge */}
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono-data" style={{ backgroundColor: 'var(--hub-bg)', color: 'var(--hub-text-muted)' }}>
                      {isRtl ? domain.badgeAr : domain.badgeEn}
                    </span>
                  </div>

                  {/* Domain Title */}
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      isRtl ? 'font-hub-ar' : 'font-hub-lat'
                    }`}
                    style={{ color: 'var(--hub-text-primary)' }}
                  >
                    {isRtl ? domain.titleAr : domain.titleEn}
                  </h3>

                  {/* Tagline */}
                  <p
                    className={`text-xs font-semibold mb-4 ${
                      isRtl ? 'font-hub-ar' : 'font-hub-lat'
                    }`}
                    style={{ color: 'var(--hub-text-muted)' }}
                  >
                    {isRtl ? domain.taglineAr : domain.taglineEn}
                  </p>

                  {/* Detailed Description */}
                  <p
                    className={`text-sm leading-relaxed ${
                      isRtl ? 'font-hub-ar' : 'font-hub-lat'
                    }`}
                    style={{ color: 'var(--hub-text-muted)', lineHeight: isRtl ? 1.7 : 1.6 }}
                  >
                    {isRtl ? domain.descAr : domain.descEn}
                  </p>
                </div>

                {/* Card Footer: Launch Workspace CTA Button */}
                <div className="pt-8 mt-6 border-t flex items-center justify-between" style={{ borderColor: 'var(--hub-bg)' }}>
                  <span
                    className={`text-xs font-bold transition-colors ${
                      isRtl ? 'font-hub-ar' : 'font-hub-lat'
                    }`}
                    style={{ color: domain.primaryColor }}
                  >
                    {isRtl ? 'فتح مساحة العمل' : 'Launch Workspace'}
                  </span>

                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:shadow-md"
                    style={{
                      backgroundColor: `${domain.primaryColor}15`,
                      color: domain.primaryColor,
                    }}
                  >
                    {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* =====================================================================
          FOOTER (Token Rationale: Expansive stone base)
          ===================================================================== */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ borderColor: 'rgba(11, 27, 43, 0.1)', color: 'var(--hub-text-muted)' }}>
        <div className="flex items-center gap-4">
          <span className="font-mono-data font-semibold" style={{ color: 'var(--hub-text-primary)' }}>MKANY ERP v2.4</span>
          <span>•</span>
          <span className={isRtl ? 'font-hub-ar' : 'font-hub-lat'}>
            {isRtl ? 'البوابة المركزية لمجموعات الأعمال' : 'Central Enterprise Workspace Shell'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-semibold text-xs font-mono-data" style={{ color: '#3A7D44' }}>
            <CheckCircle2 size={14} />
            {isRtl ? 'كافة الأنظمة متصلة وتعمل' : 'All systems operational'}
          </span>
        </div>
      </footer>
    </div>
  );
};
