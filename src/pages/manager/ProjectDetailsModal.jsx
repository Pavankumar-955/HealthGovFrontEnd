export default function ProjectDetailsModal({ project, onClose }) {

  if (!project) return null;

  return (
    <>
      {/* ✅ BLUR BACKGROUND */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/30 z-[9998]"
        onClick={onClose}
      />

      {/* ✅ CENTER MODAL */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999]">

        <div
          className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6"
          onClick={(e) => e.stopPropagation()}
        >

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-xl font-semibold">Project Details</h3>
          </div>

          {/* BODY */}
          <div className="space-y-3 text-sm">

            <p><strong>ID:</strong> {project.projectId}</p>
            <p><strong>Status:</strong> {project.status}</p>

            <p><strong>Title:</strong> {project.title}</p>

            <div>
              <strong>Description:</strong>
              <div className="border rounded-lg p-3 mt-1 bg-gray-50">
                {project.description}
              </div>
            </div>

            <div className="flex justify-between">
              <p><strong>Start:</strong> {project.startDate}</p>
              <p><strong>End:</strong> {project.endDate}</p>
            </div>

            <p>
              <strong>Researcher:</strong>{" "}
              {project.researcherName || "N/A"}
            </p>

            {/* ✅ APPROVED */}
            {project.status === "APPROVED" && (
              <p className="text-green-600 font-semibold text-lg">
                Grant: ₹ {project.amount || "N/A"}
              </p>
            )}

            {/* ✅ REJECTED */}
            {project.status === "REJECTED" && (
              <p className="text-red-600">
                Reason: {project.reason || "Not provided"}
              </p>
            )}

          </div>

          {/* FOOTER */}
          <div className="text-right mt-6">
            <button
              onClick={onClose}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </>
  );
}