import React, { useState } from 'react';
import { Calendar, AlertOctagon, FileText } from 'lucide-react';
import { mockLegalCases } from '../../../data/mockData';

export const CasesPage: React.FC = () => {
  const [selectedConfidentiality, setSelectedConfidentiality] = useState('all');

  const filteredCases = selectedConfidentiality === 'all'
    ? mockLegalCases
    : mockLegalCases.filter((c) => c.confidentiality === selectedConfidentiality);

  const getConfidentialityBadge = (lvl: string) => {
    switch (lvl) {
      case 'عام': return <span className="font-serif text-[#66635D]">عام</span>;
      case 'خاص': return <span className="font-serif text-[#8A6D3B]">خاص</span>;
      case 'سري للغاية': return <span className="font-serif font-bold text-[#6B2D31]">سري للغاية</span>;
      default: return <span className="font-serif text-[#66635D]">{lvl}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Cases List */}
      <div className="bg-white border" style={{ borderColor: '#E6E4DD', borderRadius: '0px', boxShadow: 'none' }}>
        <div className="p-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: '#E6E4DD' }}>
          <div>
            <h3 className="text-lg font-bold font-serif text-[#2C2A29]">
              سجل الدعاوى القضائية
            </h3>
            <p className="text-sm font-serif text-[#66635D] mt-1">
              جدول الملفات النشطة والموكلين
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif text-[#66635D] ml-2">تصفية السرية:</span>
            {['all', 'عام', 'خاص', 'سري للغاية'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedConfidentiality(lvl)}
                className="px-3 py-1.5 text-xs font-serif transition-colors"
                style={{
                  borderRadius: '0px',
                  backgroundColor: selectedConfidentiality === lvl ? '#FBFBF9' : '#FFFFFF',
                  color: selectedConfidentiality === lvl ? '#6B2D31' : '#66635D',
                  border: selectedConfidentiality === lvl ? '1px solid #6B2D31' : '1px solid #E6E4DD',
                  fontWeight: selectedConfidentiality === lvl ? 'bold' : 'normal',
                }}
              >
                {lvl === 'all' ? 'الكل' : lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          {filteredCases.map((c, idx) => (
            <div 
              key={c.id} 
              className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FBFBF9] transition-colors border-b last:border-b-0"
              style={{ borderColor: '#E6E4DD' }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold font-mono text-[#2C2A29]">{c.caseNumber}</span>
                  <div className="w-1 h-1 rounded-full bg-[#E6E4DD]" />
                  <span className="text-sm font-serif text-[#66635D]">{c.matterType}</span>
                </div>
                <h4 className="text-xl font-bold font-serif text-[#6B2D31] mb-2">{c.clientName}</h4>
                <div className="flex items-center gap-4 text-xs font-serif text-[#66635D]">
                  <span className="flex items-center gap-1"><FileText size={14} /> {c.courtName}</span>
                  <span className="flex items-center gap-1">المحامي: <strong className="text-[#2C2A29]">{c.assignedLawyer}</strong></span>
                  <span>{getConfidentialityBadge(c.confidentiality)}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 min-w-[200px]">
                <div className="text-right">
                  <div className="text-xs font-serif text-[#66635D] mb-1">الجلسة القادمة</div>
                  <div className="text-sm font-bold font-mono text-[#2C2A29]" dir="ltr">{c.nextHearingDate}</div>
                </div>
                <button className="text-sm font-bold font-serif text-[#6B2D31] hover:underline flex items-center gap-1">
                  عرض الملف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
