'use client';
import React, { useState, useEffect } from 'react';
import SectionTitle from '../../../sharedComponents/components/SectionTitle';
import StatusBadge from '../../../sharedComponents/components/StatusBadge';
import StatusStepper from '../../../sharedComponents/components/StatusStepper';
import LoadingSpinner from '../../../sharedComponents/components/LoadingSpinner';

const allowedTransitions = ['APPROVED', 'IN_PREPARATION', 'READY', 'COMPLETED', 'CANCELLED'];

const EventStatusManager = () => {
  const [managedEvents, setManagedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedStatuses, setUpdatedStatuses] = useState({});
  const [successMap, setSuccessMap] = useState({});

  useEffect(() => {
    setTimeout(() => {
      const mockApproved = [
        {
          id: 'EVT201',
          eventName: 'Interuniversity Festival',
          eventDate: '2025-07-30',
          venue: 'UM6P Stadium',
          status: 'APPROVED',
          description: 'A multi-university festival focused on sports and culture.'
        },
        {
          id: 'EVT202',
          eventName: 'Mental Health Awareness Week',
          eventDate: '2025-08-15',
          venue: 'FMS Auditorium',
          status: 'APPROVED',
          description: 'Talks, panels and workshops promoting mental wellbeing.'
        }
      ];
      setManagedEvents(mockApproved);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setUpdatedStatuses((prev) => ({ ...prev, [id]: newStatus }));
    setSuccessMap((prev) => ({ ...prev, [id]: false }));
  };

  const saveNewStatus = (event) => {
    const newStatus = updatedStatuses[event.id];
    if (!newStatus || newStatus === event.status) return;

    // simulate backend update
    setManagedEvents((prev) =>
      prev.map((ev) => (ev.id === event.id ? { ...ev, status: newStatus } : ev))
    );
    setSuccessMap((prev) => ({ ...prev, [event.id]: true }));
  };

  if (loading) return <LoadingSpinner />;

  if (managedEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-darker-beige mb-2">No events to manage</h3>
        <p className="text-gray-500 mb-4">All approved events have already been updated or completed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Event Status Management" />

      <div className="grid gap-6">
        {managedEvents.map((event) => {
          const currentStatus = updatedStatuses[event.id] || event.status;
          const isChanged = currentStatus !== event.status;
          const showSuccess = successMap[event.id];

          return (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-darker-beige mb-2">{event.eventName}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>📅 {new Date(event.eventDate).toLocaleDateString('en-GB')}</span>
                      <span>📍 {event.venue}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <StatusBadge status={currentStatus} />
                    <span className="text-xs text-gray-500">#{event.id}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">{event.description}</p>

                <StatusStepper steps={allowedTransitions} currentStatus={currentStatus} />

                <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4">
                  <label htmlFor={`status-${event.id}`} className="text-sm font-medium text-darker-beige">
                    Update status:
                  </label>
                  <select
                    id={`status-${event.id}`}
                    className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-main-green focus:border-main-green text-sm"
                    value={currentStatus}
                    onChange={(e) => handleStatusChange(event.id, e.target.value)}
                  >
                    {allowedTransitions.map((status) => (
                      <option key={status} value={status}>
                        {status.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                  <button
                    disabled={!isChanged}
                    onClick={() => saveNewStatus(event)}
                    className={`px-4 py-2 rounded-lg text-white transition ${
                      isChanged
                        ? 'bg-main-green hover:bg-darker-green'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Save
                  </button>
                  {showSuccess && (
                    <span className="text-green-600 text-sm font-medium">✔ Status updated</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventStatusManager;
