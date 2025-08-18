'use client';
import React, { useState } from 'react';
import MultiStepForm from '../../../../sharedComponents/components/MultiStepForm/MultiStepForm';
import SectionTitle from '../../../../sharedComponents/components/SectionTitle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const optionsByType = {
  PAUSE_CAFE: [
    { value: 'STD',  label: 'Standard' },
    { value: 'UP',   label: 'Améliorée' },
    { value: 'VIP',  label: 'VIP' },
  ],
  SELF: [
    { value: 'SELF1', label: 'Self 1' },
    { value: 'SELF2', label: 'Self 2' },
    { value: 'SELF3', label: 'Self 3' },
  ],
  FONTAINE: [
    { value: 'F48', label: 'Fontaine (48h)' },
    { value: 'F72', label: 'Fontaine (72h)' },
  ],
  EXTRAS: [
    { value: 'E48', label: 'Extras (48h)' },
    { value: 'E72', label: 'Extras (72h)' },
  ],
  VIP: [{ value: 'TABLE', label: 'Service à table' }],
};

const getMinDateForType = (type) => {
  const delays = { PAUSE_CAFE: 2, SELF: 1, VIP: 3, FONTAINE: 2, EXTRAS: 3 };
  const days = delays[type] ?? 2;
  const min = new Date();
  min.setHours(0, 0, 0, 0);
  min.setDate(min.getDate() + days);
  return min;
};

const isValidDate = (v) => v instanceof Date && !Number.isNaN(v.getTime());

// Récupère le type courant depuis différents emplacements possibles selon l’impl implémentation du MultiStepForm
const getCurrentTypeFrom = (p) =>
  p?.values?.serviceType ??
  p?.formValues?.serviceType ??
  p?.allValues?.serviceType ??
  (typeof p?.getValues === 'function' ? p.getValues('serviceType') : undefined) ??
  'PAUSE_CAFE';

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

      // TYPE AVANT CATEGORY
      {
        type: 'select',
        name: 'serviceType',
        label: 'Type de prestation',
        required: true,
        options: ['PAUSE_CAFE', 'SELF', 'VIP', 'FONTAINE', 'EXTRAS'].map((type) => ({
          label: type.replace(/_/g, ' '),
          value: type,
        })),
      },

      {
        type: 'custom',
        name: 'category',
        label: 'Catégorie',
        required: true,
        render: (p) => {
          const { value, onChange, inputClassName } = p;
          const currentType = getCurrentTypeFrom(p);
          const opts = optionsByType[currentType] ?? [];
          const safeValue = opts.some(o => o.value === value) ? value : '';
          return (
            <select
              key={currentType} // re-mount quand le type change
              className={inputClassName}
              value={safeValue}
              onChange={(e) => onChange(e.target.value)} // valeur brute
            >
              <option value="" disabled>Choisir…</option>
              {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          );
        },
        validate: (v) => !v ? 'Catégorie requise.' : null,
      },

      {
        type: 'custom',
        name: 'eventDate',
        label: 'Date souhaitée',
        required: true,
        render: (p) => {
          const { value, onChange, inputClassName } = p;
          const currentType = getCurrentTypeFrom(p);
          const minDate = getMinDateForType(currentType);
          const selectedDate = isValidDate(value) ? value : null;
          return (
            <div className="relative z-50 mb-4">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => onChange(date)}   // valeur brute (Date)
                minDate={minDate}
                placeholderText="Sélectionnez une date"
                className={inputClassName}
              />
            </div>
          );
        },
        validate: (value, p) => {
          if (!isValidDate(value)) return 'La date est requise.';
          const currentType = getCurrentTypeFrom(p);
          const minDate = getMinDateForType(currentType);
          if (value < minDate) return 'Veuillez respecter le délai minimal de réservation.';
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
      { type: 'number', name: 'peopleCount', label: 'Nombre de personnes', required: true, min: 1 },
      { type: 'text',   name: 'location',    label: 'Emplacement ou salle concernée', required: true },
      { type: 'time',   name: 'time',        label: 'Horaire souhaité', required: true },
      { type: 'textarea', name: 'justification', label: 'Justification (facultative)', rows: 3 },
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
          category: '',
          peopleCount: 1,
          period: 'Matin',
          eventDate: null,
        }}
      />
    </div>
  );
};

export default CateringRequestForm;
