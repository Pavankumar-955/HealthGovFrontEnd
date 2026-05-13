import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ComplianceFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  onClear,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      
      {/* ✅ SINGLE ROW CONTAINER */}
      <div className="flex items-center gap-4 whitespace-nowrap overflow-x-auto">

        {/* ✅ SEARCH */}
        <div className="flex items-center gap-2 px-3 py-2  rounded-lg bg-gray-50 min-w-[260px]">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search compliance records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
          />
        </div>

        {/* ✅ STATUS */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          
className="
    min-w-[160px] px-3 py-2 text-sm
    border border-gray-300 rounded-lg
    focus:outline-none
    focus:border-blue-500
    focus:ring-2 focus:ring-blue-200
  "
        >
          <option value="ALL">All Status</option>
          <option value="COMPLIANT">Compliant</option>
          <option value="PARTIALLY_COMPLIANT">Partial</option>
          <option value="NON_COMPLIANT">Non Compliant</option>
          <option value="UNDER_REVIEW">Review</option>
        </select>

        {/* ✅ TYPE */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          
className="
    min-w-[160px] px-3 py-2 text-sm
    border border-gray-300 rounded-lg
    focus:outline-none
    focus:border-blue-500
    focus:ring-2 focus:ring-blue-200
  "  >
          <option value="ALL">All Types</option>
          <option value="PROGRAM">Program</option>
          <option value="PROJECT">Project</option>
          <option value="GRANT">Grant</option>
        </select>

        {/* ✅ FROM DATE */}
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="min-w-[150px] px-3 py-2 text-sm border rounded-lg bg-gray-50"
        />

        {/* ✅ TO DATE */}
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="min-w-[150px] px-3 py-2 text-sm border rounded-lg bg-gray-50"
        />

        {/* ✅ CLEAR */}
        <button
          onClick={onClear}
          className="min-w-[120px] bg-green-600 text-white px-5 py-2 text-sm font-semibold rounded-lg hover:bg-green-700"
        >
          Clear
        </button>

      </div>
    </div>
  );
};

export default ComplianceFilter;