export const requestTypeConfig = {
  DEMANDE_ACHAT: {
    label: "Purchase Request",
    value: "DEMANDE_ACHAT"
  },
  DEMANDE_SERVICE: {
    label: "Unkonwn",
    value: "DEMANDE_SERVICE"
  }
};
export const priorityConfig = {
  URGENT: {
    label: "Urgent",
    value: "URGENT",
    color: "text-red-600"
  },
  NORMAL: {
    label: "Normal",
    value: "NORMAL",
    color: "text-blue-600"
  },
  BASSE: {
    label: "Low",
    value: "BASSE",
    color: "text-green-600"
  }
};

export const formFieldsConfig = {
  typeDemande: {
    label: "Request Type",
    required: true,
    type: "select",
    options: Object.values(requestTypeConfig)
  },
  priorite: {
    label: "Priority",
    required: true,
    type: "select",
    options: Object.values(priorityConfig)
  },
  dateBesoin: {
    label: "Date Needed",
    required: true,
    type: "date"
  },
  ligne_budgetaire_id: {
    label: "Budget Line",
    required: true,
    type: "select"
  }
};