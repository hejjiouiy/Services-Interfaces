import SortIcon from "../Icons/SortIcon";

const TableHeader = ({ sortConfig, onSort }) => (
  <thead className="bg-gray-50 border-b">
    <tr>
      <th 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        onClick={() => onSort('mission.type')}
      >
        <div className="flex items-center">
          Type Mission
          <SortIcon sortConfig={sortConfig} columnKey="mission.type" />
        </div>
      </th>
      <th 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        onClick={() => onSort('mission.destination')}
      >
        <div className="flex items-center">
          Destination
          <SortIcon sortConfig={sortConfig} columnKey="mission.destination" />
        </div>
      </th>
      <th 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        onClick={() => onSort('Debut')}
      >
        <div className="flex items-center">
          Période
          <SortIcon sortConfig={sortConfig} columnKey="Debut" />
        </div>
      </th>
      <th 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        onClick={() => onSort('mission.budgetPrevu')}
      >
        <div className="flex items-center">
          Budget
          <SortIcon sortConfig={sortConfig} columnKey="mission.budgetPrevu" />
        </div>
      </th>
      <th 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        onClick={() => onSort('etat demande')}
      >
        <div className="flex items-center">
          Statut
          <SortIcon sortConfig={sortConfig} columnKey="etat demande" />
        </div>
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Rapport
      </th>
      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
        Actions
      </th>
    </tr>
  </thead>
);

export default TableHeader;