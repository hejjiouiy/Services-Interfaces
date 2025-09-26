const StatusFilter = ({ statusFilter, onStatusFilterChange }) => (
  <select
    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green"
    value={statusFilter}
    onChange={(e) => onStatusFilterChange(e.target.value)}
  >
    <option value="ALL">Tous les statuts</option>
    <option value="Ouverte">🔵 Ouvertes</option>
    <option value="En attente">⏳ En attente</option>
    <option value="Validee Hierarchiquement">👔 Validées Hiérarchiquement</option>
    <option value="Validee budgetairement">💰 Validées Budgétairement</option>
    <option value="Approuvee">✅ Approuvées</option>
    <option value="Cloturee">🔒 Clôturées</option>
    <option value="Refusee">❌ Refusées</option>
  </select>
);

export default StatusFilter;