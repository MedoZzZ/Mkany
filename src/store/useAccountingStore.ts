import { create } from 'zustand';
import { JournalEntry, AccountNode, CostCenter } from '@/types';
import { mockJournalEntries, mockChartOfAccounts, mockCostCenters } from '@/lib/mocks';

interface AccountingState {
  entries: JournalEntry[];
  chartOfAccounts: AccountNode[];
  costCenters: CostCenter[];
  addJournalEntry: (entry: JournalEntry) => void;
  // Add more actions as needed
}

export const useAccountingStore = create<AccountingState>((set) => ({
  entries: mockJournalEntries,
  chartOfAccounts: mockChartOfAccounts,
  costCenters: mockCostCenters,
  addJournalEntry: (entry) => set((state) => ({ entries: [entry, ...state.entries] })),
}));
