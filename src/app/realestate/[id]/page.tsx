"use client";

import Link from "next/link";
import { ArrowRight, Home, Maximize, Compass, Loader2, UserCircle } from "lucide-react";
import { useRealEstate } from "@/hooks/useRealEstate";
import { useParams } from "next/navigation";

export default function UnitDetails() {
  const { units, installments, isLoading, error } = useRealEstate();
  const params = useParams();
  
  // For the sake of the MVP, we just pick the first unit if ID doesn't match perfectly
  const unit = units.length > 0 ? units[0] : null;

  return (
    <>
      

      <div className="p-8 flex-1 overflow-y-auto max-w-5xl mx-auto w-full">
        
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-brand-slate">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">{error}</div>
        ) : !unit ? (
          <div className="text-slate-500 py-10 text-center">لم يتم العثور على الوحدة.</div>
        ) : (
          <>
            {/* Header Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6 flex flex-col md:flex-row gap-8">
              <div>
                <Link href="/realestate">
                  <button className="bg-slate-100 border border-slate-200 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl text-brand-slate font-bold mb-2">{unit.name}</h1>
                <div className="text-slate-500 font-mono mb-4">{unit.code} | مشروع كمبوند الساحل</div>
                
                <div className="flex flex-wrap gap-6 pt-4 border-t border-dashed border-slate-200">
                  <div className="flex items-center gap-2 font-medium text-slate-600">
                    <Home className="w-4 h-4" /> {unit.type}
                  </div>
                  <div className="flex items-center gap-2 font-medium text-slate-600">
                    <Maximize className="w-4 h-4" /> {unit.area} م² مباني
                  </div>
                  <div className="flex items-center gap-2 font-medium text-slate-600">
                    <Compass className="w-4 h-4" /> واجهة {unit.orientation}
                  </div>
                </div>
              </div>
              <div className="md:mr-auto md:text-left flex flex-col justify-center">
                <div className="text-sm text-slate-500 mb-1">السعر الإجمالي</div>
                <div className="text-[28px] text-brand-slate font-bold font-mono" dir="ltr">
                  {unit.price.toLocaleString('en-US')} EGP
                </div>
              </div>
            </div>

            {/* Installments Panel */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4 border-b border-slate-200 pb-3">جدول الأقساط (العميل: محمد عبدالله)</h2>
              
              <table className="w-full border-collapse text-right">
                <thead>
                  <tr>
                    <th className="py-3 px-3 border-b border-slate-200 text-slate-500 font-semibold text-sm">الدفعة</th>
                    <th className="py-3 px-3 border-b border-slate-200 text-slate-500 font-semibold text-sm">تاريخ الاستحقاق</th>
                    <th className="py-3 px-3 border-b border-slate-200 text-slate-500 font-semibold text-sm">المبلغ (EGP)</th>
                    <th className="py-3 px-3 border-b border-slate-200 text-slate-500 font-semibold text-sm">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {installments.map((installment, index) => (
                    <tr key={index}>
                      <td className="py-3 px-3 border-b border-slate-200 font-medium text-slate-900">{installment.description}</td>
                      <td className={`py-3 px-3 border-b border-slate-200 font-mono font-bold ${installment.status === 'late' ? 'text-red-600' : 'text-slate-900'}`} dir="ltr">{installment.dueDate}</td>
                      <td className="py-3 px-3 border-b border-slate-200 font-mono font-bold text-slate-900 text-left" dir="ltr">{installment.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="py-3 px-3 border-b border-slate-200">
                        {installment.status === 'paid' && <span className="px-2.5 py-1 rounded bg-[#DCFCE7] text-[#166534] text-xs font-bold">مسدد</span>}
                        {installment.status === 'pending' && <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-xs font-bold">قادم</span>}
                        {installment.status === 'late' && <span className="text-red-600 font-bold">متأخر</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
