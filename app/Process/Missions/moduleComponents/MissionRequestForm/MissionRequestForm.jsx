import useMissionFormState from './hooks/useMissionFormState';
import useMissionSteps from './hooks/useMissionSteps';
import useMissionSubmission from './hooks/useMissionSubmission';
import MultiStepForm from '../../../../../sharedComponents/components/MultiStepForm/MultiStepForm';
import {EtatMission, TypeMission} from './enums/enums'
import SuccessMessage from './detailsDisplay/SuccessMessage';

const MissionRequestForm = () => {
  const { formState, handleFormChange } = useMissionFormState();
  const steps = useMissionSteps(formState);
  const { submissionResult, handleSubmit, resetSubmission } = useMissionSubmission();

  // Show success message if form was submitted
  if (submissionResult) {
    return (
      <SuccessMessage 
        submissionResult={submissionResult} 
        onReset={resetSubmission} 
      />
    );
  }

  // Show the multi-step form
  return (
    <MultiStepForm
      initialValues={{
        etat: EtatMission.OUVERTE,
        type: TypeMission.FORMATION
      }}
      onSubmit={handleSubmit}
      steps={steps}
      title="Mission Request Form"
      onFormDataChange={handleFormChange}
    />
  );
};

export default MissionRequestForm;