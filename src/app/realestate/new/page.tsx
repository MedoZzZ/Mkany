"use client";

import Link from "next/link";
import { UserCircle, ArrowRight, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRealEstate } from "@/hooks/useRealEstate";
import { useRouter } from "next/navigation";
import { RealEstateUnit } from "@/types";
import { toast } from "sonner";

const unitSchema = z.object({
  projectId: z.string().min(1, { message: "المشروع مطلوب" }),
  code: z.string().min(1, { message: "كود الوحدة مطلوب" }),
  name: z.string().min(3, { message: "الاسم الوصفي مطلوب" }),
  type: z.enum(["فيلا", "شقة", "تجاري", "إداري", "شاليه"]),
  area: z.number({ message: "المساحة مطلوبة" }).positive(),
  orientation: z.string().min(1, { message: "الواجهة مطلوبة" }),
  price: z.number({ message: "السعر مطلوب" }).positive(),
});

type UnitFormValues = z.infer<typeof unitSchema>;

export default function NewUnit() {
  const { addUnit } = useRealEstate();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UnitFormValues>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      type: "فيلا",
      orientation: "بحري",
    }
  });

  const onSubmit = (data: UnitFormValues) => {
    const newUnit: RealEstateUnit = {
      id: Math.random().toString(36).substring(7),
      code: data.code,
      name: data.name,
      type: data.type,
      project: data.projectId,
      status: "available", // Default status
      price: data.price,
      area: data.area,
      orientation: data.orientation
    };

    addUnit(newUnit);
    toast.success("تم إضافة الوحدة بنجاح");
    router.push('/realestate');
  };

  return (
    <>
      

      <div className="p-8 flex-1 overflow-y-auto max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-6 mb-8">
          <Link href="/realestate">
            <button className="bg-white border border-slate-200 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer text-slate-500 hover:bg-slate-50 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">إضافة وحدة عقارية جديدة</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">المشروع</label>
              <select 
                {...register("projectId")}
                className={`border rounded-lg px-4 py-2 outline-none focus:ring-1 bg-white ${errors.projectId ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-slate focus:ring-brand-slate'}`}
              >
                <option value="">اختر المشروع...</option>
                <option value="p1">كمبوند الساحل ريزيدنس</option>
                <option value="p2">برج زايد التجاري</option>
              </select>
              {errors.projectId && <span className="text-red-500 text-xs font-semibold">{errors.projectId.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">كود الوحدة (تلقائي/يدوي)</label>
              <input 
                type="text" 
                {...register("code")}
                className={`border rounded-lg px-4 py-2 font-mono outline-none focus:ring-1 ${errors.code ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-slate focus:ring-brand-slate'}`} 
                placeholder="VIL-A-01" 
                dir="ltr" 
              />
              {errors.code && <span className="text-red-500 text-xs font-semibold">{errors.code.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">اسم الوحدة الوصفي</label>
            <input 
              type="text" 
              {...register("name")}
              className={`border rounded-lg px-4 py-2 outline-none focus:ring-1 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-slate focus:ring-brand-slate'}`} 
              placeholder="فيلا مستقلة - نموذج A" 
            />
            {errors.name && <span className="text-red-500 text-xs font-semibold">{errors.name.message}</span>}
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">النوع</label>
              <select 
                {...register("type")}
                className="border border-slate-200 rounded-lg px-4 py-2 outline-none bg-white focus:ring-1 focus:ring-brand-slate focus:border-brand-slate"
              >
                <option value="فيلا">فيلا</option>
                <option value="شقة">شقة</option>
                <option value="تجاري">تجاري</option>
                <option value="إداري">إداري</option>
                <option value="شاليه">شاليه</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">المساحة (م²)</label>
              <input 
                type="number" 
                {...register("area", { valueAsNumber: true })}
                className={`border rounded-lg px-4 py-2 font-mono outline-none text-left focus:ring-1 ${errors.area ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-slate focus:ring-brand-slate'}`} 
                placeholder="350" 
                dir="ltr" 
              />
              {errors.area && <span className="text-red-500 text-xs font-semibold">{errors.area.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">الواجهة</label>
              <select 
                {...register("orientation")}
                className="border border-slate-200 rounded-lg px-4 py-2 outline-none bg-white focus:ring-1 focus:ring-brand-slate focus:border-brand-slate"
              >
                <option value="بحري">بحري</option>
                <option value="قبلي">قبلي</option>
                <option value="شرقي">شرقي</option>
                <option value="غربي">غربي</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-dashed border-slate-200">
            <label className="text-sm font-semibold text-slate-700">السعر الإجمالي (EGP)</label>
            <input 
              type="number" 
              {...register("price", { valueAsNumber: true })}
              className={`border rounded-lg px-4 py-3 font-mono text-xl font-bold outline-none text-left focus:ring-1 ${errors.price ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-slate focus:ring-brand-slate'}`} 
              placeholder="12500000" 
              dir="ltr" 
            />
            {errors.price && <span className="text-red-500 text-xs font-semibold">{errors.price.message}</span>}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200 gap-4 mt-2">
            <Link href="/realestate">
              <button type="button" className="px-6 py-2 border border-slate-200 rounded-lg font-semibold text-slate-600 hover:bg-slate-50">إلغاء</button>
            </Link>
            <button type="submit" disabled={isSubmitting} className="bg-brand-slate text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-brand-slate/90 transition-colors active:scale-98 disabled:opacity-50">
              <Save className="w-4 h-4" /> حفظ الوحدة
            </button>
          </div>

        </form>
      </div>
    </>
  );
}
