"use client";

import Link from "next/link";
import { UserCircle, ArrowRight, Save, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLegal } from "@/hooks/useLegal";
import { useRouter } from "next/navigation";
import { LegalCase } from "@/types";

const caseSchema = z.object({
  title: z.string().min(5, { message: "عنوان القضية مطلوب (5 أحرف على الأقل)" }),
  client: z.string().min(1, { message: "اسم الموكل مطلوب" }),
  code: z.string().min(1, { message: "رقم الدعوى الداخلي مطلوب" }),
  court: z.string().min(1, { message: "المحكمة المختصة مطلوبة" }),
  level: z.string().min(1, { message: "درجة التقاضي مطلوبة" }),
  description: z.string().optional(),
});

type CaseFormValues = z.infer<typeof caseSchema>;

export default function NewCaseFile() {
  const { addCase } = useLegal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      level: "ابتدائي",
    }
  });

  const onSubmit = (data: CaseFormValues) => {
    const newCase: LegalCase = {
      id: Math.random().toString(36).substring(7),
      code: data.code,
      title: data.title,
      client: data.client,
      status: "قيد البحث", // Default initial status
      statusType: "warning", 
      lastUpdate: new Date().toLocaleDateString('ar-EG')
    };

    addCase(newCase);
    router.push('/legal/cases');
  };

  return (
    <>
      

      <div className="p-8 flex-1 overflow-y-auto max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-6 mb-8">
          <Link href="/legal/cases">
            <button className="bg-white border border-slate-200 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer text-slate-500 hover:bg-slate-50 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">فتح ملف قضية جديد</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">عنوان القضية / الدعوى</label>
            <input 
              type="text" 
              {...register("title")}
              className={`border rounded-lg px-4 py-2 outline-none focus:ring-1 ${errors.title ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-steel focus:ring-brand-steel'}`} 
              placeholder="مثال: نزاع ضريبي - الإقرار السنوي 2024" 
            />
            {errors.title && <span className="text-red-500 text-xs font-semibold">{errors.title.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">الموكل / العميل</label>
              <select 
                {...register("client")}
                className={`border rounded-lg px-4 py-2 outline-none bg-white focus:ring-1 ${errors.client ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-steel focus:ring-brand-steel'}`}
              >
                <option value="">اختر الموكل...</option>
                <option value="شركة النيل للإنشاءات">شركة النيل للإنشاءات</option>
                <option value="محمد عبدالله خليل">محمد عبدالله خليل</option>
                <option value="البنك التجاري">البنك التجاري</option>
              </select>
              {errors.client && <span className="text-red-500 text-xs font-semibold">{errors.client.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">رقم الدعوى الداخلي (Code)</label>
              <input 
                type="text" 
                {...register("code")}
                className={`border rounded-lg px-4 py-2 font-mono outline-none focus:ring-1 ${errors.code ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-steel focus:ring-brand-steel'}`} 
                placeholder="CASE-2026-001" 
                dir="ltr" 
              />
              {errors.code && <span className="text-red-500 text-xs font-semibold">{errors.code.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">المحكمة المختصة</label>
              <input 
                type="text" 
                {...register("court")}
                className={`border rounded-lg px-4 py-2 outline-none focus:ring-1 ${errors.court ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-steel focus:ring-brand-steel'}`} 
                placeholder="مثال: المحكمة الاقتصادية" 
              />
              {errors.court && <span className="text-red-500 text-xs font-semibold">{errors.court.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">درجة التقاضي</label>
              <select 
                {...register("level")}
                className={`border rounded-lg px-4 py-2 outline-none bg-white focus:ring-1 ${errors.level ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-steel focus:ring-brand-steel'}`}
              >
                <option value="ابتدائي">ابتدائي</option>
                <option value="استئناف">استئناف</option>
                <option value="نقض">نقض</option>
              </select>
              {errors.level && <span className="text-red-500 text-xs font-semibold">{errors.level.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">وصف مختصر للنزاع</label>
            <textarea 
              {...register("description")}
              className="border border-slate-200 rounded-lg px-4 py-2 outline-none focus:border-brand-steel focus:ring-1 focus:ring-brand-steel resize-none" 
              rows={4} 
              placeholder="اكتب ملخصاً هنا..."
            ></textarea>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200 gap-4 mt-2">
            <Link href="/legal/cases">
              <button type="button" className="px-6 py-2 border border-slate-200 rounded-lg font-semibold text-slate-600 hover:bg-slate-50">إلغاء</button>
            </Link>
            <button type="submit" disabled={isSubmitting} className="bg-brand-steel text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-brand-steel/90 transition-colors active:scale-98 disabled:opacity-50">
              <Save className="w-4 h-4" /> فتح الملف
            </button>
          </div>

        </form>
      </div>
    </>
  );
}
