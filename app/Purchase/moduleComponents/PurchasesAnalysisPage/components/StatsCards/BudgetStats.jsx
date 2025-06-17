import React from 'react';
import StatCard from './StatCard';
import StatsGrid from './StatsGrid';
import { formatAmount } from '../../utils/formatters';

const BudgetStats = ({ statistics, filteredPurchases, timeRange }) => {
  const timeRangeText = timeRange === 'all' ? 'total' : 
                       timeRange === 'month' ? '30j' : 
                       timeRange === 'quarter' ? '90j' : '1 an';

  const averageBudgetAchat = statistics.countsByType.DEMANDE_ACHAT > 0
    ? filteredPurchases.filter(p => p.typeDemande === 'DEMANDE_ACHAT')
        .reduce((sum, p) => sum + p.totalEstimated, 0) / statistics.countsByType.DEMANDE_ACHAT
    : 0;

  return (
    <StatsGrid columns={3}>
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
      
      <StatCard
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15A.75.75 0 0 1 3 14.25h18a.75.75 0 0 1 .75.75v.75c0 1.08-.724 2.053-1.972 2.391-.305.086-.618.17-.943.252l-1.391 3.507a.75.75 0 0 1-1.01.42l-2.003-.932a1.125 1.125 0 0 0-1.293-.043l-1.615 1.144a1.125 1.125 0 0 0-1.293.043l-2.003-.932a.75.75 0 0 1-1.01.42l-1.392-3.507a2.173 2.173 0 0 0-.943-.252 1.972 1.972 0 0 1-1.972-2.39v-.75ZM4.5 9.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.75 9.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
        }
        title="Budget moyen par demande Achat"
        value={formatAmount(averageBudgetAchat)}
        bgColor="bg-blue-100"
        textColor="text-blue-600"
      />
    </StatsGrid>
  );
};

export default BudgetStats;