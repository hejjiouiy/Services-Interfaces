import { useCallback } from 'react';

export const useFormSubmission = () => {
  const submitForm = useCallback((formData, materials, onSuccess, onError) => {
    try {
      const purchaseRequest = {
        ...formData,
        dateDemande: new Date().toISOString(),
        etatValidation: 'SOUMISE',
        materials
      };

      console.log('Purchase Request Submitted:', purchaseRequest);
      
      // In a real app, you would send this data to your API
      // const response = await fetch('/api/purchase-requests', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(purchaseRequest)
      // });
      
      if (onSuccess) {
        onSuccess(purchaseRequest);
      }
      
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      if (onError) {
        onError(error);
      }
      return false;
    }
  }, []);

  return { submitForm };
};