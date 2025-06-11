import { getAccommodationOptions } from '../enums/options';
const getAccommodationStepConfig = () => ({
  title: "Accommodation Details",
  description: "Provide information about your accommodation",
  fields: [
    {
      type: "date",
      name: "hebergementDateDebut",
      label: "Check-in Date",
      required: true
    },
    {
      type: "date",
      name: "hebergementDateFin",
      label: "Check-out Date",
      required: true
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
});
export default getAccommodationStepConfig;