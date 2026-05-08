import React, { useEffect, useState } from "react";
import ProjectTable from "../../components/researcher/ProjectTable";
import ProjectModal from "../../components/researcher/ProjectModal";
import ProjectDetailsModal from "../../components/manager/ProjectDetailsModal"; // ✅ reuse

export default function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [selectedProject, setSelectedProject] = useState(null); // ✅ NEW

  // ✅ create/update
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

  // ✅ delete
  const handleDelete = (id) => {
    setProjects(prev => prev.filter(p => p.projectId !== id));
  };

  return (
    <div className="container py-4">

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

      {/* ✅ TABLE */}
      <ProjectTable
        projects={projects}
        onEdit={(p) => {
          setEditData(p);
          setShowModal(true);
        }}
        onDelete={handleDelete}
        onRowClick={setSelectedProject} // ✅ ADD THIS
      />

      {/* ✅ CREATE / EDIT MODAL */}
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