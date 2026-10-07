"use client";

import Link from "next/link";
import { ArrowRight, MapPin, User, Gavel, FileText, Download, Loader2, Scale, Plus } from "lucide-react";
import { useLegal } from "@/hooks/useLegal";
import { useParams } from "next/navigation";

export default function LegalCaseFile() {
  const { cases, isLoading, error } = useLegal();
  const params = useParams();
  
  // Fake lookup - just take the first case if ID isn't provided
  const caseItem = cases.length > 0 ? cases[0] : null;

  return (
    <>      <div className="p-8 flex-1 overflow-y-auto max-w-5xl mx-auto w-full">
        
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-brand-steel">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">{error}</div>
        ) : !caseItem ? (
          <div className="text-slate-500 py-10 text-center">لم يتم العثور على القضية.</div>
        ) : (
          <>
            {/* Header Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6 flex gap-8">
              <div>
                <Link href="/legal">
                  <button className="bg-slate-100 border border-slate-200 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl text-brand-slate font-bold mb-2">{caseItem.title}</h1>
                <div className="text-slate-500 font-mono mb-4">CASE-2026-105 | موكل: شركة النيل للإنشاءات</div>
                
                <div className="flex gap-6 pt-4 border-t border-dashed border-slate-200">
                  <div className="flex items-center gap-2 font-medium text-slate-600">
                    <MapPin className="w-4 h-4" /> محكمة العمالية - الدائرة 3
                  </div>
                  <div className="flex items-center gap-2 font-medium text-slate-600">
                    <User className="w-4 h-4" /> الخصم: موظف سابق
                  </div>
                  <div className="flex items-center gap-2 font-medium text-slate-600">
                    <Gavel className="w-4 h-4" /> الجلسة القادمة: 25 أكتوبر
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Panel */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4 border-b border-slate-200 pb-3">مستندات القضية (الأدلة والمذكرات)</h2>
              
              <div className="flex flex-col gap-3">
                <div className="p-4 border border-slate-200 rounded-lg flex justify-between items-center hover:border-brand-steel transition-colors group">
                  <div className="font-bold text-slate-900 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-red-600" /> صحيفة الدعوى الأصلية.pdf
                  </div>
                  <button className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors group-hover:border-slate-300">
                    <Download className="w-4 h-4" /> تحميل
                  </button>
                </div>

                <div className="p-4 border border-slate-200 rounded-lg flex justify-between items-center hover:border-brand-steel transition-colors group">
                  <div className="font-bold text-slate-900 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" /> مذكرة دفاع (جلسة 20 أكتوبر).docx
                  </div>
                  <button className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors group-hover:border-slate-300">
                    <Download className="w-4 h-4" /> تحميل
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
