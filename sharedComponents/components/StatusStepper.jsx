'use client';
import React from 'react';

const STATUS_COLORS = {
  PENDING: 'bg-gray-300',
  UNDER_REVIEW: 'bg-yellow-400',
  APPROVED: 'bg-green-500',
  REJECTED: 'bg-red-500',
  IN_PREPARATION: 'bg-blue-400',
  READY: 'bg-indigo-500',
  COMPLETED: 'bg-teal-600',
  CANCELLED: 'bg-gray-500'
};

const StatusStepper = ({ steps = [], currentStatus }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
      {steps.map((step, index) => {
        const isActive = currentStatus === step;
        const isCompleted = steps.indexOf(currentStatus) > index;
        const colorClass = STATUS_COLORS[step] || 'bg-gray-200';

        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full ${isCompleted ? 'bg-main-green' : colorClass} border-2 border-white shadow`}
              title={step}
            />
            <span
              className={`text-sm font-medium ${isActive ? 'text-main-green' : 'text-gray-500'}`}
            >
              {step.replace(/_/g, ' ').toLowerCase()}
            </span>
            {index < steps.length - 1 && <div className="hidden sm:block w-8 h-0.5 bg-gray-300" />}
          </div>
        );
      })}
    </div>
  );
};

export default StatusStepper;
