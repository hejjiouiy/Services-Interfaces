'use client';
import React, { useState, useEffect } from 'react';

const EventValidationPanel = () => {
    const [pendingEvents, setPendingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [rejectionReasons, setRejectionReasons] = useState({});

    // Simulation d’un appel API pour récupérer les événements à valider
    useEffect(() => {
        setTimeout(() => {
            const mockPending = [
                {
                    id: 'EVT101',
                    eventName: 'Journée Portes Ouvertes FMS',
                    eventDate: '2025-07-10',
                    eventType: 'SEMINAR',
                    status: 'PENDING',
                    venue: 'Hall FMS',
                    organizer: 'Direction Communication',
                    description: 'Présentation des installations et des programmes de FMS.',
                    estimatedBudget: 10000,
                    submissionDate: '2025-05-21'
                },
                {
                    id: 'EVT102',
                    eventName: 'Colloque Biotechnologie',
                    eventDate: '2025-08-03',
                    eventType: 'CONFERENCE',
                    status: 'UNDER_REVIEW',
                    venue: 'Amphi B',
                    organizer: 'Département Recherche',
                    description: 'Discussions sur les avancées en biotechnologie appliquée.',
                    estimatedBudget: 25000,
                    submissionDate: '2025-05-18'
                }
            ];
            setPendingEvents(mockPending);
            setLoading(false);
        }, 1000);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'UNDER_REVIEW':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'PENDING':
                return 'En attente';
            case 'UNDER_REVIEW':
                return 'En examen';
            default:
                return status;
        }
    };

    const toggleExpanded = (id) => {
        setSelectedEventId(prev => (prev === id ? null : id));
    };

    const handleRejectionReasonChange = (id, value) => {
        setRejectionReasons(prev => ({
            ...prev,
            [id]: value
        }));
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main-green"></div>
            </div>
        );
    }

    if (pendingEvents.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-darker-beige mb-2">Aucune demande en attente</h3>
                <p className="text-gray-500 mb-4">Toutes les demandes d’événement ont été traitées.</p>
            </div>
        );
    }
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-main-green">Demandes d'Événement à Valider</h2>

            <div className="grid gap-6">
                {pendingEvents.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                        onClick={() => toggleExpanded(event.id)}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-darker-beige mb-2">{event.eventName}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <span>📅 {new Date(event.eventDate).toLocaleDateString('fr-FR')}</span>
                                        <span>📍 {event.venue}</span>
                                        <span>💰 {event.estimatedBudget.toLocaleString()} MAD</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end space-y-2">
                                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                                        {getStatusText(event.status)}
                                    </span>
                                    <span className="text-xs text-gray-500">#{event.id}</span>
                                </div>
                            </div>

                            {selectedEventId === event.id && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                                        <div>
                                            <h4 className="font-medium text-main-green mb-2">Organisation</h4>
                                            <ul className="space-y-1">
                                                <li><strong>Organisateur:</strong> {event.organizer}</li>
                                                <li><strong>Date de soumission:</strong> {new Date(event.submissionDate).toLocaleDateString('fr-FR')}</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-main-green mb-2">Description</h4>
                                            <p className="text-darker-beige">{event.description}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex flex-col gap-4">
                                        <div className="flex gap-4">
                                            <button
                                                className="px-4 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green transition-colors duration-200"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    alert(`Demande ${event.id} validée ✅`);
                                                    // TODO: appel API POST /evenements/{id}/approve
                                                }}
                                            >
                                                ✅ Valider
                                            </button>

                                            <button
                                                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRejectionReasonChange(event.id, ''); // Active le champ
                                                }}
                                            >
                                                ❌ Rejeter
                                            </button>
                                        </div>

                                        {rejectionReasons[event.id] !== undefined && (
                                            <div className="mt-2">
                                                <label className="block text-sm text-gray-600 mb-2">
                                                    Raison du rejet (obligatoire)
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-main-green focus:border-main-green"
                                                    value={rejectionReasons[event.id]}
                                                    onChange={(e) =>
                                                        handleRejectionReasonChange(event.id, e.target.value)
                                                    }
                                                />
                                                <button
                                                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (!rejectionReasons[event.id]?.trim()) {
                                                            alert("Veuillez fournir une raison.");
                                                            return;
                                                        }
                                                        alert(`Demande ${event.id} rejetée ❌ avec commentaire.`);
                                                        // TODO: appel API POST /evenements/{id}/reject avec commentaire
                                                    }}
                                                >
                                                    Confirmer le rejet
                                                </button>
                                            </div>
                                        )}
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

export default EventValidationPanel;
