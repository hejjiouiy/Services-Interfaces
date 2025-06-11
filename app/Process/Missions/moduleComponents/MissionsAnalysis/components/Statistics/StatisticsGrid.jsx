import StatisticCard from './StatisticCard';
import TotalMissionsIcon from '../Icons/TotalMissionsIcon';
import OngoingMissionsIcon from '../icons/OngoingMissionsIcon';
import BudgetIcon from '../icons/BudgetIcon';
import DurationIcon from '../icons/DurationIcon';
import { formatAmount } from '../../utils/formatters';

const StatisticsGrid = ({ statistics }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatisticCard
      icon={<TotalMissionsIcon />}
      title="Total des missions"
      value={statistics.totalMissions}
      color="bg-blue-100 text-blue-600"
    />
    <StatisticCard
      icon={<OngoingMissionsIcon />}
      title="Missions en cours"
      value={statistics.missionsEnCours}
      color="bg-yellow-100 text-yellow-600"
    />
    <StatisticCard
      icon={<BudgetIcon />}
      title="Budget total"
      value={formatAmount(statistics.budgetTotal)}
      color="bg-green-100 text-green-600"
    />
    <StatisticCard
      icon={<DurationIcon />}
      title="Durée moyenne (jours)"
      value={statistics.moyenneDuree}
      color="bg-purple-100 text-purple-600"
    />
  </div>
);
export default StatisticsGrid;