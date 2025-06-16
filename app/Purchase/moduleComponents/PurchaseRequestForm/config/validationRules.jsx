export const validationRules = {
  typeDemande: {
    required: true,
    message: "Request type is required"
  },
  priorite: {
    required: true,
    message: "Priority is required"
  },
  dateBesoin: {
    required: true,
    message: "Date needed is required",
    validate: (value) => {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today ? null : "Date needed must be today or in the future";
    }
  },
  ligne_budgetaire_id: {
    required: true,
    message: "Budget line is required"
  },
  materials: {
    required: true,
    message: "At least one material is required",
    validate: (materials) => materials.length > 0 ? null : "Please add at least one material"
  }
};