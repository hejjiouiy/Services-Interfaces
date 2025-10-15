import React from 'react';
import FormField from '../../../../../../sharedComponents/components/MultiStepForm/FormField';
import { requestTypeConfig, priorityConfig } from '../../config/formConfig';
import { budgetLines } from '../../config/mockData';

// Type-specific form sections
const AchatEnLigneSection = ({ formData, onChange, errors }) => {
  return (
    <div className="space-y-4 mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-medium text-blue-900 mb-4">Détails Achat en Ligne</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          field={{
            type: 'text',
            name: 'nomDemandeur',
            label: 'Nom du Demandeur',
            placeholder: 'Nom complet du demandeur',
            required: true
          }}
          value={formData.nomDemandeur}
          onChange={onChange}
          error={errors.nomDemandeur}
        />
        
        <FormField
          field={{
            type: 'select',
            name: 'ligneBudgetaire',
            label: 'Ligne Budgétaire',
            options: budgetLines,
            placeholder: 'Sélectionner une ligne',
            required: true
          }}
          value={formData.ligneBudgetaire}
          onChange={onChange}
          error={errors.ligneBudgetaire}
        />
      </div>

      <FormField
        field={{
          type: 'file',
          name: 'avisDoyen',
          label: 'Avis du Doyen',
          accept: '.pdf,.doc,.docx',
          required: true
        }}
        value={formData.avisDoyen}
        onChange={onChange}
        error={errors.avisDoyen}
      />
      <p className="text-xs text-gray-500 -mt-2">À transmettre par le Contrôleur de gestion à l'acheteur</p>

      {/* Articles Table */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Articles <span className="text-red-500">*</span>
        </label>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Désignation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantité</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix Unit. (MAD)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total (MAD)</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(formData.articles || []).map((article, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={article.designation}
                      onChange={(e) => {
                        const newArticles = [...(formData.articles || [])];
                        newArticles[index].designation = e.target.value;
                        onChange({ target: { name: 'articles', value: newArticles } });
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-main-green focus:border-main-green"
                      placeholder="Nom de l'article"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="1"
                      value={article.quantite}
                      onChange={(e) => {
                        const newArticles = [...(formData.articles || [])];
                        newArticles[index].quantite = parseInt(e.target.value) || 0;
                        newArticles[index].totalEstime = newArticles[index].quantite * (newArticles[index].prixUnitaire || 0);
                        onChange({ target: { name: 'articles', value: newArticles } });
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-main-green focus:border-main-green"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={article.prixUnitaire}
                      onChange={(e) => {
                        const newArticles = [...(formData.articles || [])];
                        newArticles[index].prixUnitaire = parseFloat(e.target.value) || 0;
                        newArticles[index].totalEstime = (newArticles[index].quantite || 0) * newArticles[index].prixUnitaire;
                        onChange({ target: { name: 'articles', value: newArticles } });
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-main-green focus:border-main-green"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {(article.totalEstime || 0).toFixed(2)} MAD
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        const newArticles = (formData.articles || []).filter((_, i) => i !== index);
                        onChange({ target: { name: 'articles', value: newArticles } });
                      }}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="3" className="px-4 py-3 text-right font-medium">Total Général:</td>
                <td className="px-4 py-3 font-bold text-lg text-main-green">
                  {(formData.articles || []).reduce((sum, art) => sum + (art.totalEstime || 0), 0).toFixed(2)} MAD
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <button
          type="button"
          onClick={() => {
            const newArticles = [...(formData.articles || []), {
              designation: '',
              quantite: 1,
              prixUnitaire: 0,
              totalEstime: 0
            }];
            onChange({ target: { name: 'articles', value: newArticles } });
          }}
          className="mt-2 px-4 py-2 bg-main-green text-white rounded hover:bg-darker-green transition-colors"
        >
          + Ajouter un article
        </button>
        
        {errors.articles && (
          <p className="mt-1 text-sm text-red-600">{errors.articles}</p>
        )}
      </div>
    </div>
  );
};

const AppelOffreSection = ({ formData, onChange, errors }) => {
  return (
    <div className="space-y-4 mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
      <h4 className="font-medium text-green-900 mb-4">Descriptif Technique - Appel d'Offre</h4>
      
      <FormField
        field={{
          type: 'textarea',
          name: 'objet',
          label: 'Objet',
          placeholder: 'Le présent descriptif a pour but de définir les exigences et spécifications techniques...',
          rows: 3,
          required: true
        }}
        value={formData.objet}
        onChange={onChange}
        error={errors.objet}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          field={{
            type: 'select',
            name: 'naturePrestation',
            label: 'Nature de la Prestation',
            options: [
              { value: 'equipement', label: 'Équipement' },
              { value: 'service', label: 'Service' },
              { value: 'travaux', label: 'Travaux' }
            ],
            required: true
          }}
          value={formData.naturePrestation}
          onChange={onChange}
          error={errors.naturePrestation}
        />
        
        <FormField
          field={{
            type: 'number',
            name: 'quantiteEquipement',
            label: 'Quantité',
            min: 1,
            required: true
          }}
          value={formData.quantiteEquipement}
          onChange={onChange}
          error={errors.quantiteEquipement}
        />
      </div>

      <div className="border-t border-green-300 pt-4 mt-4">
        <h5 className="font-medium text-green-800 mb-3">Description de l'Équipement</h5>
        
        <FormField
          field={{
            type: 'textarea',
            name: 'descriptionGenerale',
            label: 'Description Générale',
            rows: 4,
            required: true
          }}
          value={formData.descriptionGenerale}
          onChange={onChange}
          error={errors.descriptionGenerale}
        />
        
        <FormField
          field={{
            type: 'textarea',
            name: 'caracteristiquesTechniques',
            label: 'Caractéristiques Techniques',
            rows: 4,
            required: true
          }}
          value={formData.caracteristiquesTechniques}
          onChange={onChange}
          error={errors.caracteristiquesTechniques}
        />
        
        <FormField
          field={{
            type: 'textarea',
            name: 'exigencesPerformance',
            label: 'Exigences de Performance',
            rows: 3,
            required: true
          }}
          value={formData.exigencesPerformance}
          onChange={onChange}
          error={errors.exigencesPerformance}
        />
        
        <FormField
          field={{
            type: 'textarea',
            name: 'interfaces',
            label: 'Interfaces',
            rows: 2
          }}
          value={formData.interfaces}
          onChange={onChange}
          error={errors.interfaces}
        />
      </div>

      <div className="border-t border-green-300 pt-4 mt-4">
        <h5 className="font-medium text-green-800 mb-3">Livraison & Installation</h5>
        
        <FormField
          field={{
            type: 'textarea',
            name: 'delaiLivraison',
            label: 'Délai et Modalités de Livraison',
            rows: 2,
            required: true
          }}
          value={formData.delaiLivraison}
          onChange={onChange}
          error={errors.delaiLivraison}
        />
        
        <FormField
          field={{
            type: 'textarea',
            name: 'installationFormation',
            label: 'Installation et Formation',
            rows: 3
          }}
          value={formData.installationFormation}
          onChange={onChange}
          error={errors.installationFormation}
        />
      </div>

      <div className="border-t border-green-300 pt-4 mt-4">
        <h5 className="font-medium text-green-800 mb-3">Maintenance & Garantie</h5>
        
        <FormField
          field={{
            type: 'textarea',
            name: 'planMaintenance',
            label: 'Plan de Maintenance',
            rows: 2
          }}
          value={formData.planMaintenance}
          onChange={onChange}
          error={errors.planMaintenance}
        />
        
        <FormField
          field={{
            type: 'textarea',
            name: 'assistanceTechnique',
            label: 'Assistance Technique',
            rows: 2
          }}
          value={formData.assistanceTechnique}
          onChange={onChange}
          error={errors.assistanceTechnique}
        />
        
        <FormField
          field={{
            type: 'textarea',
            name: 'garantie',
            label: 'Garantie',
            rows: 2,
            required: true
          }}
          value={formData.garantie}
          onChange={onChange}
          error={errors.garantie}
        />
      </div>
    </div>
  );
};

const GreAGreSection = ({ formData, onChange, errors }) => {
  return (
    <div className="space-y-4 mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
      <h4 className="font-medium text-purple-900 mb-4">Demande de Gré à Gré</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          field={{
            type: 'text',
            name: 'lieu',
            label: 'Lieu',
            placeholder: 'Ex: Ben Guerir',
            required: true
          }}
          value={formData.lieu}
          onChange={onChange}
          error={errors.lieu}
        />
        
        <FormField
          field={{
            type: 'date',
            name: 'dateGreAGre',
            label: 'Date',
            required: true
          }}
          value={formData.dateGreAGre}
          onChange={onChange}
          error={errors.dateGreAGre}
        />
      </div>

      <FormField
        field={{
          type: 'textarea',
          name: 'objetGreAGre',
          label: 'Objet',
          placeholder: "Demande d'accord de Gré à Gré pour l'achat de...",
          rows: 2,
          required: true
        }}
        value={formData.objetGreAGre}
        onChange={onChange}
        error={errors.objetGreAGre}
      />

      <FormField
        field={{
          type: 'textarea',
          name: 'perimetre',
          label: 'Périmètre',
          placeholder: "Définir le périmètre de l'achat...",
          rows: 3,
          required: true
        }}
        value={formData.perimetre}
        onChange={onChange}
        error={errors.perimetre}
      />

      <FormField
        field={{
          type: 'textarea',
          name: 'contexte',
          label: 'Contexte',
          placeholder: 'Expliquer le contexte et la justification de la demande...',
          rows: 4,
          required: true
        }}
        value={formData.contexte}
        onChange={onChange}
        error={errors.contexte}
      />

      <FormField
        field={{
          type: 'number',
          name: 'montantGreAGre',
          label: 'Montant (MAD)',
          min: 0,
          step: 0.01,
          placeholder: "Montant estimé de l'achat",
          required: true
        }}
        value={formData.montantGreAGre}
        onChange={onChange}
        error={errors.montantGreAGre}
      />

      <FormField
        field={{
          type: 'textarea',
          name: 'demandeGreAGre',
          label: 'Demande',
          placeholder: 'Détailler la demande et les justifications...',
          rows: 4,
          required: true
        }}
        value={formData.demandeGreAGre}
        onChange={onChange}
        error={errors.demandeGreAGre}
      />

      <FormField
        field={{
          type: 'text',
          name: 'responsableEntite',
          label: "Le Responsable de l'Entité",
          placeholder: 'Nom du responsable',
          required: true
        }}
        value={formData.responsableEntite}
        onChange={onChange}
        error={errors.responsableEntite}
      />
    </div>
  );
};

const RequestDetailsSection = ({ formData, onChange, errors }) => {
  // Initialize articles array if it doesn't exist and type is "Achat en Ligne"
  React.useEffect(() => {
    if (formData.typeDemande === 'achat_en_ligne' && (!formData.articles || formData.articles.length === 0)) {
      onChange({ 
        target: { 
          name: 'articles', 
          value: [{ designation: '', quantite: 1, prixUnitaire: 0, totalEstime: 0 }] 
        } 
      });
    }
  }, [formData.typeDemande]);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-darker-beige mb-4">Request Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          field={{
            type: 'select',
            name: 'typeDemande',
            label: 'Request Type',
            options: [
              { value: 'achat_en_ligne', label: 'Achat en Ligne' },
              { value: 'appel_offre', label: "Appel d'Offre" },
              { value: 'gre_a_gre', label: 'Gré à Gré' }
            ],
            required: true
          }}
          value={formData.typeDemande}
          onChange={onChange}
          error={errors.typeDemande}
        />
        
        <FormField
          field={{
            type: 'select',
            name: 'priorite',
            label: 'Priority',
            options: Object.values(priorityConfig),
            required: true
          }}
          value={formData.priorite}
          onChange={onChange}
          error={errors.priorite}
        />
        
        <FormField
          field={{
            type: 'date',
            name: 'dateBesoin',
            label: 'Date Needed',
            required: true
          }}
          value={formData.dateBesoin}
          onChange={onChange}
          error={errors.dateBesoin}
        />
      </div>

      {/* Type-specific sections */}
      {formData.typeDemande === 'achat_en_ligne' && (
        <AchatEnLigneSection formData={formData} onChange={onChange} errors={errors} />
      )}
      
      {formData.typeDemande === 'appel_offre' && (
        <AppelOffreSection formData={formData} onChange={onChange} errors={errors} />
      )}
      
      {formData.typeDemande === 'gre_a_gre' && (
        <GreAGreSection formData={formData} onChange={onChange} errors={errors} />
      )}
    </div>
  );
};

export default RequestDetailsSection;