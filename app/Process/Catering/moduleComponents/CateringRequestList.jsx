'use client';
import React, { useState, useEffect } from 'react';
import SectionTitle from '../../../../sharedComponents/components/SectionTitle';
import StatusBadge from '../../../../sharedComponents/components/StatusBadge';
import LoadingSpinner from '../../../../sharedComponents/components/LoadingSpinner';

export default function CateringRequestList() {
  const [requests, setRequests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement de données
    setTimeout(() => {
      setRequests([
        {
          id: 'CAT001',
          title: 'Réunion comité pédagogique',
          serviceType: 'PAUSE_CAFE',
          eventDate: '2025-07-05',
          peopleCount: 25,
          period: 'Matin',
          status: 'PENDING',
          location: 'Salle B02',
          justification: 'Réunion avec les coordinateurs de filières'
        },
        {
          id: 'CAT002',
          title: 'Atelier mentorat',
          serviceType: 'SELF',
          eventDate: '2025-07-12',
          peopleCount: 40,
          period: 'Après-midi',
          status: 'APPROVED',
          location: 'Open Space FMS',
          justification: ''
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleDetails = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  if (loading) return <LoadingSpinner />;

  if (requests.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-semibold text-darker-beige mb-2">Aucune demande soumise</h3>
        <p className="text-sm text-gray-500">Vous n'avez encore soumis aucune demande de restauration.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Mes demandes de restauration" />
      <div className="grid gap-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition cursor-pointer"
            onClick={() => toggleDetails(req.id)}
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-darker-beige">{req.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(req.eventDate).toLocaleDateString()} — {req.serviceType.replace('_', ' ')}
                  </p>
                  <p className="text-sm text-gray-600">Personnes : {req.peopleCount} | {req.period}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={req.status} />
                  <p className="text-xs text-gray-500 mt-1">ID: {req.id}</p>
                </div>
              </div>

              {selectedId === req.id && (
                <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-2">
                  <p><strong>Emplacement :</strong> {req.location}</p>
                  {req.justification && (
                    <p><strong>Justification :</strong> {req.justification}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
