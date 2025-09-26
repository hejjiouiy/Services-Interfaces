import getMissionStepConfig from '../steps/getMissionStepConfig'
import getOrderStepConfig from '../steps/getOrderStepConfig';
import getTravelStepConfig from '../steps/getTravelStepConfig';
import getAccommodationStepConfig from '../steps/getAccommodationStepConfig';
import getFinancingStepConfig from '../steps/getFinancingStepConfig';
import { useState, useEffect } from 'react';
import { set } from 'date-fns';
import { getExistingMissionOptions } from '../enums/enums';

const useMissionSteps = (formState, formData) => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true); // Optional loading flag


  useEffect(() => {

    const initSteps = async () => {
      setLoading(true);
      const existingMissionOptions = await getExistingMissionOptions();
    
    // Pass formData to all step configurations that need it
    const newSteps = [getMissionStepConfig(formData, existingMissionOptions), getOrderStepConfig(formData)];
    
    if (formState.includeTravel) {
      newSteps.push(getTravelStepConfig(formData));
    }
    
    if (formState.includeAccommodation) {
      newSteps.push(getAccommodationStepConfig(formData));
    }
    
    if (formState.includeFinancing) {
      newSteps.push(getFinancingStepConfig());
    }
    
    setSteps(newSteps);
    setLoading(false);
    }
    initSteps();
  }, [formState, formData]); // Add formData as dependency

  return steps
};

export default useMissionSteps;