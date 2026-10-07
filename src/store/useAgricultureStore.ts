import { create } from 'zustand';
import { SensorData, CycleTask, AgriReport } from '@/types';
import { mockSensorData, mockCycleTasks, mockAgriReports } from '@/lib/mocks';

interface AgricultureState {
  sensorData: SensorData | null;
  cycleTasks: CycleTask[];
  reports: AgriReport[];
  // Actions
}

export const useAgricultureStore = create<AgricultureState>((set) => ({
  sensorData: mockSensorData,
  cycleTasks: mockCycleTasks,
  reports: mockAgriReports,
}));
