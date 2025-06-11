import TimeRangeFilter from './TimeRangeFilter';
import ExportButtons from './ExportButtons';
const FilterPanel = ({ timeRange, onTimeRangeChange }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex justify-between items-center">
    <TimeRangeFilter timeRange={timeRange} onTimeRangeChange={onTimeRangeChange} />
    <ExportButtons />
  </div>
);

export default FilterPanel;