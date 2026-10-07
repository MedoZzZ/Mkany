import { create } from 'zustand';
import { LegalTask, LegalSession, LegalCase, LegalClient } from '@/types';
import { mockLegalTasks, mockLegalSessions, mockLegalCases, mockLegalClients } from '@/lib/mocks';

interface LegalState {
  tasks: LegalTask[];
  sessions: LegalSession[];
  cases: LegalCase[];
  clients: LegalClient[];
  addCase: (newCase: LegalCase) => void;
}

export const useLegalStore = create<LegalState>((set) => ({
  tasks: mockLegalTasks,
  sessions: mockLegalSessions,
  cases: mockLegalCases,
  clients: mockLegalClients,
  addCase: (newCase) => set((state) => ({ cases: [newCase, ...state.cases] })),
}));
