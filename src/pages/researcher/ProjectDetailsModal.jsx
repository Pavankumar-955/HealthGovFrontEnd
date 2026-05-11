import React from "react";

const ProjectDetailsModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <>
      {/* BLUR BACKDROP */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998]"
        onClick={onClose}
      />

      {/* MODAL WRAPPER */}
      <div className="fixed inset-0 flex items-center justify-center z-[99999] pointer-events-none">
        
        <div
          className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >

          {/* ✅ HEADER */}
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-xl font-bold text-gray-800">
              Project Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-3xl leading-none"
            >
              &times;
            </button>
          </div>

          {/* ✅ BODY */}
          <div className="space-y-4 text-gray-700">

            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>ID:</strong>{" "}
                <span className="text-blue-600">
                  {project.projectId}
                </span>
              </p>
              <p>
                <strong>Status:</strong> {project.status}
              </p>
            </div>

            <p>
              <strong>Title:</strong> {project.title}
            </p>

            <div>
              <strong>Description:</strong>
              <p className="mt-1 bg-gray-50 p-3 rounded-lg border text-sm max-h-40 overflow-y-auto">
                {project.description}
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <p><strong>Start:</strong> {project.startDate}</p>
              <p><strong>End:</strong> {project.endDate}</p>
            </div>

            {/* GRANT (APPROVED) */}
            {project.status === "APPROVED" && (
              <p className="text-lg font-semibold text-green-700">
                <strong>Grant:</strong> ₹{project.amount || "N/A"}
              </p>
            )}

            {/* REJECTION REASON (NEW) */}
            {project.status === "REJECTED" && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                <p className="text-red-700 text-sm">
                  <strong>Reason:</strong>{" "}
                  {project.reason || "Not provided"}
                </p>
              </div>
            )}

          </div>

          {/* FOOTER */}
          <div className="text-right mt-6">
            <button
              onClick={onClose}
              className="bg-gray-800 hover:bg-black text-white px-6 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProjectDetailsModal;