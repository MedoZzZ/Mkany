"use client";

import Link from "next/link";
import { UserCircle, Loader2, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useAccounting } from "@/hooks/useAccounting";

export default function AccountingOverview() {
  const { entries, costCenters, isLoading, error } = useAccounting();

  const totalDebits = entries.reduce((sum, entry) => sum + (entry.debit || 0), 0);
  const totalCredits = entries.reduce((sum, entry) => sum + (entry.credit || 0), 0);

  return (
    <>
      

      <div className="p-8 flex-1 overflow-y-auto max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">نظرة عامة (Overview)</h1>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-brand-gold">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col gap-2 shadow-sm">
              <div className="text-slate-500 font-semibold flex items-center justify-between">
                <span>إجمالي المدين</span>
                <ArrowUpRight className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-3xl font-mono font-bold text-slate-900" dir="ltr">{totalDebits.toLocaleString('en-US')}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col gap-2 shadow-sm">
              <div className="text-slate-500 font-semibold flex items-center justify-between">
                <span>إجمالي الدائن</span>
                <ArrowDownRight className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-3xl font-mono font-bold text-slate-900" dir="ltr">{totalCredits.toLocaleString('en-US')}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col gap-2 shadow-sm">
              <div className="text-slate-500 font-semibold flex items-center justify-between">
                <span>مراكز التكلفة النشطة</span>
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-3xl font-mono font-bold text-slate-900" dir="ltr">{costCenters.length}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
