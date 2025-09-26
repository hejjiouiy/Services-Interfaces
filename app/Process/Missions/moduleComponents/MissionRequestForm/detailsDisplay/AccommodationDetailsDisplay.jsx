
const AccommodationDetailsDisplay = ({ data }) => {
  if (!data?.order_details?.includeAccommodation || !data?.accommodation_details) return null;

  const accommodation = data.accommodation_details;

  return (
    <div className="bg-purple-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-purple-700 mb-3 flex items-center">
        <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
        Accommodation Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <p><strong>Check-in:</strong> {accommodation.dateDebut}</p>
        <p><strong>Check-out:</strong> {accommodation.dateFin}</p>
        <p><strong>Location:</strong> {accommodation.localisation}</p>
        <p><strong>Type:</strong> {accommodation.typeHebergement}</p>
      </div>
    </div>
  );
};
export default AccommodationDetailsDisplay;