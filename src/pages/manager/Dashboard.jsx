import { useState } from "react";
import ApplicationTable from "../../components/manager/ApplicationTable";
import DecisionModal from "../../components/manager/DecisionModal";
import ProjectDetailsModal from "../../components/manager/ProjectDetailsModal";

export default function ManagerDashboard() {

  const [applications, setApplications] = useState([
    {
      projectId: 1,
      title: "AI Healthcare",
      description: "AI-based diagnosis and prediction system",
      researcherName: "Rahul",
      status: "PENDING",
      reason: null,
      amount: null
    },
    {
      projectId: 2,
      title: "Cancer Research",
      description: "Advanced cancer detection research",
      researcherName: "Meena",
      status: "APPROVED",
      amount: 500000
    },
    {
      projectId: 3,
      title: "ML Drug Discovery",
      description: "Machine learning for drug discovery",
      researcherName: "John",
      status: "REJECTED",
      reason: "Insufficient data"
    }
  ]);

  const [selected, setSelected] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // ✅ NEW
  const [filter, setFilter] = useState("ALL");

  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleDecision = (decision, reason, amount) => {
    setApplications(prev =>
      prev.map(app =>
        app.projectId === selected.projectId
          ? {
              ...app,
              status: decision,
              reason: decision === "REJECTED" ? reason : null,
              amount: decision === "APPROVED" ? amount : null
            }
          : app
      )
    );
    setSelected(null);
  };

  const filteredApps = applications.filter(app =>
    filter === "ALL" ? true : app.status === filter
  );

  const handleSearch = () => {
    if (!searchId) return;

    const result = applications.find(
      app => app.projectId === Number(searchId)
    );

    setSearchResult(result || null);
  };

  const downloadReport = () => {
    const data = searchResult ? [searchResult] : filteredApps;

    if (data.length === 0) {
      alert("No data to download");
      return;
    }

    const headers = [
      "Project ID", "Title", "Description",
      "Researcher", "Status", "Grant", "Reason"
    ];

    const rows = data.map(app => [
      app.projectId,
      app.title,
      app.description,
      app.researcherName,
      app.status,
      app.amount || "",
      app.reason || ""
    ]);

    const csv = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "report.csv";
    link.click();
  };

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between mb-4">
        <h2>Manager Dashboard</h2>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-dark" onClick={downloadReport}>
            ⬇ Download Report
          </button>

          <select
            value={filter}
            className="form-select w-auto"
            onChange={(e) => {
              setFilter(e.target.value);
              setSearchResult(null);
            }}
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="card p-3 mb-4">
        <div className="d-flex gap-2">
          <input
            type="number"
            className="form-control w-25"
            placeholder="Enter Project ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />

          <button className="btn btn-primary" onClick={handleSearch}>
            Search 🔍
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearchId("");
              setSearchResult(null);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <ApplicationTable
        applications={searchResult ? [searchResult] : filteredApps}
        onReview={setSelected}
        filter={filter}
        onRowClick={setSelectedProject} // ✅ KEY CHANGE
      />

      {/* Review Modal */}
      {selected && (
        <DecisionModal
          application={selected}
          onClose={() => setSelected(null)}
          onSubmit={handleDecision}
        />
      )}

      {/* Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  );
}