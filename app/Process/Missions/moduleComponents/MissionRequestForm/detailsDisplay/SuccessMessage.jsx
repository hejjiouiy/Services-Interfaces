import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import MissionDetailsDisplay from './MissionDetailsDisplay';
import TravelDetailsDisplay from './TravelDetailsDisplay';
import AccommodationDetailsDisplay from './AccommodationDetailsDisplay';
import FinancingDetailsDisplay from './FinancingDetailsDisplay';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';


const SuccessMessage = ({ submissionResult, onReset }) => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef, // 🔥 nouvelle prop API v3
    documentTitle: `Mission_${submissionResult.mission_id}`,
  });
  console.log('Submission Result:', submissionResult);
  
  // Handle error case
  if (!submissionResult.success) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
        <div className="flex items-center mb-4">
          <XCircleIcon className="h-8 w-8 text-red-500 mr-3" />
          <h2 className="text-xl font-semibold text-red-600">Submission Failed</h2>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 font-medium mb-2">Error Details:</p>
          <p className="text-red-600">
            {submissionResult.error || 
             submissionResult.detail || 
             submissionResult.message || 
             'An unknown error occurred'}
          </p>
          
          {/* Show additional error info if available */}
          {submissionResult.statusCode && (
            <p className="text-red-500 text-sm mt-2">
              Status Code: {submissionResult.statusCode}
            </p>
          )}
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={onReset} 
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
          >
            Try Again
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // Handle success case
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      {/* 🔥 Zone à imprimer */}
      <div ref={printRef}>
        <div className="flex items-center mb-6">
          <CheckCircleIcon className="h-8 w-8 text-main-green mr-3" />
          <h2 className="text-xl font-semibold text-main-green">
            Mission Request Submitted Successfully!
          </h2>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-700 font-medium">✅ {submissionResult.message}</p>
          <div className="mt-2 text-sm text-green-600">
            <p><strong>Mission ID:</strong> {submissionResult.mission_id}</p>
            <p><strong>Order ID:</strong> {submissionResult.ordre_mission_id}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <MissionDetailsDisplay data={submissionResult.data} />
          <TravelDetailsDisplay data={submissionResult.data} />
          <AccommodationDetailsDisplay data={submissionResult.data} />
          <FinancingDetailsDisplay data={submissionResult.data} />
        </div>
      </div>

      {/* Boutons */}
      <div className="flex space-x-4 mt-6">
        <button 
          onClick={onReset} 
          className="px-4 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green focus:outline-none"
        >
          Submit Another Request
        </button>
        <button 
          onClick={handlePrint} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Print Details
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;