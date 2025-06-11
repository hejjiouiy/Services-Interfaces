import { TypeMission } from '../enums/enums';

const getMissionStepConfig = () => ({
  title: "Mission Details",
  description: "Provide basic information about your mission",
  fields: [
    {
      type: "select",
      name: "type",
      label: "Mission Type",
      options: Object.keys(TypeMission).map(key => ({
        value: TypeMission[key],
        label: key.replace('_', ' ')
      })),
      required: true
    },
    {
      type: "text",
      name: "destination",
      label: "Destination",
      placeholder: "Enter the destination",
      required: true
    },
    {
      type: "textarea",
      name: "details",
      label: "Mission Details",
      placeholder: "Describe the purpose and objectives of your mission",
      required: true
    },
    {
      type: "text",
      name: "pays",
      label: "Country",
      placeholder: "Enter the country",
      required: true
    },
    {
      type: "text",
      name: "ville",
      label: "City",
      placeholder: "Enter the city",
      required: true
    },
    {
      type: "number",
      name: "budgetPrevu",
      label: "Estimated Budget",
      placeholder: "Enter the estimated budget",
      required: true
    }
  ]
});

export default getMissionStepConfig;