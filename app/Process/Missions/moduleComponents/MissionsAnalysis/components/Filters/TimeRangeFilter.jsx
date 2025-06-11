const TimeRangeFilter = ({ timeRange, onTimeRangeChange }) => (
  <div className="flex space-x-2">
    {['month', 'quarter', 'year'].map((range) => (
      <button
        key={range}
        onClick={() => onTimeRangeChange(range)}
        className={`px-4 py-2 rounded-lg ${
          timeRange === range
            ? 'bg-main-green text-white'
            : 'bg-gray-100 text-darker-beige hover:bg-gray-200'
        }`}
      >
        {range === 'month' ? 'Mois' : range === 'quarter' ? 'Trimestre' : 'Année'}
      </button>
    ))}
  </div>
);
export default TimeRangeFilter;