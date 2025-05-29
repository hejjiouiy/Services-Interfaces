'use client';
import React, { useState, useEffect } from 'react';

const EventStatusManager = () => {
    const [managedEvents, setManagedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatedStatuses, setUpdatedStatuses] = useState({});

    // Simule les événements validés
    useEffect(() => {
        setTimeout(() => {
            const mockApproved = [
                {
                    id: 'EVT201',
                    eventName: 'Festival Interuniversitaire',
                    eventDate: '2025-07-30',
                    venue: 'Stade UM6P',
                    status: 'APPROVED',
                    description: 'Un festival rassemblant plusieurs universités autour du sport et de la culture.',
                },
                {
                    id: 'EVT202',
                    eventName: 'Semaine de la Santé Mentale',
                    eventDate: '2025-08-15',
                    venue: 'Auditorium FMS',
                    status: 'APPROVED',
                    description: 'Conférences, tables rondes et ateliers autour du bien-être mental.',
                }
            ];
            setManagedEvents(mockApproved);
            setLoading(false);
        }, 1000);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'APPROVED':
                return 'bg-green-100 text-green-800';
            case 'IN_PREPARATION':
                return 'bg-blue-100 text-blue-800';
            case 'READY':
                return 'bg-purple-100 text-purple-800';
            case 'COMPLETED':
                return 'bg-gray-100 text-gray-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'APPROVED':
                return 'Validé';
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

    const handleStatusChange = (id, newStatus) => {
        setUpdatedStatuses(prev => ({
            ...prev,
            [id]: newStatus
        }));
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main-green"></div>
            </div>
        );
    }

    if (managedEvents.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-darker-beige mb-2">Aucun événement à suivre</h3>
                <p className="text-gray-500 mb-4">Tous les événements approuvés sont déjà mis à jour ou terminés.</p>
            </div>
        );
    }
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-main-green">Suivi des Statuts des Événements</h2>

            <div className="grid gap-6">
                {managedEvents.map((event) => {
                    const currentStatus = updatedStatuses[event.id] || event.status;

                    return (
                        <div
                            key={event.id}
                            className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-darker-beige mb-2">{event.eventName}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <span>📅 {new Date(event.eventDate).toLocaleDateString('fr-FR')}</span>
                                            <span>📍 {event.venue}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end space-y-2">
                                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(currentStatus)}`}>
                                            {getStatusLabel(currentStatus)}
                                        </span>
                                        <span className="text-xs text-gray-500">#{event.id}</span>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-700 mb-4">{event.description}</p>

                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <label htmlFor={`status-${event.id}`} className="text-sm font-medium text-darker-beige">
                                        Mettre à jour le statut :
                                    </label>
                                    <select
                                        id={`status-${event.id}`}
                                        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-main-green focus:border-main-green text-sm"
                                        value={currentStatus}
                                        onChange={(e) => handleStatusChange(event.id, e.target.value)}
                                    >
                                        <option value="APPROVED">Validé</option>
                                        <option value="IN_PREPARATION">En préparation</option>
                                        <option value="READY">Prêt</option>
                                        <option value="COMPLETED">Terminé</option>
                                        <option value="CANCELLED">Annulé</option>
                                    </select>
                                    <button
                                        className="px-4 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green transition-colors duration-200"
                                        onClick={() => {
                                            const newStatus = updatedStatuses[event.id];
                                            if (!newStatus || newStatus === event.status) {
                                                alert("Aucun changement à enregistrer.");
                                                return;
                                            }

                                            // TODO: remplacer par appel API réel
                                            alert(`Statut de ${event.id} mis à jour vers "${getStatusLabel(newStatus)}" ✅`);

                                            // Simuler mise à jour côté état local (si pas d'API)
                                            setManagedEvents(prev =>
                                                prev.map(ev =>
                                                    ev.id === event.id ? { ...ev, status: newStatus } : ev
                                                )
                                            );
                                        }}
                                    >
                                        Enregistrer
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EventStatusManager;
