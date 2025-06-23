'use client';
import React, { useState, useEffect } from 'react';
import SectionTitle from '../../../../sharedComponents/components/SectionTitle';
import StatusBadge from '../../../../sharedComponents/components/StatusBadge';
import MultiStepForm from '../../../../sharedComponents/components/MultiStepForm/MultiStepForm';
import LoadingSpinner from '../../../../sharedComponents/components/LoadingSpinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const getMinDateForType = (type) => {
  const today = new Date();
  const delays = {
    'PAUSE_CAFE': 2,
    'SELF': 1,
    'VIP': 3,
    'FONTAINE': 2,
    'EXTRAS': 3,
  };
  const days = delays[type] || 2;
  today.setDate(today.getDate() + days);
  return today;
};

export default function CateringRequestManager() {
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = new Date();

  useEffect(() => {
    setTimeout(() => {
      setRequests([
        {
          id: 'CAT001',
          title: 'Réunion comité pédagogique',
          serviceType: 'PAUSE_CAFE',
          eventDate: '2025-07-05',
          period: 'Matin',
          peopleCount: 25,
          location: 'Salle B02',
          time: '10:00',
          justification: 'Réunion importante',
          status: 'PENDING',
        },
        {
          id: 'CAT002',
          title: 'Atelier mentorat',
          serviceType: 'SELF',
          eventDate: '2025-07-12',
          period: 'Après-midi',
          peopleCount: 40,
          location: 'Open Space FMS',
          time: '13:00',
          justification: '',
          status: 'APPROVED',
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCancel = (id) => {
    if (confirm("Confirmez-vous l'annulation de cette demande ?")) {
      setRequests((prev) =>
        prev.map((req) => req.id === id ? { ...req, status: 'CANCELLED' } : req)
      );
    }
  };

  const handleUpdate = (newData) => {
    setRequests((prev) =>
      prev.map((r) => r.id === newData.id ? { ...r, ...newData } : r)
    );
    setEditingRequest(null);
  };

  const step1 = {
    title: 'Modifier la demande',
    description: 'Ajoutez ou corrigez les informations',
    fields: [
      { type: 'text', name: 'title', label: 'Objet', required: true },
      {
        type: 'select',
        name: 'serviceType',
        label: 'Type de prestation',
        required: true,
        options: ['PAUSE_CAFE', 'SELF', 'VIP', 'FONTAINE', 'EXTRAS'].map(t => ({
          value: t, label: t.replace('_', ' ')
        }))
      },
      {
        type: 'custom',
        name: 'eventDate',
        label: 'Date de prestation',
        required: true,
        render: ({ value, onChange, inputClassName, values }) => {
          const minDate = getMinDateForType(values?.serviceType || 'PAUSE_CAFE');
          return (
            <div className="relative z-50 mb-4">
              <DatePicker
                selected={value}
                onChange={onChange}
                minDate={minDate}
                className={inputClassName}
                placeholderText="Sélectionnez une date"
              />
            </div>
          );
        },
        validate: (value, values) => {
          const min = getMinDateForType(values?.serviceType || 'PAUSE_CAFE');
          if (!value) return 'Date requise.';
          if (value < min) return 'Respectez le délai minimum.';
          return null;
        }
      },
      {
        type: 'radio',
        name: 'period',
        label: 'Période',
        required: true,
        options: ['Matin', 'Après-midi'].map(p => ({ value: p, label: p }))
      },
    ]
  };

  const step2 = {
    title: 'Informations logistiques',
    description: '',
    fields: [
      { type: 'number', name: 'peopleCount', label: 'Nombre de personnes', required: true, min: 1 },
      { type: 'text', name: 'location', label: 'Lieu', required: true },
      { type: 'time', name: 'time', label: 'Heure', required: true },
      { type: 'textarea', name: 'justification', label: 'Justification (optionnel)', rows: 3 }
    ]
  };

  if (loading) return <LoadingSpinner />;

  if (editingRequest) {
    return (
      <div className="p-6">
        <SectionTitle title={`Modifier la demande #${editingRequest.id}`} />
        <MultiStepForm
          steps={[step1, step2]}
          onSubmit={handleUpdate}
          initialValues={editingRequest}
        />
        <div className="mt-6 text-center">
          <button onClick={() => setEditingRequest(null)} className="text-sm text-gray-500 hover:underline">
            ⬅️ Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Gestion de mes demandes de restauration" />
      {requests.map((req) => {
        const eventDate = new Date(req.eventDate);
        const canEdit = req.status === 'PENDING';
        const canCancel = ['PENDING', 'APPROVED'].includes(req.status) && eventDate > today;

        return (
          <div
            key={req.id}
            className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-darker-beige">{req.title}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(req.eventDate).toLocaleDateString()} — {req.serviceType.replace('_', ' ')}
                </p>
                <p className="text-sm text-gray-600">🧍 {req.peopleCount} | {req.period} | 📍 {req.location}</p>
              </div>
              <div className="text-right space-y-2">
                <StatusBadge status={req.status} />
                <p className="text-xs text-gray-500">ID: {req.id}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              {canEdit && (
                <button
                  onClick={() => setEditingRequest(req)}
                  className="px-4 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-sm"
                >
                  ✏️ Modifier
                </button>
              )}
              {canCancel && (
                <button
                  onClick={() => handleCancel(req.id)}
                  className="px-4 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-sm"
                >
                  ❌ Annuler
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
