const AccommodationDetailsDisplay = ({ data }) => {
  if (!data.includeAccommodation) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-medium text-main-green mb-2">Accommodation Details</h3>
      <p><strong>Check-in:</strong> {data.hebergementDateDebut}</p>
      <p><strong>Check-out:</strong> {data.hebergementDateFin}</p>
      <p><strong>Location:</strong> {data.hebergementLocalisation}</p>
      <p><strong>Type:</strong> {data.hebergementTypeHebergement}</p>
    </div>
  );
};
export default AccommodationDetailsDisplay;