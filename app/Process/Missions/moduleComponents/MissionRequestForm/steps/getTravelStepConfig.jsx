import { getTransportationOptions } from '../enums/options';

const getTravelStepConfig = () => ({
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
      required: true
    }
  ]
});
export default getTravelStepConfig;