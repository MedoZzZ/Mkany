import React from 'react';
import { mockLegalHearings } from '../../../data/mockData';

export const HearingsPage: React.FC = () => {
  return (
    <div className="bg-white border" style={{ borderColor: '#E6E4DD', borderRadius: '0px', boxShadow: 'none' }}>
      <div className="p-6 border-b" style={{ borderColor: '#E6E4DD' }}>
        <h3 className="text-xl font-bold font-serif text-[#2C2A29]">جدول جلسات المحاكمات</h3>
        <p className="text-sm font-serif text-[#66635D] mt-2">
          قاعدة الإثبات: لا يجوز تسجيل تأجيل جلسة دون إدخال تاريخ الجلسة القادمة واسم القاضي.
        </p>
      </div>

      <div className="flex flex-col">
        {mockLegalHearings.map((h, idx) => (
          <div 
            key={h.id} 
            className="p-6 border-b last:border-b-0 hover:bg-[#FBFBF9] transition-colors flex flex-col md:flex-row gap-6"
            style={{ borderColor: '#E6E4DD' }}
          >
            {/* Monospace Datetime Block */}
            <div className="md:w-48 shrink-0 flex flex-col items-start md:border-l pl-4 border-[#E6E4DD]">
              <div className="text-lg font-bold font-mono text-[#6B2D31]" dir="ltr">{h.hearingDate}</div>
              <div className="text-sm font-mono text-[#66635D]" dir="ltr">{h.hearingTime}</div>
              <div className="mt-4 px-2 py-1 bg-[#FBFBF9] border border-[#E6E4DD] text-xs font-mono font-bold text-[#2C2A29]">
                {h.caseNumber}
              </div>
            </div>

            {/* Serif Narrative Block */}
            <div className="flex-1 flex flex-col gap-3">
              <h4 className="text-lg font-bold font-serif text-[#2C2A29]">{h.clientName}</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-serif text-[#66635D]">
                <span>المحكمة: <strong className="text-[#2C2A29]">{h.courtHall}</strong></span>
                <span>المحامي: <strong className="text-[#2C2A29]">{h.attendingLawyer}</strong></span>
              </div>
              <div className="p-4 bg-[#FBFBF9] border border-[#E6E4DD] text-sm font-serif text-[#2C2A29] leading-relaxed">
                <span className="font-bold text-[#6B2D31]">الإجراء المطلوب: </span>
                {h.requiredAction}
              </div>
            </div>

            {/* Action */}
            <div className="shrink-0 flex items-center justify-end">
              <button className="px-4 py-2 border border-[#2C2A29] text-[#2C2A29] bg-white hover:bg-[#2C2A29] hover:text-white transition-colors text-sm font-bold font-serif">
                إثبات النتيجة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
