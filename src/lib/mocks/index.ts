import { 
  JournalEntry, AccountNode, RealEstateUnit, Installment, 
  LegalTask, LegalSession, LegalCase, SensorData, CycleTask,
  CostCenter, Project, LegalClient, AgriReport
} from '@/types';

// Utility for simulated API delay
export const simulateDelay = <T>(data: T, ms: number = 800): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
};

// -- Accounting Mocks --
export const mockJournalEntries: JournalEntry[] = [
  { id: 'JV-2026-104', date: '2026-10-22', description: 'إثبات إيرادات مبيعات وحدات (مشروع الساحل)', accountName: 'النقدية في البنوك', accountCode: '11010', debit: 2500000.00, credit: null, status: 'posted' },
  { id: 'JV-2026-104-B', date: '2026-10-22', description: 'إثبات إيرادات مبيعات وحدات (مشروع الساحل)', accountName: 'إيرادات العقارات', accountCode: '41020', debit: null, credit: 2500000.00, status: 'posted' }
];

export const mockChartOfAccounts: AccountNode[] = [
  { id: '1', code: '10000', name: 'الأصول', balance: 24500000.00, children: [
    { id: '11', code: '11000', name: 'الأصول المتداولة', balance: 4500000.00, children: [
      { id: '111', code: '11010', name: 'النقدية في البنوك (CIB)', balance: 2100000.00 },
      { id: '1112', code: '11011', name: 'النقدية بالخزينة', balance: 450000.00 },
      { id: '112', code: '11020', name: 'عملاء - مشاريع الساحل', balance: 1400000.00 },
      { id: '113', code: '11030', name: 'أرصدة مدينة أخرى', balance: 550000.00 },
    ]},
    { id: '12', code: '12000', name: 'الأصول الثابتة', balance: 20000000.00, children: [
      { id: '121', code: '12010', name: 'أراضي ومباني', balance: 15000000.00 },
      { id: '122', code: '12020', name: 'سيارات ومعدات', balance: 5000000.00 },
    ]}
  ]},
  { id: '2', code: '20000', name: 'الخصوم', balance: -12000000.00, isNegative: true, children: [
    { id: '21', code: '21000', name: 'الخصوم المتداولة', balance: -3000000.00, isNegative: true, children: [
      { id: '211', code: '21010', name: 'موردين مقاولات', balance: -2000000.00, isNegative: true },
      { id: '212', code: '21020', name: 'أرصدة دائنة أخرى', balance: -1000000.00, isNegative: true },
    ]},
    { id: '22', code: '22000', name: 'قروض طويلة الأجل', balance: -9000000.00, isNegative: true }
  ]},
  { id: '3', code: '30000', name: 'حقوق الملكية', balance: -12500000.00, isNegative: true, children: [
    { id: '31', code: '31000', name: 'رأس المال المصدر', balance: -10000000.00, isNegative: true },
    { id: '32', code: '32000', name: 'أرباح مرحلة', balance: -2500000.00, isNegative: true },
  ]},
  { id: '4', code: '40000', name: 'الإيرادات', balance: -8500000.00, isNegative: true, children: [
    { id: '41', code: '41000', name: 'إيرادات المبيعات العقارية', balance: -7000000.00, isNegative: true },
    { id: '42', code: '42000', name: 'إيرادات زراعية', balance: -1500000.00, isNegative: true }
  ]},
  { id: '5', code: '50000', name: 'المصروفات', balance: 8500000.00, children: [
    { id: '51', code: '51000', name: 'تكلفة المبيعات', balance: 4500000.00 },
    { id: '52', code: '52000', name: 'مصروفات عمومية وإدارية', balance: 4000000.00 }
  ]}
];

export const mockCostCenters: CostCenter[] = [
  { id: '1', code: 'CC-01', name: 'مشروع كمبوند الساحل', budget: 50000000, actual: 42000000, variance: 8000000 },
  { id: '2', code: 'CC-02', name: 'الإدارة العامة', budget: 5000000, actual: 5200000, variance: -200000 },
  { id: '3', code: 'CC-03', name: 'مزارع الوادي الجديد', budget: 12000000, actual: 9500000, variance: 2500000 },
  { id: '4', code: 'CC-04', name: 'التسويق والمبيعات', budget: 3500000, actual: 3200000, variance: 300000 },
  { id: '5', code: 'CC-05', name: 'برج زايد التجاري', budget: 25000000, actual: 18000000, variance: 7000000 },
];

// -- Real Estate Mocks --
export const mockUnits: RealEstateUnit[] = [
  { id: '1', code: 'VIL-A-01', name: 'فيلا مستقلة - نموذج A', project: 'كمبوند الساحل', type: 'فيلا', area: 350, orientation: 'بحري', price: 12500000, status: 'available' },
  { id: '2', code: 'TWN-B-05', name: 'فيلا توين هاوس - نموذج B', project: 'كمبوند الساحل', type: 'فيلا', area: 280, orientation: 'قبلي', price: 9800000, status: 'reserved' }
];

