"use client";

import Link from "next/link";
import { UserCircle, Loader2, Building, DollarSign, Activity } from "lucide-react";
import { useRealEstate } from "@/hooks/useRealEstate";

export default function RealEstateOverview() {
  const { units, projects, isLoading, error } = useRealEstate();

  const totalValue = units.reduce((sum, u) => sum + u.price, 0);

  return (
    <>
      

      <div className="p-8 flex-1 overflow-y-auto max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-brand-slate mb-6">نظرة عامة (Overview)</h1>

        {isLoading ? (
          <div className="flex justify-center py-20 text-brand-slate"><Loader2 className="w-8 h-8 animate-spin" /></div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col gap-2 shadow-sm hover:-translate-y-0.5 transition-transform active:scale-98">
              <div className="text-slate-500 font-semibold flex items-center justify-between">
                <span>المشاريع النشطة</span><Building className="w-5 h-5 text-brand-slate" />
              </div>
              <div className="text-3xl font-mono font-bold text-slate-900" dir="ltr">{projects.length}</div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col gap-2 shadow-sm hover:-translate-y-0.5 transition-transform active:scale-98">
              <div className="text-slate-500 font-semibold flex items-center justify-between">
                <span>إجمالي الوحدات</span><Activity className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-3xl font-mono font-bold text-slate-900" dir="ltr">{units.length}</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col gap-2 shadow-sm hover:-translate-y-0.5 transition-transform active:scale-98">
              <div className="text-slate-500 font-semibold flex items-center justify-between">
                <span>قيمة المخزون</span><DollarSign className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-3xl font-mono font-bold text-slate-900" dir="ltr">{totalValue.toLocaleString()}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
