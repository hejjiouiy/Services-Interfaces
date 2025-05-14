'use client'
import React, { useState, useRef, useEffect } from 'react';

// Exemple de données de notification
const sampleNotifications = [
  {
    id: 1,
    title: "Nouvelle demande d'achat",
    message: "Une nouvelle demande d'achat a été soumise pour approbation",
    time: "Il y a 10 minutes",
    read: false
  },
  {
    id: 2,
    title: "Validation requise",
    message: "La demande #550e84 nécessite votre validation",
    time: "Il y a 1 heure",
    read: false
  },
  {
    id: 3,
    title: "Rappel: Réunion",
    message: "Réunion de service prévue dans 30 minutes",
    time: "Il y a 2 heures",
    read: false
  },
  {
    id: 4,
    title: "Demande approuvée",
    message: "Votre demande de fournitures de bureau a été approuvée",
    time: "Hier",
    read: true
  },
  {
    id: 5,
    title: "Mise à jour système",
    message: "Le système sera indisponible pour maintenance ce weekend",
    time: "Il y a 2 jours",
    read: true
  }
];

const Header = () => {
    const [notifications, setNotifications] = useState(sampleNotifications);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

    // Nombre de notifications non lues
    const unreadCount = notifications.filter(notif => !notif.read).length;

    // Fonction pour marquer une notification comme lue
    const markAsRead = (id) => {
        setNotifications(notifications.map(notif => 
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    // Fonction pour marquer toutes les notifications comme lues
    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    // Fermer les notifications si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="mt-14 bg-main-beige w-[95%]">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h1 className="text-2xl">
                        <span className="font-bold">Hello! </span><br />
                        Mohamed Salam
                    </h1>
                </div>
                <div className="flex justify-end w-full">
                    <div className="flex items-center mr-4">
                        <input type="text" placeholder="Search..." className="border border-gray-200 rounded-full text-center bg-white p-2 w-full" />
                    </div>
                    <div className="relative" ref={notificationRef}>
                        <div 
                            className="cursor-pointer flex items-center"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <svg className="h-12.5 mr-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#b0b0b0">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <path d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z" fill="#b0b0b0"></path> 
                                    <path d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z" fill="#b0b0b0"></path>
                                </g>
                            </svg>
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 text-main-beige ml-[-20px] rounded-full bg-red-600 px-1.5 py-0.5 text-xs h-fit">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        
                        {/* Dropdown des notifications */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-700">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <button 
                                            onClick={markAllAsRead}
                                            className="text-sm text-main-green hover:text-green-700 transition-colors"
                                        >
                                            Tout marquer comme lu
                                        </button>
                                    )}
                                </div>
                                
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <div 
                                                key={notification.id} 
                                                className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.read ? 'bg-white' : 'bg-green-50'}`}
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                <div className="flex items-start">
                                                    <div className={`w-2 h-2 mt-2 rounded-full mr-2 ${notification.read ? 'bg-transparent' : 'bg-main-green'}`}></div>
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                                                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-gray-500">
                                            Aucune notification
                                        </div>
                                    )}
                                </div>
                                
                                <div className="p-2 border-t border-gray-200 bg-gray-50">
                                    <button 
                                        className="w-full text-center py-2 text-sm text-main-green hover:text-green-700 transition-colors"
                                        onClick={() => console.log("Voir toutes les notifications")}
                                    >
                                        Voir toutes les notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-10 flex justify-center bg-[url(/images/shcc.png)] bg-cover bg-center rounded-4xl shadow-lg">
                <h1 className="text-left w-full text-5xl text-main-beige font-bold m-20 align-middle ">
                    Welcome to <br/> the SHCC Portal
                </h1>
            </div>
        </header>
    );
};

export default Header;