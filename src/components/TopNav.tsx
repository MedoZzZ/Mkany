import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between px-10 h-20 bg-brand-slate text-white shrink-0">
      <div className="font-heading text-2xl font-bold tracking-wide">
        <Link href="/">
          MKANY <span className="text-brand-gold">ERP</span>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-left">
          <div className="font-semibold text-[15px] text-white">محمود عبد الرحمن</div>
          <div className="text-xs text-slate-400 font-medium">Super Admin</div>
        </div>
        <div className="w-11 h-11 rounded-full bg-slate-800 text-brand-gold flex items-center justify-center font-heading font-bold">
          MA
        </div>
      </div>
    </nav>
  );
}
