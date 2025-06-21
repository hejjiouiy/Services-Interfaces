'use client';
import React, { useState, useEffect } from 'react';
import SectionTitle from '../../../sharedComponents/components/SectionTitle';
import RequestValidationTable from '../../../sharedComponents/components/RequestValidationTable';
import LoadingSpinner from '../../../sharedComponents/components/LoadingSpinner';

export default function EventValidationPanel() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEvents([
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
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAccept = (id) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, status: 'APPROVED', refusalReason: undefined } : ev
      )
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
    { key: 'estimatedBudget', header: 'Budget (MAD)', render: (val) => val.toLocaleString() }
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <SectionTitle title="Event Requests Validation" />
      <RequestValidationTable
        data={events}
        onAccept={handleAccept}
        onRefuse={handleRefuse}
        columns={columns}
      />
    </div>
  );
}
