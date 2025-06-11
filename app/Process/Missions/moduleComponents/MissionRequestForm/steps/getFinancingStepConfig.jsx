import { TypeFinancementEnum } from "../enums/enums";
const getFinancingStepConfig = () => ({
  title: "Financing Details",
  description: "Provide information about the financing of your mission",
  fields: [
    {
      type: "select",
      name: "financementType",
      label: "Financing Type",
      options: Object.keys(TypeFinancementEnum).map(key => ({
        value: TypeFinancementEnum[key],
        label: key.replace('_', ' ')
      })),
      required: true
    },
    {
      type: "textarea",
      name: "financementDetails",
      label: "Financing Details",
      placeholder: "Provide details about the financing",
      required: true
    },
    {
      type: "text",
      name: "financementDevise",
      label: "Currency",
      placeholder: "Enter the currency (e.g., MAD, USD, EUR)",
      required: true
    },
    {
      type: "checkbox",
      name: "financementValide",
      label: "Financing Validated"
    }
  ]
});
export default getFinancingStepConfig;