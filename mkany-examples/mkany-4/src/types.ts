export type RoutePath = string;

export type RealEstateNavSection = 'projects' | 'inventory' | 'reservations' | 'contracts' | 'commissions';

export type LegalNavSection = 'clients' | 'cases' | 'hearings' | 'deadlines' | 'fees';

export type AgricultureNavSection = 'greenhouses' | 'cycles' | 'readings' | 'harvests' | 'alerts';

// Real Estate Data Models
export type UnitStatus = 'available' | 'reserved' | 'contracted' | 'sold' | 'blocked';

export interface PropertyUnit {
  id: string;
  code: string; // e.g. "BLD-A-102"
  projectName: string;
  phase: string;
  type: 'شقة سكنية' | 'فيلا مستقلة' | 'مقر إداري' | 'محل تجاري';
  area: number; // m²
  price: number; // EGP
  direction: 'بحري' | 'قبلي' | 'شرقي' | 'غربي';
  floor: number;
  status: UnitStatus;
  ttlRemainingHours?: number;
  clientName?: string;
  brokerName?: string;
}

export interface ReservationRecord {
  id: string;
  unitCode: string;
  clientName: string;
  salesRep: string;
  downPayment: number;
  totalPrice: number;
  expiryTime: string;
  remainingHours: number;
  status: 'active' | 'expiring_soon' | 'converted';
}

export type InstallmentType = 'down_payment' | 'contract_signing' | 'periodic' | 'handover' | 'maintenance';
export type InstallmentPaymentStatus = 'paid' | 'overdue' | 'due_now' | 'pending';

export interface InstallmentRecord {
  id: string;
  contractId: string;
  installmentNumber: number;
  title: string;
  type: InstallmentType;
  dueDate: string;
  amount: number;
  latePenalty?: number;
  paidAmount?: number;
  paidDate?: string;
  receiptNumber?: string;
  paymentMethod?: 'bank_transfer' | 'check' | 'cash' | 'pos';
  checkNumber?: string;
  bankName?: string;
  status: InstallmentPaymentStatus;
  overdueDays?: number;
  notes?: string;
}

export interface ContractRecord {
  id: string;
  contractNumber: string;
  unitCode: string;
  projectName?: string;
  unitType?: string;
  clientName: string;
  clientPhone?: string;
  clientNationalId?: string;
  contractDate?: string;
  totalValue: number;
  downPayment?: number;
  paidAmount: number;
  remainingAmount: number;
  installmentsCount?: number;
  nextInstallmentDate: string;
  nextInstallmentAmount: number;
  installmentStatus: 'current' | 'pending' | 'overdue' | 'completed';
  overdueDays?: number;
  installments?: InstallmentRecord[];
}

export interface CommissionRecord {
  id: string;
  contractNumber: string;
  totalCommission: number;
  companyShare: number;
  salesRepName: string;
  salesRepShare: number;
  brokerName: string;
  brokerShare: number;
  teamManagerShare: number;
  status: 'accrued' | 'approved' | 'paid';
}

// Legal Data Models
export type CaseStatus = 'active' | 'resolved' | 'archived';
export type ConfidentialityTier = 'عام' | 'خاص' | 'سري للغاية';

export interface LegalCase {
  id: string;
  caseNumber: string; // e.g. "ق/2026/894"
  clientName: string;
  matterType: 'مدني وتجاري' | 'شركات وعقود' | 'نزاع عقاري' | 'عمالي وتعويضات' | 'ضرائب وبنوك';
  courtName: string;
  assignedLawyer: string;
  nextHearingDate: string;
  confidentiality: ConfidentialityTier;
  status: CaseStatus;
  unresolvedActionCount: number;
}

export interface LegalHearing {
  id: string;
  caseNumber: string;
  clientName: string;
  hearingDate: string;
  hearingTime: string;
  courtHall: string;
  attendingLawyer: string;
  requiredAction: string;
  isMandatoryNextDateSet: boolean;
  notificationStatus: 'notified_both' | 'pending_lawyer' | 'acknowledged';
}

export interface LegalDeadline {
  id: string;
  caseNumber: string;
  deadlineType: 'ميعاد طعن بالنقض' | 'تقديم مذكرة دفاع' | 'استئناف حكم' | 'سداد رسوم قضائية';
  dueDate: string;
  daysRemaining: number;
  isPeremptory: boolean; // سقوط حق حتمي
  responsiblePerson: string;
  evidenceSubmitted: boolean;
  escalationStatus: 'normal' | 'escalated_manager' | 'critical';
}

export interface ClientFeeRecord {
  id: string;
  clientName: string;
  caseNumber: string;
  professionalFees: number;
  courtExpensesAndTrust: number;
  paidBalance: number;
  runningAccountBalance: number;
  status: 'settled' | 'partial' | 'due';
}

// Agriculture Data Models
export type SensorSeverity = 'normal' | 'warning' | 'critical' | 'info';

export interface SensorMetric {
  id: string;
  name: string;
  code: string;
  greenhouseId: string;
  currentValue: number;
  unit: string;
  minOptimal: number;
  maxOptimal: number;
  severity: SensorSeverity;
  trend: 'stable' | 'rising' | 'falling';
  sparkline: number[];
  lastUpdated: string;
}

export interface GreenhouseZone {
  id: string;
  code: string;
  name: string;
  cropType: string;
  cycleCode: string;
  status: 'normal' | 'attention_required' | 'critical_alarm';
  activeAlertCount: number;
  temp: number;
  humidity: number;
  ec: number;
  ph: number;
}

export interface CropCycle {
  id: string;
  cycleCode: string;
  greenhouseCode: string;
  cropName: string;
  variety: string;
  startDate: string;
  currentPhase: 'شتل' | 'نمو خضري' | 'تزهير وعقد' | 'نضج وحصاد';
  accumulatedCost: number;
  expectedYieldKg: number;
  harvestReadyDate: string;
  activeStatus: 'active' | 'harvest_ready' | 'completed';
}

export interface HarvestRecord {
  id: string;
  lotNumber: string;
  cycleCode: string;
  cropName: string;
  harvestDate: string;
  gradeA_Kg: number;
  gradeB_Kg: number;
  cull_Kg: number;
  storageLocation: string;
}

export interface AgAlarm {
  id: string;
  greenhouseCode: string;
  severity: 'critical' | 'warning' | 'info';
  parameter: string;
  description: string;
  triggerValue: string;
  timestamp: string;
  acknowledged: boolean;
}
