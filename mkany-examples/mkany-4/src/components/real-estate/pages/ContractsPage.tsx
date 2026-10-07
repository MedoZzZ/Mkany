import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  Calendar,
  Printer,
  Download,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ChevronRight,
  CreditCard,
  Building2,
  User,
  Phone,
  ShieldCheck,
  Layers,
  Receipt,
  BookOpen,
  Check,
  X,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useAppRoute } from '../../common/RouteContext';
import { mockContracts, mockPropertyUnits } from '../../../data/mockData';
import { ContractRecord, InstallmentRecord, InstallmentType } from '../../../types';

const STORAGE_KEY = 'mkany_real_estate_contracts_v2';

// Number to Arabic Words helper for authentic receipt vouchers
const arabicNumberToWords = (num: number): string => {
  if (num === 0) return 'صفر جنيه مصري';
  const units = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة', 'عشرة'];
  const teens = ['عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'];
  const tens = ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
  const hundreds = ['', 'مائة', 'مئتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'];

  const convertGroup = (n: number): string => {
    let res = '';
    const h = Math.floor(n / 100);
    const rem = n % 100;
    if (h > 0) {
      res += hundreds[h];
      if (rem > 0) res += ' و';
    }
    if (rem > 0) {
      if (rem <= 10) {
        res += units[rem];
      } else if (rem < 20) {
        res += teens[rem - 10];
      } else {
        const u = rem % 10;
        const t = Math.floor(rem / 10);
        if (u > 0) {
          res += units[u] + ' و' + tens[t];
        } else {
          res += tens[t];
        }
      }
    }
    return res;
  };

  const millions = Math.floor(num / 1000000);
  const thousands = Math.floor((num % 1000000) / 1000);
  const remainder = Math.floor(num % 1000);

  const parts: string[] = [];
  if (millions > 0) {
    if (millions === 1) parts.push('مليون');
    else if (millions === 2) parts.push('مليونان');
    else if (millions >= 3 && millions <= 10) parts.push(`${convertGroup(millions)} ملايين`);
    else parts.push(`${convertGroup(millions)} مليون`);
  }
  if (thousands > 0) {
    if (thousands === 1) parts.push('ألف');
    else if (thousands === 2) parts.push('ألفان');
    else if (thousands >= 3 && thousands <= 10) parts.push(`${convertGroup(thousands)} آلاف`);
    else parts.push(`${convertGroup(thousands)} ألف`);
  }
  if (remainder > 0) {
    parts.push(convertGroup(remainder));
  }

  return parts.join(' و') + ' جنيه مصري لا غير';
};

