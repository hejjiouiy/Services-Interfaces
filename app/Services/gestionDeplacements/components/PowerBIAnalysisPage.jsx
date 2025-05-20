'use client';
import React from 'react';
import PowerBIDashboard from './PowerBIDashboard';

const PowerBIAnalysisPage = () => {
  return (
    <div className="bg-main-beige p-6 rounded-lg min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-main-green">Analyse des Missions</h1>
          <p className="text-darker-beige mt-2">Visualisation avancée des données de missions via Power BI</p>
        </div>
        
        {/* Filtres ou sélecteurs optionnels */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap gap-2 my-2">
            <select className="px-4 py-2 rounded-lg border border-gray-300 text-darker-beige focus:outline-none focus:ring-2 focus:ring-main-green">
              <option value="all">Tous les types</option>
              <option value="FORMATION">Formation</option>
              <option value="CONFERENCE">Conférence</option>
              <option value="REUNION">Réunion</option>
              <option value="AUTRE">Autre</option>
            </select>
            
            <select className="px-4 py-2 rounded-lg border border-gray-300 text-darker-beige focus:outline-none focus:ring-2 focus:ring-main-green">
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            
            <select className="px-4 py-2 rounded-lg border border-gray-300 text-darker-beige focus:outline-none focus:ring-2 focus:ring-main-green">
              <option value="all">Tous les statuts</option>
              <option value="OUVERTE">Ouvertes</option>
              <option value="EN_COURS">En cours</option>
              <option value="TERMINEE">Terminées</option>
              <option value="ANNULEE">Annulées</option>
            </select>
          </div>
          
          <div className="flex gap-2 my-2">
            <button className="text-white bg-main-green px-4 py-2 rounded-lg hover:bg-main-green/90 transition-colors duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exporter
            </button>
            
            <button className="text-main-green bg-white border border-main-green px-4 py-2 rounded-lg hover:bg-main-green/10 transition-colors duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtres avancés
            </button>
          </div>
        </div>
        
        {/* Composant Power BI */}
        <PowerBIDashboard 
          title="Tableau de bord des missions" 
          description="Analyse détaillée des tendances, budgets et performances des missions"
          embedUrl="https://playground.powerbi.com/sampleReportEmbed"
          height="600px"
        />
        
        {/* Section informative (optionnelle) */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-main-green mb-4">À propos de ce tableau de bord</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Analyse des tendances</h3>
                <p className="mt-1 text-sm text-gray-500">Visualisez l'évolution des missions et identifiez les motifs récurrents.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Suivi budgétaire</h3>
                <p className="mt-1 text-sm text-gray-500">Suivez les dépenses et optimisez l'allocation des ressources financières.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Rapports personnalisés</h3>
                <p className="mt-1 text-sm text-gray-500">Créez des rapports sur mesure et partagez-les avec votre équipe.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Ce tableau de bord est mis à jour quotidiennement. Pour toute question ou demande spécifique concernant les données présentées, veuillez contacter l'équipe d'analyse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerBIAnalysisPage;