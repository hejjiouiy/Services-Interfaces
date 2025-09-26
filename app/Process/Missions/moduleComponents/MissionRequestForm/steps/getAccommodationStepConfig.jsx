import { getAccommodationOptions } from '../enums/options';

const getAccommodationStepConfig = (formData = {}) => {
  // Get mission start and end dates for validation
  const missionStartDate = formData.dateDebut;
  const missionEndDate = formData.dateFin;
  
  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  // Calculate accommodation date constraints
  let minCheckInDate = null;
  let maxCheckOutDate = null;
  let minCheckOutDate = null;
  
  if (missionStartDate && missionEndDate) {
    // Check-in can be from mission start date
    minCheckInDate = formatDateForInput(missionStartDate);
    // Check-out should be by mission end date
    maxCheckOutDate = formatDateForInput(missionEndDate);
  }
  
  // If check-in date is selected, check-out must be at least the next day
  if (formData.hebergementDateDebut) {
    const checkInDate = new Date(formData.hebergementDateDebut);
    const nextDay = new Date(checkInDate);
    nextDay.setDate(checkInDate.getDate() + 1);
    minCheckOutDate = formatDateForInput(nextDay);
  }

  return {
    title: "Accommodation Details",
    description: "Provide information about your accommodation",
    fields: [
      {
        type: "date",
        name: "hebergementDateDebut",
        label: "Check-in Date",
        required: true,
        min: minCheckInDate,
        max: maxCheckOutDate,
        placeholder: missionStartDate && missionEndDate ? 
          `Between ${minCheckInDate} and ${maxCheckOutDate}` :
          "Please complete mission dates first"
      },
      {
        type: "date",
        name: "hebergementDateFin",
        label: "Check-out Date",
        required: true,
        min: minCheckOutDate || minCheckInDate,
        max: maxCheckOutDate,
        placeholder: formData.hebergementDateDebut ? 
          `Minimum: ${minCheckOutDate}` :
          "Please select check-in date first"
      },
      {
        type: "text",
        name: "hebergementLocalisation",
        label: "Location",
        placeholder: "Enter accommodation location",
        required: true
      },
      {
        type: "select",
        name: "hebergementTypeHebergement",
        label: "Accommodation Type",
        options: getAccommodationOptions(),
        required: true
      }
    ]
  };
};

export default getAccommodationStepConfig;