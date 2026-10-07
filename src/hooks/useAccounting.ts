import { useAccountingStore } from '@/store/useAccountingStore';

export function useAccounting() {
  const { entries, chartOfAccounts, costCenters, addJournalEntry } = useAccountingStore();
  
  return { 
    entries, 
    chartOfAccounts, 
    costCenters, 
    addJournalEntry,
    isLoading: false, 
    error: null 
  };
}
