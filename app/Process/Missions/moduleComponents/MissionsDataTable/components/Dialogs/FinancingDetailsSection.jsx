import React from 'react';
import { 
  CreditCard, 
  Home, 
  Plane, 
  CheckCircle, 
  XCircle, 
  Calendar,
  MapPin,
  DollarSign
} from 'lucide-react';

const FinancingDetailsSection = ({ mission }) => {
  const financement = mission?.financement;
  const hebergements = mission?.ordres_mission?.[0]?.hebergements || [];
  const voyages = mission?.ordres_mission?.[0]?.voyages || [];

  console.log("finanecement : ",financement)
  console.log("hebergements : ", hebergements)
  console.log("voyage : ", voyages)
  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Helper function to get financing type label
  const getFinancingTypeLabel = (type) => {
    const labels = {
      'PERSONNEL': 'Personnel',
      'PARRAINAGE': 'Parrainage',
      'INTERNE': 'Interne'
    };
    return labels[type] || type;
  };

  // Helper function to get financing type color
  const getFinancingTypeColor = (type) => {
    const colors = {
      'PERSONNEL': 'bg-blue-100 text-blue-800 border-blue-300',
      'PARRAINAGE': 'bg-purple-100 text-purple-800 border-purple-300',
      'INTERNE': 'bg-green-100 text-green-800 border-green-300'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* Financing Information */}
      {financement && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Financement</h4>
              <p className="text-sm text-gray-500">Détails du financement de la mission</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Financing Type */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Type de financement</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getFinancingTypeColor(financement.type)}`}>
                {getFinancingTypeLabel(financement.type)}
              </span>
            </div>

            {/* Validation Status */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Statut de validation</p>
              <div className="flex items-center">
                {financement.valide ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-600">Validé</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-amber-600 mr-2" />
                    <span className="text-sm font-medium text-amber-600">En attente</span>
                  </>
                )}
              </div>
            </div>

            {/* Currency */}
            {financement.devise && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Devise</p>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-600 mr-1" />
                  <span className="text-sm font-medium text-gray-800">{financement.devise}</span>
                </div>
              </div>
            )}

            {/* Creation Date */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Date de création</p>
              <span className="text-sm font-medium text-gray-800">
                {formatDate(financement.createdAt)}
              </span>
            </div>
          </div>

          {/* Details */}
          {financement.details && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Détails</p>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{financement.details}</p>
            </div>
          )}

          {/* Reimbursements */}
          {financement.remboursements && financement.remboursements.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">Remboursements</p>
              <div className="space-y-2">
                {financement.remboursements.map((remb, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Demande du {formatDate(remb.dateDemande)}
                      </p>
                      <p className="text-xs text-gray-600">État: {remb.etat}</p>
                    </div>
                    {remb.valide && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Transport/Voyage Information */}
      {voyages && voyages.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <Plane className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Transport</h4>
              <p className="text-sm text-gray-500">Détails des déplacements</p>
            </div>
          </div>

          <div className="space-y-4">
            {voyages.map((voyage, index) => (
              <div key={voyage.id || index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Destination */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Destination</p>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-600 mr-1" />
                      <p className="text-sm font-medium text-gray-800">{voyage.destination || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Means of Transport */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Moyen de transport</p>
                    <p className="text-sm font-medium text-gray-800">{voyage.moyen || 'N/A'}</p>
                  </div>

                  {/* Travel Date */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Date de voyage</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-600 mr-1" />
                      <p className="text-sm font-medium text-gray-800">{formatDate(voyage.dateVoyage)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Housing/Hebergement Information */}
      {hebergements && hebergements.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <Home className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Hébergement</h4>
              <p className="text-sm text-gray-500">Détails de l'hébergement</p>
            </div>
          </div>

          <div className="space-y-4">
            {hebergements.map((hebergement, index) => (
              <div key={hebergement.id || index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Location */}
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Localisation</p>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-600 mr-1" />
                      <p className="text-sm font-medium text-gray-800">{hebergement.localisation}</p>
                    </div>
                  </div>

                  {/* Type of Housing */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Type d'hébergement</p>
                    <p className="text-sm font-medium text-gray-800">{hebergement.typeHebergement}</p>
                  </div>

                  {/* Dates */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Période</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-600 mr-1" />
                      <p className="text-sm font-medium text-gray-800">
                        {formatDate(hebergement.dateDebut)} - {formatDate(hebergement.dateFin)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Financing Info Message */}
      {!financement && (!voyages || voyages.length === 0) && (!hebergements || hebergements.length === 0) && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Aucune information de financement disponible</p>
          <p className="text-sm text-gray-500 mt-1">Les détails de financement seront ajoutés ultérieurement</p>
        </div>
      )}
    </div>
  );
};

export default FinancingDetailsSection;