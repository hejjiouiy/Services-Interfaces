import { TypeMission , existingMissions } from '../enums/enums';

const getMissionStepConfig = (formData = {}, existingMissionOptions = []) => {
  const hasExistingMission = formData.missionId && formData.missionId !== '';
  const isNationalMission = formData.type === TypeMission.NATIONALE;
  
  // Calculate minimum start date (15 days from today)
  const today = new Date();
  const minStartDate = new Date(today);
  minStartDate.setDate(today.getDate() + 15);
  
  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  return {
    title: "Mission Details",
    description: "Provide basic information about your mission",
    fields: [
      {
        type: "select",
        name: "missionId",
        label: "Existing Mission",
        placeholder: "Select an existing mission or leave empty for a new one",
        options: existingMissionOptions,
        required: false
      },
      {
        type: "text",
        name: "titre",
        label: "Mission Title",
        placeholder: "Enter the title of your mission",
        required: !hasExistingMission,
        disabled: hasExistingMission
      },
      {
        type: "select",
        name: "type",
        label: "Mission Type",
        options: Object.keys(TypeMission).map(key => ({
          value: TypeMission[key],
          label: key.replace('_', ' ')
        })),
        required: !hasExistingMission,
        disabled: hasExistingMission
      },
      {
        type: "date",
        name: "missionDebut",
        label: "Starting Date",
        required: !hasExistingMission,
        disabled: hasExistingMission,
        min: !hasExistingMission ? formatDateForInput(minStartDate) : undefined,
        placeholder: !hasExistingMission ? `Minimum date: ${formatDateForInput(minStartDate)}` : undefined
      },
      {
        type: "text",
        name: "destination",
        label: "Destination",
        placeholder: "Enter the destination",
        required: !hasExistingMission,
        disabled: hasExistingMission
      },
      {
        type: "text",
        name: "pays",
        label: "Country",
        placeholder: isNationalMission ? "Morocco" : "Enter the country",
        value: isNationalMission ? "Morocco" : formData.pays,
        required: !hasExistingMission,
        // disabled: hasExistingMission || isNationalMission,
        // readonly: isNationalMission
      },
      {
        type: "text",
        name: "ville",
        label: "City",
        placeholder: "Enter the city",
        required: !hasExistingMission,
        disabled: hasExistingMission
      },
      {
        type: "number",
        name: "budgetPrevu",
        label: "Estimated Budget",
        placeholder: "Enter the estimated budget",
        required: !hasExistingMission,
        disabled: hasExistingMission
      },
      {
        type: "textarea",
        name: "details",
        label: "Mission Details",
        placeholder: "Describe the purpose and objectives of your mission",
        required: !hasExistingMission,
        disabled: hasExistingMission
      }
    ]
  };
};

export default getMissionStepConfig;