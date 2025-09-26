import { getTransportationOptions } from '../enums/options';

const getTravelStepConfig = (formData = {}) => {
  // Get mission start and end dates for validation
  const missionStartDate = formData.dateDebut;
  const missionEndDate = formData.dateFin;
  
  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  // Calculate travel date constraints
  let minTravelDate = null;
  let maxTravelDate = null;
  
  if (missionStartDate && missionEndDate) {
    // Travel date should be between mission start and end dates
    minTravelDate = formatDateForInput(missionStartDate);
    maxTravelDate = formatDateForInput(missionEndDate);
  }

  return {
    title: "Travel Details",
    description: "Provide information about your travel arrangements",
    fields: [
      {
        type: "text",
        name: "voyageDestination",
        label: "Travel Destination",
        placeholder: "Enter travel destination",
        required: true
      },
      {
        type: "select",
        name: "voyageMoyen",
        label: "Transportation Method",
        options: getTransportationOptions(),
        required: true
      },
      {
        type: "date",
        name: "voyageDateVoyage",
        label: "Travel Date",
        required: true,
        min: minTravelDate,
        max: maxTravelDate,
        placeholder: missionStartDate && missionEndDate ? 
          `Must be between ${minTravelDate} and ${maxTravelDate}` :
          "Please complete mission dates first"
      }
    ]
  };
};

export default getTravelStepConfig;