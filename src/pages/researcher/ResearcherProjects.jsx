import React, { useEffect, useState, useRef } from "react";
import { downloadOverallReportPDF } from "./reportGenerator";
import {
    getNotificationsByUser,
    markNotificationAsRead,
} from "../../api/notificationApi";

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} from "../../api/researchApi";

import ResearcherSidebar from "./ResearcherSidebar";
import Footer from "../../components/ui/Footer";

import ProjectTable from "./ProjectTable";
import ProjectFormModal from "./ProjectFormModal";
import ProjectDetailsModal from "./ProjectDetailsModal";

import toast from "react-hot-toast";

const ResearcherProjects = () => {

    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState("");
    const [searchId, setSearchId] = useState("");

    const [show, setShow] = useState(false); // Open/close form
    const [editData, setEditData] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const dropdownRef = useRef(null);

    const [showReportModal, setShowReportModal] = useState(false);
    const [lastUpdatedId, setLastUpdatedId] = useState(null); // Track last updated/created project for sorting

    const token = localStorage.getItem("token");
    let userId = null;

    // Decode JWT from localStorage to extract user details
    if (token) {
        try {
            const decoded = JSON.parse(atob(token.split(".")[1]));
            userId = decoded.userId;
        } catch { }
    }
    // Data loading when page loads or status changes or a project is updated/created (to refresh list and resort)
    useEffect(() => {
        fetchProjects();
        if (userId) fetchNotifications();
    }, [status, lastUpdatedId]);

    const openReport = () => setShowReportModal(true);

    const fetchProjects = async () => {
        const res = await getProjects(status); //  API call
        const data = res.data;

        const sortedData = [...data].sort((a, b) => {
            if (a.status === "PENDING" && b.status !== "PENDING") return -1; // PENDING first
            if (b.status === "PENDING" && a.status !== "PENDING") return 1;  // 
            if (a.projectId === lastUpdatedId) return -1; // Last updated/created project first
            if (b.projectId === lastUpdatedId) return 1;  // Then sort by ID desc
            return b.projectId - a.projectId;
        });

        setProjects(sortedData);
    };

    const fetchNotifications = async () => {
        try {
            const res = await getNotificationsByUser(userId);
            const list = res.data.data;

            const filtered = list.filter(
                (n) => n.status !== "READ" && n.category === "PROJECT" // Only show unread project-related notifications
            );

            setNotifications(filtered);
        } catch { }
    };

    // Close notifications dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        // Detect clicks outside the dropdown
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = async (data) => {
        try {
            if (editData) {
                await updateProject({
                    ...data,
                    projectId: editData.projectId,
                    status: "PENDING",
                });
                setLastUpdatedId(editData.projectId);
                toast.success("Project updated ✅");
            } else {
                const res = await createProject(data);
                setLastUpdatedId(res.data.projectId);
                toast.success("Project created ✅");
            }

            setShow(false);
            setEditData(null);
        } catch {
            toast.error("Operation failed ❌");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete project?")) return;

        try {
            await deleteProject(id);
            toast.success("Project deleted ✅");
            fetchProjects();
        } catch {
            toast.error("Delete failed ❌");
        }
    };

    // Search by ID
    const filteredProjects = projects.filter((p) =>
        searchId ? p.projectId.toString().includes(searchId) : true
    );

    const handleOverallReport = () => {
        try {
            const token = localStorage.getItem("token");
            const user = JSON.parse(atob(token.split(".")[1]));

            const approved = projects.filter(p => p.status === "APPROVED").length;
            const rejected = projects.filter(p => p.status === "REJECTED").length;
            const pending = projects.filter(p => p.status === "PENDING").length;
            const totalGrants = projects.reduce((sum, p) => sum + (p.amount || 0), 0);

            const rawName = user.name || user.sub.split("@")[0];

            // clean + formatted name
            const formattedName = rawName
                .replace(/[0-9]/g, "")          // remove numbers
                .replace(/[_\.]/g, " ")         // replace . and _
                .replace(/\b\w/g, c => c.toUpperCase()); // capitalize

            const report = {
                researcherId: user.userId,
                researcherName: formattedName,
                email: user.sub,
                totalProjects: projects.length,
                pending,
                approved,
                rejected,
                totalGrants
            };

            downloadOverallReportPDF(report);
            toast.success("Report downloaded ✅");
        } catch {
            toast.error("Report failed ❌");
        }
    };

    return (
        <>
            <ResearcherSidebar onOpenReport={openReport} />

            <div className="ml-64 flex flex-col min-h-screen">
                <div className="pt-10 bg-[#eef3f8] px-6 flex-grow">

                    {/* HEADER */}
                    <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">

                        <h2 className="text-2xl font-semibold">📁 My Projects</h2>

                        <div className="flex items-center gap-4">

                            {/* NOTIFICATIONS */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() =>
                                        setShowNotifications(!showNotifications)
                                    }
                                    className="text-xl"
                                >
                                    🔔
                                </button>

                                {notifications.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                                        {notifications.length}
                                    </span>
                                )}

                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-3 z-50">
                                        {notifications.length === 0 ? (
                                            <p>No notifications</p>
                                        ) : (
                                            notifications.map((n) => (
                                                <div
                                                    key={n.notificationId}
                                                    className="flex justify-between items-center border-b py-2 text-sm"
                                                >
                                                    <span>{n.message}</span>
                                                    <button
                                                        onClick={async () => {
                                                            await markNotificationAsRead(n.notificationId);
                                                            setNotifications((prev) =>
                                                                prev.filter(item =>
                                                                    item.notificationId !== n.notificationId
                                                                )
                                                            );
                                                        }}
                                                        className="text-green-600 text-xs"
                                                    >
                                                        Mark read
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setShow(true)}
                                className="bg-green-600 text-white px-5 py-2 rounded-lg"
                            >
                                + New Project
                            </button>

                        </div>
                    </div>

                    {/* FILTER */}
                    <div className="max-w-7xl mx-auto bg-white p-3 rounded shadow flex gap-3 mb-4">
                        <input
                            type="number"
                            placeholder="Search by ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="border px-3 py-2 rounded"
                        />

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="ml-auto border px-3 py-2 rounded"
                        >
                            <option value="">All</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>

                    {/* TABLE */}
                    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow max-h-[420px] overflow-y-auto">
                        <ProjectTable
                            projects={filteredProjects}
                            onEdit={(p) => {
                                setEditData(p);
                                setShow(true);
                            }}
                            onDelete={handleDelete}
                            onRowClick={(p) => setSelectedProject(p)}
                        />
                    </div>

                    {/* FORM MODAL */}
                    <ProjectFormModal
                        show={show}
                        handleClose={() => {
                            setShow(false);
                            setEditData(null);
                        }}
                        handleSubmit={handleSubmit}
                        editData={editData}
                    />

                    {/* DETAILS MODAL */}
                    {selectedProject && (
                        <ProjectDetailsModal
                            project={selectedProject}
                            onClose={() => setSelectedProject(null)}
                        />
                    )}
                </div>

                {/* REPORT MODAL */}
                {showReportModal && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
                            onClick={() => setShowReportModal(false)}
                        />

                        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
                            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-5">

                                <h3 className="text-lg font-semibold mb-4">
                                    Overall Report 📊
                                </h3>

                                {(() => {
                                    const user = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));

                                    const pending = projects.filter(p => p.status === "PENDING").length;
                                    const approved = projects.filter(p => p.status === "APPROVED").length;
                                    const rejected = projects.filter(p => p.status === "REJECTED").length;
                                    const totalGrants = projects.reduce((sum, p) => sum + (p.amount || 0), 0);

                                    return (
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <p><strong>ID:</strong> {user.userId}</p>
                                            <p><strong>Email:</strong> {user.sub}</p>

                                            <hr className="my-2" />

                                            <p><strong>Total Projects:</strong> {projects.length}</p>
                                            <p><strong>Pending:</strong> {pending}</p>
                                            <p><strong>Approved:</strong> {approved}</p>
                                            <p><strong>Rejected:</strong> {rejected}</p>
                                            <p><strong>Total Grants:</strong> ₹{totalGrants}</p>
                                        </div>
                                    );
                                })()}

                                <div className="flex justify-end gap-3 mt-5">
                                    <button
                                        onClick={() => setShowReportModal(false)}
                                        className="bg-gray-600 text-white px-4 py-2 rounded"
                                    >
                                        Close
                                    </button>

                                    <button
                                        onClick={handleOverallReport}
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Download PDF 📄
                                    </button>
                                </div>

                            </div>
                        </div>
                    </>
                )}

                <Footer />
            </div>
        </>
    );
};

export default ResearcherProjects;