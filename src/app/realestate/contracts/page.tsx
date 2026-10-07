"use client";

import Link from "next/link";
import { UserCircle, Loader2 } from "lucide-react";
import { useRealEstate } from "@/hooks/useRealEstate";

export default function RealEstateContracts() {
  const { installments, isLoading, error } = useRealEstate();

  return (
    <>
      

      <div className="p-8 flex-1 overflow-y-auto max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-brand-slate mb-6">العقود والأقساط الاستحقاقات القادمة</h1>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-brand-slate">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-500 py-10 text-center font-bold">{error}</div>
          ) : installments.length === 0 ? (
            <div className="text-slate-500 py-10 text-center">لا توجد أقساط.</div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}
