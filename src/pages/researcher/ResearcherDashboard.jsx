import React, { useEffect, useState } from "react";
import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
} from "../../api/researchApi";

import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";

import ProjectTable from "./ProjectTable";
import ProjectFormModal from "./ProjectFormModal";

const ResearcherDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState("");
    const [searchId, setSearchId] = useState("");
    const [show, setShow] = useState(false);
    const [editData, setEditData] = useState(null);

    const fetchProjects = async () => {
        const res = await getProjects(status);
        setProjects(res.data);
    };

    useEffect(() => {
        fetchProjects();
    }, [status]);

    const handleSubmit = async (data) => {
        if (editData) {
            await updateProject({ ...data, projectId: editData.projectId });
        } else {
            await createProject(data);
        }

        setShow(false);
        setEditData(null);
        fetchProjects();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete project?")) return;
        await deleteProject(id);
        fetchProjects();
    };

    const handleSearch = async () => {
        if (!searchId) return fetchProjects();
        const res = await getProjectById(searchId);
        setProjects([res.data]);
    };

    return (
        <>
            <Navbar />

            {/* MAIN */}
            <div className="pt-24 min-h-screen bg-[#eef3f8] px-6">

                {/* HEADER */}
                <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">

                    {/* LEFT TITLE */}
                    <h2 className="text-4xl font-semibold text-gray-800">
                        Researcher Dashboard
                    </h2>

                    {/* ✅ CREATE BUTTON */}
                    <button
                        onClick={() => setShow(true)}
                        className="bg-[#0a8f2f] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition"
                    >
                        + Create Project
                    </button>

                </div>


                {/* SEARCH CARD */}
                <div className="max-w-7xl mx-auto bg-white p-4 rounded-xl shadow mb-6 flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Enter Project ID"
                        className="border px-3 py-2 rounded-lg w-64"
                        onChange={(e) => setSearchId(e.target.value)}
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Search 🔍
                    </button>

                    <button
                        onClick={fetchProjects}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                        Reset
                    </button>

                    <select
                        onChange={(e) => setStatus(e.target.value)}
                        className="ml-auto border px-3 py-2 rounded-lg"
                    >
                        <option value="">All</option>
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                    </select>
                </div>

                {/* TABLE */}
                <div className="max-w-7xl mx-auto">
                    <ProjectTable
                        projects={projects}
                        onEdit={(p) => {
                            setEditData(p);
                            setShow(true);
                        }}
                        onDelete={handleDelete}
                    />
                </div>

                {/* EMPTY STATE */}
                {projects.length === 0 && (
                    <div className="text-center mt-10 text-gray-500">
                        <h4 className="text-xl">No projects found</h4>
                        <p>Create your first project to get started</p>
                    </div>
                )}

                {/* MODAL */}
                <ProjectFormModal
                    show={show}
                    handleClose={() => {
                        setShow(false);
                        setEditData(null);
                    }}
                    handleSubmit={handleSubmit}
                    editData={editData}
                />
            </div>

            <Footer />
        </>
    );
};

export default ResearcherDashboard;