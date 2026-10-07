"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      dir="rtl"
      className="toaster group font-tajawal"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-900 group-[.toaster]:border-slate-200 group-[.toaster]:shadow-sm rounded-lg border",
          description: "group-[.toast]:text-slate-500",
          actionButton:
            "group-[.toast]:bg-brand-slate group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500",
          error: "group-[.toaster]:bg-red-50 group-[.toaster]:text-red-600 group-[.toaster]:border-red-200",
          success: "group-[.toaster]:bg-emerald-50 group-[.toaster]:text-emerald-700 group-[.toaster]:border-emerald-200"
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
