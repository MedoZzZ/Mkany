import React from 'react';
import { useAppRoute } from '../../common/RouteContext';

// Mock data extension
const extendedProjects = [
  { id: 'p1', name: 'مشروع جوهرة الشروق', type: 'سكني', phases: 3, buildings: 12, units: 120, available: 45, sold: 60, reserved: 15, completion: '85%' },
  { id: 'p2', name: 'مشروع كابيتال هايتس', type: 'إداري وتجاري', phases: 1, buildings: 2, units: 40, available: 0, sold: 40, reserved: 0, completion: '100%' },
  { id: 'p3', name: 'مشروع ريزيدنس التجمع', type: 'سكني فاخر', phases: 2, buildings: 8, units: 64, available: 14, sold: 30, reserved: 20, completion: '60%' },
];

export const ProjectsPage: React.FC = () => {
  const { currentPath, navigate } = useAppRoute();

  const pathParts = currentPath.split('/');
  const projectId = pathParts[3]; // /real-estate/projects/p1

  if (projectId) {
    const project = extendedProjects.find(p => p.id === projectId);
    if (!project) return <div>Project not found</div>;

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <button onClick={() => navigate('/real-estate/projects')} className="text-[#0070D2] hover:underline text-sm font-semibold">
            المشاريع
          </button>
          <span className="text-[#54698D] text-sm">/</span>
          <span className="text-[#16325C] text-sm font-bold">{project.name}</span>
        </div>
        
        <div className="bg-white border p-6" style={{ borderColor: '#D8DDE6', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.10)' }}>
          <h2 className="text-xl font-bold text-[#16325C] mb-4">{project.name} - التفاصيل</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-xs text-[#54698D] mb-1">النوع</div>
              <div className="font-semibold text-[#16325C]">{project.type}</div>
            </div>
            <div>
              <div className="text-xs text-[#54698D] mb-1">المراحل</div>
              <div className="font-mono-numbers font-semibold text-[#16325C]">{project.phases}</div>
            </div>
            <div>
              <div className="text-xs text-[#54698D] mb-1">المباني</div>
              <div className="font-mono-numbers font-semibold text-[#16325C]">{project.buildings}</div>
            </div>
            <div>
              <div className="text-xs text-[#54698D] mb-1">نسبة الإنجاز</div>
              <div className="font-mono-numbers font-semibold text-[#0070D2]">{project.completion}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border p-6 mt-4" style={{ borderColor: '#D8DDE6', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.10)' }}>
           <h3 className="text-sm font-bold text-[#16325C] mb-4">هيكل المشروع (المراحل والمباني)</h3>
           <div className="text-xs text-[#54698D]">
             (تصور مبدئي لهيكل المشروع يظهر هنا - يتطلب ربط بقاعدة بيانات فعلية لاحقاً)
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: '#D8DDE6' }}>
        <div>
          <h2 className="text-base font-bold font-cairo text-[#16325C]">إدارة المشاريع العقارية</h2>
          <p className="text-xs text-[#54698D]">قائمة المشاريع ونسب الإنجاز وتوافر الوحدات</p>
        </div>
        <button className="h-8 px-3 text-xs font-semibold text-white bg-[#0070D2] rounded hover:bg-[#005FB2]" style={{ borderRadius: '4px' }}>
          إضافة مشروع جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {extendedProjects.map((p) => {
          const totalSoldReserved = p.sold + p.reserved;
          const availabilityPercent = (p.available / p.units) * 100;
          const soldPercent = (totalSoldReserved / p.units) * 100;

          return (
            <div
              key={p.id}
              onClick={() => navigate(`/real-estate/projects/${p.id}`)}
              className="bg-white border p-4 cursor-pointer transition-all hover:shadow-md hover:border-[#0070D2] group"
              style={{
                borderColor: '#D8DDE6',
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.10)',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-[#16325C] group-hover:text-[#0070D2] transition-colors">{p.name}</h4>
                <span className="text-xs px-2 py-0.5 bg-[#EBF5FF] text-[#0070D2] rounded font-semibold">
                  إنجاز {p.completion}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#54698D]">توافر الوحدات</span>
                  <span className="font-mono-numbers text-[#16325C]">{p.available} / {p.units}</span>
                </div>
                <div className="w-full h-2 bg-[#ECEFF5] rounded overflow-hidden flex">
                  <div className="h-full bg-[#0070D2]" style={{ width: `${soldPercent}%` }} title={`مباع/محجوز: ${totalSoldReserved}`}></div>
                  <div className="h-full bg-[#04844B]" style={{ width: `${availabilityPercent}%` }} title={`متاح: ${p.available}`}></div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[#ECEFF5] text-xs text-[#54698D] grid grid-cols-2 gap-2">
                <div className="flex justify-between">
                  <span>المراحل:</span>
                  <span className="font-mono-numbers font-bold text-[#16325C]">{p.phases}</span>
                </div>
                <div className="flex justify-between">
                  <span>المباني:</span>
                  <span className="font-mono-numbers font-bold text-[#16325C]">{p.buildings}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
