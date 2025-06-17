import { useMemo } from 'react';
import { calculatePurchaseStatistics } from '../utils/statisticsCalculators';

export const useStatistics = (filteredPurchases) => {
  return useMemo(() => {
    return calculatePurchaseStatistics(filteredPurchases);
  }, [filteredPurchases]);
};