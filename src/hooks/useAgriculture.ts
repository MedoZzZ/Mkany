import { useAgricultureStore } from '@/store/useAgricultureStore';

export function useAgriculture() {
  const { sensorData, cycleTasks, reports } = useAgricultureStore();

  return { 
    sensorData, 
    cycleTasks, 
    reports, 
    isLoading: false, 
    error: null 
  };
}
