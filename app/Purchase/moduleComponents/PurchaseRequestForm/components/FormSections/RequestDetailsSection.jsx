import React from 'react';
import SelectField from '../Inputs/SelectField';
import DateField from '../Inputs/DateField';
import { requestTypeConfig, priorityConfig } from '../../config/formConfig';
import { budgetLines } from '../../config/mockData';

const RequestDetailsSection = ({ formData, onChange, errors }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-darker-beige mb-4">Request Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          name="typeDemande"
          label="Request Type"
          value={formData.typeDemande}
          onChange={onChange}
          options={Object.values(requestTypeConfig)}
          required={true}
          error={errors.typeDemande}
        />
        
        <SelectField
          name="priorite"
          label="Priority"
          value={formData.priorite}
          onChange={onChange}
          options={Object.values(priorityConfig)}
          required={true}
          error={errors.priorite}
        />
        
        <DateField
          name="dateBesoin"
          label="Date Needed"
          value={formData.dateBesoin}
          onChange={onChange}
          required={true}
          error={errors.dateBesoin}
        />
        
        <SelectField
          name="ligne_budgetaire_id"
          label="Budget Line"
          value={formData.ligne_budgetaire_id}
          onChange={onChange}
          options={budgetLines.map(line => ({ value: line.id, label: line.label }))}
          placeholder="Select Budget Line"
          required={true}
          error={errors.ligne_budgetaire_id}
        />
      </div>
    </div>
  );
};

export default RequestDetailsSection;