import { EtatMission } from "../enums/enums";
const getOrderStepConfig = () => ({
  title: "Mission Order",
  description: "Provide details for the mission order",
  fields: [
    {
      type: "date",
      name: "dateDebut",
      label: "Start Date",
      required: true
    },
    {
      type: "date",
      name: "dateFin",
      label: "End Date",
      required: true
    },
    {
      type: "select",
      name: "etat",
      label: "Mission Status",
      options: Object.keys(EtatMission).map(key => ({
        value: EtatMission[key],
        label: key.replace('_', ' ')
      })),
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
});
export default getOrderStepConfig;