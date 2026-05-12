import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const getStatusStyle = (status) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium";
    case "INACTIVE":
      return "bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium";
    case "COMPLETED":
      return "bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium";
    case "PENDING":
      return "bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium";
    default:
      return "bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-medium";
  }
};

const ProgramTable = ({ programs, onEdit, onDelete, onView }) => {
  return (
    <table className="w-full bg-white rounded-xl shadow">
      <thead className="bg-gray-100 text-left sticky top-0">
        <tr>
          <th className="p-4 text-gray-600 font-semibold">ID</th>
          <th className="p-4 text-gray-600 font-semibold">Title</th>
          <th className="p-4 text-gray-600 font-semibold">Description</th>
          <th className="p-4 text-gray-600 font-semibold">Budget</th>
          <th className="p-4 text-gray-600 font-semibold">Dates</th>
          <th className="p-4 text-gray-600 font-semibold">Status</th>
          <th className="p-4 text-center text-gray-600 font-semibold">Action</th>
        </tr>
      </thead>
      <tbody>
        {programs.map((p) => (
          <tr
            key={p.programId}
            onClick={() => onView(p)}
            className="border-t hover:bg-blue-50/50 cursor-pointer transition-colors group"
          >
            <td className="p-4 text-gray-500">{p.programId}</td>
            <td className="p-4 text-slate-800 font-medium group-hover:text-blue-700">
              {p.title}
            </td>
            <td className="p-4 max-w-[200px] truncate text-gray-600">
              {p.description}
            </td>
            <td className="p-4 font-semibold text-gray-700">₹{p.budget}</td>
            <td className="p-4 whitespace-nowrap text-gray-500">
              {p.startDate} → {p.endDate}
            </td>
            <td className="p-4">
              <span className={getStatusStyle(p.status)}>{p.status}</span>
            </td>
            <td className="p-4">
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ Prevents detail modal from opening
                    onEdit(p);
                  }}
                  className="text-blue-600 hover:text-blue-800 text-lg transition-transform hover:scale-110"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ Prevents detail modal from opening
                    onDelete(p.programId);
                  }}
                  className="text-red-500 hover:text-red-700 text-lg transition-transform hover:scale-110"
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