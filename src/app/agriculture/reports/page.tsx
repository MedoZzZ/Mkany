"use client";

import Link from "next/link";
import { FileText, Loader2, ArrowRight, Sprout, Download, Beaker } from "lucide-react";
import { useAgriculture } from "@/hooks/useAgriculture";

export default function AgriReportsPage() {
  const { reports, isLoading, error } = useAgriculture();

  return (
    <>
      

      <div className="p-8 max-w-6xl mx-auto w-full flex-1 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/agriculture" className="text-sm font-semibold text-emerald-600 flex items-center gap-1 mb-2 hover:underline">
              <ArrowRight className="w-4 h-4" /> عودة للرئيسية
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <FileText className="w-8 h-8 text-emerald-600" /> التقارير والتحليلات
            </h1>
            <p className="text-slate-500 mt-2">أرشيف تقارير الحصاد وتحليل التربة</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-md font-semibold transition-all active:scale-98 shadow-sm">
            تصدير الكل (PDF)
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20 text-emerald-600"><Loader2 className="w-8 h-8 animate-spin" /></div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map(report => (
              <div key={report.id} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex justify-between items-center group">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${report.type === 'harvest' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {report.type === 'harvest' ? <Sprout className="w-6 h-6" /> : <Beaker className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">{report.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                      <span className="font-medium">بواسطة: {report.author}</span>
                      <span className="font-mono text-xs">{report.date}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
