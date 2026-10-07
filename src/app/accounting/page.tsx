"use client";

import Link from "next/link";
import { Plus, UserCircle, Loader2 } from "lucide-react";
import { useAccounting } from "@/hooks/useAccounting";

export default function AccountingDashboard() {
  const { entries, isLoading, error } = useAccounting();

  return (
    <>
      {/* Domain Nav */}
      

      {/* Main Content */}
      <div className="p-8 flex-1 overflow-y-auto max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">دفتر اليومية العامة (General Journal)</h1>
          <Link href="/accounting/new">
            <button className="bg-brand-gold text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-brand-gold/90 transition-colors active:scale-98">
              <Plus className="w-[18px] h-[18px]" /> قيد جديد
            </button>
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-brand-gold">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-500 py-10 text-center font-bold">{error}</div>
          ) : entries.length === 0 ? (
            <div className="text-slate-500 py-10 text-center">لا توجد قيود مسجلة.</div>
          ) : (
            <table className="w-full border-collapse text-right">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-slate-500 font-semibold border-b border-slate-200 text-sm">رقم القيد</th>
                  <th className="py-3 px-4 text-slate-500 font-semibold border-b border-slate-200 text-sm">التاريخ</th>
                  <th className="py-3 px-4 text-slate-500 font-semibold border-b border-slate-200 text-sm">البيان</th>
                  <th className="py-3 px-4 text-slate-500 font-semibold border-b border-slate-200 text-sm">الحساب</th>
                  <th className="py-3 px-4 text-slate-500 font-semibold border-b border-slate-200 text-sm">مدين (Debit)</th>
                  <th className="py-3 px-4 text-slate-500 font-semibold border-b border-slate-200 text-sm">دائن (Credit)</th>
                  <th className="py-3 px-4 text-slate-500 font-semibold border-b border-slate-200 text-sm">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => {
                  const isFirstRowOfEntry = index === 0 || entries[index - 1].id !== entry.id;
                  const isLastRowOfEntry = index === entries.length - 1 || entries[index + 1].id !== entry.id;
                  const rowSpan = isFirstRowOfEntry ? entries.filter(e => e.id === entry.id).length : 0;

                  return (
                    <tr key={`${entry.id}-${index}`}>
                      {isFirstRowOfEntry && (
                        <>
                          <td rowSpan={rowSpan} className="p-4 border-b border-slate-200 font-mono font-semibold text-left" dir="ltr">{entry.id}</td>
                          <td rowSpan={rowSpan} className="p-4 border-b border-slate-200 font-mono font-semibold text-left" dir="ltr">{entry.date}</td>
                          <td rowSpan={rowSpan} className="p-4 border-b border-slate-200 font-medium">{entry.description}</td>
                        </>
                      )}
                      <td className={`p-4 ${isLastRowOfEntry ? 'border-b border-slate-200' : ''}`}>
                        {entry.accountName} <span className="font-mono text-slate-500 text-[13px] mr-2">{entry.accountCode}</span>
                      </td>
                      <td className={`p-4 font-mono text-left ${isLastRowOfEntry ? 'border-b border-slate-200' : ''}`} dir="ltr">
                        {entry.debit ? entry.debit.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '-'}
                      </td>
                      <td className={`p-4 font-mono text-left ${isLastRowOfEntry ? 'border-b border-slate-200' : ''}`} dir="ltr">
                        {entry.credit ? entry.credit.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '-'}
                      </td>
                      {isFirstRowOfEntry && (
                        <td rowSpan={rowSpan} className="p-4 border-b border-slate-200">
                          {entry.status === 'posted' ? (
                            <span className="px-2.5 py-1 rounded bg-[#E8F5EE] text-[#15694A] text-xs font-bold">مرحل</span>
                          ) : (
                            <span className="px-2.5 py-1 rounded bg-[#FFF8E6] text-[#8A6100] text-xs font-bold">معلق</span>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
