import React from 'react';
import GenericCard from './GenericCard';

const MissionCard = ({ 
  mission, 
  onView, 
  onEdit, 
  onDelete,
  actions = ['view', 'edit', 'delete']
}) => {
  const order = mission.ordres_mission && mission.ordres_mission.length > 0 
    ? mission.ordres_mission[0] 
    : null;
    
  const status = order ? order.etat : 'OUVERTE';
  const dateRange = order ? { start: order.dateDebut, end: order.dateFin } : null;

  return (
    <GenericCard
      item={mission}
      type={mission.type}
      status={status}
      title={mission.destination}
      subtitle={`${mission.ville}, ${mission.pays}`}
      description={mission.details}
      dateRange={dateRange}
      amount={mission.budgetPrevu}
      actions={actions}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      viewUrl={`/missions/${mission.id}`}
      editUrl={`/missions/${mission.id}/edit`}
    />
  );
};

export default MissionCard;