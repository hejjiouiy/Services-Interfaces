import React from 'react';
import StatCard from './StatCard';
import StatsGrid from './StatsGrid';

const MaterialsStats = ({ statistics }) => {
  return (
    <StatsGrid columns={3}>
      <StatCard
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15A.75.75 0 0 1 3 14.25h18a.75.75 0 0 1 .75.75v.75c0 1.08-.724 2.053-1.972 2.391-.305.086-.618.17-.943.252l-1.391 3.507a.75.75 0 0 1-1.01.42l-2.003-.932a1.125 1.125 0 0 0-1.293-.043l-1.615 1.144a1.125 1.125 0 0 0-1.293.043l-2.003-.932a.75.75 0 0 1-1.01.42l-1.392-3.507a2.173 2.173 0 0 0-.943-.252 1.972 1.972 0 0 1-1.972-2.39v-.75ZM4.5 9.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.75 9.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
        }
        title="Nombre de demandes Achat"
        value={statistics.countsByType.DEMANDE_ACHAT || 0}
        bgColor="bg-blue-100"
        textColor="text-blue-600"
      />
      
      <StatCard
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.498.42L2.25 16.072a4.5 4.5 0 0 1 1.485-.9v-.f-.75a.75.75 0 0 0-.72-.75H3a.75.75 0 0 0-.75.75v.75a.75.75 0 0 1-.72.75H.75A.75.75 0 0 0 0 15v-3a.75.75 0 0 0-.75-.75H-.75a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h.75a.75.75 0 0 1 .72-.75v-.75a.75.75 0 0 0-.75-.75H1.5ZM9.53 16.122v.518a3 3 0 0 1-.995 1.639l-.775-.775a2.25 2.25 0 0 0-1.128-5.78l-.17-.943c-.086-.305-.17-.618-.252-.943-.137-.52-.26-.748-.42-.91L2.25 10.5a4.5 4.5 0 0 1-.9 1.485h.75a.75.75 0 0 0 .75-.75v-.75a.75.75 0 0 1 .72-.75H4.5Zm-.129-4.132l-.775-.775a2.25 2.25 0 0 1-1.128 5.78l-.17-.943c-.086-.305-.17-.618-.252-.943-.137-.52-.26-.748-.42-.91L2.25 10.5a4.5 4.5 0 0 1-.9 1.485" />
          </svg>
        }
        title="Nombre de demandes Service"
        value={statistics.countsByType.DEMANDE_SERVICE || 0}
        bgColor="bg-purple-100"
        textColor="text-purple-600"
      />
      
      <StatCard
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 14.25v2.25m2.25-4.5H15M7.5 10.5H3m0 0L3 9a2.25 2.25 0 0 1 2.25-2.25h5.25M3 10.5h.389c.059 0 .118.013.175.04L6 11.875m-2.611-1.375-.922.922c-.11.11-.18.25-.22.4-.037.146-.054.299-.054.451v2.25M12 18.75a.75.75 0 0 0 .75-.75v-2.25m-2.25 4.5H12M7.5 14.25v2.25m-4.5-4.5a4.5 4.5 0 1 1 9 0v2.25c0 1.38-.56 2.63-1.464 3.536L12 20.25l-1.464-1.464A5.25 5.25 0 0 1 7.5 14.25V12M12 4.5c1.487 0 2.91.162 4.25.468a1.5 1.5 0 0 0 1.4-.18L19 4.5a.75.75 0 0 0-.5-.915 14.737 14.737 0 0 0-3.58-1.139 15.107 15.107 0 0 0-4.32 0 14.738 14.738 0 0 0-3.58 1.139.75.75 0 0 0-.5.915l1.85.418a1.5 1.5 0 0 0 1.4.18c1.34-.306 2.763-.468 4.25-.468Z" />
          </svg>
        }
        title="Moyenne matériels par demande"
        value={statistics.averageMaterialsPerPurchase.toFixed(1)}
        bgColor="bg-teal-100"
        textColor="text-teal-600"
      />
    </StatsGrid>
  );
};

export default MaterialsStats;