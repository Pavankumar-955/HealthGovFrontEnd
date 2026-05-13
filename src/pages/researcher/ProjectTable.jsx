import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProjectTable = ({ projects, onEdit, onDelete, onRowClick }) => {
  return (
    /* Wrapper added to ensure the table stays in one line and scrolls horizontally if needed */
    <div className="w-full overflow-x-auto bg-white rounded-xl shadow">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="p-3 whitespace-nowrap">ID</th>
            <th className="p-3 whitespace-nowrap">Title</th>
            <th className="p-3 whitespace-nowrap">Description</th>
            <th className="p-3 whitespace-nowrap">Dates</th>
            <th className="p-3 whitespace-nowrap">Status</th>
            <th className="p-3 whitespace-nowrap text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr
              key={p.projectId}
              onClick={() => onRowClick(p)}
              className="border-t cursor-pointer hover:bg-gray-50"
            >
              <td className="p-3 whitespace-nowrap">{p.projectId}</td>

              {/* Added truncate and max-width to Title to protect other columns */}
              <td className="p-3 whitespace-nowrap max-w-[200px] truncate" title={p.title}>
                {p.title}
              </td>
              
              <td className="p-3 whitespace-nowrap max-w-[250px] truncate" title={p.description}>
                {p.description || "-"}
              </td>

              <td className="p-3 whitespace-nowrap">
                {p.startDate} → {p.endDate}
              </td>

              <td className="p-3 whitespace-nowrap">
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

              <td className="p-3 whitespace-nowrap">
                {(p.status === "PENDING" || p.status === "REJECTED") ? (
                  <div className="flex items-center justify-center gap-4">
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
                  <div className="text-center">
                    <span className="text-gray-500 font-semibold">Completed</span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;