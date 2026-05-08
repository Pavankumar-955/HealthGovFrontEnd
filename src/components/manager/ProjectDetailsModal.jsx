export default function ProjectDetailsModal({ project, onClose }) {

  return (
    <div className="modal d-block">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5>Project Details</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            <p><strong>ID:</strong> {project.projectId}</p>
            <p><strong>Title:</strong> {project.title}</p>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Researcher:</strong> {project.researcherName}</p>
            <p><strong>Status:</strong> {project.status}</p>

            {/* ✅ Conditional data */}
            {project.status === "APPROVED" && (
              <p className="text-success">
                <strong>Grant Amount:</strong> ₹ {project.amount}
              </p>
            )}

            {project.status === "REJECTED" && (
              <p className="text-danger">
                <strong>Reason:</strong> {project.reason}
              </p>
            )}

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}