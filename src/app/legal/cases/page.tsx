"use client";

import Link from "next/link";
import { Scale, Loader2, ArrowRight, Search, FileText } from "lucide-react";
import { useLegal } from "@/hooks/useLegal";

export default function LegalCasesPage() {
  const { cases, isLoading, error } = useLegal();

  const getStatusBadge = (type: 'safe' | 'warning' | 'critical') => {
    switch(type) {
      case 'safe': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'warning': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <>
      

      <div className="p-8 max-w-6xl mx-auto w-full flex-1 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/legal" className="text-sm font-semibold text-brand-slate flex items-center gap-1 mb-2 hover:underline">
              <ArrowRight className="w-4 h-4" /> عودة للرئيسية
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Scale className="w-8 h-8 text-brand-slate" /> سجل القضايا
            </h1>
            <p className="text-slate-500 mt-2">إدارة وتتبع جميع الدعاوي القانونية والنزاعات</p>
          </div>
          <button className="bg-brand-slate hover:bg-slate-800 text-white px-5 py-2.5 rounded-md font-semibold transition-all active:scale-98 shadow-sm">
            إضافة قضية جديدة
          </button>
        </div>

        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="ابحث برقم القضية أو اسم العميل..." 
              className="w-full pl-4 pr-10 py-2 rounded-md border border-slate-200 focus:border-brand-slate focus:ring-1 focus:ring-brand-slate outline-none"
            />
          </div>
          <select className="border border-slate-200 rounded-md px-4 py-2 bg-slate-50 text-slate-700 outline-none">
            <option>جميع الحالات</option>
            <option>نشطة</option>
            <option>مغلقة</option>
          </select>
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
                  <th className="p-4">رقم القضية</th>
                  <th className="p-4">موضوع الدعوى</th>
                  <th className="p-4">العميل / الخصم</th>
                  <th className="p-4">الحالة الحالية</th>
                  <th className="p-4">آخر تحديث</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cases.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono text-sm text-slate-500">{c.code}</td>
                    <td className="p-4 font-bold text-slate-900">{c.title}</td>
                    <td className="p-4 font-medium text-slate-700">{c.client}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusBadge(c.statusType)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500">{c.lastUpdate}</td>
                    <td className="p-4">
                      <button className="text-slate-400 hover:text-brand-slate transition-colors">
                        <FileText className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
