'use client';
import React, { useState, useEffect } from 'react';
import StatusBadge from '../../../sharedComponents/components/StatusBadge';

const ApprovedEventsList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockApprovedEvents = [
        {
          id: 'APPROVED001',
          eventName: 'Digital Health Hackathon',
          eventType: 'WORKSHOP',
          eventDate: '2025-07-05',
          venue: 'LabTech FMS',
          status: 'APPROVED',
          organizer: 'TechMed Club',
          validatedBy: 'FMS Communication Team',
          description: 'A 48-hour hackathon focused on digital health innovations.',
          estimatedBudget: 12000
        },
        {
          id: 'APPROVED002',
          eventName: 'Medical Careers Forum',
          eventType: 'CONFERENCE',
          eventDate: '2025-08-12',
          venue: 'Grand Hall FMS',
          status: 'APPROVED',
          organizer: 'FMS Orientation',
          validatedBy: 'FMS Communication Team',
          description: 'A full day of presentations on medical career paths.',
          estimatedBudget: 18000
        },
        {
          id: 'APPROVED003',
          eventName: 'Student Cultural Night',
          eventType: 'CULTURAL',
          eventDate: '2025-06-25',
          venue: 'Amphi A',
          status: 'APPROVED',
          organizer: 'FMS Student Union',
          validatedBy: 'Head of Student Life',
          description: 'Music, theatre and exhibitions prepared by students.',
          estimatedBudget: 4000
        }
      ];
      setEvents(mockApprovedEvents);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleExpanded = (id) => {
    setSelectedEventId((prevId) => (prevId === id ? null : id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main-green"></div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 12v-8m0 0V7a4 4 0 118 0v8m-8 4h8"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-darker-beige mb-2">No approved events</h3>
        <p className="text-gray-500 mb-4">No events have been approved or published yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-main-green">Approved Events</h2>

      <div className="grid gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer"
            onClick={() => toggleExpanded(event.id)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-darker-beige mb-2">{event.eventName}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>📅 {new Date(event.eventDate).toLocaleDateString('en-GB')}</span>
                    <span>📍 {event.venue}</span>
                    <span>💰 {event.estimatedBudget.toLocaleString()} MAD</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <StatusBadge status={event.status} />
                  <span className="text-xs text-gray-500">#{event.id}</span>
                </div>
              </div>
              {selectedEventId === event.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <h4 className="font-medium text-main-green mb-2">Organization</h4>
                      <ul className="space-y-1">
                        <li><strong>Organizer:</strong> {event.organizer}</li>
                        <li><strong>Validated by:</strong> {event.validatedBy}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-main-green mb-2">Description</h4>
                      <p className="text-darker-beige">{event.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedEventsList;
