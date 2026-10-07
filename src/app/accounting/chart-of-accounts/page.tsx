"use client";

import Link from "next/link";
import { FolderTree, ChevronDown, ChevronRight, Loader2, ArrowRight } from "lucide-react";
import { useAccounting } from "@/hooks/useAccounting";
import { useState } from "react";
import { AccountNode } from "@/types";

const AccountTreeNode = ({ node, level = 0 }: { node: AccountNode, level?: number }) => {
  const [isExpanded, setIsExpanded] = useState(level < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="w-full">
      <div 
        className={`flex items-center justify-between p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors ${level === 0 ? 'bg-slate-50/50' : ''}`}
        style={{ paddingRight: `${level * 2 + 1}rem` }}
      >
        <div className="flex items-center gap-3">
          {hasChildren ? (
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="p-1 hover:bg-slate-200 rounded text-slate-500"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          ) : (
            <div className="w-6"></div> // spacer
          )}
          <span className={`font-mono ${level === 0 ? 'font-bold text-slate-900' : 'text-slate-500'}`}>
            {node.code}
          </span>
          <span className={`font-medium ${level === 0 ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
            {node.name}
          </span>
        </div>
        <div className={`font-mono font-medium ${node.isNegative ? 'text-red-600' : 'text-slate-900'}`} dir="ltr">
          {node.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="flex flex-col w-full">
          {node.children!.map(child => (
            <AccountTreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function ChartOfAccountsPage() {
  const { chartOfAccounts, isLoading, error } = useAccounting();

  return (
    <>
      

      <div className="p-8 max-w-6xl mx-auto w-full flex-1 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/accounting" className="text-sm font-semibold text-brand-slate flex items-center gap-1 mb-2 hover:underline">
              <ArrowRight className="w-4 h-4" /> عودة للرئيسية
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <FolderTree className="w-8 h-8 text-brand-slate" /> شجرة الحسابات
            </h1>
            <p className="text-slate-500 mt-2">عرض هرمي للأصول، الخصوم، حقوق الملكية، الإيرادات، والمصروفات</p>
          </div>
          <button className="bg-brand-slate hover:bg-slate-800 text-white px-5 py-2.5 rounded-md font-semibold transition-all active:scale-98 shadow-sm">
            إضافة حساب جديد
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20 text-brand-slate"><Loader2 className="w-8 h-8 animate-spin" /></div>
        ) : error ? (
          <div className="text-red-500 py-10 text-center font-bold">{error}</div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="bg-slate-100/50 p-4 border-b border-slate-200 flex justify-between items-center font-bold text-slate-700">
              <span>الحساب</span>
              <span>الرصيد (EGP)</span>
            </div>
            <div className="flex flex-col w-full">
              {chartOfAccounts.map(node => (
                <AccountTreeNode key={node.id} node={node} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
