'use client';

import React, { useState } from 'react';
import { useUser } from '@/sharedComponents/hooks/useAuth';
import Button from '@/sharedComponents/components/button';
import Card from '@/sharedComponents/components/card';

const AccessDemand = () => {
  const user = useUser();

  // Form state (pour demandeur uniquement)
  const [guests, setGuests] = useState('');
  const [motif, setMotif] = useState('');
  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');
  const [horaire, setHoraire] = useState('');

  const demandesMock = [
    {
      id: 1,
      nom: 'Fatima Zahra',
      date: '2025-05-15',
      lieu: 'Bâtiment A',
      motif: 'Visite scientifique',
    },
    {
      id: 2,
      nom: 'Amine L.',
      date: '2025-05-16',
      lieu: 'Bloc administratif',
      motif: 'Réunion exceptionnelle',
    },
  ];

  if (user.role === 'demandeur') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-main-green">Demande d'accès</h2>

        <form className="space-y-4">
          {/* Nom(s) des invités */}
          <div>
            <label className="block mb-1 font-medium">Nom(s) des invités</label>
            <textarea
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Ex : Ali Benbrahim, Salma Idrissi..."
              className="border rounded px-4 py-2 w-full"
            />
          </div>

          {/* Motif */}
          <div>
            <label className="block mb-1 font-medium">Motif</label>
            <input
              type="text"
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              className="border rounded px-4 py-2 w-full"
              placeholder="Ex : Conférence, Réunion, Formation..."
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-medium">Date d'accès</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>

          {/* Lieu */}
          <div>
            <label className="block mb-1 font-medium">Lieu</label>
            <input
              type="text"
              value={lieu}
              onChange={(e) => setLieu(e.target.value)}
              className="border rounded px-4 py-2 w-full"
              placeholder="Ex : Bâtiment A, Bloc B, Amphithéâtre..."
            />
          </div>

          {/* Horaire */}
          <div>
            <label className="block mb-1 font-medium">Horaire</label>
            <input
              type="text"
              value={horaire}
              onChange={(e) => setHoraire(e.target.value)}
              className="border rounded px-4 py-2 w-full"
              placeholder="Ex : 9h00 - 12h30"
            />
          </div>

          {/* Envoyer */}
          <Button label="Soumettre la demande" />
        </form>
      </div>
    );
  }

  if (user.role === 'approbateur') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-main-green">Demandes à approuver</h2>

        {demandesMock.map((demande) => (
          <Card key={demande.id} status="pending" type="access">
            <div className="space-y-2">
              <p><strong>Invité :</strong> {demande.nom}</p>
              <p><strong>Date :</strong> {demande.date}</p>
              <p><strong>Lieu :</strong> {demande.lieu}</p>
              <p><strong>Motif :</strong> {demande.motif}</p>
              <div className="flex gap-4 mt-2">
                <Button label="Valider" />
                <Button label="Refuser" variant="secondary" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="text-gray-500 italic">
      Aucun rôle reconnu. Veuillez vous connecter en tant que demandeur ou approbateur.
    </div>
  );
};

export default AccessDemand;
