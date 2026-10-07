import { create } from 'zustand';
import { RealEstateUnit, Installment, Project } from '@/types';
import { mockUnits, mockInstallments, mockProjects } from '@/lib/mocks';

interface RealEstateState {
  units: RealEstateUnit[];
  installments: Installment[];
  projects: Project[];
  addUnit: (unit: RealEstateUnit) => void;
}

export const useRealEstateStore = create<RealEstateState>((set) => ({
  units: mockUnits,
  installments: mockInstallments,
  projects: mockProjects,
  addUnit: (unit) => set((state) => ({ units: [unit, ...state.units] })),
}));
