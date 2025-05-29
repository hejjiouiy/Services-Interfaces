'use client';
import MultiStepForm from '../../../sharedComponents/components/multiStepForm';
import React, { useState } from 'react';

// Enums pour la gestion des événements
const EventType = {
  CONFERENCE: 'CONFERENCE',
  WORKSHOP: 'WORKSHOP',
  SEMINAR: 'SEMINAR',
  CULTURAL: 'CULTURAL',
  SPORT: 'SPORT',
  SOCIAL: 'SOCIAL',
  OTHER: 'OTHER'
};

const EventStatus = {
  PENDING: 'PENDING',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  IN_PREPARATION: 'IN_PREPARATION',
  READY: 'READY',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

const UserProfile = {
  STUDENT: 'STUDENT',
  FACULTY: 'FACULTY',
  STAFF: 'STAFF',
  EXTERNAL: 'EXTERNAL'
};

const EventRequestForm = () => {
  const [submissionResult, setSubmissionResult] = useState(null);

  // Fonction pour calculer la date minimum (6 semaines à partir d'aujourd'hui)
  const getMinEventDate = () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + (6 * 7)); // 6 semaines = 42 jours
    return minDate.toISOString().split('T')[0];
  };

  // Validation personnalisée pour la date
  const validateEventDate = (value) => {
    if (!value) return "La date de l'événement est obligatoire";

    const eventDate = new Date(value);
    const minDate = new Date(getMinEventDate());

    if (eventDate < minDate) {
      return "La demande ne peut pas être soumise car la date prévue est trop proche. L'événement doit avoir lieu au moins 6 semaines après la soumission.";
    }

    return null;
  };

  // Step 1: Informations générales de l'événement
  const eventInfoStep = {
    title: "Informations Générales",
    description: "Fournissez les informations de base sur votre événement",
    fields: [
      {
        type: "text",
        name: "eventName",
        label: "Nom de l'Événement",
        placeholder: "Entrez le nom de l'événement",
        required: true
      },
      {
        type: "select",
        name: "eventType",
        label: "Type d'Événement",
        options: Object.keys(EventType).map(key => ({
          value: EventType[key],
          label: key.replace('_', ' ')
        })),
        required: true
      },
      {
        type: "date",
        name: "eventDate",
        label: "Date de l'Événement",
        required: true,
        min: getMinEventDate(),
        validate: validateEventDate
      },
      {
        type: "time",
        name: "eventTime",
        label: "Heure de l'Événement",
        required: true
      },
      {
        type: "number",
        name: "duration",
        label: "Durée (en heures)",
        placeholder: "Durée estimée en heures",
        required: true,
        min: 1,
        max: 24
      },
      {
        type: "select",
        name: "userProfile",
        label: "Votre Profil",
        options: Object.keys(UserProfile).map(key => ({
          value: UserProfile[key],
          label: key === 'STUDENT' ? 'Étudiant' :
            key === 'FACULTY' ? 'Enseignant' :
              key === 'STAFF' ? 'Personnel' : 'Externe'
        })),
        required: true
      }
    ]
  };

  // Step 2: Description et lieu
  const descriptionLocationStep = {
    title: "Description et Lieu",
    description: "Décrivez votre événement et précisez le lieu",
    fields: [
      {
        type: "textarea",
        name: "description",
        label: "Description de l'Événement",
        placeholder: "Décrivez l'objectif, le contenu et les activités prévues...",
        required: true,
        rows: 4
      },
      {
        type: "textarea",
        name: "objectives",
        label: "Objectifs de l'Événement",
        placeholder: "Quels sont les objectifs et résultats attendus ?",
        required: true,
        rows: 3
      },
      {
        type: "text",
        name: "venue",
        label: "Lieu de l'Événement",
        placeholder: "Adresse ou nom du lieu",
        required: true
      },
      {
        type: "select",
        name: "venueType",
        label: "Type de Lieu",
        options: [
          { value: "CAMPUS", label: "Campus FMS" },
          { value: "EXTERNAL", label: "Lieu externe" },
          { value: "ONLINE", label: "En ligne" },
          { value: "HYBRID", label: "Hybride" }
        ],
        required: true
      },
      {
        type: "number",
        name: "expectedAttendees",
        label: "Nombre de Participants Attendus",
        placeholder: "estimation du nombre de participants",
        required: true,
        min: 1
      }
    ]
  };

  // Step 3: Budget et besoins logistiques
  const budgetLogisticsStep = {
    title: "Budget et Logistique",
    description: "Précisez le budget et les besoins logistiques",
    fields: [
      {
        type: "number",
        name: "estimatedBudget",
        label: "Budget Estimé (MAD)",
        placeholder: "Budget total estimé",
        required: true,
        min: 0
      },
      {
        type: "textarea",
        name: "budgetBreakdown",
        label: "Détail du Budget",
        placeholder: "Répartition des coûts (matériel, restauration, intervenants, etc.)",
        required: true,
        rows: 3
      },
      {
        type: "textarea",
        name: "logisticalNeeds",
        label: "Besoins Logistiques",
        placeholder: "Matériel technique, mobilier, restauration, sécurité, etc.",
        required: true,
        rows: 4
      },
      {
        type: "checkbox",
        name: "needsCatering",
        label: "Restauration nécessaire"
      },
      {
        type: "checkbox",
        name: "needsAVEquipment",
        label: "Équipement audiovisuel nécessaire"
      },
      {
        type: "checkbox",
        name: "needsSecuritySupport",
        label: "Support sécurité nécessaire"
      },
      {
        type: "checkbox",
        name: "needsTransportation",
        label: "Transport nécessaire"
      }
    ]
  };

  // Step 4: Informations complémentaires
  const additionalInfoStep = {
    title: "Informations Complémentaires",
    description: "Ajoutez toute information utile pour traiter votre demande",
    fields: [
      {
        type: "textarea",
        name: "targetAudience",
        label: "Public Cible",
        placeholder: "Qui sont les participants attendus ? (étudiants, enseignants, professionnels, etc.)",
        required: true,
        rows: 2
      },
      {
        type: "text",
        name: "contactPerson",
        label: "Personne de Contact",
        placeholder: "Nom du responsable de l'événement",
        required: true
      },
      {
        type: "email",
        name: "contactEmail",
        label: "Email de Contact",
        placeholder: "email@fms.ac.ma",
        required: true
      },
      {
        type: "tel",
        name: "contactPhone",
        label: "Téléphone de Contact",
        placeholder: "+212 6XX XXX XXX",
        required: true
      },
      {
        type: "textarea",
        name: "additionalComments",
        label: "Commentaires Additionnels",
        placeholder: "Toute information supplémentaire que vous jugez utile...",
        required: false,
        rows: 3
      },
      {
        type: "checkbox",
        name: "confirmAccuracy",
        label: "Je confirme que toutes les informations fournies sont exactes",
        required: true
      }
    ]
  };

  const steps = [eventInfoStep, descriptionLocationStep, budgetLogisticsStep, additionalInfoStep];

  const handleSubmit = (formData) => {
    console.log('Demande d\'événement soumise:', formData);

    // Déterminer le routage selon le profil utilisateur
    const routingInfo = formData.userProfile === UserProfile.STUDENT
      ? "Head of Student Life"
      : "FMS Communication Team";

    // Simulation de l'envoi à l'API
    const submissionData = {
      ...formData,
      status: EventStatus.PENDING,
      submissionDate: new Date().toISOString(),
      routedTo: routingInfo,
      id: Math.random().toString(36).substr(2, 9) // ID temporaire
    };

    setSubmissionResult(submissionData);
  };

  if (submissionResult) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-main-green mb-2">Demande d'Événement Soumise</h2>
          <p className="text-darker-beige">Votre demande d'événement a été soumise avec succès !</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-main-green mb-3">Informations de l'Événement</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Nom:</strong> {submissionResult.eventName}</p>
                <p><strong>Type:</strong> {submissionResult.eventType}</p>
                <p><strong>Date:</strong> {submissionResult.eventDate} à {submissionResult.eventTime}</p>
                <p><strong>Lieu:</strong> {submissionResult.venue}</p>
                <p><strong>Participants attendus:</strong> {submissionResult.expectedAttendees}</p>
                <p><strong>Budget estimé:</strong> {submissionResult.estimatedBudget} MAD</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-main-green mb-3">Statut de la Demande</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Numéro de demande:</strong> {submissionResult.id}</p>
                <p><strong>Statut:</strong> <span className="inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">En attente</span></p>
                <p><strong>Date de soumission:</strong> {new Date(submissionResult.submissionDate).toLocaleDateString('fr-FR')}</p>
                <p><strong>Transmise à:</strong> {submissionResult.routedTo}</p>
                <p><strong>Contact:</strong> {submissionResult.contactPerson}</p>
                <p><strong>Email:</strong> {submissionResult.contactEmail}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-main-green mb-2">Description</h4>
            <p className="text-sm text-darker-beige">{submissionResult.description}</p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h4 className="font-medium text-blue-800 mb-2">Prochaines Étapes</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Votre demande sera examinée par {submissionResult.routedTo}</li>
            <li>• Vous recevrez une notification par email avec la décision</li>
            <li>• En cas d'approbation, vous serez contacté pour les détails logistiques</li>
            <li>• Vous pouvez suivre l'état de votre demande dans la section "Mes Demandes"</li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setSubmissionResult(null)}
            className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green focus:outline-none transition-colors duration-200"
          >
            Soumettre une Nouvelle Demande
          </button>
          <button
            onClick={() => {/* Redirection vers mes demandes */ }}
            className="px-6 py-2 bg-gray-200 text-darker-beige rounded-lg hover:bg-gray-300 focus:outline-none transition-colors duration-200"
          >
            Voir Mes Demandes
          </button>
        </div>
      </div>
    );
  }

  return (
    <MultiStepForm
      initialValues={{
        status: EventStatus.PENDING,
        eventType: EventType.CONFERENCE,
        userProfile: UserProfile.STUDENT,
        venueType: "CAMPUS",
        needsCatering: false,
        needsAVEquipment: false,
        needsSecuritySupport: false,
        needsTransportation: false,
        confirmAccuracy: false
      }}
      onSubmit={handleSubmit}
      steps={steps}
      title="Demande d'Événement"
    />
  );
};

export default EventRequestForm;