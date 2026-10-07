"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function AccountingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "نظرة عامة", path: "/accounting" },
    { name: "القيود اليومية", path: "/accounting/new" },
    { name: "شجرة الحسابات", path: "/accounting/chart-of-accounts" },
    { name: "مراكز التكلفة", path: "/accounting/cost-centers" },
  ];

  return (
    <div className="theme-accounting flex-1 flex flex-col h-full bg-background overflow-hidden relative">
      <header className="absolute top-0 left-0 right-0 z-50 pt-4 px-4 pointer-events-none">
        <nav className="flex items-center justify-between rounded-xl bg-background/90 backdrop-blur-md py-2 px-4 shadow-sm border border-slate-200 pointer-events-auto max-w-7xl mx-auto">
          {/* Logo & Profile */}
          <div className="flex items-center space-x-6 space-x-reverse">
            <Link href="/" className="font-syne text-xl font-bold text-slate-900 flex items-center gap-2">
              MKANY <span className="text-slate-400 text-sm font-sans font-normal hidden sm:inline-block">| الإدارة المالية</span>
            </Link>
            
            {/* User Profile */}
            <div className="hidden md:flex items-center gap-3 mr-4 pr-4 border-r border-slate-200">
              <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center font-heading font-bold text-white shadow-sm text-xs">
                MA
              </div>
              <div className="text-right">
                <div className="font-semibold text-[13px] text-slate-700 leading-tight">محمود عبد الرحمن</div>
                <div className="text-[10px] text-slate-400 font-medium">Super Admin</div>
              </div>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2 space-x-reverse">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-slate-100 text-brand-gold shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Nav */}
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-600">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">افتح القائمة</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px]">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center font-bold text-white shadow-sm">
                    MA
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-900">محمود عبد الرحمن</div>
                    <div className="text-xs text-slate-500">Super Admin</div>
                  </div>
                </div>
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                          isActive 
                            ? 'bg-brand-gold/10 text-brand-gold' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto flex flex-col relative pt-[80px]">
        {children}
      </div>
    </div>
  );
}
