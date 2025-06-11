const MissionDetailsDisplay = ({ data }) => (
  <div className="bg-gray-50 p-4 rounded-lg mb-4">
    <h3 className="text-lg font-medium text-main-green mb-2">Mission Details</h3>
    <p><strong>Type:</strong> {data.type}</p>
    <p><strong>Destination:</strong> {data.destination}</p>
    <p><strong>Country:</strong> {data.pays}</p>
    <p><strong>City:</strong> {data.ville}</p>
    <p><strong>Budget:</strong> {data.budgetPrevu}</p>
    <p><strong>Date:</strong> {data.dateDebut} to {data.dateFin}</p>
  </div>
);
export default MissionDetailsDisplay;