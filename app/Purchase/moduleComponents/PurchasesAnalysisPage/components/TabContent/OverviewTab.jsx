import React, { useMemo } from 'react';
import OverviewStats from '../StatsCards/OverviewStats';
import ChartContainer from '../Charts/ChartContainer';
import DoughnutChart from '../Charts/DoughnutChart';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import RadarChart from '../Charts/RadarChart';
import PurchasesTable from '../Tables/PurchasesTable';

const OverviewTab = ({ 
  statistics, 
  chartData, 
  filteredPurchases, 
  timeRange 
}) => {
  const recentPurchases = useMemo(() => {
    return [...filteredPurchases]
      .sort((a, b) => new Date(b.dateDemande) - new Date(a.dateDemande))
      .slice(0, 5);
  }, [filteredPurchases]);

  return (
    <>
      <OverviewStats statistics={statistics} timeRange={timeRange} />
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartContainer title="Demandes par type">
          <DoughnutChart data={chartData.purchasesByTypeData} />
        </ChartContainer>
        
        <ChartContainer title="Demandes par état de validation">
          <DoughnutChart data={chartData.purchasesByStatusData} />
        </ChartContainer>
        
        <ChartContainer title="Tendance mensuelle des demandes" className="lg:col-span-2">
          <LineChart data={chartData.purchasesByMonthData} />
        </ChartContainer>
        
        <ChartContainer title="Top 10 Lignes Budgétaires (Budget estimé)" className="lg:col-span-2">
          <BarChart 
            data={chartData.totalEstimatedByBudgetLineData} 
            options={{ horizontal: true, isCurrency: true }}
          />
        </ChartContainer>
        
        <ChartContainer title="Profil des Demandes (Normalisé)" className="lg:col-span-2">
          <RadarChart data={chartData.radarChartData} statistics={statistics} />
        </ChartContainer>
      </div>

      {/* Recent Purchases Table */}
      <div className="grid grid-cols-1 gap-6">
        <PurchasesTable
          title="Demandes récentes"
          purchases={recentPurchases}
          type="recent"
          totalPurchases={filteredPurchases.length}
        />
      </div>
    </>
  );
};

export default OverviewTab;