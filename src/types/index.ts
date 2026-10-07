export interface User {
  id: string;
  name: string;
  role: string;
  initials: string;
}

// -- Accounting Domain --
export interface JournalEntry {
  id: string;
  date: string;
  description: string;
  accountName: string;
  accountCode: string;
  debit: number | null;
  credit: number | null;
  status: 'posted' | 'pending';
}

export interface AccountNode {
  id: string;
  code: string;
  name: string;
  balance: number;
  isNegative?: boolean;
  children?: AccountNode[];
}

export interface CostCenter {
  id: string;
  code: string;
  name: string;
  budget: number;
  actual: number;
  variance: number;
}

// -- Real Estate Domain --
export interface RealEstateUnit {
  id: string;
  code: string;
  name: string;
  project: string;
  type: string;
  area: number;
  orientation: string;
  price: number;
  status: 'available' | 'reserved' | 'sold';
}

export interface Installment {
  id: string;
  description: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'late' | 'pending';
}

export interface Project {
  id: string;
  name: string;
  location: string;
  totalUnits: number;
  soldUnits: number;
  progress: number;
}

// -- Legal Domain --
export interface LegalTask {
  id: string;
  title: string;
  caseFile: string;
  assignee: string;
  timeLeft: string;
  urgency: 'urgent' | 'warning' | 'safe';
}

export interface LegalSession {
  id: string;
  title: string;
  time: string;
  location: string;
  isUrgent?: boolean;
}

export interface LegalCase {
  id: string;
  title: string;
  code: string;
  client: string;
  status: string;
  statusType: 'safe' | 'warning' | 'critical';
  lastUpdate: string;
}

export interface LegalClient {
  id: string;
  name: string;
  type: 'individual' | 'corporate';
  activeCases: number;
  phone: string;
}

// -- Agriculture Domain --
export interface SensorData {
  temperature: number;
  humidity: number;
}

export interface CycleTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface AgriReport {
  id: string;
  date: string;
  title: string;
  author: string;
  type: 'harvest' | 'pest' | 'soil';
}
