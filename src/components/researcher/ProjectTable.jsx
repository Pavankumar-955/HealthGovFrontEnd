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
          <th>Dates</th>
          <th>Status</th>
          <th>Reason</th>
          <th>Action</th> {/* ✅ Always present */}
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

            <td>
              {p.startDate} → {p.endDate}
            </td>

            <td>
              <span className={`badge bg-${badgeColor(p.status)}`}>
                {p.status}
              </span>
            </td>

            <td>{p.reason || "-"}</td>

            {/* ✅ ACTION COLUMN */}
            <td>

              {/* ✅ Pending → Edit + Delete */}
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

              {/* ✅ Approved / Rejected → Completed */}
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