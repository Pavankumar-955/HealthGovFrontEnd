import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const getStatusStyle = (status) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-400 text-white px-3 py-1 rounded-full text-sm";
    case "APPROVED":
      return "bg-green-600 text-white px-3 py-1 rounded-full text-sm";
    case "REJECTED":
      return "bg-red-500 text-white px-3 py-1 rounded-full text-sm";
    default:
      return "bg-gray-400 text-white px-3 py-1 rounded-full text-sm";
  }
};

const ProjectTable = ({ projects, onEdit, onDelete, onRowClick }) => {
  return (
    <table className="w-full bg-white rounded-xl shadow">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">ID</th>
          <th className="p-3">Title</th>
          <th className="p-3">Description</th>
          <th className="p-3">Dates</th>
          <th className="p-3">Status</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>

      <tbody>
        {projects.map((p) => (
          <tr
            key={p.projectId}
            onClick={() => onRowClick(p)} //Each row clickable
            className="border-t cursor-pointer hover:bg-gray-50"
          >
            <td className="p-3">{p.projectId}</td>

            <td className="p-3">{p.title}</td>

            <td className="p-3 max-w-[180px] truncate">
              {p.description}
            </td>

            <td className="p-3 whitespace-nowrap">
              {p.startDate} → {p.endDate}
            </td>

            {/* STATUS */}
            <td className="p-3">
              {p.status === "APPROVED" && (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  APPROVED
                </span>
              )}

              {p.status === "REJECTED" && (
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                  REJECTED
                </span>
              )}

              {p.status === "PENDING" && (
                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                  PENDING
                </span>
              )}
            </td>

            {/* ACTION COLUMN */}
            <td className="p-3">

              {(p.status === "PENDING" || p.status === "REJECTED") ? (
                <div className="flex items-center justify-center gap-4">

                  {/* EDIT ICON → always for pending + rejected */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(p);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-lg"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>

                  {/* DELETE ICON → ONLY for pending */}
                  {p.status === "PENDING" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(p.projectId);
                      }}
                      className="text-red-500 hover:text-red-700 text-lg"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  )}

                </div>
              ) : (
                <span className="text-gray-500 font-semibold">
                  Completed
                </span>
              )}

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;