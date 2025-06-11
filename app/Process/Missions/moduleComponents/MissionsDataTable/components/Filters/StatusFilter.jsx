const StatusFilter = ({ statusFilter, onStatusFilterChange }) => (
  <select
    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green"
    value={statusFilter}
    onChange={(e) => onStatusFilterChange(e.target.value)}
  >
    <option value="ALL">Tous les statuts</option>
    <option value="OUVERTE">Ouvertes</option>
    <option value="EN_COURS">En cours</option>
    <option value="TERMINEE">Terminées</option>
    <option value="ANNULEE">Annulées</option>
  </select>
);
export default StatusFilter;