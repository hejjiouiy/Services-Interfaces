import useMissionFormState from './hooks/useMissionFormState';
import useMissionSteps from './hooks/useMissionSteps';
import useMissionSubmission from './hooks/useMissionSubmission';
import MultiStepForm from '../../../../../sharedComponents/components/MultiStepForm/MultiStepForm';
import {EtatMission, TypeMission} from './enums/enums'
import SuccessMessage from './detailsDisplay/SuccessMessage';

const MissionRequestForm = () => {
  const { formState, formData, handleFormChange } = useMissionFormState();
  const steps = useMissionSteps(formState, formData);
  const { submissionResult, isSubmitting, handleSubmit, resetSubmission } = useMissionSubmission();

  // Show success message if form was submitted successfully
  if (submissionResult) {
    return (
      <SuccessMessage 
        submissionResult={submissionResult} 
        onReset={resetSubmission} 
      />
    );
  }

  // Show loading state during submission
  if (isSubmitting) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main-green mr-3"></div>
          <p className="text-gray-600">Submitting your mission request...</p>
        </div>
      </div>
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
      disabled={isSubmitting} // Disable form during submission
    />
  );
};

export default MissionRequestForm;