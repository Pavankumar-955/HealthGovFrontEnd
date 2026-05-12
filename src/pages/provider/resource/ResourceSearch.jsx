import React from "react";

const ResourceSearch = ({ search, setSearch, onSearch, onClear }) => {

  const isEmpty = !search.type && !search.status;

  return (
    <div className="flex flex-col gap-3">

      {/* ✅ ROW 1: INPUTS */}
      <div className="flex flex-wrap items-center gap-3">

        {/* TYPE */}
        <select
          value={search.type}
          onChange={(e) =>
            setSearch({ ...search, type: e.target.value })
          }
          className="border px-3 py-2 rounded text-sm bg-white"
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
          className="border px-3 py-2 rounded text-sm bg-white"
        >
          <option value="">Status</option>
          <option value="PENDING">PENDING</option>
          <option value="ALLOCATED">ALLOCATED</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        {/* ✅ SEARCH BUTTON (WITH TOOLTIP) */}
        <div title={isEmpty ? "No filters selected" : "Search"}>
          <button
            onClick={onSearch}
            disabled={isEmpty}
            className={`px-5 py-2 rounded-lg shadow text-sm text-white ${
              isEmpty
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
          >
            Search
          </button>
        </div>

        {/* ✅ RESET BUTTON (WITH TOOLTIP) */}
        <div title={isEmpty ? "Nothing to reset" : "Reset filters"}>
          <button
            onClick={onClear}
            disabled={isEmpty}
            className={`px-5 py-2 rounded-lg shadow text-sm text-white ${
              isEmpty
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-500 hover:bg-gray-600 cursor-pointer"
            }`}
          >
            Reset
          </button>
        </div>

      </div>

      {/* ✅ ROW 2: FILTER TAGS */}
      {!isEmpty && (
        <div className="flex flex-wrap items-center gap-2 text-sm">

          <span className="text-gray-600">Filters:</span>

          {search.type && (
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
              {search.type}
            </span>
          )}

          {search.status && (
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
              {search.status}
            </span>
          )}

          {/* <button
            onClick={onClear}
            className="text-red-600 hover:underline ml-2 cursor-pointer"
          >
            Clear
          </button> */}

        </div>
      )}

    </div>
  );
};

export default ResourceSearch;