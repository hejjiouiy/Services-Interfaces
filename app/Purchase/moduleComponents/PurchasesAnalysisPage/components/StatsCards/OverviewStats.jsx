import React from 'react';
import StatCard from './StatCard';
import StatsGrid from './StatsGrid';
import { formatAmount } from '../../utils/formatters';

const OverviewStats = ({ statistics, timeRange }) => {
  const timeRangeText = timeRange === 'all' ? 'total' : 
                       timeRange === 'month' ? '30j' : 
                       timeRange === 'quarter' ? '90j' : '1 an';

  return (
    <StatsGrid columns={4}>
      <StatCard
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2H5.25A.75.75 0 004.5.75V2m0 0v10.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V9.75m-14.25 0h7.5" />
          </svg>
        }
        title={`Total demandes (${timeRangeText})`}
        value={statistics.totalPurchases}
        bgColor="bg-blue-100"
        textColor="text-blue-600"
      />
      
     <StatCard
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        }
        title="Demandes soumises"
        value={statistics.countsByStatus.SOUMISE || 0}
        bgColor="bg-yellow-100"
        textColor="text-yellow-600"
      />
      
      <StatCard
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.104c1.094.342 1.094 1.856 0 2.198a60.07 60.07 0 0 1-15.797 2.104m13.137-2.104c.794.18 1.617.245 2.457.245a59.75 59.75 0 0 0 4.582-2.105M18.137 14.421a60.07 60.07 0 0 1 2.104 15.797m0 0l1.094-.342a60.07 60.07 0 0 0-2.198-1.094m0-2.198c.18-.794.245-1.617.245-2.457a59.75 59.75 0 0 0-2.105-4.582m-2.457-1.094a60.07 60.07 0 0 1-15.797-2.104m0 0l-1.094 3.42a60.07 60.07 0 0 0 2.198 1.094m0 2.198c-.18.794-.245 1.617-.245 2.457a59.75 59.75 0 0 0 2.105 4.582m12.75-18.137a60.07 60.07 0 0 1-2.104-15.797m0 0l-.342-1.094a60.07 60.07 0 0 0-2.198 1.094m-2.198 0c-.794-.18-1.617-.245-2.457-.245a59.75 59.75 0 0 0-4.582 2.105M8.137 14.421a60.07 60.07 0 0 1-2.104 15.797" />
          </svg>
        }
        title={`Budget estimé total (${timeRangeText})`}
        value={formatAmount(statistics.totalEstimatedBudget)}
        bgColor="bg-green-100"
        textColor="text-green-600"
      />
      
      <StatCard
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5H8.25L9.75 9l-6 3.75 6 3.75-1.5-1.5H12l2.25 8.25L3.75 13.5z" />
          </svg>
        }
        title="Budget estimé moyen"
        value={formatAmount(statistics.averageEstimatedBudget)}
        bgColor="bg-purple-100"
        textColor="text-purple-600"
      />
    </StatsGrid>
  );
};

export default OverviewStats;