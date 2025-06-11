import MissionDetailsDisplay from './MissionDetailsDisplay';
import TravelDetailsDisplay from './TravelDetailsDisplay';
import AccommodationDetailsDisplay from './AccommodationDetailsDisplay';
import FinancingDetailsDisplay from './FinancingDetailsDisplay';
const SuccessMessage = ({ submissionResult, onReset }) => (
  <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
    <h2 className="text-xl font-semibold text-main-green mb-6">Mission Request Submitted</h2>
    <p className="text-darker-beige mb-4">Your mission request has been submitted successfully!</p>
    
    <MissionDetailsDisplay data={submissionResult} />
    <TravelDetailsDisplay data={submissionResult} />
    <AccommodationDetailsDisplay data={submissionResult} />
    <FinancingDetailsDisplay data={submissionResult} />
    
    <button 
      onClick={onReset} 
      className="px-4 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green focus:outline-none"
    >
      Submit Another Request
    </button>
  </div>
);

export default SuccessMessage;