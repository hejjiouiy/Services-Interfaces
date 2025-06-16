'use client';
import React, { useState, useEffect } from 'react';
import StatusBadge from '../../../sharedComponents/components/StatusBadge';

const EventRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main-green"></div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 12v-8m0 0V7a4 4 0 118 0v8m-8 4h8"></path>
          </svg>
        </div>
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
      <h2 className="text-2xl font-bold text-main-green">My Event Requests</h2>

      <div className="grid gap-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedRequest(selectedRequest?.id === req.id ? null : req)}
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

              {selectedRequest?.id === req.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <h4 className="font-medium text-main-green mb-2">Request Details</h4>
                      <p><strong>Type:</strong> {req.eventType}</p>
                      <p><strong>Submitted on:</strong> {new Date(req.submissionDate).toLocaleDateString('en-GB')}</p>
                      <p><strong>Routed to:</strong> {req.routedTo}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-main-green mb-2">Available Actions</h4>
                      <div className="space-y-2">
                        {req.status === 'REJECTED' && (
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            📄 View comments
                          </button>
                        )}
                        {(req.status === 'PENDING' || req.status === 'UNDER_REVIEW') && (
                          <button className="text-orange-600 hover:text-orange-800 text-sm">
                            ✏️ Edit request
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-800 text-sm">
                          📞 Contact reviewer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green transition">
          Submit New Request
        </button>
      </div>
    </div>
  );
};

export default EventRequestList;
