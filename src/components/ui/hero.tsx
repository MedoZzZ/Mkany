"use client";

import { FingerprintIcon, Menu, Moon, Sun, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

export function Hero() {
  return (
      <div className="container max-w-7xl mx-auto mb-16">
        <header className="relative pt-4">
          <nav className="flex items-center justify-between rounded-xl bg-background py-2 px-4 shadow-sm border border-slate-200">
            <div className="flex items-center space-x-6 space-x-reverse">
              <a href="#" className="text-xl font-bold tracking-wider text-slate-900">
                MKANY
              </a>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="hidden md:flex items-center space-x-2 space-x-reverse">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="h-9 px-3 text-sm font-semibold text-slate-600 hover:text-slate-900"
                  >
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="h-9 rounded-full bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800 shadow-sm transition-all hover:shadow-md">
                    ابدأ الآن
                  </Button>
                </Link>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">افتح القائمة</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                  <nav className="mt-8 flex flex-col space-y-4">
                    <Link href="/login">
                      <Button
                        variant="ghost"
                        className="justify-start h-9 px-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
                      >
                        تسجيل الدخول
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button className="h-9 rounded-full bg-brand-slate px-5 text-sm font-semibold text-white hover:bg-brand-slate/90">
                        ابدأ الآن
                      </Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </header>

        <main className="relative container px-2 mx-auto">
          <section className="w-full py-12 md:py-20 lg:py-24">
            <motion.div
              className="flex flex-col items-center space-y-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none text-slate-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                MKANY ERP:<br />Enterprise, Redefined
              </motion.h1>
              <motion.p
                className="mx-auto max-w-2xl text-lg sm:text-2xl text-slate-500 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                أدر أعمالك بفعالية مع{" "}
                <span className="font-semibold text-brand-slate">
                  نظام متكامل
                </span>{" "}
                لوحدات المحاسبة، الزراعة، الشؤون القانونية والتطوير العقاري.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button className="rounded-xl h-12 px-8 bg-brand-slate text-white hover:bg-brand-slate/90 text-md font-semibold">
                  استكشف النظام
                  <div className="mr-2 space-x-1 hidden sm:inline-flex">
                    <ArrowLeft className="w-5 h-5" />
                  </div>
                </Button>
                <Button variant="outline" className="rounded-xl h-12 px-8 text-md font-semibold border-slate-300 text-slate-700 hover:bg-slate-100">
                  <div className="ml-2 space-x-1 hidden sm:inline-flex">
                    <span className="w-5 h-5 text-xs rounded-sm border border-slate-300 flex items-center justify-center">⌘</span>
                    <span className="w-5 h-5 text-xs rounded-sm border border-slate-300 flex items-center justify-center">B</span>
                  </div>
                  تواصل معنا
                </Button>
              </motion.div>

              <motion.div
                className="flex flex-col items-center space-y-3 pb-12 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center space-x-4 space-x-reverse text-sm font-semibold">
                  <span className="text-brand-steel">
                    نظام سحابي
                  </span>
                  <span className="text-slate-400">
                    &bull;
                  </span>
                  <span className="text-brand-emerald">
                    متعدد الوحدات
                  </span>
                  <span className="text-slate-400">
                    &bull;
                  </span>
                  <span className="text-brand-gold">
                    أداء عالي
                  </span>
                </div>
                <p className="text-sm text-slate-400">
                  تم بناء النظام بأحدث التقنيات لضمان الموثوقية والسرعة
                </p>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mt-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {/* Mock Card 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-xl shadow-brand-gold/5 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">تقارير مالية لحظية</h3>
                  <p className="text-sm text-slate-500">تابع التدفقات النقدية والأرباح مع لوحات قياس تفاعلية ومؤشرات أداء دقيقة.</p>
                </div>

                {/* Mock Card 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-xl shadow-brand-emerald/5 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 translate-y-4 md:translate-y-8">
                  <div className="w-12 h-12 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">أتمتة العمليات</h3>
                  <p className="text-sm text-slate-500">قلل الجهد اليدوي واترك للنظام إدارة التنبيهات، الفواتير، والمواعيد الإجرائية.</p>
                </div>

                {/* Mock Card 3 */}
                <div className="bg-white rounded-2xl p-6 shadow-xl shadow-brand-steel/5 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-brand-steel/10 text-brand-steel flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">أمان سحابي متقدم</h3>
                  <p className="text-sm text-slate-500">بيانات مؤسستك محمية بأحدث معايير التشفير والنسخ الاحتياطي التلقائي.</p>
                </div>
              </motion.div>
            </motion.div>
          </section>
        </main>
      </div>
  );
}
