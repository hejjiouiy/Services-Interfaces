

const FinancingDetailsDisplay = ({ data }) => {
  if (!data?.order_details?.includeFinancing || !data?.financing_details) return null;

  const financing = data.financing_details;

  return (
    <div className="bg-yellow-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-yellow-700 mb-3 flex items-center">
        <span className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
        Financing Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <p><strong>Type:</strong> {financing.type}</p>
        <p><strong>Currency:</strong> {financing.devise}</p>
        <p><strong>Validated:</strong> {financing.valide ? 'Yes' : 'No'}</p>
      </div>
      {financing.details && (
        <div className="mt-3">
          <p><strong>Details:</strong></p>
          <p className="text-gray-700 bg-white p-2 rounded border text-sm">{financing.details}</p>
        </div>
      )}
    </div>
  );
};
export default FinancingDetailsDisplay;