"use client";

import Link from "next/link";
import { UserCircle, Thermometer, Droplet, LayoutGrid, Sprout, LineChart, Loader2 } from "lucide-react";
import { useAgriculture } from "@/hooks/useAgriculture";

export default function AgricultureIoT() {
  const { sensorData, isLoading, error } = useAgriculture();

  return (
    <>
      {/* Domain Nav */}
      

      {/* Main Content */}
      <div className="p-8 md:p-10 flex-1 overflow-y-auto max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">مراقبة الصوب الزراعية (Greenhouse IoT)</h1>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-brand-emerald">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">{error}</div>
        ) : !sensorData ? (
          <div className="text-slate-500 py-10 text-center">لا توجد بيانات مستشعرات.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {/* Temp Stat */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col hover:-translate-y-0.5 transition-transform active:scale-98 cursor-pointer">
              <div className="flex justify-between items-center text-slate-500 font-semibold mb-3 text-sm">
                <span>درجة الحرارة</span>
                <Thermometer className="w-5 h-5 text-red-500" />
              </div>
              <div className="font-mono text-[28px] font-bold text-slate-900 text-left" dir="ltr">
                {sensorData.temperature}<span className="text-sm text-slate-500 font-sans ml-1">°C</span>
              </div>
            </div>

            {/* Humidity Stat */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col hover:-translate-y-0.5 transition-transform active:scale-98 cursor-pointer">
              <div className="flex justify-between items-center text-slate-500 font-semibold mb-3 text-sm">
                <span>رطوبة التربة</span>
                <Droplet className="w-5 h-5 text-blue-500" />
              </div>
              <div className="font-mono text-[28px] font-bold text-slate-900 text-left" dir="ltr">
                {sensorData.humidity}<span className="text-sm text-slate-500 font-sans ml-1">%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