export const ContractsPage: React.FC = () => {
  const { currentPath, navigate } = useAppRoute();

  const pathParts = currentPath.split('/');
  const contractId = pathParts[3];

  // Contracts persistent state
  const [contracts, setContracts] = useState<ContractRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return mockContracts;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts));
    } catch {
      // ignore
    }
  }, [contracts]);

  // Filtering & Search states for main register
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'overdue' | 'current' | 'completed'>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');

  // Modals state
  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false);
  const [selectedContractForPayment, setSelectedContractForPayment] = useState<ContractRecord | null>(null);
  const [selectedInstallmentForPayment, setSelectedInstallmentForPayment] = useState<InstallmentRecord | null>(null);

  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [activeReceiptInstallment, setActiveReceiptInstallment] = useState<{
    installment: InstallmentRecord;
    contract: ContractRecord;
  } | null>(null);

  const [isNewContractModalOpen, setIsNewContractModalOpen] = useState(false);
  const [isAccountingLogOpen, setIsAccountingLogOpen] = useState(false);

  // Installment schedule filter in detail view
  const [scheduleFilter, setScheduleFilter] = useState<'all' | 'unpaid' | 'paid'>('all');

  // Quick payment form fields
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'check' | 'cash' | 'pos'>('bank_transfer');
  const [paymentBank, setPaymentBank] = useState<string>('البنك التجاري الدولي CIB');
  const [paymentRefNumber, setPaymentRefNumber] = useState<string>('');
  const [paymentNotes, setPaymentNotes] = useState<string>('');

  // Currency Formatter
  const formatCurrency = (val: number) => {
    return (
      <span className="inline-flex flex-row-reverse items-center justify-end gap-1" dir="ltr">
        <span className="font-cairo text-[10px] text-gray-500">ج.م</span>
        <span className="font-mono font-semibold">{new Intl.NumberFormat('en-US').format(val)}</span>
      </span>
    );
  };

  // Helper to open payment collection modal
  const openCollectPayment = (contract: ContractRecord, installment?: InstallmentRecord) => {
    setSelectedContractForPayment(contract);
    const targetInst = installment || (contract.installments ? contract.installments.find(i => i.status !== 'paid') : undefined);
    setSelectedInstallmentForPayment(targetInst || null);
    setPaymentAmount(targetInst ? (targetInst.amount + (targetInst.latePenalty || 0)) : contract.nextInstallmentAmount);
    setPaymentDate(new Date().toISOString().split('T')[0]);
    setPaymentRefNumber(`TX-${Math.floor(100000 + Math.random() * 900000)}`);
    setPaymentNotes('');
    setIsCollectModalOpen(true);
  };

  // Process payment submission
  const handleConfirmPayment = () => {
    if (!selectedContractForPayment || !selectedInstallmentForPayment) return;

    const receiptNum = `RC-2026-${Math.floor(100 + Math.random() * 900)}`;

    const updatedContracts = contracts.map(c => {
      if (c.id !== selectedContractForPayment.id) return c;

      const currentInstallments = c.installments || [];
      const updatedInstallments = currentInstallments.map(inst => {
        if (inst.id === selectedInstallmentForPayment.id) {
          return {
            ...inst,
            status: 'paid' as const,
            paidAmount: paymentAmount,
            paidDate: paymentDate,
            receiptNumber: receiptNum,
            paymentMethod: paymentMethod,
            bankName: paymentBank,
            checkNumber: paymentMethod === 'check' ? paymentRefNumber : undefined,
            notes: paymentNotes || 'تم السداد وإصدار سند القبض المحاسبي',
          };
        }
        return inst;
      });

      const newPaidAmount = c.paidAmount + paymentAmount;
      const newRemainingAmount = Math.max(0, c.totalValue - newPaidAmount);

      // Find next unpaid installment
      const nextUnpaid = updatedInstallments.find(i => i.status !== 'paid');
      const hasOverdue = updatedInstallments.some(i => i.status === 'overdue');

      let newStatus: 'current' | 'pending' | 'overdue' | 'completed' = 'current';
      if (!nextUnpaid || newRemainingAmount === 0) {
        newStatus = 'completed';
      } else if (hasOverdue) {
        newStatus = 'overdue';
      } else {
        newStatus = 'current';
      }

      return {
        ...c,
        paidAmount: newPaidAmount,
        remainingAmount: newRemainingAmount,
        installmentStatus: newStatus,
        nextInstallmentDate: nextUnpaid ? nextUnpaid.dueDate : '—',
        nextInstallmentAmount: nextUnpaid ? nextUnpaid.amount : 0,
        installments: updatedInstallments,
      };
    });

    setContracts(updatedContracts);
    setIsCollectModalOpen(false);

    // Prompt receipt preview
    const updatedContract = updatedContracts.find(c => c.id === selectedContractForPayment.id);
    const updatedInst = updatedContract?.installments?.find(i => i.id === selectedInstallmentForPayment.id);
    if (updatedContract && updatedInst) {
      setActiveReceiptInstallment({
        contract: updatedContract,
        installment: updatedInst,
      });
      setIsReceiptModalOpen(true);
    }
  };

  // Reset to default mock data
  const handleResetData = () => {
    if (window.confirm('هل تريد استعادة البيانات الافتراضية لعقود وجداول الأقساط؟')) {
      localStorage.removeItem(STORAGE_KEY);
      setContracts(mockContracts);
    }
  };

  // Export contracts as CSV
  const handleExportCSV = () => {
    const headers = ['رقم العقد', 'اسم العميل', 'كود الوحدة', 'المشروع', 'إجمالي القيمة', 'المسدد', 'المتبقي', 'القسط القادم', 'تاريخ القسط', 'الحالة'];
    const rows = contracts.map(c => [
      c.contractNumber,
      c.clientName,
      c.unitCode,
      c.projectName || '—',
      c.totalValue,
      c.paidAmount,
      c.remainingAmount,
      c.nextInstallmentAmount,
      c.nextInstallmentDate,
      c.installmentStatus === 'overdue' ? 'متأخر' : c.installmentStatus === 'completed' ? 'مسدد بالكامل' : 'ساري بالموعد',
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `سجل_العقود_والأقساط_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Active contract for detail view
  const currentContract = useMemo(() => {
    if (!contractId) return null;
    return contracts.find(c => c.id === contractId) || null;
  }, [contracts, contractId]);

  // Main KPI Calculations
  const stats = useMemo(() => {
    const totalPortfolioValue = contracts.reduce((acc, c) => acc + c.totalValue, 0);
    const totalCollected = contracts.reduce((acc, c) => acc + c.paidAmount, 0);
    const totalRemaining = contracts.reduce((acc, c) => acc + c.remainingAmount, 0);
    const collectionPercentage = totalPortfolioValue > 0 ? Math.round((totalCollected / totalPortfolioValue) * 100) : 0;

    let overdueCount = 0;
    let overdueAmount = 0;

    contracts.forEach(c => {
      if (c.installments) {
        c.installments.forEach(inst => {
          if (inst.status === 'overdue') {
            overdueCount++;
            overdueAmount += inst.amount;
          }
        });
      } else if (c.installmentStatus === 'overdue') {
        overdueCount++;
        overdueAmount += c.nextInstallmentAmount;
      }
    });

    const completedContractsCount = contracts.filter(c => c.installmentStatus === 'completed').length;

    return {
      totalPortfolioValue,
      totalCollected,
      totalRemaining,
      collectionPercentage,
      overdueCount,
      overdueAmount,
      completedContractsCount,
      totalCount: contracts.length,
    };
  }, [contracts]);

  // Filtered contracts list
  const filteredContracts = useMemo(() => {
    return contracts.filter(c => {
      // Search term
      const matchesSearch =
        c.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.unitCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.projectName && c.projectName.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      // Status filter
      if (statusFilter === 'overdue' && c.installmentStatus !== 'overdue') return false;
      if (statusFilter === 'current' && (c.installmentStatus !== 'current' && c.installmentStatus !== 'pending')) return false;
      if (statusFilter === 'completed' && c.installmentStatus !== 'completed') return false;

      // Project filter
      if (projectFilter !== 'all' && c.projectName !== projectFilter) return false;

      return true;
    });
  }, [contracts, searchTerm, statusFilter, projectFilter]);

  // ==========================================
  // DETAIL VIEW: Contract & Installments Schedule
  // ==========================================
  if (contractId) {
    if (!currentContract) {
      return (
        <div className="bg-white border p-8 rounded text-center" style={{ borderColor: '#D8DDE6' }}>
          <AlertCircle size={40} className="mx-auto text-[#C23934] mb-3" />
          <h3 className="text-lg font-bold text-[#16325C] mb-2">العقد غير موجود</h3>
          <p className="text-sm text-[#54698D] mb-4">تعذر العثور على العقد المطلوب برمز: {contractId}</p>
          <button
            onClick={() => navigate('/real-estate/contracts')}
            className="px-4 py-2 bg-[#0070D2] text-white text-xs font-semibold rounded hover:bg-[#005FB2]"
          >
            العودة إلى سجل العقود
          </button>
        </div>
      );
    }

    const installments = currentContract.installments || [];
    const filteredInstallments = installments.filter(inst => {
      if (scheduleFilter === 'paid') return inst.status === 'paid';
      if (scheduleFilter === 'unpaid') return inst.status !== 'paid';
      return true;
    });

    const contractPercentPaid = currentContract.totalValue > 0
      ? Math.round((currentContract.paidAmount / currentContract.totalValue) * 100)
      : 0;

    const paidCount = installments.filter(i => i.status === 'paid').length;
    const overdueCount = installments.filter(i => i.status === 'overdue').length;

    return (
      <div className="flex flex-col gap-5">
        {/* Breadcrumb Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b" style={{ borderColor: '#D8DDE6' }}>
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => navigate('/real-estate/contracts')}
              className="text-[#0070D2] hover:underline font-semibold flex items-center gap-1"
            >
              <span>سجل العقود والأقساط</span>
            </button>
            <span className="text-[#54698D]">/</span>
            <span className="text-[#16325C] font-bold font-mono">{currentContract.contractNumber}</span>
            <span className="text-xs px-2 py-0.5 rounded font-semibold bg-[#EBF5FF] text-[#0070D2]">
              {currentContract.projectName || 'مشروع عقاري'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-white border text-xs font-semibold text-[#16325C] rounded hover:bg-gray-50 flex items-center gap-1.5"
              style={{ borderColor: '#D8DDE6' }}
            >
              <Printer size={14} className="text-[#54698D]" />
              <span>طباعة جدول السداد</span>
            </button>
            <button
              onClick={() => openCollectPayment(currentContract)}
              className="px-4 py-1.5 bg-[#0070D2] text-white text-xs font-semibold rounded hover:bg-[#005FB2] flex items-center gap-1.5 shadow-sm"
              disabled={currentContract.installmentStatus === 'completed'}
            >
              <CreditCard size={14} />
              <span>تسجيل تحصيل قسط</span>
            </button>
          </div>
        </div>

        {/* Contract Master Dossier */}
        <div className="bg-white border rounded p-5" style={{ borderColor: '#D8DDE6', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' }}>
          <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b gap-3" style={{ borderColor: '#ECEFF5' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#EBF5FF] text-[#0070D2] flex items-center justify-center font-bold">
                <FileText size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[#16325C]">عقد بيع نهائي رقم: {currentContract.contractNumber}</h2>
                  {currentContract.installmentStatus === 'completed' && (
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-[#E6F7EE] text-[#04844B] rounded-full flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      <span>مسدد بالكامل ومخالصة نهائية</span>
                    </span>
                  )}
                  {currentContract.installmentStatus === 'overdue' && (
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-[#FDE8E8] text-[#C23934] rounded-full flex items-center gap-1">
                      <AlertCircle size={12} />
                      <span>به متأخرات سداد</span>
                    </span>
                  )}
                  {currentContract.installmentStatus === 'current' && (
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-[#E6F7EE] text-[#04844B] rounded-full flex items-center gap-1">
                      <Check size={12} />
                      <span>ساري ومنتظم بالموعد</span>
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#54698D] mt-0.5 flex items-center gap-3">
                  <span>تاريخ تحرير العقد: {currentContract.contractDate || '2025-06-01'}</span>
                  <span>•</span>
                  <span>المشروع: {currentContract.projectName}</span>
                  <span>•</span>
                  <span>كود الوحدة: <strong className="text-[#0070D2] font-mono">{currentContract.unitCode}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#54698D]">نسبة الإنجاز المالي:</span>
              <span className="font-mono font-bold text-[#16325C] text-sm">{contractPercentPaid}%</span>
              <div className="w-28 h-2.5 bg-gray-100 rounded-full overflow-hidden border" style={{ borderColor: '#E5E7EB' }}>
                <div
                  className={`h-full ${contractPercentPaid >= 100 ? 'bg-[#04844B]' : 'bg-[#0070D2]'}`}
                  style={{ width: `${Math.min(100, contractPercentPaid)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Master Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded bg-[#FAFCFE] border" style={{ borderColor: '#E8EDF5' }}>
            <div className="border-l pl-4" style={{ borderColor: '#E8EDF5' }}>
              <div className="text-xs text-[#54698D] mb-1 flex items-center gap-1">
                <User size={13} className="text-[#0070D2]" />
                <span>الطرف الثاني (العميل)</span>
              </div>
              <div className="font-bold text-[#16325C] text-sm">{currentContract.clientName}</div>
              <div className="text-xs text-[#54698D] mt-1 flex items-center gap-1 font-mono">
                <Phone size={11} />
                <span>{currentContract.clientPhone || '+20 100 000 0000'}</span>
              </div>
              <div className="text-[11px] text-[#54698D] mt-0.5">
                رقم قومي: <span className="font-mono">{currentContract.clientNationalId || '—'}</span>
              </div>
            </div>

            <div className="border-l pl-4" style={{ borderColor: '#E8EDF5' }}>
              <div className="text-xs text-[#54698D] mb-1 flex items-center gap-1">
                <Building2 size={13} className="text-[#0070D2]" />
                <span>بيانات الوحدة والمشروع</span>
              </div>
              <div className="font-bold text-[#0070D2] font-mono text-sm">{currentContract.unitCode}</div>
              <div className="text-xs text-[#16325C] mt-1">{currentContract.unitType || 'وحدة سكنية متميزة'}</div>
              <div className="text-[11px] text-[#54698D] mt-0.5">{currentContract.projectName}</div>
            </div>

            <div className="border-l pl-4" style={{ borderColor: '#E8EDF5' }}>
              <div className="text-xs text-[#54698D] mb-1 flex items-center gap-1">
                <DollarSign size={13} className="text-[#04844B]" />
                <span>إجمالي قيمة التعاقد</span>
              </div>
              <div className="text-base font-bold text-[#16325C]">{formatCurrency(currentContract.totalValue)}</div>
              <div className="text-xs text-[#04844B] mt-1">
                المحصل: <strong>{formatCurrency(currentContract.paidAmount)}</strong>
              </div>
              <div className="text-xs text-[#C23934] mt-0.5">
                المتبقي: <strong>{formatCurrency(currentContract.remainingAmount)}</strong>
              </div>
            </div>

            <div>
              <div className="text-xs text-[#54698D] mb-1 flex items-center gap-1">
                <Clock size={13} className="text-[#E87800]" />
                <span>موقف الأقساط والتحصيل</span>
              </div>
              <div className="text-sm font-semibold text-[#16325C]">
                مسدد: <span className="font-mono font-bold text-[#04844B]">{paidCount}</span> من أصل <span className="font-mono font-bold">{installments.length}</span> قسط
              </div>
              {overdueCount > 0 ? (
                <div className="text-xs font-bold text-[#C23934] mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  <span>متأخرات: {overdueCount} قسط بقيمة {formatCurrency(currentContract.nextInstallmentAmount)}</span>
                </div>
              ) : (
                <div className="text-xs text-[#54698D] mt-1">
                  القسط القادم: <span className="font-mono font-semibold">{currentContract.nextInstallmentDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Installment Payment Schedule Section */}
        <div className="bg-white border rounded p-5" style={{ borderColor: '#D8DDE6', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' }}>
          <div className="flex flex-wrap items-center justify-between pb-4 border-b gap-3" style={{ borderColor: '#D8DDE6' }}>
            <div>
              <h3 className="text-sm font-bold text-[#16325C] flex items-center gap-2">
                <span>جدول سداد الأقساط الزمني وتتبع سندات التحصيل</span>
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-[#54698D] rounded font-mono font-normal">
                  {installments.length} دفعات
                </span>
              </h3>
              <p className="text-xs text-[#54698D] mt-0.5">
                توليد القيود المحاسبية التلقائية وإصدار سندات القبض المعتمدة لكل دفعة محصلة
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[#F4F6F9] p-1 rounded border" style={{ borderColor: '#D8DDE6' }}>
              <button
                onClick={() => setScheduleFilter('all')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  scheduleFilter === 'all' ? 'bg-white text-[#0070D2] shadow-sm' : 'text-[#54698D] hover:text-[#16325C]'
                }`}
              >
                جميع الأقساط ({installments.length})
              </button>
              <button
                onClick={() => setScheduleFilter('unpaid')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  scheduleFilter === 'unpaid' ? 'bg-white text-[#C23934] shadow-sm' : 'text-[#54698D] hover:text-[#16325C]'
                }`}
              >
                المستحقة والمتأخرة ({installments.length - paidCount})
              </button>
              <button
                onClick={() => setScheduleFilter('paid')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  scheduleFilter === 'paid' ? 'bg-white text-[#04844B] shadow-sm' : 'text-[#54698D] hover:text-[#16325C]'
                }`}
              >
                المسددة ({paidCount})
              </button>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#ECEFF5] text-[#54698D] border-b" style={{ borderColor: '#D8DDE6' }}>
                <tr>
                  <th className="px-3 py-3 font-semibold text-center w-10">#</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">بيان الدفعة / القسط</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">تاريخ الاستحقاق</th>
                  <th className="px-4 py-3 font-semibold text-left whitespace-nowrap">قيمة القسط</th>
                  <th className="px-4 py-3 font-semibold text-left whitespace-nowrap">الغرامة</th>
                  <th className="px-4 py-3 font-semibold text-left whitespace-nowrap">المسدد</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">سند القبض / وسيلة السداد</th>
                  <th className="px-4 py-3 font-semibold text-center whitespace-nowrap">حالة التحصيل</th>
                  <th className="px-4 py-3 font-semibold text-center whitespace-nowrap">إجراء</th>
                </tr>
              </thead>
              <tbody>
                {filteredInstallments.map((inst, idx) => {
                  const isOverdue = inst.status === 'overdue';
                  const isPaid = inst.status === 'paid';
                  const isDueNow = inst.status === 'due_now';

                  return (
                    <tr
                      key={inst.id}
                      className={`border-b transition-colors ${
                        isOverdue
                          ? 'bg-[#FFF5F5] hover:bg-[#FFEBEB]'
                          : isDueNow
                          ? 'bg-[#FFFDF5] hover:bg-[#FFF9E6]'
                          : idx % 2 === 1
                          ? 'bg-[#FAFCFE] hover:bg-[#F0F5FA]'
                          : 'bg-white hover:bg-[#F8FAFC]'
                      }`}
                      style={{ borderColor: '#D8DDE6' }}
                    >
                      <td className="px-3 py-3 text-center font-mono font-semibold text-[#54698D]">
                        {inst.installmentNumber}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-semibold text-[#16325C]">{inst.title}</div>
                        {inst.notes && <div className="text-[11px] text-[#54698D] mt-0.5">{inst.notes}</div>}
                      </td>
                      <td className="px-4 py-3 font-mono font-semibold text-[#16325C] whitespace-nowrap">
                        {inst.dueDate}
                      </td>
                      <td className="px-4 py-3 font-bold text-[#16325C] text-left whitespace-nowrap">
                        {formatCurrency(inst.amount)}
                      </td>
                      <td className="px-4 py-3 text-left whitespace-nowrap">
                        {inst.latePenalty && inst.latePenalty > 0 ? (
                          <span className="text-[#C23934] font-semibold">{formatCurrency(inst.latePenalty)}</span>
                        ) : (
                          <span className="text-[#54698D]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-left whitespace-nowrap">
                        {isPaid ? (
                          <div>
                            <span className="text-[#04844B] font-bold">{formatCurrency(inst.paidAmount || inst.amount)}</span>
                            {inst.paidDate && (
                              <div className="text-[10px] text-[#54698D] font-mono mt-0.5">بتاريخ: {inst.paidDate}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-[#54698D]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {isPaid && inst.receiptNumber ? (
                          <div>
                            <button
                              onClick={() => {
                                setActiveReceiptInstallment({
                                  contract: currentContract,
                                  installment: inst,
                                });
                                setIsReceiptModalOpen(true);
                              }}
                              className="font-mono text-[#0070D2] font-bold hover:underline flex items-center gap-1"
                            >
                              <Receipt size={12} />
                              <span>{inst.receiptNumber}</span>
                            </button>
                            <div className="text-[10px] text-[#54698D] mt-0.5">
                              {inst.paymentMethod === 'bank_transfer'
                                ? 'تحويل بنكي'
                                : inst.paymentMethod === 'check'
                                ? `شيك (${inst.checkNumber || ''})`
                                : 'نقدي بالخزينة'}
                              {inst.bankName && ` - ${inst.bankName}`}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[#54698D] text-xs">قيد الاستحقاق</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {isPaid && (
                          <span className="px-2.5 py-1 text-xs font-semibold bg-[#E6F7EE] text-[#04844B] rounded inline-flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            <span>مسدد</span>
                          </span>
                        )}
                        {isOverdue && (
                          <span className="px-2.5 py-1 text-xs font-bold bg-[#FDE8E8] text-[#C23934] rounded inline-flex items-center gap-1">
                            <AlertCircle size={12} />
                            <span>متأخر ({inst.overdueDays || 22} يوم)</span>
                          </span>
                        )}
                        {isDueNow && (
                          <span className="px-2.5 py-1 text-xs font-semibold bg-[#FFF5E6] text-[#E87800] rounded inline-flex items-center gap-1">
                            <Clock size={12} />
                            <span>مستحق هذا الشهر</span>
                          </span>
                        )}
                        {inst.status === 'pending' && (
                          <span className="px-2.5 py-1 text-xs font-semibold bg-[#F4F6F9] text-[#54698D] rounded">
                            قادم
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {!isPaid ? (
                          <button
                            onClick={() => openCollectPayment(currentContract, inst)}
                            className="px-3 py-1 bg-[#0070D2] text-white text-xs font-semibold rounded hover:bg-[#005FB2] transition-colors flex items-center gap-1 mx-auto shadow-sm"
                          >
                            <CreditCard size={12} />
                            <span>تسجيل تحصيل</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveReceiptInstallment({
                                contract: currentContract,
                                installment: inst,
                              });
                              setIsReceiptModalOpen(true);
                            }}
                            className="px-2.5 py-1 bg-white border text-[#0070D2] hover:bg-[#EBF5FF] text-xs font-semibold rounded transition-colors flex items-center gap-1 mx-auto"
                            style={{ borderColor: '#0070D2' }}
                          >
                            <Receipt size={12} />
                            <span>سند القبض</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer note on accounting linkage */}
          <div className="mt-4 pt-4 border-t flex flex-wrap items-center justify-between text-xs text-[#54698D] gap-2" style={{ borderColor: '#D8DDE6' }}>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#04844B]" />
              <span>
                جميع عمليات السداد تولد تلقائياً قيوداً يومية معتمدة ومطابقة بميزان المراجعة (مدين: الخزينة/البنك - دائن: عملاء عقارات).
              </span>
            </div>
            <button
              onClick={() => setIsAccountingLogOpen(true)}
              className="text-[#0070D2] font-semibold hover:underline flex items-center gap-1"
            >
              <BookOpen size={13} />
              <span>عرض سجل القيود المحاسبية التلقائية (GL Audit)</span>
            </button>
          </div>
        </div>

        {/* Payment Collection Modal */}
        {renderPaymentModal()}
        {/* Printable Receipt Modal */}
        {renderReceiptModal()}
        {/* Accounting Log Modal */}
        {renderAccountingModal()}
      </div>
    );
  }

  // ==========================================
  // MAIN VIEW: Contracts Register & Schedules
  // ==========================================
  return (
    <div className="flex flex-col gap-5">
      {/* Page Title & Main Header */}
      <div className="bg-white border rounded p-5" style={{ borderColor: '#D8DDE6', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' }}>
        <div className="flex flex-wrap items-center justify-between pb-4 border-b gap-3" style={{ borderColor: '#D8DDE6' }}>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#16325C]">سجل العقود وجداول سداد الأقساط</h2>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#E6F7EE] text-[#04844B] rounded-full border border-[#04844B]/20 flex items-center gap-1">
                <ShieldCheck size={12} />
                <span>مطابقة محاسبية فورية</span>
              </span>
            </div>
            <p className="text-xs text-[#54698D] mt-1">
              إدارة عقود البيع، تتبع جداول الأقساط المستحقة، تحصيل سندات القبض، ومطابقة القيود مع الدفاتر المالية
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAccountingLogOpen(true)}
              className="h-8 px-3 text-xs font-semibold text-[#16325C] bg-white border rounded hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
              style={{ borderColor: '#D8DDE6' }}
            >
              <BookOpen size={13} className="text-[#0070D2]" />
              <span>القيود المحاسبية</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="h-8 px-3 text-xs font-semibold text-[#16325C] bg-white border rounded hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
              style={{ borderColor: '#D8DDE6' }}
            >
              <Download size={13} className="text-[#54698D]" />
              <span>تصدير كشف العقود</span>
            </button>
            <button
              onClick={() => setIsNewContractModalOpen(true)}
              className="h-8 px-3.5 text-xs font-semibold text-white bg-[#0070D2] rounded hover:bg-[#005FB2] flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Plus size={14} />
              <span>إبرام وتسجيل عقد جديد</span>
            </button>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="p-3.5 bg-[#F9FBFE] border rounded" style={{ borderColor: '#D8DDE6' }}>
            <div className="flex items-center justify-between text-xs text-[#54698D] mb-1">
              <span>إجمالي قيمة محفظة العقود</span>
              <Building2 size={15} className="text-[#0070D2]" />
            </div>
            <div className="text-lg font-bold text-[#16325C]">{formatCurrency(stats.totalPortfolioValue)}</div>
            <div className="text-[11px] text-[#54698D] mt-1 font-mono">
              إجمالي {stats.totalCount} عقود مسجلة
            </div>
          </div>

          <div className="p-3.5 bg-[#F6FCF8] border rounded" style={{ borderColor: '#C8E6D3' }}>
            <div className="flex items-center justify-between text-xs text-[#04844B] mb-1">
              <span>المبالغ المحصلة فعلياً</span>
              <CheckCircle2 size={15} className="text-[#04844B]" />
            </div>
            <div className="text-lg font-bold text-[#04844B]">{formatCurrency(stats.totalCollected)}</div>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-[#54698D]">
              <span>نسبة التحصيل:</span>
              <span className="font-bold text-[#04844B]">{stats.collectionPercentage}%</span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#04844B]" style={{ width: `${stats.collectionPercentage}%` }} />
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-[#FAFBFD] border rounded" style={{ borderColor: '#D8DDE6' }}>
            <div className="flex items-center justify-between text-xs text-[#54698D] mb-1">
              <span>المتبقي قيد الاستحقاق</span>
              <DollarSign size={15} className="text-[#54698D]" />
            </div>
            <div className="text-lg font-bold text-[#16325C]">{formatCurrency(stats.totalRemaining)}</div>
            <div className="text-[11px] text-[#54698D] mt-1">
              {stats.completedContractsCount} عقود مسددة بالكامل
            </div>
          </div>

          <div className={`p-3.5 border rounded ${stats.overdueCount > 0 ? 'bg-[#FFF6F6] border-[#F5C6CB]' : 'bg-[#F9FBFE] border-[#D8DDE6]'}`}>
            <div className="flex items-center justify-between text-xs text-[#C23934] mb-1">
              <span>متأخرات الأقساط الحرجة</span>
              <AlertCircle size={15} className="text-[#C23934]" />
            </div>
            <div className="text-lg font-bold text-[#C23934]">{formatCurrency(stats.overdueAmount)}</div>
            <div className="text-[11px] text-[#C23934] mt-1 font-semibold flex items-center gap-1">
              {stats.overdueCount > 0 ? (
                <span>{stats.overdueCount} أقساط تجاوزت موعد الاستحقاق</span>
              ) : (
                <span className="text-[#04844B]">لا توجد متأخرات سداد</span>
              )}
            </div>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t" style={{ borderColor: '#ECEFF5' }}>
          <div className="flex flex-wrap items-center gap-2 flex-1 max-w-2xl">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute right-3 top-2.5 text-[#54698D]" />
              <input
                type="text"
                placeholder="بحث برقم العقد، اسم العميل، كود الوحدة، المشروع..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full h-8 pr-9 pl-3 text-xs bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                style={{ borderColor: '#D8DDE6' }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute left-2.5 top-2.5 text-[#54698D] hover:text-[#16325C]"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Project Filter */}
            <select
              value={projectFilter}
              onChange={e => setProjectFilter(e.target.value)}
              className="h-8 px-2.5 text-xs bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
              style={{ borderColor: '#D8DDE6' }}
            >
              <option value="all">جميع المشاريع</option>
              <option value="جوهرة الشروق">جوهرة الشروق</option>
              <option value="ريزيدنس التجمع">ريزيدنس التجمع</option>
              <option value="كمبوند الصفوة">كمبوند الصفوة</option>
            </select>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-[#F4F6F9] p-1 rounded border" style={{ borderColor: '#D8DDE6' }}>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                statusFilter === 'all' ? 'bg-white text-[#0070D2] shadow-sm' : 'text-[#54698D] hover:text-[#16325C]'
              }`}
            >
              الكل ({contracts.length})
            </button>
            <button
              onClick={() => setStatusFilter('overdue')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                statusFilter === 'overdue' ? 'bg-white text-[#C23934] shadow-sm' : 'text-[#54698D] hover:text-[#16325C]'
              }`}
            >
              متأخرات ({contracts.filter(c => c.installmentStatus === 'overdue').length})
            </button>
            <button
              onClick={() => setStatusFilter('current')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                statusFilter === 'current' ? 'bg-white text-[#04844B] shadow-sm' : 'text-[#54698D] hover:text-[#16325C]'
              }`}
            >
              ساري بالموعد ({contracts.filter(c => c.installmentStatus === 'current' || c.installmentStatus === 'pending').length})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                statusFilter === 'completed' ? 'bg-white text-[#16325C] shadow-sm' : 'text-[#54698D] hover:text-[#16325C]'
              }`}
            >
              مسدد بالكامل ({contracts.filter(c => c.installmentStatus === 'completed').length})
            </button>
          </div>
        </div>

        {/* Contracts Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#ECEFF5] text-[#54698D] border-b" style={{ borderColor: '#D8DDE6' }}>
              <tr>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">رقم العقد الرسمي</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">العميل والوحدة</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">المشروع</th>
                <th className="px-4 py-3 font-semibold text-left whitespace-nowrap">قيمة العقد</th>
                <th className="px-4 py-3 font-semibold text-left whitespace-nowrap">المسدد</th>
                <th className="px-4 py-3 font-semibold text-left whitespace-nowrap">المتبقي</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">القسط القادم</th>
                <th className="px-4 py-3 font-semibold text-left whitespace-nowrap">قيمة القسط</th>
                <th className="px-4 py-3 font-semibold text-center whitespace-nowrap">حالة التحصيل</th>
                <th className="px-4 py-3 font-semibold text-center whitespace-nowrap">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((c, idx) => {
                const percent = c.totalValue > 0 ? Math.round((c.paidAmount / c.totalValue) * 100) : 0;
                return (
                  <tr
                    key={c.id}
                    className={`border-b transition-colors hover:bg-[#EBF5FF] ${
                      idx % 2 === 1 ? 'bg-[#FAFCFE]' : 'bg-white'
                    }`}
                    style={{ borderColor: '#D8DDE6' }}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/real-estate/contracts/${c.id}`)}
                        className="font-bold font-mono text-[#0070D2] hover:underline flex items-center gap-1"
                      >
                        <FileText size={13} />
                        <span>{c.contractNumber}</span>
                      </button>
                      <div className="text-[10px] text-[#54698D] font-mono mt-0.5">
                        {c.contractDate || '2025-06-01'}
                      </div>
                    </td>

                    <td className="px-4 py-3 min-w-[170px] whitespace-nowrap">
                      <div className="font-semibold text-[#16325C]">{c.clientName}</div>
                      <div className="text-[11px] font-mono text-[#54698D] flex items-center gap-1 mt-0.5">
                        <Building2 size={11} className="text-[#0070D2]" />
                        <span>وحدة: <strong className="text-[#0070D2]">{c.unitCode}</strong></span>
                      </div>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-[#16325C] font-medium">{c.projectName || '—'}</div>
                      <div className="text-[11px] text-[#54698D]">{c.unitType || 'وحدة عقارية'}</div>
                    </td>

                    <td className="px-4 py-3 font-bold text-[#16325C] text-left whitespace-nowrap">
                      {formatCurrency(c.totalValue)}
                    </td>

                    <td className="px-4 py-3 text-left whitespace-nowrap">
                      <div className="text-[#04844B] font-bold">{formatCurrency(c.paidAmount)}</div>
                      <div className="text-[10px] text-[#54698D] flex items-center justify-end gap-1 mt-0.5">
                        <span>{percent}%</span>
                        <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#04844B]" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-left whitespace-nowrap">
                      <span className="text-[#54698D] font-semibold">{formatCurrency(c.remainingAmount)}</span>
                    </td>

                    <td className="px-4 py-3 font-mono font-medium text-[#16325C] whitespace-nowrap">
                      {c.nextInstallmentDate}
                    </td>

                    <td className="px-4 py-3 text-left whitespace-nowrap">
                      {c.nextInstallmentAmount > 0 ? (
                        <span className="font-bold text-[#16325C]">{formatCurrency(c.nextInstallmentAmount)}</span>
                      ) : (
                        <span className="text-[#54698D]">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      {c.installmentStatus === 'overdue' && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-[#FDE8E8] text-[#C23934] rounded inline-flex items-center gap-1">
                          <AlertCircle size={11} />
                          <span>متأخر ({c.overdueDays || 22} يوم)</span>
                        </span>
                      )}
                      {c.installmentStatus === 'completed' && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-[#E6F7EE] text-[#04844B] rounded inline-flex items-center gap-1">
                          <CheckCircle2 size={11} />
                          <span>مسدد بالكامل</span>
                        </span>
                      )}
                      {(c.installmentStatus === 'current' || c.installmentStatus === 'pending') && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-[#E6F7EE] text-[#04844B] rounded inline-flex items-center gap-1">
                          <Check size={11} />
                          <span>ساري بالموعد</span>
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => navigate(`/real-estate/contracts/${c.id}`)}
                          className="px-2.5 py-1 bg-white border text-[#0070D2] text-xs font-semibold rounded hover:bg-[#EBF5FF] transition-colors flex items-center gap-1"
                          style={{ borderColor: '#D8DDE6' }}
                          title="عرض جدول الأقساط"
                        >
                          <span>جدول الأقساط</span>
                          <ChevronRight size={12} />
                        </button>

                        {c.installmentStatus !== 'completed' && (
                          <button
                            onClick={() => openCollectPayment(c)}
                            className="px-2.5 py-1 bg-[#0070D2] text-white text-xs font-semibold rounded hover:bg-[#005FB2] transition-colors flex items-center gap-1"
                            title="تحصيل دفعة"
                          >
                            <CreditCard size={12} />
                            <span>تحصيل</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredContracts.length === 0 && (
            <div className="p-8 text-center text-[#54698D]">
              <Search size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">لم يتم العثور على عقود مطابقة لمعايير البحث</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setProjectFilter('all');
                }}
                className="mt-2 text-xs text-[#0070D2] hover:underline"
              >
                إعادة ضبط عوامل التصفية
              </button>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="mt-4 pt-3 border-t flex flex-wrap items-center justify-between text-xs text-[#54698D] gap-2" style={{ borderColor: '#ECEFF5' }}>
          <div>
            عرض {filteredContracts.length} من إجمالي {contracts.length} عقد بيع مسجل
          </div>
          <button
            onClick={handleResetData}
            className="text-[#54698D] hover:text-[#C23934] flex items-center gap-1 text-[11px]"
          >
            <RotateCcw size={11} />
            <span>استعادة البيانات الافتراضية</span>
          </button>
        </div>
      </div>

      {/* Payment Collection Modal */}
      {renderPaymentModal()}
      {/* Printable Receipt Modal */}
      {renderReceiptModal()}
      {/* New Contract Creation Modal */}
      {renderNewContractModal()}
      {/* Accounting Log Modal */}
      {renderAccountingModal()}
    </div>
  );

  // ==========================================
  // MODAL: Payment Collection & Receipt Voucher
  // ==========================================
  function renderPaymentModal() {
    if (!isCollectModalOpen || !selectedContractForPayment) return null;

    const currentInstallments = selectedContractForPayment.installments || [];
    const unpaidInstallments = currentInstallments.filter(i => i.status !== 'paid');

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-xl overflow-hidden border animate-in fade-in zoom-in-95 duration-150"
          style={{ borderColor: '#D8DDE6' }}
        >
          {/* Modal Header */}
          <div className="bg-[#16325C] text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-[#0070D2]" />
              <div>
                <h3 className="text-sm font-bold">تسجيل تحصيل قسط وإصدار سند قبض مالي</h3>
                <p className="text-[11px] text-gray-300">عقد رقم: {selectedContractForPayment.contractNumber}</p>
              </div>
            </div>
            <button
              onClick={() => setIsCollectModalOpen(false)}
              className="text-gray-300 hover:text-white p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Customer & Unit Info Bar */}
            <div className="p-3 bg-[#FAFCFE] border rounded text-xs grid grid-cols-2 gap-2" style={{ borderColor: '#D8DDE6' }}>
              <div>
                <span className="text-[#54698D]">العميل: </span>
                <strong className="text-[#16325C]">{selectedContractForPayment.clientName}</strong>
              </div>
              <div>
                <span className="text-[#54698D]">الوحدة: </span>
                <strong className="text-[#0070D2] font-mono">{selectedContractForPayment.unitCode}</strong>
              </div>
              <div>
                <span className="text-[#54698D]">المشروع: </span>
                <span className="text-[#16325C]">{selectedContractForPayment.projectName}</span>
              </div>
              <div>
                <span className="text-[#54698D]">المتبقي بالعقد: </span>
                <span className="text-[#C23934] font-mono font-bold">
                  {new Intl.NumberFormat('en-US').format(selectedContractForPayment.remainingAmount)} ج.م
                </span>
              </div>
            </div>

            {/* Select Installment to Pay */}
            <div>
              <label className="block text-xs font-semibold text-[#16325C] mb-1">
                اختر القسط / البند المراد تحصيله:
              </label>
              <select
                value={selectedInstallmentForPayment?.id || ''}
                onChange={e => {
                  const inst = currentInstallments.find(i => i.id === e.target.value);
                  if (inst) {
                    setSelectedInstallmentForPayment(inst);
                    setPaymentAmount(inst.amount + (inst.latePenalty || 0));
                  }
                }}
                className="w-full h-9 px-3 text-xs bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                style={{ borderColor: '#D8DDE6' }}
              >
                {unpaidInstallments.map(inst => (
                  <option key={inst.id} value={inst.id}>
                    {inst.title} - مستحق في {inst.dueDate} - ({new Intl.NumberFormat('en-US').format(inst.amount)} ج.م)
                    {inst.status === 'overdue' ? ' [متأخر]' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#16325C] mb-1">
                  المبلغ المحصل فعلياً (ج.م):
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={e => setPaymentAmount(Number(e.target.value))}
                  className="w-full h-9 px-3 text-xs font-mono font-bold bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                  style={{ borderColor: '#D8DDE6' }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#16325C] mb-1">
                  تاريخ التحصيل الفعلي:
                </label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={e => setPaymentDate(e.target.value)}
                  className="w-full h-9 px-3 text-xs font-mono bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                  style={{ borderColor: '#D8DDE6' }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#16325C] mb-1">
                  طريقة السداد:
                </label>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value as any)}
                  className="w-full h-9 px-3 text-xs bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                  style={{ borderColor: '#D8DDE6' }}
                >
                  <option value="bank_transfer">تحويل بنكي / إيداع مباشر</option>
                  <option value="check">شيك مصرفي مقبول الدفع</option>
                  <option value="cash">نقداً بالخزينة الرئيسية</option>
                  <option value="pos">بطاقة ائتمانية (نقطة بيع POS)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#16325C] mb-1">
                  الحساب البنكي / الخزينة:
                </label>
                <select
                  value={paymentBank}
                  onChange={e => setPaymentBank(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                  style={{ borderColor: '#D8DDE6' }}
                >
                  <option value="البنك التجاري الدولي CIB">البنك التجاري الدولي CIB (حساب رئيسي)</option>
                  <option value="بنك مصر">بنك مصر (حساب المشروعات)</option>
                  <option value="البنك الأهلي المصري">البنك الأهلي المصري</option>
                  <option value="بنك QNB الأهلي">بنك QNB الأهلي</option>
                  <option value="الخزينة الرئيسية للمبيعات">الخزينة الرئيسية للمبيعات (نقدية)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#16325C] mb-1">
                  {paymentMethod === 'check' ? 'رقم الشيك البنكي:' : 'الرقم المرجعي للإشعار البنكي / السند:'}
                </label>
                <input
                  type="text"
                  value={paymentRefNumber}
                  onChange={e => setPaymentRefNumber(e.target.value)}
                  placeholder={paymentMethod === 'check' ? 'مثال: CHK-904128' : 'مثال: TX-849102'}
                  className="w-full h-9 px-3 text-xs font-mono bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                  style={{ borderColor: '#D8DDE6' }}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#16325C] mb-1">
                  ملاحظات التحصيل (اختياري):
                </label>
                <input
                  type="text"
                  value={paymentNotes}
                  onChange={e => setPaymentNotes(e.target.value)}
                  placeholder="أي ملاحظات تخص عملية السداد أو تعليمات الحسابات..."
                  className="w-full h-9 px-3 text-xs bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                  style={{ borderColor: '#D8DDE6' }}
                />
              </div>
            </div>

            {/* Accounting GL Entry Preview Box */}
            <div className="p-3 bg-[#F0F5FA] border rounded text-xs" style={{ borderColor: '#D0E0F0' }}>
              <div className="font-bold text-[#0070D2] flex items-center gap-1.5 mb-1.5">
                <BookOpen size={13} />
                <span>القيد المحاسبي التلقائي الناتج عن العملية (Journal Entry):</span>
              </div>
              <div className="space-y-1 font-mono text-[11px] text-[#16325C]">
                <div className="flex justify-between">
                  <span>من حـ/ {paymentBank} (مدين):</span>
                  <strong>{new Intl.NumberFormat('en-US').format(paymentAmount)} ج.م</strong>
                </div>
                <div className="flex justify-between text-[#04844B]">
                  <span>إلى حـ/ عملاء عقارات - {selectedContractForPayment.clientName} (دائن):</span>
                  <strong>{new Intl.NumberFormat('en-US').format(paymentAmount)} ج.م</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-5 py-3 bg-gray-50 border-t flex items-center justify-end gap-2" style={{ borderColor: '#D8DDE6' }}>
            <button
              onClick={() => setIsCollectModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#54698D] hover:text-[#16325C]"
            >
              إلغاء
            </button>
            <button
              onClick={handleConfirmPayment}
              className="px-5 py-2 bg-[#0070D2] text-white text-xs font-semibold rounded hover:bg-[#005FB2] flex items-center gap-1.5 shadow-sm"
              disabled={paymentAmount <= 0}
            >
              <Check size={14} />
              <span>تأكيد التحصيل وإصدار سند القبض</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MODAL: Official Printable Receipt Voucher
  // ==========================================
  function renderReceiptModal() {
    if (!isReceiptModalOpen || !activeReceiptInstallment) return null;

    const { contract, installment } = activeReceiptInstallment;
    const amount = installment.paidAmount || installment.amount;
    const words = arabicNumberToWords(amount);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div
          className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden border animate-in fade-in zoom-in-95 duration-150"
          style={{ borderColor: '#D8DDE6' }}
        >
          {/* Header Controls */}
          <div className="bg-[#16325C] text-white px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt size={18} className="text-[#0070D2]" />
              <span className="text-sm font-bold">معاينة سند القبض المالي المعتمد</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1 bg-[#0070D2] hover:bg-[#005FB2] text-white text-xs font-semibold rounded flex items-center gap-1"
              >
                <Printer size={13} />
                <span>طباعة السند</span>
              </button>
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="text-gray-300 hover:text-white p-1"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Printable Voucher Paper */}
          <div className="p-6 bg-white font-cairo print:p-0">
            {/* Voucher Frame */}
            <div className="border-2 border-[#16325C] p-6 rounded relative bg-[#FFFDF9]">
              {/* Decorative Corner Watermark */}
              <div className="absolute top-2 left-2 text-[10px] text-[#54698D] font-mono border px-2 py-0.5 rounded border-dashed">
                ORIGINAL VOUCHER
              </div>

              {/* Company Header */}
              <div className="flex justify-between items-start border-b-2 border-[#16325C] pb-4 mb-4">
                <div>
                  <h1 className="text-base font-bold text-[#16325C]">مكاني للتطوير العقاري وإدارة المشروعات</h1>
                  <p className="text-[11px] text-[#54698D]">MKANY REAL ESTATE DEVELOPMENT ERP</p>
                  <p className="text-[10px] text-[#54698D]">سجل تجاري: 409218 • بطاقة ضريبية: 781-342-990</p>
                </div>

                <div className="text-left font-mono">
                  <div className="text-xs font-bold text-[#C23934]">
                    رقم السند: {installment.receiptNumber || 'RC-2026-0312'}
                  </div>
                  <div className="text-[11px] text-[#54698D] mt-1">
                    التاريخ: {installment.paidDate || new Date().toISOString().split('T')[0]}
                  </div>
                  <div className="text-[10px] text-[#0070D2] mt-0.5">
                    عقد: {contract.contractNumber}
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center my-3">
                <span className="px-6 py-1 bg-[#16325C] text-white text-sm font-bold rounded">
                  سند قبض مالي (نقدية / شيكات)
                </span>
              </div>

              {/* Voucher Content */}
              <div className="space-y-3 mt-4 text-xs text-[#16325C]">
                <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: '#ECEFF5' }}>
                  <span className="text-[#54698D] font-semibold min-w-[120px]">استلمنا من السيد / السادة:</span>
                  <strong className="text-sm text-[#16325C]">{contract.clientName}</strong>
                </div>

                <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: '#ECEFF5' }}>
                  <span className="text-[#54698D] font-semibold min-w-[120px]">مبلغ وقدره (بالأرقام):</span>
                  <span className="font-mono text-base font-bold text-[#04844B]">
                    {new Intl.NumberFormat('en-US').format(amount)} ج.م
                  </span>
                </div>

                <div className="flex items-start gap-2 border-b pb-2" style={{ borderColor: '#ECEFF5' }}>
                  <span className="text-[#54698D] font-semibold min-w-[120px]">فقط وقدره (بالحروف):</span>
                  <span className="font-bold text-[#16325C] bg-[#FAFAF5] px-2 py-1 rounded flex-1">
                    {words}
                  </span>
                </div>

                <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: '#ECEFF5' }}>
                  <span className="text-[#54698D] font-semibold min-w-[120px]">وذلك سداداً عن:</span>
                  <span className="font-semibold text-[#16325C]">
                    {installment.title} - للوحدة رقم (<strong className="font-mono text-[#0070D2]">{contract.unitCode}</strong>) بمشروع {contract.projectName}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b pb-2" style={{ borderColor: '#ECEFF5' }}>
                  <div>
                    <span className="text-[#54698D] font-semibold">طريقة السداد: </span>
                    <span className="font-semibold">
                      {installment.paymentMethod === 'bank_transfer'
                        ? 'تحويل بنكي'
                        : installment.paymentMethod === 'check'
                        ? 'شيك مصرفي'
                        : 'نقداً بالخزينة'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#54698D] font-semibold">مسحوب على / مودع في: </span>
                    <span className="font-semibold">{installment.bankName || 'البنك التجاري الدولي CIB'}</span>
                  </div>
                </div>

                {installment.notes && (
                  <div className="text-[11px] text-[#54698D] italic">
                    ملاحظات: {installment.notes}
                  </div>
                )}
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-3 gap-4 pt-8 mt-6 border-t border-[#16325C] text-center text-xs">
                <div>
                  <div className="text-[#54698D] mb-8 font-semibold">توقيع المستلم / المحصل</div>
                  <div className="border-t border-dashed pt-1 font-mono text-[11px] text-[#54698D]">
                    خالد الصاوي (الخزينة)
                  </div>
                </div>

                <div>
                  <div className="text-[#54698D] mb-8 font-semibold">مدير الحسابات المالية</div>
                  <div className="border-t border-dashed pt-1 font-mono text-[11px] text-[#54698D]">
                    أ. تامر رضوان (معتمد)
                  </div>
                </div>

                <div>
                  <div className="text-[#54698D] mb-8 font-semibold">خاتم الشركة المعتمد</div>
                  <div className="w-16 h-16 border-2 border-[#16325C]/30 rounded-full mx-auto flex items-center justify-center text-[9px] text-[#16325C]/40 rotate-12">
                    MKANY ERP STAMP
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-5 py-3 bg-gray-50 border-t flex justify-end">
            <button
              onClick={() => setIsReceiptModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-[#16325C] text-xs font-semibold rounded hover:bg-gray-300"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MODAL: New Contract Creation & Plan Calculator
  // ==========================================
  function renderNewContractModal() {
    if (!isNewContractModalOpen) return null;

    return <NewContractModal onClose={() => setIsNewContractModalOpen(false)} onAddContract={handleAddNewContract} />;
  }

  function handleAddNewContract(newContract: ContractRecord) {
    setContracts(prev => [newContract, ...prev]);
    setIsNewContractModalOpen(false);
    navigate(`/real-estate/contracts/${newContract.id}`);
  }

  // ==========================================
  // MODAL: Accounting GL Journal Audit Log
  // ==========================================
  function renderAccountingModal() {
    if (!isAccountingLogOpen) return null;

    // Collect all paid installments across all contracts
    const entries: Array<{
      date: string;
      receiptNumber: string;
      contractNumber: string;
      clientName: string;
      unitCode: string;
      title: string;
      bankName: string;
      amount: number;
    }> = [];

    contracts.forEach(c => {
      if (c.installments) {
        c.installments.forEach(inst => {
          if (inst.status === 'paid' && inst.paidAmount) {
            entries.push({
              date: inst.paidDate || '2026-01-01',
              receiptNumber: inst.receiptNumber || 'RC-2026-000',
              contractNumber: c.contractNumber,
              clientName: c.clientName,
              unitCode: c.unitCode,
              title: inst.title,
              bankName: inst.bankName || 'البنك الرئيسي',
              amount: inst.paidAmount,
            });
          }
        });
      }
    });

    entries.sort((a, b) => (b.date > a.date ? 1 : -1));

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div
          className="bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden border animate-in fade-in zoom-in-95 duration-150"
          style={{ borderColor: '#D8DDE6' }}
        >
          {/* Header */}
          <div className="bg-[#16325C] text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-[#0070D2]" />
              <div>
                <h3 className="text-sm font-bold">سجل قيود اليومية المحاسبية التلقائية (GL Audit Trail)</h3>
                <p className="text-[11px] text-gray-300">مطابقة تحصيلات الأقساط وسندات القبض مع شجرة الحسابات</p>
              </div>
            </div>
            <button
              onClick={() => setIsAccountingLogOpen(false)}
              className="text-gray-300 hover:text-white p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 max-h-[75vh] overflow-y-auto">
            <div className="p-3 bg-[#E6F7EE] border border-[#A3E0C0] rounded text-xs text-[#04844B] flex items-center gap-2 mb-4">
              <ShieldCheck size={18} />
              <span>
                <strong>جميع القيود مرحلة آلياً (Auto-Posted):</strong> تم توليد {entries.length} قيد يومية متوازن بنسبة مطابقة 100% بين محفظة العقود وميزان المراجعة العام.
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#ECEFF5] text-[#54698D] border-b" style={{ borderColor: '#D8DDE6' }}>
                  <tr>
                    <th className="px-3 py-2.5 font-semibold">التاريخ</th>
                    <th className="px-3 py-2.5 font-semibold">رقم السند</th>
                    <th className="px-3 py-2.5 font-semibold">العقد والعميل</th>
                    <th className="px-3 py-2.5 font-semibold">الحساب المدين (Dr.)</th>
                    <th className="px-3 py-2.5 font-semibold">الحساب الدائن (Cr.)</th>
                    <th className="px-3 py-2.5 font-semibold text-left">المبلغ (ج.م)</th>
                    <th className="px-3 py-2.5 font-semibold text-center">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, idx) => (
                    <tr
                      key={idx}
                      className={`border-b ${idx % 2 === 1 ? 'bg-[#FAFCFE]' : 'bg-white'}`}
                      style={{ borderColor: '#D8DDE6' }}
                    >
                      <td className="px-3 py-2 font-mono text-[#16325C]">{entry.date}</td>
                      <td className="px-3 py-2 font-mono font-bold text-[#0070D2]">{entry.receiptNumber}</td>
                      <td className="px-3 py-2">
                        <div className="font-semibold text-[#16325C]">{entry.clientName}</div>
                        <div className="text-[10px] text-[#54698D] font-mono">{entry.contractNumber} ({entry.unitCode})</div>
                      </td>
                      <td className="px-3 py-2 font-medium text-[#16325C]">
                        1101 - {entry.bankName}
                      </td>
                      <td className="px-3 py-2 font-medium text-[#04844B]">
                        1205 - عملاء عقارات ({entry.clientName})
                      </td>
                      <td className="px-3 py-2 font-mono font-bold text-left text-[#16325C]">
                        {new Intl.NumberFormat('en-US').format(entry.amount)}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#E6F7EE] text-[#04844B] rounded">
                          مرحل آلياً
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 bg-gray-50 border-t flex justify-end">
            <button
              onClick={() => setIsAccountingLogOpen(false)}
              className="px-4 py-2 bg-gray-200 text-[#16325C] text-xs font-semibold rounded hover:bg-gray-300"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    );
  }
};

// =========================================================================
// SUB-COMPONENT: Modal to Create a New Contract with Installment Calculator
// =========================================================================
interface NewContractModalProps {
  onClose: () => void;
  onAddContract: (contract: ContractRecord) => void;
}

const NewContractModal: React.FC<NewContractModalProps> = ({ onClose, onAddContract }) => {
  const [contractNumber, setContractNumber] = useState(`CTR-2026-0${Math.floor(100 + Math.random() * 900)}`);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+20 100 ');
  const [clientNationalId, setClientNationalId] = useState('');
  const [selectedUnitCode, setSelectedUnitCode] = useState('JS-B-302');
  const [projectName, setProjectName] = useState('جوهرة الشروق');
  const [unitType, setUnitType] = useState('شقة سكنية (175 م²)');
  const [totalPrice, setTotalPrice] = useState<number>(4100000);

  // Financial plan configuration
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(15);
  const [contractSigningPercent, setContractSigningPercent] = useState<number>(10);
  const [handoverPercent, setHandoverPercent] = useState<number>(15);
  const [maintenancePercent, setMaintenancePercent] = useState<number>(8);
  const [planYears, setPlanYears] = useState<number>(3);
  const [frequency, setFrequency] = useState<'quarterly' | 'monthly' | 'semi_annual'>('quarterly');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // When unit selection changes, update project, type, and price
  const handleUnitSelect = (unitCode: string) => {
    setSelectedUnitCode(unitCode);
    const found = mockPropertyUnits.find(u => u.code === unitCode);
    if (found) {
      setProjectName(found.projectName);
      setUnitType(`${found.type} (${found.area} م²)`);
      setTotalPrice(found.price);
    }
  };

  // Calculate generated installments schedule live
  const generatedSchedule = useMemo(() => {
    if (totalPrice <= 0) return [];

    const instList: InstallmentRecord[] = [];
    const downAmount = Math.round((totalPrice * downPaymentPercent) / 100);
    const signAmount = Math.round((totalPrice * contractSigningPercent) / 100);
    const handoverAmount = Math.round((totalPrice * handoverPercent) / 100);
    const maintenanceAmount = Math.round((totalPrice * maintenancePercent) / 100);

    const remainingForInstallments = totalPrice - (downAmount + signAmount + handoverAmount);

    let periodsCount = 0;
    let monthsStep = 3;
    if (frequency === 'quarterly') {
      periodsCount = planYears * 4;
      monthsStep = 3;
    } else if (frequency === 'monthly') {
      periodsCount = planYears * 12;
      monthsStep = 1;
    } else {
      periodsCount = planYears * 2;
      monthsStep = 6;
    }

    const periodicAmount = periodsCount > 0 ? Math.round(remainingForInstallments / periodsCount) : 0;

    let num = 1;
    const start = new Date(startDate || '2026-10-01');

    // 1. Down payment (Paid)
    instList.push({
      id: `gen-${num}`,
      contractId: '',
      installmentNumber: num++,
      title: `دفعة مقدم الحجز (${downPaymentPercent}%)`,
      type: 'down_payment',
      dueDate: startDate,
      amount: downAmount,
      paidAmount: downAmount,
      paidDate: startDate,
      receiptNumber: `RC-2026-${Math.floor(100 + Math.random() * 900)}`,
      paymentMethod: 'bank_transfer',
      bankName: 'البنك التجاري الدولي CIB',
      status: 'paid',
      notes: 'مسددة عند توقيع استمارة الحجز',
    });

    // 2. Contract Signing (Paid or due now)
    const signDate = new Date(start);
    signDate.setMonth(signDate.getMonth() + 1);
    const signDateStr = signDate.toISOString().split('T')[0];
    instList.push({
      id: `gen-${num}`,
      contractId: '',
      installmentNumber: num++,
      title: `دفعة استكمال التعاقد (${contractSigningPercent}%)`,
      type: 'contract_signing',
      dueDate: signDateStr,
      amount: signAmount,
      paidAmount: signAmount,
      paidDate: signDateStr,
      receiptNumber: `RC-2026-${Math.floor(100 + Math.random() * 900)}`,
      paymentMethod: 'check',
      bankName: 'بنك مصر',
      status: 'paid',
      notes: 'مسددة بموجب شيك تعاقد',
    });

    // 3. Periodic Installments
    let curDate = new Date(signDate);
    for (let i = 1; i <= periodsCount; i++) {
      curDate.setMonth(curDate.getMonth() + monthsStep);
      const dStr = curDate.toISOString().split('T')[0];
      const isFirst = i === 1;

      instList.push({
        id: `gen-${num}`,
        contractId: '',
        installmentNumber: num++,
        title:
          frequency === 'quarterly'
            ? `القسط ربع السنوي رقم (${i})`
            : frequency === 'monthly'
            ? `القسط الشهري رقم (${i})`
            : `القسط نصف السنوي رقم (${i})`,
        type: 'periodic',
        dueDate: dStr,
        amount: periodicAmount,
        status: isFirst ? 'due_now' : 'pending',
      });
    }

    // 4. Handover installment
    curDate.setMonth(curDate.getMonth() + monthsStep);
    instList.push({
      id: `gen-${num}`,
      contractId: '',
      installmentNumber: num++,
      title: `دفعة استلام الوحدة (${handoverPercent}%)`,
      type: 'handover',
      dueDate: curDate.toISOString().split('T')[0],
      amount: handoverAmount,
      status: 'pending',
    });

    // 5. Maintenance deposit
    instList.push({
      id: `gen-${num}`,
      contractId: '',
      installmentNumber: num++,
      title: `وديعة الصيانة الشاملة (${maintenancePercent}%)`,
      type: 'maintenance',
      dueDate: curDate.toISOString().split('T')[0],
      amount: maintenanceAmount,
      status: 'pending',
    });

    return instList;
  }, [totalPrice, downPaymentPercent, contractSigningPercent, handoverPercent, maintenancePercent, planYears, frequency, startDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || totalPrice <= 0) return;

    const newId = `cnt-2026-${Date.now().toString().slice(-4)}`;

    const totalPaid = generatedSchedule
      .filter(i => i.status === 'paid')
      .reduce((acc, i) => acc + (i.paidAmount || i.amount), 0);

    const remaining = Math.max(0, totalPrice - totalPaid);
    const nextUnpaid = generatedSchedule.find(i => i.status !== 'paid');

    const finalizedSchedule = generatedSchedule.map(i => ({
      ...i,
      contractId: newId,
    }));

    const newContractRecord: ContractRecord = {
      id: newId,
      contractNumber,
      unitCode: selectedUnitCode,
      projectName,
      unitType,
      clientName,
      clientPhone,
      clientNationalId,
      contractDate: startDate,
      totalValue: totalPrice,
      downPayment: Math.round((totalPrice * downPaymentPercent) / 100),
      paidAmount: totalPaid,
      remainingAmount: remaining,
      installmentsCount: finalizedSchedule.length,
      nextInstallmentDate: nextUnpaid ? nextUnpaid.dueDate : '—',
      nextInstallmentAmount: nextUnpaid ? nextUnpaid.amount : 0,
      installmentStatus: 'current',
      installments: finalizedSchedule,
    };

    onAddContract(newContractRecord);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border animate-in fade-in zoom-in-95 duration-150"
        style={{ borderColor: '#D8DDE6' }}
      >
        {/* Header */}
        <div className="bg-[#16325C] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus size={18} className="text-[#0070D2]" />
            <div>
              <h3 className="text-sm font-bold">إبرام وتسجيل عقد بيع جديد ومولد خطة الأقساط</h3>
              <p className="text-[11px] text-gray-300">حساب الأقساط الدورية، دفعات الاستلام، وتوليد الجدول المحاسبي</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white p-1">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Top Info Grid */}
          <div className="p-4 bg-[#FAFCFE] border rounded grid grid-cols-1 md:grid-cols-3 gap-3 text-xs" style={{ borderColor: '#D8DDE6' }}>
            <div>
              <label className="block font-semibold text-[#16325C] mb-1">رقم العقد الرسمي:</label>
              <input
                type="text"
                value={contractNumber}
                onChange={e => setContractNumber(e.target.value)}
                required
                className="w-full h-8 px-2.5 font-mono font-bold bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                style={{ borderColor: '#D8DDE6' }}
              />
            </div>

            <div>
              <label className="block font-semibold text-[#16325C] mb-1">اسم العميل (الطرف الثاني):</label>
              <input
                type="text"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="مثال: م. أحمد عبد العزيز"
                required
                className="w-full h-8 px-2.5 bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                style={{ borderColor: '#D8DDE6' }}
              />
            </div>

            <div>
              <label className="block font-semibold text-[#16325C] mb-1">رقم الهاتف:</label>
              <input
                type="text"
                value={clientPhone}
                onChange={e => setClientPhone(e.target.value)}
                className="w-full h-8 px-2.5 font-mono bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                style={{ borderColor: '#D8DDE6' }}
              />
            </div>

            <div>
              <label className="block font-semibold text-[#16325C] mb-1">الرقم القومي / السجل التجاري:</label>
              <input
                type="text"
                value={clientNationalId}
                onChange={e => setClientNationalId(e.target.value)}
                placeholder="29001010101234"
                className="w-full h-8 px-2.5 font-mono bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                style={{ borderColor: '#D8DDE6' }}
              />
            </div>

            <div>
              <label className="block font-semibold text-[#16325C] mb-1">اختر الوحدة المباعة:</label>
              <select
                value={selectedUnitCode}
                onChange={e => handleUnitSelect(e.target.value)}
                className="w-full h-8 px-2.5 bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                style={{ borderColor: '#D8DDE6' }}
              >
                {mockPropertyUnits.map(u => (
                  <option key={u.id} value={u.code}>
                    {u.code} - {u.projectName} ({u.type} - {new Intl.NumberFormat('en-US').format(u.price)} ج.م)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#16325C] mb-1">إجمالي سعر بيع الوحدة (ج.م):</label>
              <input
                type="number"
                value={totalPrice}
                onChange={e => setTotalPrice(Number(e.target.value))}
                required
                className="w-full h-8 px-2.5 font-mono font-bold bg-white border rounded text-[#16325C] focus:outline-none focus:border-[#0070D2]"
                style={{ borderColor: '#D8DDE6' }}
              />
            </div>
          </div>

          {/* Payment Plan Configuration */}
          <div className="p-4 bg-[#F4F6F9] border rounded space-y-3" style={{ borderColor: '#D8DDE6' }}>
            <h4 className="text-xs font-bold text-[#16325C] flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#0070D2]" />
              <span>إعدادات خطة التقسيط وتوزيع الدفعات</span>
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-[#54698D] mb-1">مقدم الحجز (%):</label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  value={downPaymentPercent}
                  onChange={e => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-8 px-2 bg-white border rounded font-mono font-bold text-[#16325C]"
                  style={{ borderColor: '#D8DDE6' }}
                />
              </div>

              <div>
                <label className="block text-[#54698D] mb-1">دفعة التعاقد (%):</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={contractSigningPercent}
                  onChange={e => setContractSigningPercent(Number(e.target.value))}
                  className="w-full h-8 px-2 bg-white border rounded font-mono font-bold text-[#16325C]"
                  style={{ borderColor: '#D8DDE6' }}
                />
              </div>

              <div>
                <label className="block text-[#54698D] mb-1">دفعة الاستلام (%):</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={handoverPercent}
                  onChange={e => setHandoverPercent(Number(e.target.value))}
                  className="w-full h-8 px-2 bg-white border rounded font-mono font-bold text-[#16325C]"
                  style={{ borderColor: '#D8DDE6' }}
                />
              </div>

              <div>
                <label className="block text-[#54698D] mb-1">وديعة الصيانة (%):</label>
                <input
                  type="number"
                  min="0"
                  max="15"
                  value={maintenancePercent}
                  onChange={e => setMaintenancePercent(Number(e.target.value))}
                  className="w-full h-8 px-2 bg-white border rounded font-mono font-bold text-[#16325C]"
                  style={{ borderColor: '#D8DDE6' }}
                />
              </div>

              <div>
                <label className="block text-[#54698D] mb-1">مدة التقسيط (سنوات):</label>
                <select
                  value={planYears}
                  onChange={e => setPlanYears(Number(e.target.value))}
                  className="w-full h-8 px-2 bg-white border rounded text-[#16325C]"
                  style={{ borderColor: '#D8DDE6' }}
                >
                  <option value={1}>سنة واحدة</option>
                  <option value={2}>سنتان</option>
                  <option value={3}>3 سنوات</option>
                  <option value={4}>4 سنوات</option>
                  <option value={5}>5 سنوات</option>
                  <option value={7}>7 سنوات</option>
                </select>
              </div>

              <div>
                <label className="block text-[#54698D] mb-1">دورية الأقساط:</label>
                <select
                  value={frequency}
                  onChange={e => setFrequency(e.target.value as any)}
                  className="w-full h-8 px-2 bg-white border rounded text-[#16325C]"
                  style={{ borderColor: '#D8DDE6' }}
                >
                  <option value="quarterly">ربع سنوي (كل 3 أشهر)</option>
                  <option value="monthly">شهري</option>
                  <option value="semi_annual">نصف سنوي (كل 6 أشهر)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#54698D] mb-1">تاريخ توقيع العقد:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full h-8 px-2 font-mono bg-white border rounded text-[#16325C]"
                  style={{ borderColor: '#D8DDE6' }}
                />
              </div>
            </div>
          </div>

          {/* Live Generated Schedule Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-[#16325C] flex items-center gap-1.5">
                <FileText size={14} className="text-[#0070D2]" />
                <span>معاينة جدول الأقساط الناتج ({generatedSchedule.length} دفعة):</span>
              </h4>
              <span className="text-xs text-[#54698D]">
                المحصل فوراً (المقدم والتعاقد):{' '}
                <strong className="text-[#04844B]">
                  {new Intl.NumberFormat('en-US').format(
                    generatedSchedule.filter(i => i.status === 'paid').reduce((a, b) => a + b.amount, 0)
                  )}{' '}
                  ج.م
                </strong>
              </span>
            </div>

            <div className="max-h-56 overflow-y-auto border rounded text-xs" style={{ borderColor: '#D8DDE6' }}>
              <table className="w-full text-right">
                <thead className="bg-[#ECEFF5] text-[#54698D] sticky top-0">
                  <tr>
                    <th className="px-3 py-2 font-semibold">#</th>
                    <th className="px-3 py-2 font-semibold">بيان الدفعة</th>
                    <th className="px-3 py-2 font-semibold">تاريخ الاستحقاق</th>
                    <th className="px-3 py-2 font-semibold text-left">القيمة (ج.م)</th>
                    <th className="px-3 py-2 font-semibold text-center">الحالة المبدئية</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedSchedule.map((inst, i) => (
                    <tr
                      key={inst.id}
                      className={`border-b ${i % 2 === 1 ? 'bg-[#FAFCFE]' : 'bg-white'}`}
                      style={{ borderColor: '#ECEFF5' }}
                    >
                      <td className="px-3 py-1.5 font-mono text-[#54698D]">{inst.installmentNumber}</td>
                      <td className="px-3 py-1.5 font-semibold text-[#16325C]">{inst.title}</td>
                      <td className="px-3 py-1.5 font-mono text-[#16325C]">{inst.dueDate}</td>
                      <td className="px-3 py-1.5 font-mono font-bold text-left text-[#16325C]">
                        {new Intl.NumberFormat('en-US').format(inst.amount)}
                      </td>
                      <td className="px-3 py-1.5 text-center">
                        {inst.status === 'paid' ? (
                          <span className="px-2 py-0.5 text-[10px] bg-[#E6F7EE] text-[#04844B] rounded font-semibold">
                            مسدد
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[10px] bg-[#F4F6F9] text-[#54698D] rounded">
                            مستحق
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t flex items-center justify-end gap-2" style={{ borderColor: '#D8DDE6' }}>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#54698D] hover:text-[#16325C]"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0070D2] text-white text-xs font-semibold rounded hover:bg-[#005FB2] flex items-center gap-1.5 shadow-sm"
            >
              <Check size={14} />
              <span>اعتماد العقد وتوليد جدول الأقساط</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};