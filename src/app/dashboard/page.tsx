import Link from "next/link";
import { Calculator, Scale, Sprout, Building2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-slate-50">
      {/* Top Navbar for the portal */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-10 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <Link href="/dashboard" className="font-syne text-2xl font-bold text-slate-900 flex items-center gap-2">
          MKANY <span className="font-sans text-sm font-normal text-slate-500">| بوابة التطبيقات</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="font-semibold text-[13px] text-slate-700 leading-tight">مرحباً بك</div>
            <div className="text-[10px] text-slate-400 font-medium">المدير العام</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center font-heading font-bold text-white shadow-sm text-sm">
            MA
          </div>
        </div>
      </header>

      {/* Modules Grid Section */}
      <div id="modules" className="flex-1 px-4 md:px-10 pb-20 w-full pt-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-12 text-right">
            <h2 className="text-[32px] font-bold text-slate-900 mb-4 tracking-tight">وحدات النظام</h2>
            <p className="text-slate-500 text-lg max-w-[60ch]">
              اختر القطاع للوصول إلى لوحة القيادة المخصصة وإدارة أعمالك المتخصصة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] gap-6">
            
            {/* Accounting */}
            <Link 
              href="/accounting" 
              className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-brand-gold lg:col-span-2 border-t-4 border-t-brand-gold group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-brand-gold/10 text-brand-gold">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">الإدارة المالية (Accounting)</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  دفتر اليومية، شجرة الحسابات، تقارير التدفق النقدي ومراكز التكلفة.
                </p>
              </div>
            </Link>

            {/* Legal */}
            <Link 
              href="/legal" 
              className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-brand-steel border-t-4 border-t-brand-steel group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-brand-steel/10 text-brand-steel">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">الشؤون القانونية</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  إدارة ملفات القضايا، الجلسات، والمواعيد الإجرائية الحرجة.
                </p>
              </div>
            </Link>

            {/* Agriculture */}
            <Link 
              href="/agriculture" 
              className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-brand-emerald border-t-4 border-t-brand-emerald group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-brand-emerald/10 text-brand-emerald">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">الإدارة الزراعية (IoT)</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  مراقبة الصوب، تخطيط الدورات الزراعية، ومستشعرات الرطوبة.
                </p>
              </div>
            </Link>

            {/* Real Estate */}
            <Link 
              href="/realestate" 
              className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-brand-slate lg:col-span-2 border-t-4 border-t-brand-slate group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-brand-slate/10 text-brand-slate">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">التطوير العقاري</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  مخزون الوحدات، العقود، وجداول أقساط العملاء.
                </p>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
