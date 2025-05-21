'use client';

import React from 'react';
import { useUser } from '@/sharedComponents/hooks/useUser';
import Card from '@/sharedComponents/components/card';
import Button from '@/sharedComponents/components/button';

const PendingDemands = () => {
  const user = useUser();

  const demandes = [
    {
      id: 1,
      invités: ['Ali Benbrahim', 'Salma Idrissi'],
      date: '2025-05-18',
      lieu: 'Bloc B',
      motif: 'Réunion avec intervenants externes',
      statut: 'En attente',
    },
    {
      id: 2,
      invités: ['Rania Taghzaoui'],
      date: '2025-05-20',
      lieu: 'Amphithéâtre 2',
      motif: 'Présentation doctorants',
      statut: 'Validée',
    },
    {
      id: 3,
      invités: ['Hamza Mernissi'],
      date: '2025-05-22',
      lieu: 'Bloc administratif',
      motif: 'Accès ponctuel',
      statut: 'Refusée',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-main-green">Suivi de vos demandes d'accès</h2>

      {demandes.map((demande) => (
        <Card key={demande.id} status={demande.statut.toLowerCase()} type="access">
          <div className="space-y-1">
            <p><strong>Invité(s) :</strong> {demande.invités.join(', ')}</p>
            <p><strong>Date :</strong> {demande.date}</p>
            <p><strong>Lieu :</strong> {demande.lieu}</p>
            <p><strong>Motif :</strong> {demande.motif}</p>
            <p>
              <strong>Statut :</strong>{' '}
              <span
                className={`font-semibold ${
                  demande.statut === 'Validée'
                    ? 'text-green-600'
                    : demande.statut === 'Refusée'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}
              >
                {demande.statut}
              </span>
            </p>

            {/* Actions si la demande est encore en attente */}
            {demande.statut === 'En attente' && (
              <div className="flex gap-4 mt-2">
                <Button label="Modifier" />
                <Button label="Annuler" variant="secondary" />
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PendingDemands;
