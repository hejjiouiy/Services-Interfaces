const TravelDetailsDisplay = ({ data }) => {
  if (!data.includeTravel) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-medium text-main-green mb-2">Travel Details</h3>
      <p><strong>Destination:</strong> {data.voyageDestination}</p>
      <p><strong>Transportation:</strong> {data.voyageMoyen}</p>
      <p><strong>Date:</strong> {data.voyageDateVoyage}</p>
    </div>
  );
};
export default TravelDetailsDisplay;