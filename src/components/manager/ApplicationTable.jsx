export default function ApplicationTable({ applications, onReview, filter, onRowClick }) {

  const badgeColor = (status) => {
    if (status === "APPROVED") return "success";
    if (status === "REJECTED") return "danger";
    return "warning";
  };

  return (
    <table className="table table-hover">

      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Researcher</th>
          <th>Status</th>

          {(filter === "PENDING" || filter === "ALL") && <th>Action</th>}
          {filter === "APPROVED" && <th>Grant</th>}
          {filter === "REJECTED" && <th>Reason</th>}
        </tr>
      </thead>

      <tbody>
        {applications.map((app) => (
          <tr
            key={app.projectId}
            style={{ cursor: "pointer" }}
            onClick={() => onRowClick(app)}  // ✅ row click
          >

            <td>{app.projectId}</td>
            <td>{app.title}</td>

            <td style={{ maxWidth: "250px" }}>
              <small className="text-muted">
                {app.description || "-"}
              </small>
            </td>

            <td>{app.researcherName || "-"}</td>

            <td>
              <span className={`badge bg-${badgeColor(app.status)}`}>
                {app.status}
              </span>
            </td>

            {/* ✅ ACTION COLUMN */}
            {(filter === "PENDING" || filter === "ALL") && (
              <td>

                {/* ✅ Review button (stop row click!) */}
                {app.status === "PENDING" && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ IMPORTANT
                      onReview(app);
                    }}
                  >
                    Review
                  </button>
                )}

                {/* ✅ Completed */}
                {app.status !== "PENDING" && (
                  <span className="text-muted">Completed</span>
                )}

              </td>
            )}

            {/* ✅ APPROVED */}
            {filter === "APPROVED" && (
              <td className="text-success fw-bold">
                ₹ {app.amount || "N/A"}
              </td>
            )}

            {/* ✅ REJECTED */}
            {filter === "REJECTED" && (
              <td className="text-danger">
                {app.reason || "No reason provided"}
              </td>
            )}

          </tr>
        ))}
      </tbody>

    </table>
  );
}