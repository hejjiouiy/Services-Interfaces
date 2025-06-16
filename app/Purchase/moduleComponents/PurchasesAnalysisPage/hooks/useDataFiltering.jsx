import { useMemo } from 'react';

export const useDataFiltering = (purchases, timeRange) => {
  return useMemo(() => {
    if (timeRange === 'all') {
        return purchases;
    }
    
    const now = new Date();
    let startDate;

    switch(timeRange) {
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'quarter':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case 'year':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
         startDate = new Date(0);
    }

    return purchases.filter(purchase => {
      const purchaseDate = new Date(purchase.dateDemande);
      return purchaseDate >= startDate;
    });
  }, [purchases, timeRange]);
};
