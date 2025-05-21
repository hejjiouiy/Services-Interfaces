'use client';
import React, { useState } from 'react';

const PowerBIDashboard = ({
  title = "Tableau de bord Business Intelligence",
  description = "Analyse détaillée des données de missions",
  embedUrl = "https://playground.powerbi.com/sampleReportEmbed",
  height = "600px",
  isLoading = false
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);

  // Gestionnaire pour entrer/sortir du mode plein écran
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Gestionnaire pour le chargement de l'iframe
  const handleIframeLoad = () => {
    setIsFrameLoaded(true);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 m-0 rounded-none' : 'relative m-0'
      }`}
    >
      {/* En-tête du composant */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold text-main-green">{title}</h2>
          {!isFullscreen && <p className="text-sm text-darker-beige mt-1">{description}</p>}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={toggleFullscreen}
            className="p-2 text-main-green hover:bg-main-green/10 rounded-lg transition-colors duration-200"
            aria-label={isFullscreen ? "Quitter le plein écran" : "Afficher en plein écran"}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            )}
          </button>
          <button 
            onClick={() => setIsFrameLoaded(false)}
            className="p-2 text-main-green hover:bg-main-green/10 rounded-lg transition-colors duration-200"
            aria-label="Rafraîchir"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Conteneur du tableau de bord */}
      <div 
        className={`relative ${
          isFullscreen ? 'h-[calc(100vh-64px)]' : height
        }`}
      >
        {/* Indicateur de chargement */}
        {(!isFrameLoaded || isLoading) && (
          <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center z-10">
            <div className="w-12 h-12 rounded-full border-4 border-main-green/30 border-t-main-green animate-spin"></div>
            <p className="mt-4 text-darker-beige">Chargement du tableau de bord...</p>
          </div>
        )}
        
        {/* iframe Power BI */}
        <iframe 
          title="Power BI Dashboard"
          width="100%" 
          height="100%" 
          src={embedUrl}
          frameBorder="0" 
          allowFullScreen={true}
          onLoad={handleIframeLoad}
          className={`transition-opacity h-[600px] duration-300 ${isFrameLoaded && !isLoading ? 'opacity-100' : 'opacity-0'}`}
        ></iframe>
      </div>
      
      {/* Barre d'état (visible uniquement en mode normal) */}
      {!isFullscreen && (
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-xs text-darker-beige flex justify-between items-center">
          <span>Dernière mise à jour: {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          <span>
            <a 
              href="https://powerbi.microsoft.com/fr-fr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-main-green hover:underline"
            >
              Propulsé par Power BI
            </a>
          </span>
        </div>
      )}
    </div>
  );
};

export default PowerBIDashboard;