import React from 'react';

export const FeesPage: React.FC = () => {
  const mockFees = [
    { id: 'f1', client: 'شركة الدلتا للصناعات', caseNum: 'ق/2026/1420', type: 'أتعاب محاماة', amount: 150000, paid: 50000, status: 'partial' },
    { id: 'f2', client: 'مجموعة الأفق العقارية', caseNum: 'ق/2026/0855', type: 'مصروفات دعوى (رسوم خبير)', amount: 25000, paid: 0, status: 'unpaid' },
    { id: 'f3', client: 'مؤسسة النور التجارية', caseNum: 'ق/2026/2210', type: 'أتعاب محاماة (مقدم)', amount: 75000, paid: 75000, status: 'paid' },
  ];

  const formatCurrency = (val: number) => {
    return (
      <span className="inline-flex flex-row-reverse items-center justify-end gap-1 w-full font-mono text-[#2C2A29]" dir="ltr">
        <span className="font-serif text-[11px] text-[#66635D]">ج.م</span>
        <span>{new Intl.NumberFormat('en-US').format(val)}</span>
      </span>
    );
  };

  return (
    <div className="bg-white border" style={{ borderColor: '#E6E4DD', borderRadius: '0px', boxShadow: 'none' }}>
      <div className="p-6 border-b flex flex-col sm:flex-row sm:items-end justify-between gap-4" style={{ borderColor: '#E6E4DD' }}>
        <div>
          <h3 className="text-xl font-bold font-serif text-[#2C2A29]">حسابات الموكلين والأتعاب</h3>
          <p className="text-sm font-serif text-[#66635D] mt-2">
            سجل المطالبات المالية والفواتير المستردة.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#6B2D31] text-white text-sm font-bold font-serif hover:bg-[#502124] transition-colors border border-[#6B2D31]">
          إصدار فاتورة أتعاب
        </button>
      </div>
      
      <div className="flex flex-col">
        {mockFees.map((f, idx) => (
          <div 
            key={f.id} 
            className="p-5 border-b last:border-b-0 hover:bg-[#FBFBF9] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
            style={{ borderColor: '#E6E4DD' }}
          >
            <div className="flex-1">
              <h4 className="text-lg font-bold font-serif text-[#2C2A29] mb-1">{f.client}</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-1.5 py-0.5 bg-[#F2F0E9] text-[#2C2A29] border border-[#E6E4DD]">
                  {f.caseNum}
                </span>
                <span className="text-sm font-serif text-[#66635D]">{f.type}</span>
              </div>
            </div>

            <div className="flex items-center gap-8 min-w-[300px]">
              <div className="flex-1">
                <div className="text-xs font-serif text-[#66635D] mb-1 text-left">إجمالي المبلغ</div>
                <div className="text-sm font-bold text-left">{formatCurrency(f.amount)}</div>
              </div>
              <div className="flex-1">
                <div className="text-xs font-serif text-[#66635D] mb-1 text-left">الرصيد المتبقي</div>
                <div className="text-sm font-bold text-left text-[#6B2D31]">{formatCurrency(f.amount - f.paid)}</div>
              </div>
            </div>

            <div className="shrink-0 flex items-center justify-end w-32">
              {f.status === 'paid' && <span className="font-serif text-sm font-bold text-[#66635D]">مسدد بالكامل</span>}
              {f.status === 'partial' && <button className="font-serif text-sm font-bold text-[#6B2D31] hover:underline">تسجيل تحصيل</button>}
              {f.status === 'unpaid' && <button className="font-serif text-sm font-bold text-[#6B2D31] hover:underline">تسجيل تحصيل</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
