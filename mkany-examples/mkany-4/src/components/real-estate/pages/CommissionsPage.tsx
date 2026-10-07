import React from 'react';
import { mockCommissions } from '../../../data/mockData';

export const CommissionsPage: React.FC = () => {
    const formatCurrency = (val: number) => {
    return (
      <span className="inline-flex flex-row-reverse items-center justify-end gap-1 w-full" dir="ltr">
        <span className="font-cairo text-[10px]">ج.م</span>
        <span className="font-mono">{new Intl.NumberFormat('en-US').format(val)}</span>
      </span>
    );
  };

  return (
    <div className="bg-white border p-5" style={{ borderColor: '#D8DDE6', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.10)' }}>
      <div className="pb-4 border-b" style={{ borderColor: '#D8DDE6' }}>
        <h3 className="text-sm font-bold text-[#16325C]">هيكل العمولات متعددة الأطراف (Multi-Party Commissions Engine)</h3>
        <p className="text-xs text-[#54698D]">توزيع مستحقات عمولة البيع بين الشركة، مندوب المبيعات الداخلي، الوسيط العقاري الخارجي، ومدير الفريق</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {mockCommissions.map((com) => (
          <div key={com.id} className="p-4 border bg-[#FAFCFE]" style={{ borderColor: '#D8DDE6', borderRadius: '4px' }}>
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: '#ECEFF5' }}>
              <span className="text-xs font-bold font-mono-code text-[#0070D2]">عقد رقم: {com.contractNumber}</span>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded ${com.status === 'approved' ? 'bg-[#E6F7EE] text-[#04844B]' : 'bg-[#FFF5E6] text-[#E87800]'}`}>
                {com.status === 'approved' ? 'معتمد للصرف' : 'مستحق قيد الاعتماد'}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-[#54698D]">إجمالي العمولة المستحقة:</span>
              <span className="text-sm font-bold font-mono-numbers text-[#16325C]">{formatCurrency(com.totalCommission)}</span>
            </div>

            <div className="mt-3 space-y-1.5 text-xs pt-2 border-t" style={{ borderColor: '#ECEFF5' }}>
              <div className="flex justify-between">
                <span className="text-[#54698D]">حصة الشركة (50%):</span>
                <span className="font-mono-numbers font-medium text-[#16325C]">{formatCurrency(com.companyShare)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#54698D]">مسؤول المبيعات ({com.salesRepName}):</span>
                <span className="font-mono-numbers font-medium text-[#0070D2]">{formatCurrency(com.salesRepShare)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#54698D]">الوسيط العقاري ({com.brokerName}):</span>
                <span className="font-mono-numbers font-medium text-[#04844B]">{formatCurrency(com.brokerShare)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#54698D]">مدير الفريق:</span>
                <span className="font-mono-numbers font-medium text-[#54698D]">{formatCurrency(com.teamManagerShare)}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t flex gap-2" style={{ borderColor: '#ECEFF5' }}>
                <button className="flex-1 py-1.5 bg-[#0070D2] text-white text-xs font-semibold rounded hover:bg-[#005FB2]" disabled={com.status === 'approved'}>
                    اعتماد الصرف
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};