import React, { useMemo } from 'react';
import BudgetStats from '../StatsCards/BudgetStats';
import ChartContainer from '../Charts/ChartContainer';
import DoughnutChart from '../Charts/DoughnutChart';
import LineChart from '../Charts/LineChart';
import PurchasesTable from '../Tables/PurchasesTable';

const BudgetTab = ({ 
  statistics, 
  chartData, 
  filteredPurchases, 
  timeRange 
}) => {
  const topExpensivePurchases = useMemo(() => {
    return [...filteredPurchases]
      .sort((a, b) => b.totalEstimated - a.totalEstimated)
      .slice(0, 5);
  }, [filteredPurchases]);

  return (
    <>
      <BudgetStats 
        statistics={statistics} 
        filteredPurchases={filteredPurchases}
        timeRange={timeRange} 
      />
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartContainer title="Budget par priorité">
          <DoughnutChart 
            data={chartData.budgetByPriorityData} 
            options={{ isCurrency: true }}
          />
        </ChartContainer>
        
        <ChartContainer title="Budget par type de demande">
          <DoughnutChart 
            data={chartData.budgetByTypeData} 
            options={{ isCurrency: true }}
          />
        </ChartContainer>
        
        <ChartContainer title="Tendance mensuelle du budget estimé" className="lg:col-span-2">
          <LineChart 
            data={chartData.budgetByMonthData} 
            options={{ isCurrency: true }}
          />
        </ChartContainer>
      </div>

      {/* Top Expensive Purchases Table */}
      <div className="grid grid-cols-1 gap-6">
        <PurchasesTable
          title="Top 5 Demandes les plus coûteuses"
          purchases={topExpensivePurchases}
          type="expensive"
          totalPurchases={filteredPurchases.length}
        />
      </div>
    </>
  );
};

export default BudgetTab;