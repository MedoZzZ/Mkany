"use client";

import Link from "next/link";
import { UserCircle, Loader2, Gavel, MapPin, Clock } from "lucide-react";
import { useLegal } from "@/hooks/useLegal";

export default function LegalSessions() {
  const { sessions, isLoading, error } = useLegal();

  return (
    <>
      

      <div className="p-8 flex-1 overflow-y-auto max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">أجندة الجلسات (Sessions Agenda)</h1>

        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-brand-steel">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">{error}</div>
        ) : sessions.length === 0 ? (
          <div className="text-slate-500 py-10 text-center">لا توجد جلسات قادمة.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <div key={session.id} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col gap-4 hover:-translate-y-1 transition-all">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${session.isUrgent ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-brand-steel'}`}>
                    <Gavel className="w-6 h-6" />
                  </div>
                  {session.isUrgent && (
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">عاجل: اليوم</span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mt-2 line-clamp-2">{session.title}</h3>
                
                <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-dashed border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <Clock className="w-4 h-4" /> <span className="font-mono" dir="ltr">{session.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <MapPin className="w-4 h-4" /> {session.location}
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
