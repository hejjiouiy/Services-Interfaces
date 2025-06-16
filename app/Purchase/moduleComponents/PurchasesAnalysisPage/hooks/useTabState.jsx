import { useState } from 'react';

export const useTabState = (initialTab = 'overview') => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [timeRange, setTimeRange] = useState('year');

  return {
    activeTab,
    setActiveTab,
    timeRange,
    setTimeRange
  };
};