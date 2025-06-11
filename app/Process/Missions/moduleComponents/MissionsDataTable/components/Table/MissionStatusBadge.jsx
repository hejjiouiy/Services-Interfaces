import getStatusColors from "../../config/statusColors";

const MissionStatusBadge = ({ status }) => {
  const statusColors = getStatusColors();
  const statusColor = statusColors[status] || "bg-gray-100 text-gray-800";
  
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
      {status}
    </span>
  );
};
export default MissionStatusBadge;