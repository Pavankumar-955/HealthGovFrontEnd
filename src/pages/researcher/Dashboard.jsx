import React, { useState } from "react";
import ProjectTable from "../../components/researcher/ProjectTable";
import ProjectModal from "../../components/researcher/ProjectModal";
import ProjectDetailsModal from "../../components/manager/ProjectDetailsModal";

export default function Dashboard() {

  const [projects, setProjects] = useState([
    {
      projectId: 1,
      title: "AI Healthcare",
      description: "AI-based diagnosis and prediction system",
      startDate: "2026-06-01",
      endDate: "2026-06-10",
      status: "PENDING",
      reason: null
    },
    {
      projectId: 2,
      title: "Cancer Research",
      description: "Advanced cancer detection research",
      startDate: "2026-05-01",
      endDate: "2026-05-15",
      status: "APPROVED",
      amount: 500000
    },
    {
      projectId: 3,
      title: "ML Drug Discovery",
      description: "Machine learning for drug discovery",
      startDate: "2026-04-01",
      endDate: "2026-04-12",
      status: "REJECTED",
      reason: "Insufficient data"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // ✅ NEW SEARCH + FILTER STATE
  const [searchId, setSearchId] = useState("");
  const [filter, setFilter] = useState("ALL");

  // ✅ CREATE / UPDATE
  const handleSubmit = (data) => {
    if (editData) {
      setProjects(prev =>
        prev.map(p =>
          p.projectId === editData.projectId
            ? { ...p, ...data }
            : p
        )
      );
    } else {
      const newProject = {
        projectId: Date.now(),
        ...data,
        status: "PENDING",
        reason: null
      };

      setProjects(prev => [newProject, ...prev]);
    }

    setShowModal(false);
    setEditData(null);
  };

  // ✅ DELETE
  const handleDelete = (id) => {
    setProjects(prev => prev.filter(p => p.projectId !== id));
  };

  // ✅ FILTER LOGIC
  const filteredProjects = projects.filter(p =>
    filter === "ALL" ? true : p.status === filter
  );

  // ✅ SEARCH BY ID
  const handleSearch = () => {
    if (!searchId) return;

    const result = projects.find(
      p => p.projectId === Number(searchId)
    );

    setProjects(result ? [result] : []);
  };

  // ✅ RESET
  const handleReset = () => {
    setSearchId("");
    setFilter("ALL");

    // restore original data
    setProjects([
      {
        projectId: 1,
        title: "AI Healthcare",
        description: "AI-based diagnosis and prediction system",
        startDate: "2026-06-01",
        endDate: "2026-06-10",
        status: "PENDING",
        reason: null
      },
      {
        projectId: 2,
        title: "Cancer Research",
        description: "Advanced cancer detection research",
        startDate: "2026-05-01",
        endDate: "2026-05-15",
        status: "APPROVED",
        amount: 500000
      },
      {
        projectId: 3,
        title: "ML Drug Discovery",
        description: "Machine learning for drug discovery",
        startDate: "2026-04-01",
        endDate: "2026-04-12",
        status: "REJECTED",
        reason: "Insufficient data"
      }
    ]);
  };

  return (
    <div className="container py-4">

      {/* ✅ HEADER */}
      <div className="d-flex justify-content-between mb-4">
        <h2>Researcher Dashboard</h2>

        <button
          className="btn btn-success"
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
        >
          + Create Project
        </button>
      </div>

      {/* ✅ SEARCH + FILTER */}
      <div className="card p-3 mb-4 shadow-sm border-0">
        <div className="d-flex gap-2 align-items-center">

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

          <button className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>

          {/* ✅ STATUS FILTER */}
          <select
            className="form-select w-auto ms-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

        </div>
      </div>

      {/* ✅ TABLE */}
      <ProjectTable
        projects={filteredProjects}
        onEdit={(p) => {
          setEditData(p);
          setShowModal(true);
        }}
        onDelete={handleDelete}
        onRowClick={setSelectedProject}
      />

      {/* ✅ MODAL */}
      <ProjectModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        editData={editData}
      />

      {/* ✅ DETAILS MODAL */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  );
}