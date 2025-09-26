import { EtatMission } from "../enums/enums";

const getOrderStepConfig = (formData = {}) => {
  // Calculate minimum start date (15 days from today)
  const today = new Date();
  const minStartDate = new Date(today);
  minStartDate.setDate(today.getDate() + 15);
  
  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Calculate minimum end date (start date + 1 day if start date is selected)
  let minEndDate = null;
  if (formData.dateDebut) {
    const startDate = new Date(formData.dateDebut);
    const nextDay = new Date(startDate);
    nextDay.setDate(startDate.getDate() + 1);
    minEndDate = formatDateForInput(nextDay);
  }

  return {
    title: "Mission Order",
    description: "Provide details for the mission order",
    fields: [
      {
        type: "date",
        name: "dateDebut",
        label: "Start Date",
        required: true,
        min: formatDateForInput(minStartDate),
        placeholder: `Minimum date: ${formatDateForInput(minStartDate)}`
      },
      {
        type: "date",
        name: "dateFin",
        label: "End Date",
        required: true,
        min: minEndDate || formatDateForInput(minStartDate),
        placeholder: formData.dateDebut ? 
          `Minimum date: ${minEndDate}` : 
          "Please select start date first"
      },
      {
        type: "file",
        name: "accord_respo",
        label: "Responsibility Agreement",
        accept: ".pdf,.doc,.docx",
        required: true
      },
      {
        type: "checkbox",
        name: "includeTravel",
        label: "Include Travel Arrangements"
      },
      {
        type: "checkbox",
        name: "includeAccommodation",
        label: "Include Accommodation"
      },
      {
        type: "checkbox",
        name: "includeFinancing",
        label: "Include Financing Details"
      }
    ]
  };
};

export default getOrderStepConfig;