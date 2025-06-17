export const statusColors = {
  BROUILLON: { bg: "bg-gray-100", text: "text-gray-800", rgb: "156, 163, 175" },
  SOUMISE: { bg: "bg-yellow-100", text: "text-yellow-800", rgb: "250, 204, 21" },
  VALIDEE: { bg: "bg-green-100", text: "text-green-800", rgb: "34, 197, 94" },
  REJETEE: { bg: "bg-red-100", text: "text-red-800", rgb: "239, 68, 68" },
};

export const typeColors = {
  DEMANDE_ACHAT: { bg: "bg-blue-100", text: "text-blue-800", rgb: "96, 165, 250" },
  DEMANDE_SERVICE: { bg: "bg-purple-100", text: "text-purple-800", rgb: "168, 85, 247" },
};

export const priorityColors = {
  URGENT: { bg: "bg-red-100", text: "text-red-800", rgb: "239, 68, 68" },
  NORMAL: { bg: "bg-blue-100", text: "text-blue-800", rgb: "96, 165, 250" },
  BASSE: { bg: "bg-green-100", text: "text-green-800", rgb: "34, 197, 94" },
};

export const getStatusBadgeClass = (status) => {
  return statusColors[status]?.bg + ' ' + statusColors[status]?.text || "bg-gray-100 text-gray-800";
};