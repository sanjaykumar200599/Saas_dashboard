import React from 'react';
import { X } from 'lucide-react';

const ContractFilters = ({ filters, onFilterChange, onClearFilters, hasActiveFilters }) => {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Expired', label: 'Expired' },
    { value: 'Renewal Due', label: 'Renewal Due' }
  ];

  const riskOptions = [
    { value: '', label: 'All Risk Levels' },
    { value: 'Low', label: 'Low Risk' },
    { value: 'Medium', label: 'Medium Risk' },
    { value: 'High', label: 'High Risk' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  return (
    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Status Filter */}
        <div className="flex-1 max-w-xs">
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="input-field"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Risk Filter */}
        <div className="flex-1 max-w-xs">
          <label htmlFor="risk-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Risk Level
          </label>
          <select
            id="risk-filter"
            value={filters.risk}
            onChange={(e) => handleFilterChange('risk', e.target.value)}
            className="input-field"
          >
            {riskOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={onClearFilters}
              className="btn-secondary flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractFilters;