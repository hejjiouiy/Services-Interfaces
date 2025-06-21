'use client';
import React, { useState, useEffect } from 'react';
import StatusBadge from '../../../sharedComponents/components/StatusBadge';
import SectionTitle from '../../../sharedComponents/components/SectionTitle';
import LoadingSpinner from '../../../sharedComponents/components/LoadingSpinner';

const EventRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockRequests = [
        {
          id: 'EVT001',
          eventName: 'AI Conference',
          eventType: 'CONFERENCE',
          eventDate: '2025-07-15',
          status: 'PENDING',
          submissionDate: '2025-05-20',
          routedTo: 'FMS Communication Team',
          venue: 'Main Auditorium',
          estimatedBudget: 15000
        },
        {
          id: 'EVT002',
          eventName: 'Inter-School Football Tournament',
          eventType: 'SPORT',
          eventDate: '2025-08-10',
          status: 'APPROVED',
          submissionDate: '2025-05-18',
          routedTo: 'Head of Student Life',
          venue: 'FMS Sports Field',
          estimatedBudget: 8000
        },
        {
          id: 'EVT003',
          eventName: 'Entrepreneurship Workshop',
          eventType: 'WORKSHOP',
          eventDate: '2025-07-25',
          status: 'UNDER_REVIEW',
          submissionDate: '2025-05-22',
          routedTo: 'Head of Student Life',
          venue: 'Conference Room B',
          estimatedBudget: 5000
        }
      ];
      setRequests(mockRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleDetails = (id) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  if (loading) return <LoadingSpinner />;

  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-darker-beige mb-2">No event requests found</h3>
        <p className="text-gray-500 mb-4">You haven't submitted any event requests yet.</p>
        <button className="px-4 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green transition">
          Submit New Request
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="My Event Requests" />

      <div className="grid gap-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer"
            onClick={() => toggleDetails(req.id)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-darker-beige mb-2">{req.eventName}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>📅 {new Date(req.eventDate).toLocaleDateString('en-GB')}</span>
                    <span>📍 {req.venue}</span>
                    <span>💰 {req.estimatedBudget.toLocaleString()} MAD</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <StatusBadge status={req.status} />
                  <span className="text-xs text-gray-500">#{req.id}</span>
                </div>
              </div>

              {selectedId === req.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-700">
                  <p><strong>Type:</strong> {req.eventType}</p>
                  <p><strong>Submitted on:</strong> {new Date(req.submissionDate).toLocaleDateString('en-GB')}</p>
                  <p><strong>Routed to:</strong> {req.routedTo}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventRequestList;
