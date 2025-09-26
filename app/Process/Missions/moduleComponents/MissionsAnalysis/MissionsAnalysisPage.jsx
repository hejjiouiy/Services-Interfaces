import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Link from 'next/link';
import useTimeRangeFilter from './hooks/useTimeRangeFilter'
import { useAnalytics, useSpecificAnalytics } from './config/sampleData' // Update this path
import PageHeader from './components/Header/PageHeader';
import FilterPanel from './components/Filters/FilterPanel';
import StatisticsGrid from './components/Statistics/StatisticsGrid';
import ChartsGrid from './components/Charts/ChartsGrid';
import DetailsGrid from './components/Details/DetailsGrid';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const MissionsAnalysisPage = () => {
  const { timeRange, handleTimeRangeChange } = useTimeRangeFilter();
  const { data: sampleData, loading, error } = useAnalytics(); // Extract data from the hook result
  
  console.log('MissionsAnalysisPage rendered with sampleData:', sampleData);
  
  // Handle loading state
  if (loading) {
    return (
      <div className="bg-main-beige p-6 rounded-lg min-h-screen">
        <div className="maErreur lors du chargement des données: AnalyticsAPI.getDashboardAnalytics is not a function

x-w-7xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-main-green mx-auto"></div>
            <p className="mt-4 text-main-green">Chargement des données...</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-main-beige p-6 rounded-lg min-h-screen">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">Erreur lors du chargement des données: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-main-green text-white rounded hover:bg-opacity-80"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle no data
  if (!sampleData) {
    return (
      <div className="bg-main-beige p-6 rounded-lg min-h-screen">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <p className="text-gray-600">Aucune donnée disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-main-beige p-6 rounded-lg min-h-screen">
      <div className="max-w-7xl mx-auto">
        <PageHeader />
        
        <FilterPanel 
          timeRange={timeRange} 
          onTimeRangeChange={handleTimeRangeChange} 
        />
        
        <StatisticsGrid statistics={sampleData.statistics} />
        
        <ChartsGrid sampleData={sampleData} />
        
        <DetailsGrid sampleData={sampleData} />
      </div>
    </div>
  );
};

export default MissionsAnalysisPage;