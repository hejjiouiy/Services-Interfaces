'use client'
import React from 'react'
import MultiStepForm from '../../../sharedComponents/components/multiStepForm'
import { addWeeks, isAfter } from 'date-fns'

const EventRequestForm = () => {
  const initialValues = {
    nom: '',
    date: '',
    description: '',
    lieu: '',
    budget: '',
    logistique: ''
  }

  const formSteps = [
    {
      title: 'Informations sur l’événement',
      description: 'Veuillez remplir les détails de l’événement à soumettre.',
      fields: [
        {
          type: 'text',
          name: 'nom',
          label: 'Nom de l’événement',
          required: true
        },
        {
          type: 'date',
          name: 'date',
          label: 'Date prévue',
          required: true
        },
        {
          type: 'textarea',
          name: 'description',
          label: 'Description',
          required: true
        },
        {
          type: 'text',
          name: 'lieu',
          label: 'Lieu',
          required: true
        },
        {
          type: 'number',
          name: 'budget',
          label: 'Budget estimé',
          required: true
        },
        {
          type: 'textarea',
          name: 'logistique',
          label: 'Besoins logistiques',
          required: true
        }
      ]
    }
  ]

  const handleSubmit = (formData) => {
    const sixWeeksLater = addWeeks(new Date(), 6)
    const selectedDate = new Date(formData.date)

    if (!isAfter(selectedDate, sixWeeksLater)) {
      alert("❌ La date doit être au moins 6 semaines à l'avance.")
      return
    }

    console.log('✅ Données du formulaire soumises :', formData)
    alert("✅ Formulaire soumis avec succès.")
    // Ici tu pourras intégrer l'appel API /evenements plus tard
  }

  return (
    <div className="p-6">
      <MultiStepForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        steps={formSteps}
        title="Soumettre une demande d’événement"
      />
    </div>
  )
}

export default EventRequestForm
