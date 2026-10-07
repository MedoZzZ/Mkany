import React from 'react';
import { DOMAINS, AppView, Direction } from '../types';
import { LayoutGrid, Sprout, Building2, Scale, X, ArrowLeft, ArrowRight } from 'lucide-react';

interface ProjectSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: AppView;
  onSelectView: (view: AppView) => void;
  direction: Direction;
}

export const ProjectSwitcherModal: React.FC<ProjectSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentView,
  onSelectView,
  direction,
}) => {
  if (!isOpen) return null;

  const isRtl = direction === 'rtl';

  return (
    <div
      id="mkany-project-switcher-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md transition-all duration-200"
      onClick={onClose}
    >
      <div
        id="mkany-project-switcher-dialog"
        className="w-full max-w-2xl border relative overflow-hidden"
        style={{
          backgroundColor: 'var(--hub-surface)',
          borderColor: 'var(--hub-bg)',
          boxShadow: 'var(--shadow-hub-card)',
          borderRadius: 'var(--radius-hub-card)',
          padding: '24px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b" style={{ borderColor: 'var(--hub-bg)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs" style={{ backgroundColor: 'var(--hub-text-primary)', color: 'var(--hub-accent)' }}>
              MK
            </div>
            <div>
              <h3 className={`text-base font-bold ${isRtl ? 'font-hub-ar' : 'font-hub-lat'}`} style={{ color: 'var(--hub-text-primary)' }}>
                {isRtl ? 'الانتقال بين مساحات عمل مَكاني' : 'Switch MKANY Workspace'}
              </h3>
              <p className={`text-xs ${isRtl ? 'font-hub-ar' : 'font-hub-lat'}`} style={{ color: 'var(--hub-text-muted)' }}>
                {isRtl ? 'اختر مساحة العمل للانتقال الفوري وتطبيق النمط الخاص بها' : 'Select a domain workspace to enter its dedicated theme'}
              </p>
            </div>
          </div>

          <button
            id="close-switcher-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors border hover:bg-slate-50"
            style={{ 
              backgroundColor: 'var(--hub-surface)', 
              color: 'var(--hub-text-muted)',
              borderColor: 'var(--hub-bg)'
            }}
            aria-label="Close switcher"
          >
            <X size={16} />
          </button>
        </div>

        {/* Mini Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          {DOMAINS.map((domain) => {
            const isActive = currentView === domain.id;
            const IconComponent =
              domain.id === 'agriculture' ? Sprout : domain.id === 'realestate' ? Building2 : Scale;

            return (
              <button
                key={domain.id}
                id={`switch-to-${domain.id}-btn`}
                onClick={() => {
                  onSelectView(domain.id);
                  onClose();
                }}
                className={`text-start p-4 rounded-xl transition-all duration-200 border relative group hover:shadow-sm ${
                  isActive ? 'ring-2 ring-opacity-20 shadow-sm' : 'hover:bg-slate-50'
                }`}
                style={{
                  backgroundColor: 'var(--hub-surface)',
                  borderColor: isActive ? domain.primaryColor : 'var(--hub-bg)',
                  ringColor: isActive ? domain.primaryColor : 'transparent',
                }}
              >
                {isActive && (
                  <span className="absolute top-2.5 end-2.5 px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ backgroundColor: domain.primaryColor, color: '#FFFFFF' }}>
                    {isRtl ? 'الحالية' : 'Current'}
                  </span>
                )}

                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: `${domain.primaryColor}15`,
                    color: domain.primaryColor,
                  }}
                >
                  <IconComponent size={18} />
                </div>

                <h4
                  className={`text-sm font-bold mb-1 ${
                    isRtl ? 'font-hub-ar' : 'font-hub-lat'
                  }`}
                  style={{ color: 'var(--hub-text-primary)' }}
                >
                  {isRtl ? domain.titleAr : domain.titleEn}
                </h4>
                <p
                  className={`text-[11px] line-clamp-2 leading-relaxed ${
                    isRtl ? 'font-hub-ar' : 'font-hub-lat'
                  }`}
                  style={{ color: 'var(--hub-text-muted)' }}
                >
                  {isRtl ? domain.taglineAr : domain.taglineEn}
                </p>
              </button>
            );
          })}
        </div>

        {/* Return to Hub Action */}
        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--hub-bg)' }}>
          <button
            id="return-to-main-hub-btn"
            onClick={() => {
              onSelectView('hub');
              onClose();
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors shadow-sm hover:bg-slate-50 ${
              isRtl ? 'font-hub-ar' : 'font-hub-lat'
            }`}
            style={{ 
              backgroundColor: 'var(--hub-surface)', 
              color: 'var(--hub-text-primary)',
              borderColor: 'var(--hub-bg)'
            }}
          >
            <LayoutGrid size={15} style={{ color: 'var(--hub-accent)' }} />
            <span>{isRtl ? 'العودة إلى شاشة البوابة الرئيسية (Hub)' : 'Return to Master Hub'}</span>
            {isRtl ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
          </button>

          <span className="text-[11px] font-mono-data" style={{ color: 'var(--hub-text-muted)' }}>MKANY ERP v2.4</span>
        </div>
      </div>
    </div>
  );
};
