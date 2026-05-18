import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const EnrollmentsTable = ({ enrollments, onEdit, onDelete, onView }) => {
  return (
    <table className="w-full">
      <thead className="bg-gray-100 sticky top-0">
        <tr>
          <th className="p-4">ID</th>
          <th className="p-4">Citizen</th>
          <th className="p-4">Program</th>
          <th className="p-4">Date</th>
          <th className="p-4">Status</th>
          <th className="p-4 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {enrollments.map((e) => (
          <tr
            key={e.enrollmentId}
            onClick={() => onView(e)}
            className="border-t hover:bg-blue-50 cursor-pointer"
          >
            <td className="p-4">{e.enrollmentId}</td>
            <td className="p-4">{e.citizenId}</td>
            <td className="p-4">{e.programId}</td>
            <td className="p-4">{e.date}</td>
            <td className="p-4">{e.status}</td>
            <td className="p-4">
              <div className="flex justify-center gap-3">
                {/* EDIT */}
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    onEdit(e);
                  }}
                  className="text-blue-600"
                >
                  <FaEdit />
                </button>
                {/* DELETE */}
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    onDelete(e.enrollmentId);
                  }}
                  className="text-red-500"
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
export default EnrollmentsTable;