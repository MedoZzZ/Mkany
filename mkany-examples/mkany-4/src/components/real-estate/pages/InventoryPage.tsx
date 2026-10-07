import React, { useState } from 'react';
import { mockPropertyUnits } from '../../../data/mockData';
import { UnitStatus } from '../../../types';

export const InventoryPage: React.FC = () => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [isCompactTable, setIsCompactTable] = useState<boolean>(false);

  const formatCurrency = (val: number) => {
    return (
      <span className="inline-flex flex-row-reverse items-center justify-end gap-1" dir="ltr">
        <span className="font-cairo text-[10px] text-gray-500">ج.م</span>
        <span className="font-mono">{new Intl.NumberFormat('en-US').format(val)}</span>
      </span>
    );
  };

  const getStatusBadge = (status: UnitStatus) => {
    switch (status) {
      case 'available': return <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-[#E6F7EE] text-[#04844B] rounded-[2px]">متاح للبيع</span>;
      case 'reserved': return <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-[#FFF5E6] text-[#E87800] rounded-[2px]">محجوز (TTL)</span>;
      case 'contracted': return <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-[#EBF5FF] text-[#0070D2] rounded-[2px]">موقع عقد</span>;
      case 'sold': return <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-[#F0F0F0] text-[#706E6B] rounded-[2px]">مباع ومسلم</span>;
      case 'blocked': return <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-[#FDE8E8] text-[#C23934] rounded-[2px]">محظور</span>;
    }
  };

  const filteredUnits = selectedStatusFilter === 'all'
    ? mockPropertyUnits
    : mockPropertyUnits.filter((u) => u.status === selectedStatusFilter);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border p-5" style={{ borderColor: '#D8DDE6', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.10)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: '#D8DDE6' }}>
          <div>
            <h2 className="text-base font-bold font-cairo text-[#16325C]">مخطط التوزيع الجغرافي وحالات الوحدات</h2>
            <p className="text-xs text-[#54698D]">مصفوفة كود الوحدات مع تمييز الحالة اللحظية ومنع الحجز المزدوج</p>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'الكل (8)' },
              { id: 'available', label: 'متاح (3)' },
              { id: 'reserved', label: 'محجوز (2)' },
              { id: 'contracted', label: 'عقد (1)' },
              { id: 'sold', label: 'مباع (1)' },
              { id: 'blocked', label: 'محظور (1)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedStatusFilter(f.id)}
                className="px-2.5 py-1 text-xs font-semibold transition-all"
                style={{
                  borderRadius: '2px',
                  backgroundColor: selectedStatusFilter === f.id ? '#0070D2' : '#F4F6F9',
                  color: selectedStatusFilter === f.id ? '#FFFFFF' : '#54698D',
                  border: selectedStatusFilter === f.id ? '1px solid #0070D2' : '1px solid #D8DDE6',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className="p-3 border transition-all hover:shadow-md cursor-pointer"
              style={{
                borderColor: unit.status === 'reserved' ? '#E87800' : '#D8DDE6',
                borderRadius: '4px',
                backgroundColor: unit.status === 'available' ? '#FFFFFF' : '#FAFCFE',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono-code text-[#16325C]">{unit.code}</span>
                {getStatusBadge(unit.status)}
              </div>
              <div className="mt-2 text-xs font-semibold text-[#16325C]">{unit.projectName}</div>
              <div className="text-[11px] text-[#54698D]">{unit.type} • {unit.area} م² • {unit.direction}</div>
              <div className="mt-2 pt-2 border-t flex items-center justify-between" style={{ borderColor: '#ECEFF5' }}>
                <span className="text-[11px] text-[#54698D]">السعر الإجمالي:</span>
                <span className="text-xs font-bold font-mono-numbers text-[#16325C]">{formatCurrency(unit.price)}</span>
              </div>
              {unit.ttlRemainingHours !== undefined && (
                <div className="mt-1.5 p-1 bg-[#FFF5E6] rounded text-[10px] text-[#E87800] flex items-center justify-between font-mono-code">
                  <span>مهلة الحجز (TTL):</span>
                  <span className="font-bold">{unit.ttlRemainingHours} ساعة متبقية</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border" style={{ borderColor: '#D8DDE6', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.10)' }}>
        <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: '#D8DDE6' }}>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#16325C]">سجل الوحدات التفصيلي والأسعار</h3>
            <span className="text-xs px-2 py-0.5 bg-[#F4F6F9] text-[#54698D] rounded">{filteredUnits.length} وحدة</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-[#54698D] flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isCompactTable}
                onChange={(e) => setIsCompactTable(e.target.checked)}
                className="rounded border-[#D8DDE6] text-[#0070D2]"
              />
              <span>وضع العرض المكثف (Compact)</span>
            </label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#ECEFF5] text-[#54698D] border-b" style={{ borderColor: '#D8DDE6' }}>
              <tr>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">كود الوحدة</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">المشروع / المرحلة</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">النوع والمساحة</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">الاتجاه والدور</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">حالة الوحدة</th>
                <th className="px-4 py-3 font-semibold text-left whitespace-nowrap">السعر الإجمالي</th>
                <th className="px-4 py-3 font-semibold text-center whitespace-nowrap">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnits.map((u, idx) => (
                <tr key={u.id} className={`border-b transition-colors hover:bg-[#EBF5FF] ${idx % 2 === 1 ? 'bg-[#ECEFF5]' : 'bg-white'}`} style={{ borderColor: '#D8DDE6' }}>
                  <td className={`px-4 ${isCompactTable ? 'py-1.5' : 'py-3'} font-bold font-mono text-[#0070D2] whitespace-nowrap`}>{u.code}</td>
                  <td className={`px-4 ${isCompactTable ? 'py-1.5' : 'py-3'} text-[#16325C] min-w-[150px]`}>
                    <span className="font-semibold">{u.projectName}</span> - {u.phase}
                  </td>
                  <td className={`px-4 ${isCompactTable ? 'py-1.5' : 'py-3'} text-[#54698D] whitespace-nowrap`}>{u.type} (<span dir="ltr" className="inline-flex flex-row-reverse gap-1"><span className="font-cairo text-[10px]">م²</span><span>{u.area}</span></span>)</td>
                  <td className={`px-4 ${isCompactTable ? 'py-1.5' : 'py-3'} text-[#54698D] whitespace-nowrap`}>{u.direction} • الدور {u.floor === 0 ? 'الأرضي' : u.floor}</td>
                  <td className={`px-4 ${isCompactTable ? 'py-1.5' : 'py-3'} whitespace-nowrap`}>{getStatusBadge(u.status)}</td>
                  <td className={`px-4 ${isCompactTable ? 'py-1.5' : 'py-3'} font-bold font-mono text-[#16325C] text-left whitespace-nowrap`}>{formatCurrency(u.price)}</td>
                  <td className={`px-4 ${isCompactTable ? 'py-1.5' : 'py-3'} text-center whitespace-nowrap`}>
                    <button className="px-2 py-0.5 text-xs text-[#0070D2] hover:underline">عرض التفاصيل</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};