export const mockInstallments: Installment[] = [
  { id: '1', description: 'دفعة حجز (مقدم)', dueDate: '2026-01-15', amount: 1250000.00, status: 'paid' },
  { id: '2', description: 'القسط الأول', dueDate: '2026-04-15', amount: 350000.00, status: 'paid' },
  { id: '3', description: 'القسط الثاني', dueDate: '2026-07-15', amount: 350000.00, status: 'late' },
];

export const mockProjects: Project[] = [
  { id: '1', name: 'كمبوند الساحل ريزيدنس', location: 'الساحل الشمالي', totalUnits: 150, soldUnits: 85, progress: 65 },
  { id: '2', name: 'برج زايد التجاري', location: 'الشيخ زايد', totalUnits: 40, soldUnits: 10, progress: 30 }
];

// -- Legal Mocks --
export const mockLegalTasks: LegalTask[] = [
  { id: '1', title: 'إيداع صحيفة الاستئناف - قضية عمالية 105', caseFile: 'شركة النيل للإنشاءات', assignee: 'محمود علي', timeLeft: '24h 00m', urgency: 'urgent' },
  { id: '2', title: 'سداد أمانة الخبير الهندسي - دعوى 80', caseFile: 'نزاع مقاولات الباطن', assignee: 'أحمد سعيد', timeLeft: '3 Days', urgency: 'warning' },
];

export const mockLegalSessions: LegalSession[] = [
  { id: '1', title: 'سماع شهود - قضية 402/2026', time: '09:00 AM', location: 'محكمة العمالية - الدائرة 3', isUrgent: true },
  { id: '2', title: 'تقديم مذكرات - نزاع تجاري 115/2026', time: '11:30 AM', location: 'المحكمة الاقتصادية', isUrgent: false },
];

export const mockLegalCases: LegalCase[] = [
  { id: '1', title: 'نزاع ضريبي - شركة الأفق (2024)', code: 'CASE-2024-08', client: 'شركة الأفق', status: 'قيد المراجعة الضريبية', statusType: 'safe', lastUpdate: 'منذ ساعتين' },
  { id: '2', title: 'دعوى عمالية - مطالبة مستحقات', code: 'CASE-2026-112', client: 'محمود عبد السلام', status: 'مؤجلة للنطق بالحكم', statusType: 'warning', lastUpdate: 'منذ 3 أيام' },
  { id: '3', title: 'نزاع مقاولات - تسليم مرحلة أ', code: 'CASE-2025-44', client: 'شركة البناء الحديث', status: 'مطلوب إيداع تقرير خبير', statusType: 'critical', lastUpdate: 'منذ 5 ساعات' },
  { id: '4', title: 'استئناف مدني - دعوى تعويض', code: 'CASE-2026-15', client: 'محمد عبدالله خليل', status: 'تداول بالجلسات', statusType: 'safe', lastUpdate: 'منذ أسبوع' }
];

export const mockLegalClients: LegalClient[] = [
  { id: '1', name: 'شركة النيل للإنشاءات', type: 'corporate', activeCases: 3, phone: '01012345678' },
  { id: '2', name: 'محمد عبدالله خليل', type: 'individual', activeCases: 1, phone: '01122334455' },
  { id: '3', name: 'مؤسسة الأفق للاستثمار', type: 'corporate', activeCases: 2, phone: '01299887766' },
  { id: '4', name: 'خالد صبري محمد', type: 'individual', activeCases: 0, phone: '01555544433' },
  { id: '5', name: 'شركة البناء الحديث', type: 'corporate', activeCases: 4, phone: '01000112233' }
];

// -- Agriculture Mocks --
export const mockSensorData: SensorData = { temperature: 24.5, humidity: 62 };

export const mockCycleTasks: CycleTask[] = [
  { id: '1', title: 'إضافة سماد NPK (نسبة 20-20-20)', description: 'الكمية: 5 كجم / فدان', completed: false },
  { id: '2', title: 'فحص مستشعرات الرطوبة في القطاع B', description: 'قراءة سابقة: 45% (تحت المعدل)', completed: false }
];

export const mockAgriReports: AgriReport[] = [
  { id: '1', date: '2026-10-20', title: 'تقرير محصول الطماطم الربع الثالث', author: 'م. زراعي طارق', type: 'harvest' },
  { id: '2', date: '2026-10-15', title: 'تحليل ملوحة التربة - صوبة 3', author: 'د. هند الكومي', type: 'soil' },
  { id: '3', date: '2026-10-05', title: 'تقييم كفاءة الري بالتنقيط (القطاع الجنوبي)', author: 'م. ياسر أحمد', type: 'harvest' },
  { id: '4', date: '2026-09-28', title: 'تقرير مكافحة الآفات - العروة النيلية', author: 'د. هند الكومي', type: 'harvest' },
  { id: '5', date: '2026-09-15', title: 'فحص جودة الأسمدة الواردة', author: 'م. زراعي طارق', type: 'soil' }
];
