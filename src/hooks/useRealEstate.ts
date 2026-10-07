import { useRealEstateStore } from '@/store/useRealEstateStore';

export function useRealEstate() {
  const { units, installments, projects, addUnit } = useRealEstateStore();

  return { 
    units, 
    installments, 
    projects, 
    addUnit,
    isLoading: false, 
    error: null 
  };
}
