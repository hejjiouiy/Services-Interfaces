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
import getSampleData from './config/sampleData'
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
  const sampleData = getSampleData();

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