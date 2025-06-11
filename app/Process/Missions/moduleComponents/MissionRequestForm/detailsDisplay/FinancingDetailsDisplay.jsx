const FinancingDetailsDisplay = ({ data }) => {
  if (!data.includeFinancing) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-medium text-main-green mb-2">Financing Details</h3>
      <p><strong>Type:</strong> {data.financementType}</p>
      <p><strong>Details:</strong> {data.financementDetails}</p>
      <p><strong>Currency:</strong> {data.financementDevise}</p>
      <p><strong>Validated:</strong> {data.financementValide ? 'Yes' : 'No'}</p>
    </div>
  );
};
export default FinancingDetailsDisplay;