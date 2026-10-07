"use client";

import Link from "next/link";
import { UserCircle, Scale, Plus, FolderOpen, User, Timer, Calendar, Gavel, MapPin, Files, Clock, Loader2 } from "lucide-react";
import { useLegal } from "@/hooks/useLegal";

export default function LegalTriage() {
  const { tasks, sessions, cases, isLoading, error } = useLegal();

  return (
    <>
      {/* Main Content */}
      <div className="p-8 md:p-10 flex-1 overflow-y-auto max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[26px] font-bold text-brand-slate">مركز المهام (Triage Dashboard)</h1>
          <div className="font-mono text-slate-500 font-semibold">22 October 2026</div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-brand-steel">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Tasks */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-3 border-b-2 border-brand-slate">
                <span className="font-bold text-base text-brand-slate flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.2)]"></span>
                  المواعيد الإجرائية الحرجة
                </span>
                <span className="text-[13px] text-slate-500">{tasks.length} مهام</span>
              </div>

              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`bg-white border border-slate-200 rounded-lg p-5 cursor-pointer transition-all duration-200 hover:border-slate-400 hover:-translate-y-0.5 active:scale-98
                    ${task.urgency === 'urgent' ? 'border-r-4 border-r-red-600' : task.urgency === 'warning' ? 'border-r-4 border-r-amber-600' : ''}`}
                >
                  <div className="text-[15px] font-bold text-brand-slate mb-2 leading-relaxed">{task.title}</div>
                  <div className="text-[13px] text-slate-500 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 font-medium"><FolderOpen className="w-3.5 h-3.5" /> ملف: {task.caseFile}</div>
                    <div className="flex items-center gap-2 font-medium"><User className="w-3.5 h-3.5" /> المكلف: {task.assignee}</div>
                  </div>
                  <div className={`mt-3 font-mono font-bold text-base flex justify-end items-center gap-1.5 
                    ${task.urgency === 'urgent' ? 'text-red-600' : task.urgency === 'warning' ? 'text-amber-600' : 'text-slate-500'}`} dir="ltr">
                    {task.urgency === 'urgent' ? <Timer className="w-4 h-4" /> : <Calendar className="w-4 h-4" />} {task.timeLeft}
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: Sessions */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-3 border-b-2 border-brand-slate">
                <span className="font-bold text-base text-brand-slate flex items-center gap-2">
                  <Gavel className="w-[18px] h-[18px]" />
                  رول الجلسات (اليوم)
                </span>
                <span className="text-[13px] text-slate-500">{sessions.length} جلسات</span>
              </div>

              <div className="mt-3">
                {sessions.map((session, index) => (
                  <div key={session.id} className="pr-8 border-r-2 border-slate-200 relative mb-4">
                    <div className={`absolute -right-2 top-0 w-3.5 h-3.5 rounded-full border-2 border-brand-steel bg-white ${session.isUrgent ? 'bg-brand-steel' : ''}`}></div>
                    <div className="font-mono font-bold text-brand-steel mb-1 text-sm text-right" dir="ltr">{session.time}</div>
                    <div className="text-[15px] font-bold text-brand-slate mb-1">{session.title}</div>
                    <div className="text-[13px] text-slate-500 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 font-medium"><MapPin className="w-3.5 h-3.5" /> {session.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Recent Cases */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-3 border-b-2 border-brand-slate">
                <span className="font-bold text-base text-brand-slate flex items-center gap-2">
                  <Files className="w-[18px] h-[18px]" />
                  ملفات نشطة حديثاً
                </span>
              </div>

              {cases.map(caseItem => (
                <div key={caseItem.id} className="bg-white border border-slate-200 rounded-lg p-5 cursor-pointer transition-all duration-200 hover:border-slate-400 hover:-translate-y-0.5 active:scale-98">
                  <div className="text-[15px] font-bold text-brand-steel mb-2 leading-relaxed">{caseItem.title}</div>
                  <div className="text-[13px] text-slate-500 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 font-medium">
                      <span className={`w-2 h-2 rounded-full inline-block ${caseItem.statusType === 'safe' ? 'bg-emerald-600' : 'bg-slate-400'}`}></span>
                      {caseItem.status}
                    </div>
                    <div className="flex items-center gap-2 font-medium mt-1"><Clock className="w-3.5 h-3.5" /> آخر تحديث: {caseItem.lastUpdate}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </>
  );
}
