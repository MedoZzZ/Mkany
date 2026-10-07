import { useLegalStore } from '@/store/useLegalStore';

export function useLegal() {
  const { tasks, sessions, cases, clients, addCase } = useLegalStore();

  return { 
    tasks, 
    sessions, 
    cases, 
    clients, 
    addCase,
    isLoading: false, 
    error: null 
  };
}
