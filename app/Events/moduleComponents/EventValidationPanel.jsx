'use client';
import React, { useState } from 'react';
import RequestValidationTable from '../../../sharedComponents/components/RequestValidationTable';

const initialEvents = [
  {
    id: 'EVT101',
    eventName: 'Open House FMS',
    eventType: 'SEMINAR',
    eventDate: '2025-07-10',
    status: 'PENDING',
    venue: 'FMS Hall',
    organizer: 'Communication Department',
    description: 'Presentation of FMS facilities and programs.',
    estimatedBudget: 10000,
    submissionDate: '2025-05-21'
  },
  {
    id: 'EVT102',
    eventName: 'Biotech Colloquium',
    eventType: 'CONFERENCE',
    eventDate: '2025-08-03',
    status: 'UNDER_REVIEW',
    venue: 'Amphi B',
    organizer: 'Research Department',
    description: 'Discussions on applied biotechnology advancements.',
    estimatedBudget: 25000,
    submissionDate: '2025-05-18'
  }
];

export default function EventValidationPanel() {
  const [events, setEvents] = useState(initialEvents);

  const handleAccept = (id) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, status: 'APPROVED' } : ev))
    );
  };

  const handleRefuse = (id, reason) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, status: 'REJECTED', refusalReason: reason } : ev
      )
    );
  };

  const columns = [
    { key: 'eventName', header: 'Event Name' },
    { key: 'eventDate', header: 'Date', render: (val) => new Date(val).toLocaleDateString('en-GB') },
    { key: 'eventType', header: 'Type' },
    { key: 'organizer', header: 'Organizer' },
    { key: 'venue', header: 'Venue' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-main-green mb-4">Event Requests Validation</h2>
      <RequestValidationTable
        data={events}
        onAccept={handleAccept}
        onRefuse={handleRefuse}
        columns={columns}
      />
    </div>
  );
}
