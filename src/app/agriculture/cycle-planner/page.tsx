"use client";

import Link from "next/link";
import { Calendar, Loader2, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { useAgriculture } from "@/hooks/useAgriculture";

export default function CyclePlannerPage() {
  const { cycleTasks: tasks, isLoading, error } = useAgriculture();

  return (
    <>
      

      <div className="p-8 max-w-4xl mx-auto w-full flex-1 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/agriculture" className="text-sm font-semibold text-emerald-600 flex items-center gap-1 mb-2 hover:underline">
              <ArrowRight className="w-4 h-4" /> عودة للرئيسية
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-emerald-600" /> مخطط دورة المحاصيل
            </h1>
            <p className="text-slate-500 mt-2">جدول المهام الزراعية، الري، والتسميد للربع الحالي</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-md font-semibold transition-all active:scale-98 shadow-sm">
            إضافة مهمة جديدة
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20 text-emerald-600"><Loader2 className="w-8 h-8 animate-spin" /></div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">{error}</div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden p-2">
            {tasks.map((task, idx) => (
              <div key={task.id} className={`flex items-start gap-4 p-4 ${idx !== tasks.length -1 ? 'border-b border-slate-100' : ''} hover:bg-slate-50 transition-colors cursor-pointer group`}>
                <div className="mt-1 shrink-0">
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                  )}
                </div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${task.completed ? 'text-slate-400 line-through' : 'text-slate-900 group-hover:text-emerald-700 transition-colors'}`}>
                    {task.title}
                  </h3>
                  <p className={`text-sm ${task.completed ? 'text-slate-400' : 'text-slate-500'}`}>{task.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
