"use client";

import Link from "next/link";
import { UserCircle, ArrowRight, Save, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAccounting } from "@/hooks/useAccounting";
import { useRouter } from "next/navigation";

const journalSchema = z.object({
  date: z.string().min(1, { message: "التاريخ مطلوب" }),
  description: z.string().min(3, { message: "البيان مطلوب (3 أحرف على الأقل)" }),
  amount: z.number({ message: "المبلغ مطلوب" }).positive({ message: "يجب أن يكون المبلغ أكبر من صفر" }),
  debitAccount: z.string().min(1, { message: "حساب المدين مطلوب" }),
  creditAccount: z.string().min(1, { message: "حساب الدائن مطلوب" }),
});

type JournalFormValues = z.infer<typeof journalSchema>;

export default function NewJournalEntry() {
  const { addJournalEntry } = useAccounting();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JournalFormValues>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    }
  });

  const onSubmit = (data: JournalFormValues) => {
    const entryId = `JV-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    // Debit Line
    addJournalEntry({
      id: entryId,
      date: data.date,
      description: data.description,
      accountCode: "100" + Math.floor(Math.random() * 10), // Mock code
      accountName: data.debitAccount,
      debit: data.amount,
      credit: 0,
      status: "pending"
    });

    // Credit Line
    addJournalEntry({
      id: entryId,
      date: data.date,
      description: data.description,
      accountCode: "200" + Math.floor(Math.random() * 10), // Mock code
      accountName: data.creditAccount,
      debit: 0,
      credit: data.amount,
      status: "pending"
    });

    router.push('/accounting');
  };

  return (
    <>
      

      <div className="p-8 flex-1 overflow-y-auto max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-6 mb-8">
          <Link href="/accounting">
            <button className="bg-white border border-slate-200 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer text-slate-500 hover:bg-slate-50 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">إنشاء قيد يومية جديد</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">التاريخ</label>
              <input 
                type="date" 
                {...register("date")}
                className={`border rounded-lg px-4 py-2 outline-none focus:ring-1 ${errors.date ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-gold focus:ring-brand-gold'}`} 
              />
              {errors.date && <span className="text-red-500 text-xs font-semibold">{errors.date.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">المبلغ الإجمالي (EGP)</label>
              <input 
                type="number" 
                {...register("amount", { valueAsNumber: true })}
                className={`border rounded-lg px-4 py-2 font-mono text-left outline-none focus:ring-1 ${errors.amount ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-gold focus:ring-brand-gold'}`} 
                dir="ltr" 
                placeholder="0.00" 
              />
              {errors.amount && <span className="text-red-500 text-xs font-semibold">{errors.amount.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">البيان / الوصف</label>
            <input 
              type="text" 
              {...register("description")}
              className={`border rounded-lg px-4 py-2 outline-none focus:ring-1 ${errors.description ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-gold focus:ring-brand-gold'}`} 
              placeholder="وصف القيد..." 
            />
            {errors.description && <span className="text-red-500 text-xs font-semibold">{errors.description.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-dashed border-slate-200">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">حساب المدين (Debit)</label>
              <select 
                {...register("debitAccount")}
                className={`border rounded-lg px-4 py-2 outline-none focus:ring-1 bg-white ${errors.debitAccount ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-gold focus:ring-brand-gold'}`}
              >
                <option value="">اختر الحساب...</option>
                <option value="الخزينة الرئيسية">الخزينة الرئيسية</option>
                <option value="البنك الأهلي - جاري">البنك الأهلي - جاري</option>
                <option value="العملاء">العملاء</option>
                <option value="مصروفات إدارية">مصروفات إدارية</option>
              </select>
              {errors.debitAccount && <span className="text-red-500 text-xs font-semibold">{errors.debitAccount.message}</span>}
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">حساب الدائن (Credit)</label>
              <select 
                {...register("creditAccount")}
                className={`border rounded-lg px-4 py-2 outline-none focus:ring-1 bg-white ${errors.creditAccount ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-brand-gold focus:ring-brand-gold'}`}
              >
                <option value="">اختر الحساب...</option>
                <option value="المبيعات والإيرادات">المبيعات والإيرادات</option>
                <option value="الموردين">الموردين</option>
                <option value="الخزينة الرئيسية">الخزينة الرئيسية</option>
                <option value="رأس المال">رأس المال</option>
              </select>
              {errors.creditAccount && <span className="text-red-500 text-xs font-semibold">{errors.creditAccount.message}</span>}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200 gap-4 mt-2">
            <Link href="/accounting">
              <button type="button" className="px-6 py-2 border border-slate-200 rounded-lg font-semibold text-slate-600 hover:bg-slate-50">إلغاء</button>
            </Link>
            <button type="submit" disabled={isSubmitting} className="bg-brand-gold text-black px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-brand-gold/90 transition-colors active:scale-98 disabled:opacity-50">
              <Save className="w-4 h-4" /> حفظ وترحيل القيد
            </button>
          </div>

        </form>
      </div>
    </>
  );
}
