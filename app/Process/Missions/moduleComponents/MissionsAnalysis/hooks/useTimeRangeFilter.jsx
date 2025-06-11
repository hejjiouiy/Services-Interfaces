'use client';
import { useState } from 'react';

const useTimeRangeFilter = () => {
  const [timeRange, setTimeRange] = useState('year');
  
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // Dans une application réelle, vous chargeriez ici des données différentes
    // en fonction de la plage de temps sélectionnée
  };

  return { timeRange, handleTimeRangeChange };
};
export default useTimeRangeFilter;