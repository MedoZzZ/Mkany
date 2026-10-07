import React, { useState } from 'react';
import { Direction } from '../types';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  direction: Direction;
  onToggleDirection: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  direction,
  onToggleDirection,
}) => {
  const isRtl = direction === 'rtl';
  const [email, setEmail] = useState('omar.farooq@mkany.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div
      id="mkany-login-container"
      className="min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 selection:bg-[#E6AC00]/30"
      style={{
        backgroundColor: '#F4F5F0',
        color: '#0B1B2B',
      }}
    >
      {/* Top utility bar */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-sm tracking-wider shadow-sm" style={{ backgroundColor: '#0B1B2B', color: '#E6AC00' }}>
            MK
          </div>
          <div>
            <span className="text-xs tracking-widest uppercase font-mono-data font-semibold" style={{ color: '#5A6B7C' }}>
              Enterprise System
            </span>
            <h1 className="text-base font-bold font-hub-lat" style={{ color: '#0B1B2B' }}>MKANY ERP</h1>
          </div>
        </div>

        <button
          id="toggle-direction-btn-login"
          onClick={onToggleDirection}
          className="px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-50 transition-colors shadow-sm font-mono-data"
          style={{ color: '#0B1B2B' }}
        >
          {isRtl ? 'LTR Mode (English)' : 'RTL Mode (العربية)'}
        </button>
      </header>

      {/* Main Login Form (Floating 24px Card) */}
      <main className="w-full max-w-md mx-auto my-auto py-8">
        <div
          id="login-card"
          className="p-8 sm:p-10"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 24px 48px rgba(11, 27, 43, 0.08)',
            borderRadius: '24px',
          }}
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(11, 27, 43, 0.05)', color: '#0B1B2B' }}>
              <ShieldCheck size={28} />
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight ${
                isRtl ? 'font-hub-ar' : 'font-hub-lat'
              }`}
              style={{ color: '#0B1B2B' }}
            >
              {isRtl ? 'تسجيل الدخول للنظام' : 'Enterprise Sign In'}
            </h2>
            <p
              className={`text-xs ${
                isRtl ? 'font-hub-ar' : 'font-hub-lat'
              }`}
              style={{ color: '#5A6B7C' }}
            >
              {isRtl
                ? 'أدخل بيانات الاعتماد للمتابعة إلى بوابة مساحات العمل'
                : 'Enter your credentials to access the unified MKANY Hub'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className={`block text-xs font-semibold mb-1.5 ${
                  isRtl ? 'font-hub-ar' : 'font-hub-lat'
                }`}
                style={{ color: '#0B1B2B' }}
              >
                {isRtl ? 'البريد الإلكتروني المؤسسي' : 'Corporate Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none" style={{ color: '#5A6B7C' }}>
                  <Mail size={16} />
                </div>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-xs rounded-xl ps-10 pe-3 py-3 outline-none border transition-all font-mono-data"
                  style={{ 
                    backgroundColor: '#F4F5F0', 
                    color: '#0B1B2B',
                    borderColor: 'transparent',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#0B1B2B'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.backgroundColor = '#F4F5F0'; }}
                  placeholder="name@mkany.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-password"
                className={`block text-xs font-semibold mb-1.5 ${
                  isRtl ? 'font-hub-ar' : 'font-hub-lat'
                }`}
                style={{ color: '#0B1B2B' }}
              >
                {isRtl ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none" style={{ color: '#5A6B7C' }}>
                  <Lock size={16} />
                </div>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-xs rounded-xl ps-10 pe-3 py-3 outline-none border transition-all font-mono-data"
                  style={{ 
                    backgroundColor: '#F4F5F0', 
                    color: '#0B1B2B',
                    borderColor: 'transparent',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#0B1B2B'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.backgroundColor = '#F4F5F0'; }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer" style={{ color: '#5A6B7C' }}>
                <input
                  id="login-remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded focus:ring-0"
                  style={{ color: '#0B1B2B' }}
                />
                <span className={isRtl ? 'font-hub-ar' : 'font-hub-lat'}>
                  {isRtl ? 'تذكر جلستي' : 'Remember session'}
                </span>
              </label>
              <a
                href="#forgot"
                onClick={(e) => e.preventDefault()}
                className={`font-semibold hover:underline ${
                  isRtl ? 'font-hub-ar' : 'font-hub-lat'
                }`}
                style={{ color: '#0B1B2B' }}
              >
                {isRtl ? 'استعادة الحساب' : 'Reset password'}
              </a>
            </div>

            <button
              id="submit-login-btn"
              type="submit"
              className={`w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-semibold text-sm transition-all shadow-md active:scale-[0.99] ${
                isRtl ? 'font-hub-ar' : 'font-hub-lat'
              }`}
              style={{ backgroundColor: '#0B1B2B', color: '#FFFFFF' }}
            >
              <span>{isRtl ? 'دخول إلى بوابة مَكاني' : 'Access MKANY Hub'}</span>
              {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </button>
          </form>
        </div>
      </main>

      {/* Footer info */}
      <footer className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: '#5A6B7C' }}>
        <span className="font-mono-data font-semibold" style={{ color: '#0B1B2B' }}>MKANY ERP © 2026</span>
        <span className={isRtl ? 'font-hub-ar' : 'font-hub-lat'}>
          {isRtl ? 'بيئة تشغيل موحدة — أمان وتحكم مركزي' : 'Unified Multi-Domain ERP Environment'}
        </span>
      </footer>
    </div>
  );
};
