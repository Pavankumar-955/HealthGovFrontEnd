import React from "react";

const AuditFilter = ({
  statusFilter,
  setStatusFilter,
  scopeFilter,
  setScopeFilter,
  officerFilter,
  setOfficerFilter,
  officers = [],
  onClear,
  onOpenCreate   // ✅ new prop
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">

      <div className="flex items-center justify-between gap-4 flex-wrap">

        {/* ✅ LEFT SIDE (FILTERS) */}
        <div className="flex items-center gap-4 overflow-x-auto">

          {/* Officer */}
          {/* <select
            value={officerFilter}
            onChange={(e) => setOfficerFilter(e.target.value)}
            
className="
    min-w-[160px] px-3 py-2 text-sm
    border border-gray-300 rounded-lg
    bg-gray-50
    focus:outline-none
    focus:border-blue-500
    focus:ring-2 focus:ring-blue-200
  "    >
            <option value="ALL">All Officers</option>
            {officers.map((o) => (
              <option key={o.userId} value={o.userId}>
                {o.name}
              </option>
            ))}
          </select> */}

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
           
className="
    min-w-[160px] px-3 py-2 text-sm
    border border-gray-300 rounded-lg
    bg-gray-50
    focus:outline-none
    focus:border-blue-500
    focus:ring-2 focus:ring-blue-200
  "    >
            <option value="ALL">All Status</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="COMPLETED">Completed</option>
            <option value="FOLLOW_UP_REQUIRED">Follow Up</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          {/* Scope */}
          <select
            value={scopeFilter}
            onChange={(e) => setScopeFilter(e.target.value)}
           
className="
    min-w-[160px] px-3 py-2 text-sm
    border border-gray-300 rounded-lg
    bg-gray-50
    focus:outline-none
    focus:border-blue-500
    focus:ring-2 focus:ring-blue-200
  "

          >
            <option value="ALL">All Types</option>
            <option value="PROGRAM">Program</option>
            <option value="PROJECT">Project</option>
            <option value="GRANT">Grant</option>
          </select>

          {/* Clear */}
          <button
            onClick={onClear}
            className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg"
          >
            Clear
          </button>

        </div>

        {/* ✅ RIGHT SIDE (CREATE BUTTON) */}
        <button
          onClick={onOpenCreate}
          className="bg-green-600 text-white cursor-pointer px-5 py-2 rounded-lg font-semibold hover:bg-green-400"
        >
          + Create Audit
        </button>

      </div>
    </div>
  );
};

export default AuditFilter;