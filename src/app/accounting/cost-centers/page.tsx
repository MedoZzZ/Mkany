"use client";

import Link from "next/link";
import { PieChart, Loader2, ArrowRight } from "lucide-react";
import { useAccounting } from "@/hooks/useAccounting";

export default function CostCentersPage() {
  const { costCenters, isLoading, error } = useAccounting();

  return (
    <>
      

      <div className="p-8 max-w-6xl mx-auto w-full flex-1 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/accounting" className="text-sm font-semibold text-brand-slate flex items-center gap-1 mb-2 hover:underline">
              <ArrowRight className="w-4 h-4" /> عودة للرئيسية
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <PieChart className="w-8 h-8 text-brand-slate" /> مراكز التكلفة
            </h1>
            <p className="text-slate-500 mt-2">تحليل الموازنات والإنفاق الفعلي لكل مركز تكلفة</p>
          </div>
          <button className="bg-brand-slate hover:bg-slate-800 text-white px-5 py-2.5 rounded-md font-semibold transition-all active:scale-98 shadow-sm">
            إضافة مركز تكلفة
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20 text-brand-slate"><Loader2 className="w-8 h-8 animate-spin" /></div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">{error}</div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-right">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm font-bold">
                <tr>
                  <th className="p-4">الكود</th>
                  <th className="p-4">اسم مركز التكلفة</th>
                  <th className="p-4">الموازنة التقديرية (EGP)</th>
                  <th className="p-4">الفعلي (EGP)</th>
                  <th className="p-4">الانحراف (Variance)</th>
                  <th className="p-4">نسبة الاستهلاك</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {costCenters.map(cc => {
                  const usagePercent = Math.min(100, Math.round((cc.actual / cc.budget) * 100));
                  const isOverBudget = cc.variance < 0;

                  return (
                    <tr key={cc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono text-sm text-slate-500">{cc.code}</td>
                      <td className="p-4 font-bold text-slate-900">{cc.name}</td>
                      <td className="p-4 font-mono font-medium text-slate-700" dir="ltr">
                        {cc.budget.toLocaleString('en-US')}
                      </td>
                      <td className="p-4 font-mono font-medium text-slate-900" dir="ltr">
                        {cc.actual.toLocaleString('en-US')}
                      </td>
                      <td className={`p-4 font-mono font-bold ${isOverBudget ? 'text-red-600' : 'text-emerald-600'}`} dir="ltr">
                        {cc.variance.toLocaleString('en-US')}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-sm font-bold ${isOverBudget ? 'text-red-600' : 'text-slate-600'}`} dir="ltr">
                            {usagePercent}%
                          </span>
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-brand-slate'}`}
                              style={{ width: `${usagePercent}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
