import React, { useMemo } from 'react';
import MaterialsStats from '../StatsCards/MaterialStats';
import ChartContainer from '../Charts/ChartContainer';
import DoughnutChart from '../Charts/DoughnutChart';
import BarChart from '../Charts/BarChart';
import PurchasesTable from '../Tables/PurchasesTable';

const MaterialsTab = ({ 
  statistics, 
  chartData, 
  filteredPurchases 
}) => {
  const recentPurchases = useMemo(() => {
    return [...filteredPurchases]
      .sort((a, b) => new Date(b.dateDemande) - new Date(a.dateDemande))
      .slice(0, 5);
  }, [filteredPurchases]);

  const topMaterialsChartData = useMemo(() => {
    return {
      labels: statistics.topMaterialsByCost.map(item => item.designation),
      datasets: [{
        label: 'Budget Total Estimé (MAD)',
        data: statistics.topMaterialsByCost.map(item => item.totalCost),
        backgroundColor: 'rgba(0, 216, 113, 0.7)',
        borderColor: 'rgba(0, 216, 113, 1)',
        borderWidth: 1,
      }]
    };
  }, [statistics.topMaterialsByCost]);

  return (
    <>
      <MaterialsStats statistics={statistics} />
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartContainer title="Budget par type de demande">
          <DoughnutChart 
            data={chartData.budgetByTypeData} 
            options={{ isCurrency: true }}
          />
        </ChartContainer>
        
        <ChartContainer title="Top 5 Matériels par Budget Estimé">
          <BarChart 
            data={topMaterialsChartData} 
            options={{ horizontal: true, isCurrency: true }}
          />
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

export default MaterialsTab;