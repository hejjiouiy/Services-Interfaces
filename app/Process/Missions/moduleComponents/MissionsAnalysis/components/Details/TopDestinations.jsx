const TopDestinations = ({ destinations }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold text-main-green mb-4">Top destinations</h2>
    <ul className="space-y-4">
      {destinations.map((item, index) => (
        <li key={index} className="flex justify-between items-center">
          <span className="text-darker-beige">{item.destination}</span>
          <span className="bg-main-green/10 text-main-green px-2 py-1 rounded-full text-sm">{item.count}</span>
        </li>
      ))}
    </ul>
  </div>
);
export default TopDestinations;