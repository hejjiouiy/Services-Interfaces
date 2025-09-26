

const MissionDetailsDisplay = ({ data }) => {
  if (!data?.mission_details) return null;
  
  const mission = data.mission_details;
  const order = data.order_details;
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-main-green mb-3 flex items-center">
        <span className="bg-main-green text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
        Mission Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <p><strong>Title:</strong> {mission.titre}</p>
        <p><strong>Type:</strong> {mission.type}</p>
        <p><strong>Destination:</strong> {mission.destination}</p>
        <p><strong>Country:</strong> {mission.pays}</p>
        <p><strong>City:</strong> {mission.ville}</p>
        <p><strong>Budget:</strong> {mission.budgetPrevu} MAD</p>
        <p><strong>Start Date:</strong> {order?.dateDebut}</p>
        <p><strong>End Date:</strong> {order?.dateFin}</p>
      </div>
      {mission.details && (
        <div className="mt-3">
          <p><strong>Details:</strong></p>
          <p className="text-gray-700 bg-white p-2 rounded border text-sm">{mission.details}</p>
        </div>
      )}
    </div>
  );
};
export default MissionDetailsDisplay;