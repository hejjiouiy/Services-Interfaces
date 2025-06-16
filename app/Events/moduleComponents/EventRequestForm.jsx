'use client';
import MultiStepForm from '../../../sharedComponents/components/multiStepForm';
import React, { useState } from 'react';

const EventType = {
  CONFERENCE: 'CONFERENCE',
  WORKSHOP: 'WORKSHOP',
  SEMINAR: 'SEMINAR',
  CULTURAL: 'CULTURAL',
  SPORT: 'SPORT',
  SOCIAL: 'SOCIAL',
  OTHER: 'OTHER'
};

const EventStatus = {
  PENDING: 'PENDING',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  IN_PREPARATION: 'IN_PREPARATION',
  READY: 'READY',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

const UserProfile = {
  STUDENT: 'STUDENT',
  FACULTY: 'FACULTY',
  STAFF: 'STAFF',
  EXTERNAL: 'EXTERNAL'
};

const EventRequestForm = () => {
  const [submissionResult, setSubmissionResult] = useState(null);

  const getMinEventDate = () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 42); // 6 weeks
    return minDate.toISOString().split('T')[0];
  };

  const validateEventDate = (value) => {
    if (!value) return "Event date is required.";
    const eventDate = new Date(value);
    const minDate = new Date(getMinEventDate());
    if (eventDate < minDate) {
      return "Event must be scheduled at least 6 weeks in advance.";
    }
    return null;
  };

  const eventInfoStep = {
    title: "General Information",
    description: "Provide basic details about your event",
    fields: [
      {
        type: "text",
        name: "eventName",
        label: "Event Name",
        placeholder: "Enter the name of the event",
        required: true
      },
      {
        type: "select",
        name: "eventType",
        label: "Event Type",
        options: Object.keys(EventType).map(key => ({
          value: EventType[key],
          label: key.replace('_', ' ')
        })),
        required: true
      },
      {
        type: "date",
        name: "eventDate",
        label: "Event Date",
        required: true,
        min: getMinEventDate(),
        validate: validateEventDate
      },
      {
        type: "time",
        name: "eventTime",
        label: "Event Time",
        required: true
      },
      {
        type: "number",
        name: "duration",
        label: "Duration (hours)",
        placeholder: "Estimated duration in hours",
        required: true,
        min: 1,
        max: 24
      },
      {
        type: "select",
        name: "userProfile",
        label: "Your Profile",
        options: Object.keys(UserProfile).map(key => ({
          value: UserProfile[key],
          label: key[0] + key.slice(1).toLowerCase()
        })),
        required: true
      }
    ]
  };

  const descriptionLocationStep = {
    title: "Description & Venue",
    description: "Describe the event and specify the venue",
    fields: [
      {
        type: "textarea",
        name: "description",
        label: "Event Description",
        placeholder: "Describe goals, activities, and content...",
        required: true,
        rows: 4
      },
      {
        type: "textarea",
        name: "objectives",
        label: "Objectives",
        placeholder: "What are the intended goals and outcomes?",
        required: true,
        rows: 3
      },
      {
        type: "text",
        name: "venue",
        label: "Venue Name",
        placeholder: "Venue address or name",
        required: true
      },
      {
        type: "select",
        name: "venueType",
        label: "Venue Type",
        options: [
          { value: "CAMPUS", label: "FMS Campus" },
          { value: "EXTERNAL", label: "External" },
          { value: "ONLINE", label: "Online" },
          { value: "HYBRID", label: "Hybrid" }
        ],
        required: true
      },
      {
        type: "number",
        name: "expectedAttendees",
        label: "Expected Participants",
        placeholder: "Estimated number of attendees",
        required: true,
        min: 1
      }
    ]
  };

  const budgetLogisticsStep = {
    title: "Budget & Logistics",
    description: "Specify budget and logistical needs",
    fields: [
      {
        type: "number",
        name: "estimatedBudget",
        label: "Estimated Budget (MAD)",
        placeholder: "Total estimated budget",
        required: true,
        min: 0
      },
      {
        type: "textarea",
        name: "budgetBreakdown",
        label: "Budget Breakdown",
        placeholder: "Equipment, catering, speaker fees, etc.",
        required: true,
        rows: 3
      },
      {
        type: "textarea",
        name: "logisticalNeeds",
        label: "Logistical Needs",
        placeholder: "Technical equipment, food, security, etc.",
        required: true,
        rows: 4
      },
      { type: "checkbox", name: "needsCatering", label: "Catering required" },
      { type: "checkbox", name: "needsAVEquipment", label: "Audio/Visual equipment required" },
      { type: "checkbox", name: "needsSecuritySupport", label: "Security support required" },
      { type: "checkbox", name: "needsTransportation", label: "Transportation required" }
    ]
  };

  const additionalInfoStep = {
    title: "Additional Information",
    description: "Add any extra details to support your request",
    fields: [
      {
        type: "textarea",
        name: "targetAudience",
        label: "Target Audience",
        placeholder: "Who are your attendees? (students, faculty, etc.)",
        required: true,
        rows: 2
      },
      {
        type: "text",
        name: "contactPerson",
        label: "Contact Person",
        placeholder: "Full name of event coordinator",
        required: true
      },
      {
        type: "email",
        name: "contactEmail",
        label: "Contact Email",
        placeholder: "email@example.com",
        required: true
      },
      {
        type: "tel",
        name: "contactPhone",
        label: "Contact Phone",
        placeholder: "+212 6XX XXX XXX",
        required: true
      },
      {
        type: "textarea",
        name: "additionalComments",
        label: "Additional Comments",
        placeholder: "Any other relevant information...",
        required: false,
        rows: 3
      },
      {
        type: "checkbox",
        name: "confirmAccuracy",
        label: "I confirm that the information provided is accurate",
        required: true
      }
    ]
  };

  const steps = [eventInfoStep, descriptionLocationStep, budgetLogisticsStep, additionalInfoStep];

  const handleSubmit = (formData) => {
    const routedTo = formData.userProfile === UserProfile.STUDENT
      ? "Head of Student Life"
      : "FMS Communication Team";

    const submissionData = {
      ...formData,
      status: EventStatus.PENDING,
      submissionDate: new Date().toISOString(),
      routedTo,
      id: Math.random().toString(36).substr(2, 9)
    };

    setSubmissionResult(submissionData);
  };

  if (submissionResult) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-main-green mb-2">Event Request Submitted</h2>
          <p className="text-darker-beige">Your request has been successfully submitted.</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="text-lg font-medium text-main-green mb-3">Event Details</h3>
              <p><strong>Name:</strong> {submissionResult.eventName}</p>
              <p><strong>Type:</strong> {submissionResult.eventType}</p>
              <p><strong>Date:</strong> {submissionResult.eventDate} at {submissionResult.eventTime}</p>
              <p><strong>Venue:</strong> {submissionResult.venue}</p>
              <p><strong>Participants:</strong> {submissionResult.expectedAttendees}</p>
              <p><strong>Budget:</strong> {submissionResult.estimatedBudget} MAD</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-main-green mb-3">Status</h3>
              <p><strong>ID:</strong> {submissionResult.id}</p>
              <p><strong>Status:</strong> <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full">Pending</span></p>
              <p><strong>Submitted on:</strong> {new Date(submissionResult.submissionDate).toLocaleDateString('en-GB')}</p>
              <p><strong>Routed to:</strong> {submissionResult.routedTo}</p>
              <p><strong>Contact:</strong> {submissionResult.contactPerson}</p>
              <p><strong>Email:</strong> {submissionResult.contactEmail}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-main-green mb-2">Event Description</h4>
            <p className="text-darker-beige text-sm">{submissionResult.description}</p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-sm">
          <h4 className="font-medium text-blue-800 mb-2">Next Steps</h4>
          <ul className="text-blue-700 list-disc list-inside">
            <li>Your request will be reviewed by {submissionResult.routedTo}</li>
            <li>You’ll receive an email notification with the decision</li>
            <li>If approved, you will be contacted for logistics</li>
            <li>You can track your request under “My Requests”</li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setSubmissionResult(null)}
            className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green"
          >
            Submit another request
          </button>
          <button className="px-6 py-2 bg-gray-200 text-darker-beige rounded-lg hover:bg-gray-300">
            View My Requests
          </button>
        </div>
      </div>
    );
  }

  return (
    <MultiStepForm
      steps={steps}
      onSubmit={handleSubmit}
      title="Event Request Form"
      initialValues={{
        status: EventStatus.PENDING,
        eventType: EventType.CONFERENCE,
        userProfile: UserProfile.STUDENT,
        venueType: "CAMPUS",
        needsCatering: false,
        needsAVEquipment: false,
        needsSecuritySupport: false,
        needsTransportation: false,
        confirmAccuracy: false
      }}
    />
  );
};

export default EventRequestForm;
