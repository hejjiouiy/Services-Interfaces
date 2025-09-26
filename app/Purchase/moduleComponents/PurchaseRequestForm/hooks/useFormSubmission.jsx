import { useCallback } from 'react';

export const useFormSubmission =  () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8000';

  const submitForm = useCallback(async (formData, materials, onSuccess, onError) => {
    try {
      const purchaseRequest = {
        ...formData,
        dateDemande: new Date().toISOString(),
        etatValidation: 'SOUMISE',
        materials
      };

      console.log('Purchase Request Submitted:', purchaseRequest);
      
      // In a real app, you would send this data to your API
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchaseRequest)
      });
      
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