"use client";

import Link from "next/link";
import { UserCircle, Image as ImageIcon, Home, Maximize, Compass, Loader2 } from "lucide-react";
import { useRealEstate } from "@/hooks/useRealEstate";

export default function RealEstateInventory() {
  const { units, isLoading, error } = useRealEstate();

  return (
    <>
      {/* Domain Nav */}
      

      {/* Main Content */}
      <div className="p-8 md:p-10 flex-1 overflow-y-auto max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-brand-slate">مخزون الوحدات (Inventory)</h1>
          <Link href="/realestate/new">
            <button className="bg-brand-slate text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-slate/90 transition-colors active:scale-98">
              إضافة وحدة
            </button>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-4 mb-6">
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-500 bg-white cursor-pointer outline-none focus:ring-2 focus:ring-brand-slate/50">
            <option>المشروع: كمبوند الساحل</option>
          </select>
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-500 bg-white cursor-pointer outline-none focus:ring-2 focus:ring-brand-slate/50">
            <option>الحالة: الكل</option>
          </select>
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-500 bg-white cursor-pointer outline-none focus:ring-2 focus:ring-brand-slate/50">
            <option>النوع: فيلا</option>
          </select>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-brand-slate">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">{error}</div>
        ) : units.length === 0 ? (
          <div className="text-slate-500 py-10 text-center">لا توجد وحدات.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit) => (
              <div 
                key={unit.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col cursor-pointer transition-all duration-200 hover:-translate-y-1 active:scale-98"
              >
                <div className="h-44 bg-slate-200 relative flex items-center justify-center text-slate-400">
                  {unit.status === 'available' && <span className="absolute top-3 right-3 px-3 py-1 rounded bg-[#DCFCE7] text-[#166534] text-xs font-bold">متاح للبيع</span>}
                  {unit.status === 'reserved' && <span className="absolute top-3 right-3 px-3 py-1 rounded bg-[#FEF9C3] text-[#854D0E] text-xs font-bold">محجوز (مبدئي)</span>}
                  {unit.status === 'sold' && <span className="absolute top-3 right-3 px-3 py-1 rounded bg-[#FEE2E2] text-[#991B1B] text-xs font-bold">مباع</span>}
                  <ImageIcon className="w-12 h-12 opacity-20" />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold text-brand-slate">{unit.name}</div>
                    <div className="font-mono text-slate-500 text-[13px]" dir="ltr">{unit.code}</div>
                  </div>
                  <div className="flex gap-4 text-[13px] text-slate-500">
                    <div className="flex items-center gap-1.5 font-medium"><Home className="w-4 h-4" /> {unit.type}</div>
                    <div className="flex items-center gap-1.5 font-medium"><Maximize className="w-4 h-4" /> {unit.area} م²</div>
                    <div className="flex items-center gap-1.5 font-medium"><Compass className="w-4 h-4" /> {unit.orientation}</div>
                  </div>
                  <div className="mt-2 pt-4 border-t border-dashed border-slate-200">
                    <div className="text-xs text-slate-500 mb-1 text-left">السعر الإجمالي</div>
                    <div className="text-[22px] font-bold text-slate-900 text-left font-mono" dir="ltr">
                      {unit.price.toLocaleString('en-US')} EGP
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
