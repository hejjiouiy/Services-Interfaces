import SortIcon from "../Icons/SortIcon";


const TableHeader = ({ sortConfig, onSort }) => (
  <thead className="bg-gray-50 border-b">
    <tr>
      <th 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        onClick={() => onSort('type')}
      >
        <div className="flex items-center">
          Type
          <SortIcon sortConfig={sortConfig} columnKey="type" />
        </div>
      </th>
      <th 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        onClick={() => onSort('destination')}
      >
        <div className="flex items-center">
          Destination
          <SortIcon sortConfig={sortConfig} columnKey="destination" />
        </div>
      </th>
      <th 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        onClick={() => onSort('dateDebut')}
      >
        <div className="flex items-center">
          Période
          <SortIcon sortConfig={sortConfig} columnKey="dateDebut" />
        </div>
      </th>
      <th 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        onClick={() => onSort('budgetPrevu')}
      >
        <div className="flex items-center">
          Budget
          <SortIcon sortConfig={sortConfig} columnKey="budgetPrevu" />
        </div>
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
        <div className="flex items-center">
          Statut
          <SortIcon sortConfig={sortConfig} columnKey="etat" />
        </div>
      </th>
      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
        Actions
      </th>
    </tr>
  </thead>
);
export default TableHeader;