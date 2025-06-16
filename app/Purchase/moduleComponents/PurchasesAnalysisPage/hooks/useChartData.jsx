import { useMemo } from 'react';
import { 
  generateDoughnutChartData, 
  generateBarChartData, 
  generateLineChartData 
} from '../utils/chartDataGenerators';
import { statusColors, typeColors, priorityColors } from '../config/colorSchemes';
import { calculateBudgetByCategory } from '../utils/statisticsCalculators';

export const useChartData = (filteredPurchases, statistics) => {
  return useMemo(() => {
    // Chart Data: Demandes par type (Doughnut)
    const purchasesByTypeData = generateDoughnutChartData(
      statistics.countsByType,
      typeColors
    );

    // Chart Data: Demandes par état de validation (Doughnut)
    const purchasesByStatusData = generateDoughnutChartData(
      statistics.countsByStatus,
      statusColors
    );

    // Chart Data: Budget par priorité (Doughnut)
    const budgetByPriorityData = generateDoughnutChartData(
      calculateBudgetByCategory(filteredPurchases, 'priorite'),
      priorityColors
    );

    // Chart Data: Budget par type de demande (Doughnut)
    const budgetByTypeData = generateDoughnutChartData(
      calculateBudgetByCategory(filteredPurchases, 'typeDemande'),
      typeColors
    );

    // Chart Data: Budget estimé par ligne budgétaire (Bar)
    const budgetLineAmounts = filteredPurchases.reduce((acc, purchase) => {
      acc[purchase.budget_line] = (acc[purchase.budget_line] || 0) + purchase.totalEstimated;
      return acc;
    }, {});
    
    const totalEstimatedByBudgetLineData = generateBarChartData(
      budgetLineAmounts,
      'Budget Estimé (MAD)'
    );

    // Chart Data: Tendance mensuelle des demandes (Line)
    const purchasesByMonthData = generateLineChartData(
      filteredPurchases,
      'count',
      'Nombre de demandes par mois'
    );

    // Chart Data: Budget estimé par mois (Line)
    const budgetByMonthData = generateLineChartData(
      filteredPurchases,
      'totalEstimated',
      'Budget Estimé par mois (MAD)',
      'rgba(0, 216, 113, 1)'
    );

    // Radar chart data
    const radarChartData = {
      labels: ['Validées', 'Rejetées', 'Urgentes', 'Achats', 'Services', 'Budget Total'],
      datasets: [{
        label: 'Distribution (Normalisé)',
        data: [
          (statistics.countsByStatus.VALIDEE || 0),
          (statistics.countsByStatus.REJETEE || 0),
          (statistics.countsByPriority.URGENT || 0),
          (statistics.countsByType.DEMANDE_ACHAT || 0),
          (statistics.countsByType.DEMANDE_SERVICE || 0),
          statistics.totalEstimatedBudget / 1000 // Normalized
        ],
        backgroundColor: 'rgba(0, 84, 63, 0.2)',
        borderColor: 'rgba(0, 84, 63, 1)',
        pointBackgroundColor: 'rgba(0, 84, 63, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0, 84, 63, 1)',
      }]
    };

    return {
      purchasesByTypeData,
      purchasesByStatusData,
      budgetByPriorityData,
      budgetByTypeData,
      totalEstimatedByBudgetLineData,
      purchasesByMonthData,
      budgetByMonthData,
      radarChartData
    };
  }, [filteredPurchases, statistics]);
};