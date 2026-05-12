import React from "react";

export default function ProjectTable({ projects, onEdit, onDelete, onRowClick }) {

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

          {/* ✅ NEW COLUMN */}
          <th>Description</th>

          <th>Dates</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {projects.map((p) => (
          <tr
            key={p.projectId}
            style={{ cursor: "pointer" }}
            onClick={() => onRowClick(p)}
          >

            <td>{p.projectId}</td>

            <td>{p.title}</td>

            {/* ✅ DESCRIPTION CELL */}
            <td style={{ maxWidth: "250px" }}>
              <small className="text-muted">
                {p.description || "-"}
              </small>
            </td>

            <td>
              {p.startDate} → {p.endDate}
            </td>

            <td>
              <span className={`badge bg-${badgeColor(p.status)}`}>
                {p.status}
              </span>
            </td>

            {/* ✅ ACTION COLUMN */}
            <td>

              {/* Pending → Edit + Delete */}
              {p.status === "PENDING" && (
                <>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(p);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(p.projectId);
                    }}
                  >
                    Delete
                  </button>
                </>
              )}

              {/* Approved / Rejected */}
              {p.status !== "PENDING" && (
                <span className="text-muted">Completed</span>
              )}

            </td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}