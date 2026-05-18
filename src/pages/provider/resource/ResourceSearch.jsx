import React from "react";

const ResourceSearch = ({ search, setSearch, onSearch, onClear }) => {

  const isEmpty = !search.type && !search.status;

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
          <option value="FUNDS">FUNDS</option>
          <option value="LAB">LAB</option>
          <option value="EQUIPMENT">EQUIPMENT</option>
        </select>

        {/* STATUS */}
        <select
          value={search.status}
          onChange={(e) =>
            setSearch({ ...search, status: e.target.value })
          }
          className="border border-gray-300 px-3 py-2 rounded text-sm bg-white"
        >
          <option value="">Status</option>
          <option value="PENDING">PENDING</option>
          <option value="ALLOCATED">ALLOCATED</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        {/*  SEARCH ( always enabled) */}
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
            className={`px-4 py-2 rounded-lg text-sm transition ${
              isEmpty
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 cursor-pointer"
            }`}
          >
            Reset
          </button>
        </div>

      </div>

      {/*  FILTER TAGS (matched style) */}
      {!isEmpty && (
        <div className="flex flex-wrap gap-2 text-xs items-center">

          <span className="text-gray-500">Filters:</span>

          {search.type && (
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
              {search.type}
            </span>
          )}

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

export default ResourceSearch;