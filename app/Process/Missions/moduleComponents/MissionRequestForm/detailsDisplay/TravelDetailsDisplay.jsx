
const TravelDetailsDisplay = ({ data }) => {
  if (!data?.order_details?.includeTravel || !data?.travel_details) return null;

  const travel = data.travel_details;

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-blue-700 mb-3 flex items-center">
        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
        Travel Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <p><strong>Destination:</strong> {travel.destination}</p>
        <p><strong>Transportation:</strong> {travel.moyen}</p>
        <p><strong>Travel Date:</strong> {travel.dateVoyage}</p>
      </div>
    </div>
  );
};
export default TravelDetailsDisplay;