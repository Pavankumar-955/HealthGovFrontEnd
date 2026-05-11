import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const getStatusStyle = (status) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-600 text-white px-3 py-1 rounded-full text-xs";
    case "INACTIVE":
      return "bg-gray-500 text-white px-3 py-1 rounded-full text-xs";
    case "COMPLETED":
      return "bg-blue-600 text-white px-3 py-1 rounded-full text-xs";
    case "PENDING":
      return "bg-yellow-500 text-white px-3 py-1 rounded-full text-xs";
    default:
      return "bg-gray-400 text-white px-3 py-1 rounded-full text-xs";
  }
};

const ProgramTable = ({ programs, onEdit, onDelete, onRowClick }) => {
  return (
    <table className="w-full bg-white rounded-xl shadow">
      
      {/* HEADER */}
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">ID</th>
          <th className="p-3">Title</th>
          <th className="p-3">Description</th>
          <th className="p-3">Budget</th>
          <th className="p-3">Dates</th>
          <th className="p-3">Status</th>
          <th className="p-3 text-center">Action</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {programs.map((p) => (
          <tr
            key={p.programId}
            className="border-t hover:bg-gray-50"
          >

            {/* ID */}
            <td className="p-3">{p.programId}</td>

            {/* ✅ CLICK ONLY ON TITLE (NOT WHOLE ROW) */}
            <td
              className="p-3 text-blue-600 cursor-pointer"
              onClick={() => onRowClick(p)}
            >
              {p.title}
            </td>

            {/* DESCRIPTION */}
            <td className="p-3 max-w-[180px] truncate">
              {p.description}
            </td>

            {/* BUDGET */}
            <td className="p-3">₹{p.budget}</td>

            {/* DATES */}
            <td className="p-3 whitespace-nowrap">
              {p.startDate} → {p.endDate}
            </td>

            {/* STATUS */}
            <td className="p-3">
              <span className={getStatusStyle(p.status)}>
                {p.status}
              </span>
            </td>

            {/* ACTIONS */}
            <td className="p-3">
              <div className="flex justify-center gap-4">

                {/* ✅ EDIT */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onEdit(p);
                  }}
                  className="text-blue-600 hover:text-blue-800 text-lg"
                  title="Edit"
                >
                  <FaEdit />
                </button>

                {/* ✅ DELETE */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onDelete(p.programId);
                  }}
                  className="text-red-500 hover:text-red-700 text-lg"
                  title="Delete"
                >
                  <FaTrash />
                </button>

              </div>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProgramTable;