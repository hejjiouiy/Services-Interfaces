'use client';
import React, { useState } from 'react';
import MultiStepForm from '../../../../sharedComponents/components/MultiStepForm/MultiStepForm';
import SectionTitle from '../../../../sharedComponents/components/SectionTitle';
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

const CateringRequestForm = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const step1 = {
    title: 'Informations générales',
    description: 'Détails de base sur votre demande de restauration.',
    fields: [
      {
        type: 'text',
        name: 'title',
        label: 'Objet de la demande',
        required: true,
      },
      {
        type: 'select',
        name: 'serviceType',
        label: 'Type de prestation',
        required: true,
        options: ['PAUSE_CAFE', 'SELF', 'VIP', 'FONTAINE', 'EXTRAS'].map((type) => ({
          label: type.replace('_', ' '),
          value: type,
        })),
      },
      {
        type: 'custom',
        name: 'eventDate',
        label: 'Date souhaitée',
        required: true,
        render: ({ value, onChange, inputClassName, values }) => {
          const minDate = getMinDateForType(values?.serviceType || 'PAUSE_CAFE');
          return (
            <div className="relative z-50 mb-4">
              <DatePicker
                selected={value}
                onChange={onChange}
                minDate={minDate}
                placeholderText="Sélectionnez une date"
                className={inputClassName}
              />
            </div>
          );
        },
        validate: (value, values) => {
          if (!value) return 'La date est requise.';
          const minDate = getMinDateForType(values?.serviceType || 'PAUSE_CAFE');
          if (value < minDate) {
            return 'Veuillez respecter le délai minimal de réservation.';
          }
          return null;
        },
      },
      {
        type: 'radio',
        name: 'period',
        label: 'Période',
        required: true,
        options: ['Matin', 'Après-midi'].map((p) => ({ value: p, label: p })),
      },
    ],
  };

  const step2 = {
    title: 'Détails logistiques',
    description: 'Informations spécifiques liées à l’organisation.',
    fields: [
      {
        type: 'number',
        name: 'peopleCount',
        label: 'Nombre de personnes',
        required: true,
        min: 1,
      },
      {
        type: 'text',
        name: 'location',
        label: 'Emplacement ou salle concernée',
        required: true,
      },
      {
        type: 'time',
        name: 'time',
        label: 'Horaire souhaité',
        required: true,
      },
      {
        type: 'textarea',
        name: 'justification',
        label: 'Justification (facultative)',
        rows: 3,
      },
    ],
  };

  const handleSubmit = (formData) => {
    const enriched = {
      ...formData,
      id: Math.random().toString(36).slice(2, 9),
      status: 'PENDING',
      submittedAt: new Date().toISOString(),
    };
    setSubmittedData(enriched);
  };

  if (submittedData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto text-center">
        <SectionTitle title="Demande de restauration soumise ✅" />
        <p className="text-gray-600 my-4">Votre demande a été enregistrée avec l'ID :</p>
        <p className="text-main-green text-xl font-bold mb-6">{submittedData.id}</p>
        <button
          onClick={() => setSubmittedData(null)}
          className="bg-main-green text-white px-6 py-2 rounded hover:bg-darker-green"
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <SectionTitle title="Formulaire de demande de restauration" />
      <MultiStepForm
        steps={[step1, step2]}
        onSubmit={handleSubmit}
        initialValues={{
          serviceType: 'PAUSE_CAFE',
          peopleCount: 1,
          period: 'Matin',
        }}
      />
    </div>
  );
};

export default CateringRequestForm;
