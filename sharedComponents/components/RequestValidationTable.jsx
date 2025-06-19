'use client';
import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import RefusalModal from './RefusalModal';

const RequestValidationTable = ({
  data = [],
  columns = [],
  onAccept,
  onRefuse,
  actionsColumn // (optional) function(row) => JSX
}) => {
  const [selectedRefusalId, setSelectedRefusalId] = useState(null);

  const handleRefuse = (id, reason) => {
    setSelectedRefusalId(null);
    if (onRefuse) onRefuse(id, reason);
  };

  if (!data.length) {
    return (
      <div className="text-center text-gray-500 py-12">
        No requests to display.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white shadow rounded-lg text-sm text-darker-beige">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-4 py-3 text-left font-medium">
                {col.header}
              </th>
            ))}
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} className="border-t hover:bg-gray-50">
              {columns.map(col => (
                <td key={col.key} className="px-4 py-3">
                  {typeof col.render === 'function'
                    ? col.render(row[col.key], row)
                    : row[col.key]}
                </td>
              ))}

              <td className="px-4 py-3">
                <StatusBadge status={row.status} />
                {row.status === 'REJECTED' && row.refusalReason && (
                  <div className="text-xs text-red-500 mt-1 italic">"{row.refusalReason}"</div>
                )}
              </td>

              <td className="px-4 py-3 space-x-2">
                {actionsColumn ? (
                  actionsColumn(row)
                ) : (
                  (row.status === 'PENDING' || row.status === 'UNDER_REVIEW') && (
                    <>
                      <button
                        onClick={() => onAccept?.(row.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        aria-label="Accept request"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => setSelectedRefusalId(row.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        aria-label="Refuse request"
                      >
                        Refuse
                      </button>
                    </>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRefusalId && (
        <RefusalModal
          onCancel={() => setSelectedRefusalId(null)}
          onValidate={(reason) => handleRefuse(selectedRefusalId, reason)}
        />
      )}
    </div>
  );
};

export default RequestValidationTable;
