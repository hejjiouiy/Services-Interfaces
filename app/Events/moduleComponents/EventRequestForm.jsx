'use client';
import React, { useState } from 'react';
import MultiStepForm from '../../../sharedComponents/components/MultiStepForm/MultiStepForm';
import SectionTitle from '../../../sharedComponents/components/SectionTitle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventRequestForm = () => {
  const [submissionResult, setSubmissionResult] = useState(null);

  const getMinEventDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 42); // 6 semaines
    return today;
  };

  const [loading, setLoading] = useState(false);

  const validateEventDate = (value) => {
    if (!value) return 'Event date is required.';
    if (value < getMinEventDate()) {
      return 'Event must be scheduled at least 6 weeks in advance.';
    }
    return null;
  };

  const steps = [
    {
      title: 'General Information',
      description: 'Provide basic details about your event',
      fields: [
        {
          type: 'text',
          name: 'eventName',
          label: 'Event Name',
          required: true
        },
        {
          type: 'select',
          name: 'eventType',
          label: 'Event Type',
          required: true,
          options: ['CONFERENCE', 'WORKSHOP', 'SEMINAR', 'CULTURAL', 'SPORT', 'SOCIAL', 'OTHER']
            .map(type => ({ value: type, label: type }))
        },
        {
          type: 'custom',
          name: 'eventDate',
          label: 'Event Date',
          required: true,
          render: ({ value, onChange, inputClassName }) => (
            <DatePicker
              selected={value}
              onChange={onChange}
              minDate={getMinEventDate()}
              placeholderText="Select a date"
              className={inputClassName}
            />
          ),
          validate: validateEventDate
        },
        {
          type: 'time',
          name: 'eventTime',
          label: 'Event Time',
          required: true
        },
        {
          type: 'number',
          name: 'duration',
          label: 'Duration (hours)',
          placeholder: '1 to 24',
          required: true,
          min: 1,
          max: 24
        },
        {
          type: 'select',
          name: 'userProfile',
          label: 'Your Profile',
          required: true,
          options: ['STUDENT', 'FACULTY', 'STAFF', 'EXTERNAL']
            .map(p => ({ value: p, label: p }))
        }
      ]
    },
    {
      title: 'Description & Venue',
      description: 'Describe the event and specify the venue',
      fields: [
        {
          type: 'textarea',
          name: 'description',
          label: 'Event Description',
          required: true,
          rows: 4
        },
        {
          type: 'textarea',
          name: 'objectives',
          label: 'Objectives',
          required: true,
          rows: 3
        },
        {
          type: 'text',
          name: 'venue',
          label: 'Venue Name',
          required: true
        },
        {
          type: 'select',
          name: 'venueType',
          label: 'Venue Type',
          required: true,
          options: [
            { value: 'CAMPUS', label: 'FMS Campus' },
            { value: 'EXTERNAL', label: 'External' },
            { value: 'ONLINE', label: 'Online' },
            { value: 'HYBRID', label: 'Hybrid' }
          ]
        },
        {
          type: 'number',
          name: 'expectedAttendees',
          label: 'Expected Participants',
          required: true,
          min: 1
        }
      ]
    },
    {
      title: 'Budget & Logistics',
      description: 'Specify budget and logistical needs',
      fields: [
        {
          type: 'number',
          name: 'estimatedBudget',
          label: 'Estimated Budget (MAD)',
          required: true,
          min: 0
        },
        {
          type: 'textarea',
          name: 'budgetBreakdown',
          label: 'Budget Breakdown',
          required: true,
          rows: 3
        },
        {
          type: 'textarea',
          name: 'logisticalNeeds',
          label: 'Logistical Needs',
          required: true,
          rows: 4
        },
        { type: 'checkbox', name: 'needsCatering', label: 'Catering required' },
        { type: 'checkbox', name: 'needsAVEquipment', label: 'Audio/Visual equipment required' },
        { type: 'checkbox', name: 'needsSecuritySupport', label: 'Security support required' },
        { type: 'checkbox', name: 'needsTransportation', label: 'Transportation required' }
      ]
    },
    {
      title: 'Additional Information',
      description: 'Add any extra details to support your request',
      fields: [
        {
          type: 'textarea',
          name: 'targetAudience',
          label: 'Target Audience',
          required: true,
          rows: 2
        },
        {
          type: 'text',
          name: 'contactPerson',
          label: 'Contact Person',
          required: true
        },
        {
          type: 'email',
          name: 'contactEmail',
          label: 'Contact Email',
          required: true
        },
        {
          type: 'tel',
          name: 'contactPhone',
          label: 'Contact Phone',
          required: true
        },
        {
          type: 'textarea',
          name: 'additionalComments',
          label: 'Additional Comments',
          rows: 3
        },
        {
          type: 'checkbox',
          name: 'confirmAccuracy',
          label: 'I confirm that the information provided is accurate',
          required: true
        }
      ]
    }
  ];

  const handleSubmit = (formData) => {
    const routedTo = formData.userProfile === 'STUDENT'
      ? 'Head of Student Life'
      : 'FMS Communication Team';

    const payload = {
      ...formData,
      status: 'PENDING',
      submissionDate: new Date().toISOString(),
      routedTo,
      id: Math.random().toString(36).substring(2, 10)
    };

    setSubmissionResult(payload);
  };

  if (submissionResult) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
        <SectionTitle title="Event Request Submitted ✅" />
        <p className="text-darker-beige mb-4">
          Your request has been successfully routed to <strong>{submissionResult.routedTo}</strong>.
        </p>
        <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(submissionResult, null, 2)}
        </pre>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setSubmissionResult(null)}
            className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <SectionTitle title="Event Request Form" />
      <MultiStepForm
        steps={steps}
        onSubmit={handleSubmit}
        initialValues={{
          eventType: 'CONFERENCE',
          userProfile: 'STUDENT',
          venueType: 'CAMPUS',
          needsCatering: false,
          needsAVEquipment: false,
          needsSecuritySupport: false,
          needsTransportation: false,
          confirmAccuracy: false
        }}
      />
    </div>
  );
};

export default EventRequestForm;
