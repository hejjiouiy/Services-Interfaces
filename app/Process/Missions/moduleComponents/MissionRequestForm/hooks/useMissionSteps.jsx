import getMissionStepConfig from '../steps/getMissionStepConfig'
import getOrderStepConfig from '../steps/getOrderStepConfig';
import getTravelStepConfig from '../steps/getTravelStepConfig';
import getAccommodationStepConfig from '../steps/getAccommodationStepConfig';
import getFinancingStepConfig from '../steps/getFinancingStepConfig';
import { useState, useEffect } from 'react';
const useMissionSteps = (formState) => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const newSteps = [getMissionStepConfig(), getOrderStepConfig()];
    
    if (formState.includeTravel) {
      newSteps.push(getTravelStepConfig());
    }
    
    if (formState.includeAccommodation) {
      newSteps.push(getAccommodationStepConfig());
    }
    
    if (formState.includeFinancing) {
      newSteps.push(getFinancingStepConfig());
    }
    
    setSteps(newSteps);
  }, [formState]);

  return steps;
};
export default useMissionSteps;