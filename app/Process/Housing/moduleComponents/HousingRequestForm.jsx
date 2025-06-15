'use client';
import MultiStepForm from '../../../../sharedComponents/components/multiStepForm';
import React, { useState } from 'react';

const HousingType = {
  SHORT_TERM: 'COURT_SEJOUR',
  LONG_TERM: 'LONG_SEJOUR',
  GUEST_ONLY: 'INVITE_SEUL',
};

const HousingRequestForm = () => {
  const [submission, setSubmission] = useState(null);

  const validateDates = (values) => {
    const { startDate, endDate } = values;
    if (!startDate || !endDate) return "Les deux dates sont obligatoires.";
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) return "La date de fin doit être après la date de début.";
    return null;
  };

  const step1 = {
    title: "Informations de base",
    description: "Remplissez les informations principales liées à votre demande",
    fields: [
      {
        type: "select",
        name: "housingType",
        label: "Type d'hébergement",
        required: true,
        options: Object.entries(HousingType).map(([key, val]) => ({
          value: val,
          label: val.replace('_', ' ').toLowerCase()
        })),
      },
      {
        type: "date",
        name: "startDate",
        label: "Date de début",
        required: true
      },
      {
        type: "date",
        name: "endDate",
        label: "Date de fin",
        required: true,
        validate: (val, all) => validateDates(all),
      },
      {
        type: "number",
        name: "numGuests",
        label: "Nombre d'invités",
        required: true,
        min: 0
      }
    ]
  };

  const step2 = {
    title: "Documents justificatifs",
    description: "Ajoutez les documents nécessaires à l'étude de votre demande",
    fields: [
      {
        type: "file",
        name: "justificatif",
        label: "Lettre de justification / convocation",
        accept: ".pdf,.doc,.docx",
        required: true
      },
      {
        type: "file",
        name: "guestList",
        label: "Liste des invités (CSV ou PDF)",
        accept: ".csv,.pdf",
        required: false
      }
    ]
  };

  const steps = [step1, step2];

  const handleSubmit = (data) => {
    const payload = {
      ...data,
      status: 'EN_ATTENTE',
      submissionDate: new Date().toISOString(),
      id: Math.random().toString(36).slice(2, 10) // temporaire
    };
    setSubmission(payload);
  };

  if (submission) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-main-green mb-4">Demande soumise avec succès</h2>
        <p className="text-gray-600 mb-6">
          Votre demande d’hébergement a été enregistrée sous la référence <strong>{submission.id}</strong>.
        </p>
        <button
          onClick={() => setSubmission(null)}
          className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green transition"
        >
          Soumettre une nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <MultiStepForm
      steps={steps}
      onSubmit={handleSubmit}
      title="Demande d’Hébergement"
      initialValues={{
        housingType: HousingType.SHORT_TERM,
        numGuests: 0,
      }}
    />
  );
};

export default HousingRequestForm;
