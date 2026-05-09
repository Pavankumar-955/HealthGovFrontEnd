import React from "react";

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

const ProjectTable = ({ projects, onEdit, onDelete }) => {
  return (
    <table className="w-full bg-white rounded-xl shadow">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">ID</th>
          <th className="p-3">Title</th>
          <th className="p-3">Dates</th>
          <th className="p-3">Status</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>

      <tbody>
        {projects.map((p) => (
          <tr key={p.projectId} className="border-t">
            <td className="p-3">{p.projectId}</td>
            <td className="p-3">{p.title}</td>
            <td className="p-3">
              {p.startDate} → {p.endDate}
            </td>

            <td className="p-3">
              <span className={getStatusStyle(p.status)}>
                {p.status}
              </span>
            </td>

            <td className="p-3">
              {p.status === "PENDING" ? (
                <>
                  <button
                    onClick={() => onEdit(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(p.projectId)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <span className="text-gray-500">Completed</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;