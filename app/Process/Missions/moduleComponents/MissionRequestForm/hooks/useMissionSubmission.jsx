import { useState } from 'react';

const useMissionSubmission = () => {
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleSubmit = (formData) => {
    console.log('Form submitted with data:', formData);
    setSubmissionResult(formData);
    // Here you would typically send this data to your API
    // Example: await submitMissionRequest(formData);
  };

  const resetSubmission = () => {
    setSubmissionResult(null);
  };

  return { submissionResult, handleSubmit, resetSubmission };
};
export default useMissionSubmission;