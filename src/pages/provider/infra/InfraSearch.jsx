import React from "react";

const InfraSearch = ({ search, setSearch, onSearch, onClear }) => {
  const isEmpty = !search.type && !search.location && !search.status;

  return (
    <div className="flex flex-col gap-4">

      {/*  FILTER ROW */}
      <div className="flex flex-wrap items-center gap-3">

        {/* TYPE */}
        <select
          value={search.type}
          onChange={(e) =>
            setSearch({ ...search, type: e.target.value })
          }
          className="border border-gray-300 px-3 py-2 rounded text-sm bg-white"
        >
          <option value="">Type</option>
          <option value="HOSPITAL">HOSPITAL</option>
          <option value="LAB">LAB</option>
          <option value="CENTER">CENTER</option>
        </select>

        {/* LOCATION */}
        <input
          type="text"
          placeholder="Location"
          value={search.location}
          onChange={(e) =>
            setSearch({ ...search, location: e.target.value })
          }
          className="border border-gray-300 px-3 py-2 rounded text-sm"
        />

        {/* STATUS */}
        <select
          value={search.status}
          onChange={(e) =>
            setSearch({ ...search, status: e.target.value })
          }
          className="border border-gray-300 px-3 py-2 rounded text-sm bg-white"
        >
          <option value="">Status</option>
          <option value="OPERATIONAL">OPERATIONAL</option>
          <option value="UNDER_MAINTENANCE">UNDER_MAINTENANCE</option>
          <option value="TEMPORARILY_CLOSED">TEMPORARILY_CLOSED</option>
          <option value="DECOMMISSIONED">DECOMMISSIONED</option>
        </select>

        {/*  SEARCH (always enabled) */}

        <button
          onClick={onSearch}
          className="px-4 py-2 rounded-lg text-sm bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition cursor-pointer"
        >
          Search
        </button>


        {/*  RESET */}

        <div title={isEmpty ? "No filters to reset" : "Reset filters"}>
          <button
            onClick={onClear}
            disabled={isEmpty}
            className={`px-4 py-2 rounded-lg text-sm transition ${isEmpty
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 cursor-pointer"
              }`}
          >
            Reset
          </button>
        </div>


      </div>

      {/*  FILTER TAGS */}
      {!isEmpty && (
        <div className="flex flex-wrap gap-2 text-xs items-center">

          <span className="text-gray-500">Filters:</span>

          {/* TYPE */}
          {search.type && (
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
              {search.type}
            </span>
          )}

          {/* LOCATION */}
          {search.location && (
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {search.location}
            </span>
          )}

          {/* STATUS */}
          {search.status && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              {search.status}
            </span>
          )}

        </div>
      )}

    </div>
  );
};

export default InfraSearch;
