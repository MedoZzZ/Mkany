import React from 'react';
import { mockLegalDeadlines } from '../../../data/mockData';

export const DeadlinesPage: React.FC = () => {
  return (
    <div className="bg-white border" style={{ borderColor: '#E6E4DD', borderRadius: '0px', boxShadow: 'none' }}>
      <div className="p-6 border-b" style={{ borderColor: '#E6E4DD' }}>
        <h3 className="text-xl font-bold font-serif text-[#2C2A29]">سجل مواعيد السقوط والطعون</h3>
        <p className="text-sm font-serif text-[#66635D] mt-2">
          قاعدة الإثبات: تتبع المواعيد الحتمية لتقديم المذكرات والطعون مع تصعيد تلقائي.
        </p>
      </div>

      <div className="flex flex-col">
        {mockLegalDeadlines.map((d, idx) => (
          <div 
            key={d.id} 
            className="p-6 border-b last:border-b-0 flex flex-col md:flex-row md:items-center justify-between gap-6"
            style={{ 
              borderColor: '#E6E4DD',
              backgroundColor: d.isPeremptory && d.daysRemaining <= 3 ? '#FFF1F1' : '#FFFFFF'
            }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-bold font-serif text-[#2C2A29]">{d.deadlineType}</span>
                {d.isPeremptory && <span className="px-2 py-0.5 text-xs font-bold font-serif bg-[#DA1E28] text-white">سقوط حق (حتمي)</span>}
              </div>
              <div className="text-sm font-serif text-[#66635D] flex items-center gap-3">
                <span>قضية: <strong className="font-mono text-[#2C2A29]">{d.caseNumber}</strong></span>
                <span className="w-1 h-1 rounded-full bg-[#E6E4DD]" />
                <span>المسؤول: <strong className="text-[#2C2A29]">{d.responsiblePerson}</strong></span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-xs font-serif text-[#66635D] mb-1">تاريخ الاستحقاق</div>
                <div className="text-sm font-mono font-bold text-[#2C2A29]" dir="ltr">{d.dueDate}</div>
              </div>
              
              <div className="text-right">
                <div className="text-xs font-serif text-[#66635D] mb-1">المهلة</div>
                <div className={`text-sm font-mono font-bold ${d.daysRemaining <= 3 ? 'text-[#DA1E28]' : 'text-[#8A6D3B]'}`} dir="ltr">
                  {d.daysRemaining}D
                </div>
              </div>
              
              <div className="shrink-0 flex flex-col items-center w-32 border-l pl-4 border-[#E6E4DD]">
                <span className={`text-xs mb-2 font-bold font-serif ${d.evidenceSubmitted ? 'text-[#198038]' : 'text-[#DA1E28]'}`}>
                  {d.evidenceSubmitted ? 'تم إيداع الدليل' : 'مطلوب إثبات'}
                </span>
                <button
                  className={`w-full py-1.5 text-xs font-bold font-serif transition-colors border ${d.evidenceSubmitted ? 'bg-[#FBFBF9] text-[#2C2A29] border-[#E6E4DD]' : 'bg-[#6B2D31] text-white border-[#6B2D31] hover:bg-[#502124]'}`}
                  disabled={d.evidenceSubmitted}
                >
                  {d.evidenceSubmitted ? 'عرض المستند' : 'إرفاق وتأكيد'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
