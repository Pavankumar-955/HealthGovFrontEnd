import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const ComplianceFilter = (
{
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
  onClear
}
) => {
  return (
     <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <div className="flex items-center gap-4 overflow-x-auto">
      <div className="relative min-w-[260px] flex-1">
        <div className="flex items-center gap-3 min-w-[260px] flex-1 px-3 py-2 ">

            {/* ICON */}
            <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" />

            {/* INPUT */}
            <input
                type="text"
                placeholder="Search compliance records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-100"
            />
            </div>
            </div>
            <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="min-w-[170px] px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-100">
            <option value="ALL">All Status</option>
            <option value="COMPLIANT">Compliant</option>
            <option value="PARTIALLY_COMPLIANT">Partial</option>
            <option value="NON_COMPLIANT">Non Compliant</option>
            <option value="UNDER_REVIEW">Review</option>
            </select>

        {/* TYPE */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="min-w-[170px] px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-100"
        >
          <option value="ALL">All Types</option>
          <option value="PROGRAM">Program</option>
          <option value="PROJECT">Project</option>
          <option value="GRANT">Grant</option>
        </select>

        {/* FROM */}
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="min-w-[150px] px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-100"
        />

        {/* TO */}
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="min-w-[150px] px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-100"
        />

        {/* CLEAR BUTTON */}
        <button
          onClick={onClear}
          className="min-w-[140px] bg-green-600 text-white px-5 py-2.5 text-sm font-semibold rounded-lg hover:bg-green-100 transition"
        >
          Clear
        </button>

      </div>
    </div>
  )
}

export default ComplianceFilter