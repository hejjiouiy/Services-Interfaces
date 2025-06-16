'use client';
import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import RefusalModal from './RefusalModal';

const RequestValidationTable = ({
  data,
  onAccept,
  onRefuse,
  columns = []
}) => {
  const [selectedRefusalId, setSelectedRefusalId] = useState(null);

  const handleRefuse = (id, reason) => {
    setSelectedRefusalId(null);
    if (onRefuse) onRefuse(id, reason);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white shadow rounded-lg text-sm text-darker-beige">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left font-medium">
                {col.header}
              </th>
            ))}
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3">
                  {typeof col.render === 'function' ? col.render(item[col.key], item) : item[col.key]}
                </td>
              ))}
              <td className="px-4 py-3">
                <StatusBadge status={item.status} />
                {item.status === 'REJECTED' && item.refusalReason && (
                  <div className="text-xs text-red-500 mt-1 italic">"{item.refusalReason}"</div>
                )}
              </td>
              <td className="px-4 py-3 space-x-2">
                {(item.status === 'PENDING' || item.status === 'UNDER_REVIEW') && (
                  <>
                    <button
                      onClick={() => onAccept(item.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => setSelectedRefusalId(item.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Refuse
                    </button>
                  </>
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
