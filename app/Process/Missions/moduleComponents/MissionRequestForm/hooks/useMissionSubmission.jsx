import { useState } from 'react';

const useMissionSubmission = () => {
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const transformToStepBasedData = (formData) => {
    const stepBasedData = {
      // Step 2: Order Details (always included)
      order_details: {
        dateDebut: formData.dateDebut,
        dateFin: formData.dateFin,
        includeTravel: formData.includeTravel || false,
        includeAccommodation: formData.includeAccommodation || false,
        includeFinancing: formData.includeFinancing || false
      }
    };

    // Step 1: Mission Details - Handle both new and existing missions
    if (formData.missionId && formData.missionId !== '') {
      // Using existing mission - only send the ID
      stepBasedData.mission_details = {
        missionId: formData.missionId
      };
      console.log('Using existing mission ID:', formData.missionId);
    } else {
      // Creating new mission - send all required fields
      stepBasedData.mission_details = {
        etat: formData.etat,
        type: formData.type,
        dateDebut: formData.missionDebut,
        titre: formData.titre,
        destination: formData.destination,
        ville: formData.ville,
        details: formData.details,
        budgetPrevu: formData.budgetPrevu,
        pays: formData.pays
      };
      console.log('Creating new mission with data:', stepBasedData.mission_details);
    }

    // Step 3: Travel (only if included)
    if (formData.includeTravel && formData.voyageDestination) {
      stepBasedData.travel_details = {
        destination: formData.voyageDestination,
        moyen: formData.voyageMoyen,
        dateVoyage: formData.voyageDateVoyage
      };
    }

    // Step 4: Accommodation (only if included)
    if (formData.includeAccommodation && formData.hebergementDateDebut) {
      stepBasedData.accommodation_details = {
        dateDebut: formData.hebergementDateDebut,
        dateFin: formData.hebergementDateFin,
        localisation: formData.hebergementLocalisation,
        typeHebergement: formData.hebergementTypeHebergement
      };
    }

    // Step 5: Financing (only if included)
    if (formData.includeFinancing && formData.financementType) {
      stepBasedData.financing_details = {
        type: formData.financementType,
        details: formData.financementDetails,
        devise: formData.financementDevise,
        ...(formData.financementValide && { valide: formData.financementValide })
      };
    }

    return stepBasedData;
  };

  const handleSubmit = async (formData) => {
    // Prevent double submission
    if (isSubmitting) {
      console.warn('Submission already in progress');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Debug: Log the formData to see what we're getting
      console.log('Raw formData received:', formData);
      console.log('accord_respo type:', typeof formData.accord_respo);
      console.log('accord_respo value:', formData.accord_respo);
      console.log('Is File object?', formData.accord_respo instanceof File);
      
      // Transform flat data to step-based structure
      const stepBasedData = transformToStepBasedData(formData);
      
      console.log('Sending step-based data:', stepBasedData);
      
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add JSON data
      submitData.append('data', JSON.stringify(stepBasedData));
      
      // Check if we have a proper File object
      if (formData.accord_respo instanceof File) {
        submitData.append('file', formData.accord_respo);
        console.log('✅ File appended:', formData.accord_respo.name, 'Size:', formData.accord_respo.size);
      } else if (typeof formData.accord_respo === 'string' && formData.accord_respo.includes('fakepath')) {
        // This means the file input isn't working properly
        console.error('❌ File input is returning path string instead of File object');
        console.error('This usually means the file input onChange handler is incorrect');
        throw new Error('File input is not properly configured. Please check your file input component.');
      } else {
        console.log('❌ No valid file found:', formData.accord_respo);
        throw new Error('File (accord_respo) is required but not provided or invalid');
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/mission/form_submission/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_access_token')}`
        },
        body: submitData,
      });
      
      const result = await response.json();

      if (!response.ok) {
        // Handle error response
        console.error('API Error:', result);
        setSubmissionResult({ 
          success: false, 
          error: result.detail || result.message || `HTTP error! status: ${response.status}`,
          statusCode: response.status
        });
        return;
      }
      
      // 🔥 THIS WAS MISSING - Handle successful response
      console.log('✅ Mission submitted successfully:', result);
      setSubmissionResult({
        success: true,
        message: result.message || 'Mission request submitted successfully!',
        mission_id: result.mission_id,
        ordre_mission_id: result.ordre_mission_id,
        data: result.data || stepBasedData, // Include the data for display
        ...result // Include any other response data
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionResult({ 
        success: false, 
        error: error.message 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSubmission = () => {
    setSubmissionResult(null);
    setIsSubmitting(false); // Also reset isSubmitting state
  };

  return { 
    submissionResult, 
    handleSubmit, 
    resetSubmission, 
    isSubmitting 
  };
};

export default useMissionSubmission;