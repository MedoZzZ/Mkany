import React from 'react';
import { User, FileText } from 'lucide-react';

export const ClientsPage: React.FC = () => {
  const mockClients = [
    { id: 'cl1', name: 'شركة الدلتا للصناعات', type: 'اعتباري', contact: 'م. خالد نصار', cases: 2, balance: 100000 },
    { id: 'cl2', name: 'أ. د. محمود سليم', type: 'طبيعي', contact: '010XXXXXXX', cases: 1, balance: 0 },
    { id: 'cl3', name: 'مجموعة الأفق العقارية', type: 'اعتباري', contact: 'أ. يوسف الشاذلي', cases: 4, balance: 25000 },
  ];

  const formatCurrency = (val: number) => {
    return (
      <span className="inline-flex flex-row-reverse items-center justify-end gap-1 font-mono text-[#2C2A29]" dir="ltr">
        <span className="font-serif text-[11px] text-[#66635D]">ج.م</span>
        <span>{new Intl.NumberFormat('en-US').format(val)}</span>
      </span>
    );
  };

  return (
    <div className="bg-white border" style={{ borderColor: '#E6E4DD', borderRadius: '0px', boxShadow: 'none' }}>
      <div className="p-6 border-b flex flex-col sm:flex-row sm:items-end justify-between gap-4" style={{ borderColor: '#E6E4DD' }}>
        <div>
          <h3 className="text-xl font-bold font-serif text-[#2C2A29]">سجل الموكلين والوكالات</h3>
          <p className="text-sm font-serif text-[#66635D] mt-2">
            إدارة بيانات الموكلين، الشركات، والأشخاص الطبيعيين.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#FBFBF9] text-[#2C2A29] text-sm font-bold font-serif hover:bg-[#F2F0E9] transition-colors border border-[#E6E4DD] flex items-center gap-2">
          <User size={16} />
          إضافة موكل جديد
        </button>
      </div>

      <div className="flex flex-col">
        {mockClients.map((client, idx) => (
          <div 
            key={client.id} 
            className="p-5 border-b last:border-b-0 hover:bg-[#FBFBF9] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
            style={{ borderColor: '#E6E4DD' }}
          >
            <div className="flex-1 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F2F0E9] flex items-center justify-center text-[#6B2D31] shrink-0 border border-[#E6E4DD]">
                <User size={18} />
              </div>
              <div>
                <h4 className="text-lg font-bold font-serif text-[#2C2A29] mb-1">{client.name}</h4>
                <div className="flex items-center gap-3 text-sm font-serif text-[#66635D]">
                  <span className="px-1.5 py-0.5 bg-[#FFFFFF] border border-[#E6E4DD] text-xs">{client.type}</span>
                  <span>{client.contact}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6 min-w-[250px]">
              <div className="flex items-center gap-2 text-sm font-serif text-[#66635D]">
                <FileText size={16} className="text-[#6B2D31]" />
                <span className="font-bold text-[#2C2A29] mx-1">{client.cases}</span>
                ملفات نشطة
              </div>
              <div className="flex-1 text-right">
                <div className="text-xs font-serif text-[#66635D] mb-1">الرصيد المدين</div>
                <div className={`text-sm font-bold ${client.balance > 0 ? 'text-[#6B2D31]' : 'text-[#2C2A29]'}`}>
                  {formatCurrency(client.balance)}
                </div>
              </div>
            </div>
            
            <div className="shrink-0 flex items-center justify-end">
              <button className="text-sm font-bold font-serif text-[#6B2D31] hover:underline">
                عرض التفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
