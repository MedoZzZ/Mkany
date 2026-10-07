"use client";

import Link from "next/link";
import { UserCircle, MapPin, Layers, Building, Home, ArrowRight } from "lucide-react";
import { useRealEstate } from "@/hooks/useRealEstate";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ProjectDetails() {
  const { projects, units } = useRealEstate();
  const params = useParams();
  
  // Simulate network fetch for skeleton demonstration
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSimulatingLoad(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const project = projects.find(p => p.id === params.id) || projects[0];
  const projectUnits = units.filter(u => u.project === project?.id);

  // Compute metrics
  const totalRevenue = projectUnits.reduce((sum, u) => sum + u.price, 0);
  const collectedRevenue = totalRevenue * 0.35; // Mock 35% collected
  const avgPrice = projectUnits.length > 0 ? totalRevenue / projectUnits.length : 0;
  const reservedUnits = projectUnits.filter(u => u.status === 'reserved').length;
  const availableUnits = projectUnits.filter(u => u.status === 'available').length;
  const soldUnits = projectUnits.filter(u => u.status === 'sold').length;

  const pieData = [
    { name: 'مباع', value: soldUnits, color: '#0f172a' }, // brand-slate
    { name: 'محجوز', value: reservedUnits, color: '#f59e0b' }, // amber-500
    { name: 'متاح', value: availableUnits, color: '#10b981' }, // emerald-500
  ];

  const barData = [
    { name: 'المرحلة 1', المتوقع: 45000000, المحصل: 32000000 },
    { name: 'المرحلة 2', المتوقع: 55000000, المحصل: 15000000 },
    { name: 'المرحلة 3', المتوقع: 30000000, المحصل: 0 },
  ];

  return (
    <>
      

      <div className="p-8 flex-1 overflow-y-auto max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-6 mb-8">
          <Link href="/realestate/projects">
            <button className="bg-white border border-slate-200 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer text-slate-500 hover:bg-slate-50 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          {isSimulatingLoad ? (
            <Skeleton className="h-8 w-64" />
          ) : (
            <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
          )}
        </div>

        {isSimulatingLoad ? (
          <div className="flex flex-col gap-8">
            {/* Project Header Skeleton */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col gap-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <div className="mt-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </div>

            {/* Hierarchy Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="flex flex-col gap-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Project Header */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-slate/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 text-slate-500 font-medium mb-4">
                  <MapPin className="w-4 h-4 text-brand-slate" /> {project.location}
                </div>
                
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-700">نسبة إنجاز المشروع</span>
                  <span className="font-mono text-brand-slate" dir="ltr">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden border border-slate-200">
                  <div className="bg-brand-slate h-3 rounded-full relative overflow-hidden" style={{ width: `${project.progress}%` }}>
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 md:px-8 md:border-r border-dashed border-slate-200 shrink-0">
                <div className="flex flex-col gap-1 text-center">
                  <span className="text-slate-500 text-sm font-semibold">مباع</span>
                  <span className="font-mono text-2xl text-emerald-600 font-bold" dir="ltr">{project.soldUnits}</span>
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <span className="text-slate-500 text-sm font-semibold">الإجمالي</span>
                  <span className="font-mono text-2xl text-slate-900 font-bold" dir="ltr">{project.totalUnits}</span>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-brand-slate transition-colors group">
                <div className="text-slate-500 text-sm font-semibold mb-1">القيمة الإجمالية (المتوقع)</div>
                <div className="font-mono text-xl font-bold text-slate-900 group-hover:text-brand-slate transition-colors" dir="ltr">
                  {(totalRevenue / 1000000).toFixed(1)}M EGP
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-brand-slate transition-colors group">
                <div className="text-slate-500 text-sm font-semibold mb-1">المحصل الفعلي (Cash)</div>
                <div className="font-mono text-xl font-bold text-emerald-600" dir="ltr">
                  {(collectedRevenue / 1000000).toFixed(1)}M EGP
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-brand-slate transition-colors group">
                <div className="text-slate-500 text-sm font-semibold mb-1">متوسط سعر الوحدة</div>
                <div className="font-mono text-xl font-bold text-slate-900" dir="ltr">
                  {(avgPrice / 1000000).toFixed(2)}M EGP
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-brand-slate transition-colors group">
                <div className="text-slate-500 text-sm font-semibold mb-1">وحدات محجوزة (Pending)</div>
                <div className="font-mono text-xl font-bold text-amber-600" dir="ltr">
                  {reservedUnits} وحدات
                </div>
              </div>
            </div>

            {/* Dashboard Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Distribution */}
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6">حالة الوحدات (Sales Distribution)</h3>
                <div className="h-64 w-full" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => [`${value} وحدات`, 'الكمية']} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Revenue Cash Flow */}
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm lg:col-span-2">
                <h3 className="font-bold text-slate-900 mb-6">التدفقات النقدية حسب المرحلة (Cash Flow)</h3>
                <div className="h-64 w-full" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={(value) => `${value / 1000000}M`} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} formatter={(value: any) => [`${(Number(value) / 1000000).toFixed(1)}M EGP`, '']} />
                      <Legend iconType="circle" />
                      <Bar dataKey="المتوقع" fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      <Bar dataKey="المحصل" fill="#0f172a" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Hierarchy Section (Phases & Buildings) */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-slate-400" /> الهيكلة التنظيمية (Phases & Buildings)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phase 1 */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                  <h3 className="font-bold text-lg text-slate-900 mb-4 border-b border-slate-100 pb-2">المرحلة الأولى (Phase 1)</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-brand-slate/30 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-brand-slate/10 text-brand-slate flex items-center justify-center">
                          <Building className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-slate-700 group-hover:text-brand-slate">عمارة النرجس (Block A)</span>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">مكتمل</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-brand-slate/30 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-brand-slate/10 text-brand-slate flex items-center justify-center">
                          <Building className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-slate-700 group-hover:text-brand-slate">عمارة الياسمين (Block B)</span>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">مكتمل</span>
                    </div>
                  </div>
                </div>
                
                {/* Phase 2 */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                  <h3 className="font-bold text-lg text-slate-900 mb-4 border-b border-slate-100 pb-2">المرحلة الثانية (Phase 2)</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-brand-slate/30 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-brand-slate/10 text-brand-slate flex items-center justify-center">
                          <Building className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-slate-700 group-hover:text-brand-slate">عمارة اللوتس (Block C)</span>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded">قيد الإنشاء</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Units Inventory associated with this project */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Home className="w-5 h-5 text-slate-400" /> وحدات المشروع
              </h2>
              {projectUnits.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-slate-500">
                  لا توجد وحدات مضافة حالياً في هذا المشروع.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {projectUnits.map(unit => (
                    <Link href={`/realestate/${unit.id}`} key={unit.id}>
                      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:border-brand-slate transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-mono text-sm font-bold text-brand-slate">{unit.code}</span>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded ${unit.status === 'available' ? 'bg-emerald-100 text-emerald-700' : unit.status === 'sold' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-700'}`}>
                            {unit.status === 'available' ? 'متاح' : unit.status === 'sold' ? 'مباع' : 'محجوز'}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1">{unit.name}</h4>
                        <div className="text-sm text-slate-500 mb-3">{unit.type} • {unit.area} م²</div>
                        <div className="font-mono font-bold text-slate-900" dir="ltr">
                          {unit.price.toLocaleString('en-US')} EGP
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </>
  );
}
