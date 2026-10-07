"use client";

import Link from "next/link";
import Image from "next/image";
import { UserCircle, Loader2, MapPin } from "lucide-react";
import { useRealEstate } from "@/hooks/useRealEstate";

export default function RealEstateProjects() {
  const { projects, isLoading, error } = useRealEstate();

  return (
    <>
      

      <div className="p-8 flex-1 overflow-y-auto max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-brand-slate mb-6">
          المشاريع (Projects)
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-20 text-brand-slate">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-slate-500 py-10 text-center">
            لا توجد مشاريع.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Link
                href={`/realestate/projects/${project.id}`}
                key={project.id}
              >
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm hover:-translate-y-1 transition-all active:scale-98 cursor-pointer overflow-hidden flex flex-col">
                  {/* Thumbnail Image Section */}
                  <div className="h-48 bg-slate-200 relative w-full">
                    <Image
                      src={`https://images.unsplash.com/photo-${index % 2 === 0 ? "1600585154340-be6161a56a0c" : "1512917774080-9991f1c4c750"}?auto=format&fit=crop&w=800&q=80`}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
                      نشط
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 font-medium mb-6">
                      <MapPin className="w-4 h-4" /> {project.location}
                    </div>

                    <div className="mt-auto">
                      <div className="flex justify-between text-sm font-semibold mb-2">
                        <span className="text-slate-700">نسبة الإنجاز</span>
                        <span className="font-mono" dir="ltr">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6 overflow-hidden border border-slate-200">
                        <div
                          className="bg-brand-slate h-2.5 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between border-t border-dashed border-slate-200 pt-4 text-sm font-semibold">
                        <div className="flex flex-col gap-1">
                          <span className="text-slate-500">
                            الوحدات المباعة
                          </span>
                          <span
                            className="font-mono text-lg text-emerald-600"
                            dir="ltr"
                          >
                            {project.soldUnits}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 text-left">
                          <span className="text-slate-500">إجمالي الوحدات</span>
                          <span
                            className="font-mono text-lg text-slate-900"
                            dir="ltr"
                          >
                            {project.totalUnits}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
