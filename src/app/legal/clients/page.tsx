"use client";

import Link from "next/link";
import { Users, Loader2, ArrowRight, Building2, User, Phone, Briefcase } from "lucide-react";
import { useLegal } from "@/hooks/useLegal";

export default function LegalClientsPage() {
  const { clients, isLoading, error } = useLegal();

  return (
    <>
      

      <div className="p-8 max-w-6xl mx-auto w-full flex-1 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/legal" className="text-sm font-semibold text-brand-slate flex items-center gap-1 mb-2 hover:underline">
              <ArrowRight className="w-4 h-4" /> عودة للرئيسية
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Users className="w-8 h-8 text-brand-slate" /> قاعدة العملاء
            </h1>
            <p className="text-slate-500 mt-2">إدارة الموكلين من الأفراد والشركات</p>
          </div>
          <button className="bg-brand-slate hover:bg-slate-800 text-white px-5 py-2.5 rounded-md font-semibold transition-all active:scale-98 shadow-sm">
            إضافة عميل جديد
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20 text-brand-slate"><Loader2 className="w-8 h-8 animate-spin" /></div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clients.map(client => (
              <div key={client.id} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:border-brand-slate transition-colors group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1 h-full bg-brand-slate opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                    {client.type === 'corporate' ? <Building2 className="w-6 h-6" /> : <User className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-brand-slate transition-colors">{client.name}</h3>
                    <span className="text-sm font-semibold text-slate-500">
                      {client.type === 'corporate' ? 'شركة / مؤسسة' : 'فرد'}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5"><Phone className="w-4 h-4" /> رقم الهاتف</span>
                    <span className="font-mono font-medium text-slate-700" dir="ltr">{client.phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> القضايا النشطة</span>
                    <span className="font-mono font-bold text-brand-slate bg-brand-slate/10 px-2 py-0.5 rounded-full">{client.activeCases}</span>
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
