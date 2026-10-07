"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout, Scale, Calculator, Building, GripVertical, Home } from "lucide-react";

export default function ModuleSwitcher() {
  const pathname = usePathname();

  // Hide the side navigator on the login page
  if (pathname === '/login') return null;

  const modules = [
    { name: "الرئيسية", path: "/dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "الزراعة", path: "/agriculture", icon: <Sprout className="w-5 h-5" />, color: "hover:bg-[#2D4739] hover:text-white" },
    { name: "القانونية", path: "/legal", icon: <Scale className="w-5 h-5" />, color: "hover:bg-[#1B263B] hover:text-white" },
    { name: "الحسابات", path: "/accounting", icon: <Calculator className="w-5 h-5" />, color: "hover:bg-[#0F172A] hover:text-white" },
    { name: "العقارات", path: "/realestate", icon: <Building className="w-5 h-5" />, color: "hover:bg-[#363537] hover:text-white" },
  ];

  return (
    <div className="fixed top-1/3 right-0 z-50 group flex items-start">
      {/* Collapsed Handle */}
      <div className="bg-brand-slate text-white p-2 rounded-l-lg shadow-lg cursor-pointer border border-r-0 border-white/10 relative z-10 h-[52px] flex items-center justify-center">
        <GripVertical className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Expanded Menu */}
      <div className="w-0 overflow-hidden group-hover:w-56 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] bg-white border-y border-l border-slate-200 shadow-xl rounded-l-xl opacity-0 group-hover:opacity-100 h-auto flex flex-col p-0 group-hover:p-3 gap-2 -mr-2 relative z-0">
        <div className="text-xs font-bold text-slate-400 mb-2 px-3 pt-2">التبديل السريع</div>
        {modules.map((mod) => {
          const isActive = pathname === mod.path || (mod.path !== '/' && pathname.startsWith(mod.path));
          return (
            <Link 
              key={mod.path} 
              href={mod.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors w-full whitespace-nowrap ${
                isActive ? 'bg-slate-100 text-slate-900 border border-slate-200' : 'text-slate-600 border border-transparent ' + (mod.color || 'hover:bg-slate-100 hover:text-slate-900')
              }`}
            >
              {mod.icon}
              <span>{mod.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
