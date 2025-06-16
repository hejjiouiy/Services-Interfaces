import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

import HeaderSection from './components/Navigation/HeaderSection';
import TimeRangeFilter from './components/Navigation/TimeRangeFilter';
import ActionButtons from './components/Navigation/ActionButtons';
import TabNavigation from './components/Navigation/TabNavigation';
import OverviewTab from './components/TabContent/OverviewTab';
import BudgetTab from './components/TabContent/BudgetTab';
import MaterialsTab from './components/TabContent/MaterialsTab';
import NoDataMessage from './components/Common/NoDataMessage';

import { useDataFiltering } from './hooks/useDataFiltering';
import { useStatistics } from './hooks/useStatistics';
import { useChartData } from './hooks/useChartData';
import { useTabState } from './hooks/useTabState';
import { samplePurchases } from './config/mockData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PurchasesAnalysisPage = ({ 
  purchases = samplePurchases,
  title = "Tableau de bord des Achats et Services",
  subtitle = "Analyse et visualisation des demandes d'achats et de services"
}) => {
  // State management
  const { activeTab, setActiveTab, timeRange, setTimeRange } = useTabState();

  // Data processing
  const filteredPurchases = useDataFiltering(purchases, timeRange);
  const statistics = useStatistics(filteredPurchases);
  const chartData = useChartData(filteredPurchases, statistics);

  // Event handlers
  const handleExport = () => {
    // Implementation for data export
    console.log('Exporting data...');
    // Could be implemented to export to CSV/Excel
  };

  const handleRefresh = () => {
    // Implementation for data refresh
    console.log('Refreshing data...');
    // Could trigger API call to refresh data
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            statistics={statistics}
            chartData={chartData}
            filteredPurchases={filteredPurchases}
            timeRange={timeRange}
          />
        );
      case 'budget':
        return (
          <BudgetTab
            statistics={statistics}
            chartData={chartData}
            filteredPurchases={filteredPurchases}
            timeRange={timeRange}
          />
        );
      case 'materials':
        return (
          <MaterialsTab
            statistics={statistics}
            chartData={chartData}
            filteredPurchases={filteredPurchases}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-main-beige p-6 rounded-lg min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <HeaderSection title={title} subtitle={subtitle} />

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex justify-between items-center">
          <TimeRangeFilter timeRange={timeRange} onChange={setTimeRange} />
          <ActionButtons onExport={handleExport} onRefresh={handleRefresh} />
        </div>

        {/* Navigation Tabs */}
        <TabNavigation activeTab={activeTab} onChange={setActiveTab} />

        {/* Tab Content */}
        {filteredPurchases.length === 0 ? (
          <NoDataMessage />
        ) : (
          renderTabContent()
        )}
      </div>
    </div>
  );
};

export default PurchasesAnalysisPage;