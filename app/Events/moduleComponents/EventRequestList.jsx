'use client';
import React, { useState, useEffect } from 'react';

const EventRequestList = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulation de données pour la démonstration
    useEffect(() => {
        // Simuler un appel API
        setTimeout(() => {
            const mockRequests = [
                {
                    id: 'EVT001',
                    eventName: 'Conférence Intelligence Artificielle',
                    eventType: 'CONFERENCE',
                    eventDate: '2025-07-15',
                    status: 'PENDING',
                    submissionDate: '2025-05-20',
                    routedTo: 'FMS Communication Team',
                    venue: 'Amphithéâtre Principal',
                    estimatedBudget: 15000
                },
                {
                    id: 'EVT002',
                    eventName: 'Tournoi de Football Inter-Écoles',
                    eventType: 'SPORT',
                    eventDate: '2025-08-10',
                    status: 'APPROVED',
                    submissionDate: '2025-05-18',
                    routedTo: 'Head of Student Life',
                    venue: 'Terrain de Sport FMS',
                    estimatedBudget: 8000
                },
                {
                    id: 'EVT003',
                    eventName: 'Atelier Entrepreneuriat',
                    eventType: 'WORKSHOP',
                    eventDate: '2025-07-25',
                    status: 'UNDER_REVIEW',
                    submissionDate: '2025-05-22',
                    routedTo: 'Head of Student Life',
                    venue: 'Salle de Conférence B',
                    estimatedBudget: 5000
                }
            ];
            setRequests(mockRequests);
            setLoading(false);
        }, 1000);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'UNDER_REVIEW':
                return 'bg-blue-100 text-blue-800';
            case 'APPROVED':
                return 'bg-green-100 text-green-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            case 'IN_PREPARATION':
                return 'bg-purple-100 text-purple-800';
            case 'READY':
                return 'bg-indigo-100 text-indigo-800';
            case 'COMPLETED':
                return 'bg-gray-100 text-gray-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
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
            case 'APPROVED':
                return 'Approuvé';
            case 'REJECTED':
                return 'Refusé';
            case 'IN_PREPARATION':
                return 'En préparation';
            case 'READY':
                return 'Prêt';
            case 'COMPLETED':
                return 'Terminé';
            case 'CANCELLED':
                return 'Annulé';
            default:
                return status;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main-green"></div>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 12v-8m0 0V7a4 4 0 118 0v8m-8 4h8"></path>
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-darker-beige mb-2">Aucune demande d'événement</h3>
                <p className="text-gray-500 mb-4">Vous n'avez pas encore soumis de demande d'événement.</p>
                <button className="px-4 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green transition-colors duration-200">
                    Créer une Nouvelle Demande
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-main-green">Mes Demandes d'Événements</h2>

            <div className="grid gap-6">
                {requests.map((request) => (
                    <div
                        key={request.id}
                        className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                        onClick={() => setSelectedRequest(selectedRequest?.id === request.id ? null : request)}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-darker-beige mb-2">{request.eventName}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <span>📅 {new Date(request.eventDate).toLocaleDateString('fr-FR')}</span>
                                        <span>📍 {request.venue}</span>
                                        <span>💰 {request.estimatedBudget.toLocaleString()} MAD</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end space-y-2">
                                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                                        {getStatusText(request.status)}
                                    </span>
                                    <span className="text-xs text-gray-500">#{request.id}</span>
                                </div>
                            </div>

                            {selectedRequest?.id === request.id && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <h4 className="font-medium text-main-green mb-2">Détails de la Demande</h4>
                                            <div className="space-y-1">
                                                <p><strong>Type d'événement:</strong> {request.eventType}</p>
                                                <p><strong>Date de soumission:</strong> {new Date(request.submissionDate).toLocaleDateString('fr-FR')}</p>
                                                <p><strong>Transmis à:</strong> {request.routedTo}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-main-green mb-2">Actions Disponibles</h4>
                                            <div className="space-y-2">
                                                {request.status === 'REJECTED' && (
                                                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                        📄 Voir les commentaires
                                                    </button>
                                                )}
                                                {(request.status === 'PENDING' || request.status === 'UNDER_REVIEW') && (
                                                    <button className="text-orange-600 hover:text-orange-800 text-sm">
                                                        ✏️ Modifier la demande
                                                    </button>
                                                )}
                                                <button className="text-gray-600 hover:text-gray-800 text-sm">
                                                    📞 Contacter le responsable
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <button className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green transition-colors duration-200">
                    Créer une Nouvelle Demande
                </button>
            </div>
        </div>
    );
};

export default EventRequestList;