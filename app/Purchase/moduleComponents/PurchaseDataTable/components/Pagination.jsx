import React from 'react';

const Pagination = ({ 
  currentCount, 
  totalCount, 
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) => {
  return (
    <div className="mt-4 flex justify-between items-center">
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">{currentCount}</span> of <span className="font-medium">{totalCount}</span> requests
      </div>

      {showPagination ? (
        <div className="flex space-x-2">
          <button 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 cursor-not-allowed opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 cursor-not-allowed opacity-50" disabled>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;