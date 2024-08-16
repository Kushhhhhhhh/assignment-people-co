import React from 'react';

const FilterDialog = ({ isOpen, onClose, onFilterChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Filter by Team</h2>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="team"
              value="Engineering"
              onChange={() => onFilterChange("Engineering")}
              className="mr-2"
            />
            Engineering
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="team"
              value="Marketing"
              onChange={() => onFilterChange("Marketing")}
              className="mr-2"
            />
            Marketing
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="team"
              value="Sales"
              onChange={() => onFilterChange("Sales")}
              className="mr-2"
            />
            Sales
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="team"
              value=""
              onChange={() => onFilterChange("")}
              className="mr-2"
            />
            All
          </label>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDialog;