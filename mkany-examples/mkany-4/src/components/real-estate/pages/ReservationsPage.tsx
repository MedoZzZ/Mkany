import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Clock, CheckCircle2, AlertCircle, Building2, User, X, Check, Search, Filter } from 'lucide-react';
import { useAppRoute } from '../../common/RouteContext';
import { mockReservations, mockPropertyUnits } from '../../../data/mockData';
import { ReservationRecord } from '../../../types';

const RESERVATIONS_STORAGE_KEY = 'mkany_real_estate_reservations_v1';

export const ReservationsPage: React.FC = () => {
  const { navigate } = useAppRoute();

  const [reservations, setReservations] = useState<ReservationRecord[]>(() => {
    try {
      const saved = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return mockReservations;
  });

  useEffect(() => {
    try {
      localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservations));
    } catch {
      // ignore
    }
  }, [reservations]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expiring_soon' | 'converted'>('all');
  const [isNewReservationModalOpen, setIsNewReservationModalOpen] = useState(false);

  // New reservation form state
  const [newUnitCode, setNewUnitCode] = useState('JS-B-302');
  const [newClientName, setNewClientName] = useState('');
  const [newSalesRep, setNewSalesRep] = useState('مروان الشناوي');
  const [newDownPayment, setNewDownPayment] = useState<number>(150000);
  const [newTotalPrice, setNewTotalPrice] = useState<number>(4100000);
  const [newTtlHours, setNewTtlHours] = useState<number>(48);

  const formatCurrency = (val: number) => {
    return (
      <span className="inline-flex flex-row-reverse items-center justify-end gap-1" dir="ltr">
        <span className="font-cairo text-[10px] text-gray-500">ج.م</span>
        <span className="font-mono font-semibold">{new Intl.NumberFormat('en-US').format(val)}</span>
      </span>
    );
  };

  const handleUnitChange = (code: string) => {
    setNewUnitCode(code);
    const u = mockPropertyUnits.find(unit => unit.code === code);
    if (u) {
      setNewTotalPrice(u.price);
      setNewDownPayment(Math.round(u.price * 0.05));
    }
  };

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const expiry = new Date();
    expiry.setHours(expiry.getHours() + newTtlHours);
    const expiryStr = expiry.toISOString().replace('T', ' ').substring(0, 16);

    const newRes: ReservationRecord = {
      id: `res-${Date.now().toString().slice(-4)}`,
      unitCode: newUnitCode,
      clientName: newClientName,
      salesRep: newSalesRep,
      downPayment: newDownPayment,
      totalPrice: newTotalPrice,
      expiryTime: expiryStr,
      remainingHours: newTtlHours,
      status: newTtlHours <= 24 ? 'expiring_soon' : 'active',
    };

    setReservations(prev => [newRes, ...prev]);
    setIsNewReservationModalOpen(false);
    setNewClientName('');
  };

  const filteredReservations = useMemo(() => {
    return reservations.filter(r => {
      const matchSearch =
        r.unitCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.salesRep.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchSearch) return false;

      if (statusFilter === 'active' && r.status !== 'active') return false;
      if (statusFilter === 'expiring_soon' && r.status !== 'expiring_soon') return false;
      if (statusFilter === 'converted' && r.status !== 'converted') return false;

      return true;
    });
  }, [reservations, searchTerm, statusFilter]);

  const activeCount = reservations.filter(r => r.status === 'active').length;
  const expiringCount = reservations.filter(r => r.status === 'expiring_soon').length;
  const convertedCount = reservations.filter(r => r.status === 'converted').length;
  const totalDownPayments = reservations.reduce((acc, r) => acc + r.downPayment, 0);

  return (
    <div className="bg-white border p-5" style={{ borderColor: '#D8DDE6', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.10)' }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 border-b gap-3" style={{ borderColor: '#D8DDE6' }}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#16325C]">سجل الحجوزات النشطة وقيد انتهاء المهلة (TTL Engine)</h3>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#FFF5E6] text-[#E87800] rounded-full border border-[#E87800]/20 flex items-center gap-1">
              <Clock size={11} />
              <span>إدارة مهل الحجز الآلية</span>
            </span>
          </div>
          <p className="text-xs text-[#54698D] mt-0.5">
            يتم تحرير الوحدة تلقائياً وإرجاعها لحالة متاح عند انتهاء المهلة الزمنية دون تحويل لعقد رسمي
          </p>
        </div>

        <button
          onClick={() => setIsNewReservationModalOpen(true)}
          className="h-8 px-3 text-xs font-semibold text-white bg-[#0070D2] rounded hover:bg-[#005FB2] flex items-center gap-1.5 transition-colors shadow-sm"
          style={{ borderRadius: '4px' }}
        >
          <Plus size={14} />
          <span>حجز جديد</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        <div className="p-3 bg-[#F9FBFE] border rounded" style={{ borderColor: '#D8DDE6' }}>
          <div className="flex items-center justify-between text-xs text-[#54698D] mb-1">
            <span>حجوزات نشطة سارية</span>
            <Clock size={14} className="text-[#0070D2]" />
          </div>
          <div className="text-lg font-bold text-[#16325C] font-mono">{activeCount} وحدات</div>
          <div className="text-[11px] text-[#54698D] mt-0.5">مهلة تتجاوز 24 ساعة</div>
        </div>

        <div className="p-3 bg-[#FFF8F5] border rounded" style={{ borderColor: '#FADBD8' }}>
          <div className="flex items-center justify-between text-xs text-[#E87800] mb-1">
            <span>أوشكت على الانتهاء</span>
            <AlertCircle size={14} className="text-[#E87800]" />
          </div>
          <div className="text-lg font-bold text-[#E87800] font-mono">{expiringCount} وحدات</div>
          <div className="text-[11px] text-[#C23934] mt-0.5 font-medium">أقل من 24 ساعة قبل التحرير</div>
        </div>

        <div className="p-3 bg-[#F6FCF8] border rounded" style={{ borderColor: '#C8E6D3' }}>
          <div className="flex items-center justify-between text-xs text-[#04844B] mb-1">
            <span>إجمالي جدية الحجز المحصلة</span>
            <CheckCircle2 size={14} className="text-[#04844B]" />
          </div>
          <div className="text-lg font-bold text-[#04844B]">{formatCurrency(totalDownPayments)}</div>
          <div className="text-[11px] text-[#54698D] mt-0.5">مبالغ مؤمنة بالخزينة</div>
        </div>

        <div className="p-3 bg-[#FAFCFE] border rounded" style={{ borderColor: '#D8DDE6' }}>
          <div className="flex items-center justify-between text-xs text-[#54698D] mb-1">
            <span>تم التحويل لعقود بيع</span>
            <Building2 size={14} className="text-[#0070D2]" />
          </div>
          <div className="text-lg font-bold text-[#0070D2] font-mono">{convertedCount} عقود</div>
          <div className="text-[11px] text-[#54698D] mt-0.5">تم إبرام وتوثيق العقود</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t" style={{ borderColor: '#ECEFF5' }}>
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute right-3 top-2.5 text-[#54698D]" />
          <input
            type="text"
            placeholder="بحث بكود الوحدة أو العميل أو المندوب..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-8 pr-9 pl-3 text-xs bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
            style={{ borderColor: '#D8DDE6' }}
          />
        </div>

        <div className="flex items-center gap-1 bg-[#F4F6F9] p-1 rounded border" style={{ borderColor: '#D8DDE6' }}>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              statusFilter === 'all' ? 'bg-white text-[#0070D2] shadow-sm' : 'text-[#54698D] hover:text-[#16325C]'
            }`}
          >
            الكل ({reservations.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              statusFilter === 'active' ? 'bg-white text-[#0070D2] shadow-sm' : 'text-[#54698D] hover:text-[#16325C]'
            }`}
          >
            نشطة ({activeCount})
          </button>
          <button
            onClick={() => setStatusFilter('expiring_soon')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              statusFilter === 'expiring_soon' ? 'bg-white text-[#E87800] shadow-sm' : 'text-[#54698D] hover:text-[#16325C]'
            }`}
          >
            تنتهي قريباً ({expiringCount})
          </button>
          <button
            onClick={() => setStatusFilter('converted')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              statusFilter === 'converted' ? 'bg-white text-[#04844B] shadow-sm' : 'text-[#54698D] hover:text-[#16325C]'
            }`}
          >
            تم التحويل ({convertedCount})
          </button>
        </div>
      </div>

      {/* Main Reservations Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-right text-xs">
          <thead className="bg-[#ECEFF5] text-[#54698D] border-b" style={{ borderColor: '#D8DDE6' }}>
            <tr>
              <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">كود الوحدة</th>
              <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">اسم العميل</th>
              <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">مسؤول المبيعات</th>
              <th className="px-4 py-3 font-semibold text-left whitespace-nowrap">جدية الحجز المدفوعة</th>
              <th className="px-4 py-3 font-semibold text-left whitespace-nowrap">إجمالي السعر</th>
              <th className="px-4 py-3 font-semibold text-center whitespace-nowrap">موعد انتهاء المهلة</th>
              <th className="px-4 py-3 font-semibold text-center whitespace-nowrap">المهلة المتبقية</th>
              <th className="px-4 py-3 font-semibold text-center whitespace-nowrap">التحويل لعقد</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((r, idx) => (
              <tr
                key={r.id}
                className={`border-b transition-colors hover:bg-[#EBF5FF] ${idx % 2 === 1 ? 'bg-[#FAFCFE]' : 'bg-white'}`}
                style={{ borderColor: '#D8DDE6' }}
              >
                <td className="px-4 py-3 font-bold font-mono text-[#0070D2] text-right whitespace-nowrap">
                  {r.unitCode}
                </td>

                <td className="px-4 py-3 font-semibold text-[#16325C] text-right whitespace-nowrap">
                  {r.clientName}
                </td>

                <td className="px-4 py-3 text-[#54698D] text-right whitespace-nowrap">
                  {r.salesRep}
                </td>

                <td className="px-4 py-3 font-mono font-semibold text-[#04844B] text-left whitespace-nowrap">
                  {formatCurrency(r.downPayment)}
                </td>

                <td className="px-4 py-3 font-mono font-bold text-[#16325C] text-left whitespace-nowrap">
                  {formatCurrency(r.totalPrice)}
                </td>

                <td className="px-4 py-3 font-mono text-[#54698D] text-center whitespace-nowrap">
                  {r.expiryTime}
                </td>

                <td className="px-4 py-3 text-center whitespace-nowrap">
                  {r.remainingHours > 0 ? (
                    <span
                      className={`px-2.5 py-1 text-xs font-bold rounded inline-flex items-center gap-1 ${
                        r.remainingHours < 24 ? 'bg-[#FDE8E8] text-[#C23934]' : 'bg-[#FFF5E6] text-[#E87800]'
                      }`}
                    >
                      <Clock size={11} />
                      <span>{r.remainingHours} ساعة متبقية</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 text-xs font-semibold bg-[#E6F7EE] text-[#04844B] rounded inline-flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      <span>تم التحويل لعقد</span>
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 text-center whitespace-nowrap">
                  <button
                    onClick={() => {
                      if (r.status === 'converted') {
                        navigate('/real-estate/contracts/cnt-2026-04');
                      } else {
                        navigate('/real-estate/contracts');
                      }
                    }}
                    className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                      r.status === 'converted'
                        ? 'bg-white border text-[#0070D2] border-[#0070D2] hover:bg-[#EBF5FF]'
                        : 'bg-[#0070D2] text-white hover:bg-[#005FB2]'
                    }`}
                  >
                    {r.status === 'converted' ? 'عرض العقد' : 'تحرير عقد بيع'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredReservations.length === 0 && (
          <div className="p-8 text-center text-[#54698D]">
            <Search size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">لا توجد نتائج مطابقة لبحثك</p>
          </div>
        )}
      </div>

      {/* New Reservation Modal */}
      {isNewReservationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border animate-in fade-in zoom-in-95 duration-150"
            style={{ borderColor: '#D8DDE6' }}
          >
            <div className="bg-[#16325C] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus size={16} className="text-[#0070D2]" />
                <h3 className="text-sm font-bold">تسجيل حجز وحدة جديد (TTL Reservation)</h3>
              </div>
              <button
                onClick={() => setIsNewReservationModalOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateReservation} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#16325C] mb-1">اختر الوحدة المراد حجزها:</label>
                <select
                  value={newUnitCode}
                  onChange={e => handleUnitChange(e.target.value)}
                  className="w-full h-8 px-2.5 bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                  style={{ borderColor: '#D8DDE6' }}
                >
                  {mockPropertyUnits.filter(u => u.status === 'available').map(u => (
                    <option key={u.id} value={u.code}>
                      {u.code} - {u.projectName} ({u.type} - {new Intl.NumberFormat('en-US').format(u.price)} ج.م)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#16325C] mb-1">اسم العميل:</label>
                <input
                  type="text"
                  value={newClientName}
                  onChange={e => setNewClientName(e.target.value)}
                  placeholder="مثال: د. حسام عبد الغفار"
                  required
                  className="w-full h-8 px-2.5 bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                  style={{ borderColor: '#D8DDE6' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#16325C] mb-1">مسؤول المبيعات:</label>
                  <input
                    type="text"
                    value={newSalesRep}
                    onChange={e => setNewSalesRep(e.target.value)}
                    required
                    className="w-full h-8 px-2.5 bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                    style={{ borderColor: '#D8DDE6' }}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#16325C] mb-1">مهلة الحجز (TTL):</label>
                  <select
                    value={newTtlHours}
                    onChange={e => setNewTtlHours(Number(e.target.value))}
                    className="w-full h-8 px-2.5 bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                    style={{ borderColor: '#D8DDE6' }}
                  >
                    <option value={24}>24 ساعة (مهلة قياسية)</option>
                    <option value={48}>48 ساعة (يومان)</option>
                    <option value={72}>72 ساعة (3 أيام)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#16325C] mb-1">جدية الحجز المدفوعة (ج.م):</label>
                  <input
                    type="number"
                    value={newDownPayment}
                    onChange={e => setNewDownPayment(Number(e.target.value))}
                    required
                    className="w-full h-8 px-2.5 font-mono font-bold bg-white border rounded text-[#04844B] focus:outline-none focus:border-[#0070D2]"
                    style={{ borderColor: '#D8DDE6' }}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#16325C] mb-1">إجمالي سعر الوحدة (ج.م):</label>
                  <input
                    type="number"
                    value={newTotalPrice}
                    onChange={e => setNewTotalPrice(Number(e.target.value))}
                    required
                    className="w-full h-8 px-2.5 font-mono font-bold bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                    style={{ borderColor: '#D8DDE6' }}
                  />
                </div>
              </div>

              <div className="p-3 bg-[#FFF5E6] border border-[#FADBD8] rounded text-[11px] text-[#E87800] flex items-center gap-2">
                <Clock size={14} />
                <span>سيتم حجز الوحدة وحجبها من المخزون لحين انتهاء المهلة أو إبرام العقد.</span>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2" style={{ borderColor: '#D8DDE6' }}>
                <button
                  type="button"
                  onClick={() => setIsNewReservationModalOpen(false)}
                  className="px-4 py-1.5 text-xs text-[#54698D] hover:text-[#16325C]"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0070D2] text-white text-xs font-semibold rounded hover:bg-[#005FB2] flex items-center gap-1 shadow-sm"
                >
                  <Check size={14} />
                  <span>تأكيد الحجز وتفعيل العداد</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};