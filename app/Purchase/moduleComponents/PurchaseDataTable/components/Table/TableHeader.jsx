import React from 'react';
import SortableColumn from './SortableColumn';
import { tableColumnsConfig } from '../../config/tableColumns';

const TableHeader = ({ sortField, sortDirection, onSort }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {tableColumnsConfig.map(column => (
          column.sortable ? (
            <SortableColumn
              key={column.key}
              field={column.key}
              label={column.label}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={onSort}
            />
          ) : (
            <th 
              key={column.key}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.label}
            </th>
          )
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;