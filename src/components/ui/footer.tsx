"use client";

import Link from "next/link";
import { PackageOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="font-syne text-2xl font-bold text-slate-900 flex items-center gap-2">
              <div className="bg-brand-gold/10 p-2 rounded-lg text-brand-gold">
                <PackageOpen className="w-6 h-6" />
              </div>
              MKANY <span className="font-sans text-sm font-normal text-slate-500">| نظام الإدارة المتكامل</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              نقدم حلولاً متقدمة لإدارة الموارد المؤسسية للقطاعات الزراعية، القانونية، المحاسبية، والعقارية. نسعى لتبسيط العمليات ورفع كفاءة أعمالك.
            </p>
          </div>

          {/* Links - Modules */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">القطاعات</h4>
            <ul className="space-y-4">
              <li><Link href="/login" className="text-slate-500 hover:text-brand-gold text-sm transition-colors">إدارة الزراعة</Link></li>
              <li><Link href="/login" className="text-slate-500 hover:text-brand-gold text-sm transition-colors">الشؤون القانونية</Link></li>
              <li><Link href="/login" className="text-slate-500 hover:text-brand-gold text-sm transition-colors">الإدارة المالية</Link></li>
              <li><Link href="/login" className="text-slate-500 hover:text-brand-gold text-sm transition-colors">إدارة العقارات</Link></li>
            </ul>
          </div>

          {/* Links - Company */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">الشركة</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-brand-gold text-sm transition-colors">من نحن</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-gold text-sm transition-colors">فريق العمل</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-gold text-sm transition-colors">الوظائف</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-gold text-sm transition-colors">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Links - Legal */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">قانوني</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-brand-gold text-sm transition-colors">شروط الاستخدام</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-gold text-sm transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-gold text-sm transition-colors">اتفاقية الخدمة</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-gold text-sm transition-colors">ملفات تعريف الارتباط</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-400">
            جميع الحقوق محفوظة © {new Date().getFullYear()} MKANY ERP
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span className="text-sm text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div> جميع الأنظمة تعمل بشكل ممتاز
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
