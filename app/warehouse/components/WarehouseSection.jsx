'use client';
import React, { useState, useMemo } from 'react'; // Added useMemo, though not strictly necessary for this state structure
import Form from '@/sharedComponents/components/form'; // Assuming these components exist and accept a 'type' prop
import Card from '@/sharedComponents/components/card'; // Assuming these components exist and accept 'status' and 'type' props
import Approved from '@/sharedComponents/components/approved'; // Assuming this component exists and accepts a 'type' prop

// Import icons (using Heroicons as an example)
import {
    ArchiveBoxIcon, // For Inventory/Stock
    ShoppingCartIcon, // For Orders/Commandes
    ChartBarIcon, // For Analysis/Reports
    CubeIcon, // Generic item/material
    TruckIcon, // Receiving/Dispatch
    WrenchScrewdriverIcon, // Maintenance/Details
    ClockIcon // Pending/Recent
} from '@heroicons/react/24/outline'; // Using outline icons

const WarehouseSection = () => {
    // Define services and their subservices with component mappings
    // Renamed services to French for consistency and clarity in context
    // Updated subservices to be relevant to warehouse/inventory management
    const servicesWithSubs = useMemo(() => ({
        "Gestion des stocks": [
            {
                name: "Vue d'ensemble",
                icon: ChartBarIcon, // Icon for dashboard/overview
                component: <Card status="info" type="inventory-overview" />, // Example component
                description: "Aperçu des niveaux de stock, des articles populaires et des alertes."
            },
             {
                name: "Inventaire physique",
                icon: ArchiveBoxIcon, // Icon for inventory
                component: <Form formType="physical-inventory" />,
                description: "Réaliser ou mettre à jour un inventaire physique des stocks."
            },
            {
                name: "Entrée de stock",
                icon: TruckIcon, // Icon for receiving
                component: <Form formType="stock-entry" />,
                description: "Enregistrer l'arrivée de nouveaux articles en stock."
            },
            {
                name: "Sortie de stock",
                icon: CubeIcon, // Icon for item
                component: <Form formType="stock-exit" />,
                description: "Enregistrer la sortie d'articles du stock."
            },
        ],
        "Gestion des commandes": [
             {
                name: "Commandes entrantes",
                icon: ShoppingCartIcon, // Icon for shopping cart
                component: <Card status="pending" type="incoming-orders" />, // Example component
                description: "Gérer et traiter les commandes reçues."
            },
             {
                name: "Préparation expéditions",
                icon: CubeIcon, // Icon for item (preparing items)
                component: <Form formType="prepare-shipment" />,
                description: "Préparer les articles pour les commandes prêtes à être expédiées."
            },
            {
                name: "Historique des commandes",
                icon: ClockIcon, // Icon for history
                component: <Approved type="order-history" />, // Example component
                description: "Consulter l'historique complet des commandes traitées."
            },
             {
                name: "Demandes de réappro.", // Réapprovisionnement
                icon: WrenchScrewdriverIcon, // Icon for maintenance/requests
                component: <Card status="warning" type="reorder-requests" />, // Example component
                description: "Suivre les demandes de réapprovisionnement de stock."
            },
        ],
        "Rapports & Analyses": [
            {
                name: "Mouvements de stock",
                 icon: ChartBarIcon, // Icon for chart
                component: <Card status="active" type="stock-movement-report" />, // Example component
                description: "Analyser les flux d'entrée et de sortie des articles."
            },
            {
                name: "Niveaux critiques",
                 icon: ArchiveBoxIcon, // Icon for inventory
                component: <Card status="danger" type="critical-stock" />, // Example component
                description: "Voir les articles dont les niveaux de stock sont bas ou critiques."
            },
            {
                name: "Performance commandes",
                 icon: ShoppingCartIcon, // Icon for cart
                component: <Card status="success" type="order-performance-report" />, // Example component
                description: "Évaluer l'efficacité du processus de traitement des commandes."
            },
             {
                name: "Historique articles",
                 icon: CubeIcon, // Icon for item
                component: <Approved type="item-history-report" />, // Example component
                description: "Consulter l'historique détaillé pour chaque article."
            },
        ],
    }), []); // useMemo to prevent recalculating this object unless dependencies change (none here)

    // Set initial states based on the structure
    const initialService = Object.keys(servicesWithSubs)[0]; // First main service
    const initialSubservice = servicesWithSubs[initialService][0].name; // First subservice of the first service

    const [selectedService, setSelectedService] = useState(initialService);
    const [selectedSubservice, setSelectedSubservice] = useState(initialSubservice);

    // Helper function to get notification count for a service
    // Adapted to new service names
    const getNotificationCount = (service) => {
        // This would ideally come from an API or state management
        const counts = {
            "Gestion des stocks": 5, // Example: Low stock alerts or pending inventories
            "Gestion des commandes": 8, // Example: New incoming orders or pending shipments
            "Rapports & Analyses": 0, // Analysis sections usually don't have notifications
        };
        return counts[service] || 0;
    };

    // Get the list of all main services (Memoized)
    const services = useMemo(() => Object.keys(servicesWithSubs), [servicesWithSubs]);

    // When changing the main service, set the first subservice as selected
    const handleServiceChange = (service) => {
        if (selectedService === service) return; // Prevent unnecessary re-renders
        setSelectedService(service);
        setSelectedSubservice(servicesWithSubs[service][0].name);
    };

    // Get the current subservice object (Memoized)
    const getCurrentSubserviceObject = useMemo(() => {
        // Find the subservice object within the selected service's array
        return servicesWithSubs[selectedService]?.find(sub => sub.name === selectedSubservice);
    }, [selectedService, selectedSubservice, servicesWithSubs]);


    // Ensure we have a valid subservice object
    const currentSubservice = getCurrentSubserviceObject;


    // Handle case where currentSubservice might be undefined (e.g., initial load or error)
    if (!currentSubservice) {
        // Fallback or loading state (optional)
        return (
            <div className="bg-lighter-beige p-6 rounded-lg min-h-screen flex items-center justify-center">
                <p className="text-darker-beige text-lg">Chargement ou service introuvable...</p>
            </div>
        );
    }


    return (
        <div className="bg-lighter-beige p-4 rounded-lg">
            <div className="w-[95%] mx-auto">
                {/* Main services navigation (Tabs) */}
                {/* Using flex-wrap to handle potential overflow on smaller screens */}
                <ul className="flex flex-wrap justify-center md:justify-between my-4 gap-4"> {/* Added gap */}
                    {services.map((service) => {
                        const notificationCount = getNotificationCount(service);
                        // Find the icon for the service
                        const serviceMeta = servicesWithSubs[service][0]; // Assuming the first subservice might hold the service's general icon
                        const ServiceIcon = serviceMeta?.icon;

                        return (
                            <li
                                key={service} // Use service name as key
                                className={`flex items-center text-lg md:text-xl rounded-xl border-2 px-4 py-2 cursor-pointer transition-all duration-300 ease-in-out relative
                                    ${
                                        selectedService === service
                                            ? "bg-main-green text-white border-main-green shadow-md"
                                            : "bg-white text-darker-beige border-gray-200 hover:shadow-lg hover:border-main-green hover:bg-main-green hover:text-white"
                                    }`}
                                onClick={() => handleServiceChange(service)}
                            >
                                {/* Icon */}
                                {ServiceIcon && <ServiceIcon className="h-6 w-6 mr-2" />} {/* Added margin-right */}
                                {/* Service Name */}
                                <span className="whitespace-nowrap">{service}</span>
                                {/* Notification Badge */}
                                {notificationCount > 0 && (
                                    <span className="absolute top-[-8px] right-[-8px] text-main-beige bg-red-500 rounded-full px-2 py-0.5 text-xs font-semibold leading-none shadow-xl"> {/* Adjusted styling */}
                                        {notificationCount}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Subservices navigation (Links) */}
                 {/* Added padding-top to create space for the underline */}
                <div className="mt-12 mb-6 pb-3 border-b-[2px] border-gray-200 relative">
                    <div className="flex text-lg md:text-xl space-x-8 overflow-x-auto pb-3"> {/* Increased space, added overflow for small screens */}
                        {servicesWithSubs[selectedService].map((subservice) => (
                            <div
                                key={subservice.name} // Use subservice name as key
                                className="flex flex-col items-center cursor-pointer relative group" // Added group for hover effects
                                onClick={() => setSelectedSubservice(subservice.name)}
                            >
                                <h4 className={`text-darker-beige whitespace-nowrap ${selectedSubservice === subservice.name ? "font-medium text-main-green" : "font-normal group-hover:text-main-green"}`}> {/* Highlight active/hover */}
                                    {subservice.name}
                                </h4>

                                {/* Animated green underline */}
                                <span
                                    className={`absolute bottom-[-10px] z-100 left-0 w-full h-[3px] bg-secondary-green origin-bottom transition-transform duration-300 ease-in-out ${
                                        selectedSubservice === subservice.name ? "scale-x-100" : "scale-x-0 group-hover:scale-x-75" // Smaller scale on hover
                                    }`}
                                ></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description and Dynamic Content */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-main-green mb-2">{currentSubservice.name}</h2>
                    <p className="text-darker-beige">{currentSubservice.description}</p>
                </div>

                {/* Dynamic component section */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                    {/* Render the component defined in the data structure */}
                    {currentSubservice.component}
                </div>
            </div>
        </div>
    );
};

export default WarehouseSection;