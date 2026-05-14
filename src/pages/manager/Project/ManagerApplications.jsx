import React, { useEffect, useState, useRef } from "react";
import { downloadOverallReportPDF } from "./reportGeneratorManager";
import {
  getNotificationsByUser,
  markNotificationAsRead,
} from "../../../api/notificationApi";

import { getManagerProjects, decideProject } from "../../../api/managerApi";

import ManagerNavbar from "../ManagerNavbar";
import Footer from "../../../components/ui/Footer";
import ProjectDetailsModal from "./ProjectDetailsModal";
import DecisionModal from "./DecisionModal";

import toast from "react-hot-toast";

const ManagerApplications = () => {
  const [showProjectReport, setShowProjectReport] = useState(false);

  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("");
  const [searchId, setSearchId] = useState("");

  const [selectedProject, setSelectedProject] = useState(null); // For details modal
  const [selectedForReview, setSelectedForReview] = useState(null); // For decision modal

  const [notifications, setNotifications] = useState([]); // User-specific notifications
  const [showNotifications, setShowNotifications] = useState(false); // Toggle notification dropdown
  const dropdownRef = useRef(null); // To detect clicks outside the notification dropdown

  const [lastUpdatedId, setLastUpdatedId] = useState(null);

  const token = localStorage.getItem("token");
  let userId = null;

  // Decode token to get userId
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      userId = decoded.userId;
    } catch { }
  }

  // RE-RUN when:status filter changes, decision made
  useEffect(() => {
    fetchProjects();
    if (userId) fetchNotifications();
  }, [status, lastUpdatedId]);

  const fetchProjects = async () => {
    try {
      const res = await getManagerProjects(status);
      const data = res.data;

      const sortedData = [...data].sort((a, b) => { // sort existing data (spread operator to avoid mutating original array)
        if (a.status === "PENDING" && b.status !== "PENDING") return -1; // pending first
        if (b.status === "PENDING" && a.status !== "PENDING") return 1;
        if (a.projectId === lastUpdatedId) return -1; // last updated first
        if (b.projectId === lastUpdatedId) return 1;
        return b.projectId - a.projectId; // then by ID desc
      });

      setProjects(sortedData);
    } catch (err) {
      console.error("Manager fetch error:", err);
      toast.error("Failed to fetch projects ❌");
    }
  };

  // Fetch notifications for the logged-in user
  const fetchNotifications = async () => {
    try {
      const res = await getNotificationsByUser(userId);
      const list = res.data.data;
      const filtered = list.filter(
        (n) => n.status !== "READ" && n.category === "PROJECT"
      );
      setNotifications(filtered);
    } catch (err) {
      console.error("Notification fetch error", err);
    }
  };

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside); // listen for clicks outside the dropdown
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDecisionSubmit = async (decision, reason, amount) => {
    try {
      await decideProject(selectedForReview.projectId, {
        decision,
        reason,
        amount: amount ? Number(amount) : null,
      });
      setLastUpdatedId(selectedForReview.projectId);
      toast.success(`Project ${decision} ✅`);
      setSelectedForReview(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Decision failed ❌");
    }
  };
  // Search filter
  const filteredProjects = projects.filter((p) => {
    if (!searchId) return true;
    return p.projectId.toString() === searchId;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-[#eef3f8]">
      {/* Sidebar */}
      <ManagerNavbar onOpenProjectReport={() => setShowProjectReport(true)} />

      {/* Main */}
      <div className="flex flex-col flex-1 relative h-full pt-20">

        <main className="flex-1 overflow-hidden pt-4 px-6 pb-24">
          <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">📋 Project Applications</h2>

            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Search by ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="border px-3 py-2 rounded-lg w-40"
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border px-3 py-2 rounded-lg"
              >
                <option value="">All</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>

          {/* Table */}
          {/* Table Section */}
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow max-h-[calc(100vh-230px)] overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="p-3 whitespace-nowrap">ID</th>
                  <th className="p-3 whitespace-nowrap">Title</th>
                  <th className="p-3 whitespace-nowrap">Description</th>
                  <th className="p-3 whitespace-nowrap">Researcher</th>
                  <th className="p-3 whitespace-nowrap">Status</th>
                  <th className="p-3 whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p) => (
                  <tr
                    key={p.projectId}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedProject(p)}
                  >
                    <td className="p-3 whitespace-nowrap">{p.projectId}</td>
                    <td className="p-3 whitespace-nowrap max-w-[200px] truncate">{p.title}</td>
                    <td className="p-3 whitespace-nowrap max-w-xs truncate">{p.description || "-"}</td>
                    <td className="p-3 whitespace-nowrap">{p.researcherName || "N/A"}</td>
                    <td className="p-3 whitespace-nowrap">
                      {p.status === "APPROVED" && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                          APPROVED
                        </span>
                      )}
                      {p.status === "REJECTED" && (
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full font-semibold">
                          REJECTED
                        </span>
                      )}
                      {p.status === "PENDING" && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-semibold">
                          PENDING
                        </span>
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {p.status === "PENDING" ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedForReview(p); }}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition font-semibold"
                        >
                          Review
                        </button>
                      ) : (
                        <span className="text-gray-500 font-semibold">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* 4. FIXED FOOTER - This is now locked to the bottom of the screen, horizontally aligned after the sidebar */}
        <div className="fixed bottom-0 right-0 left-0 bg-white border-t z-40">
          <Footer />
        </div>
      </div>

      {/* Modals */}
      {selectedProject && <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {selectedForReview && <DecisionModal application={selectedForReview} onClose={() => setSelectedForReview(null)} onSubmit={handleDecisionSubmit} />}

      {/* REPORT MODAL */}
      {showProjectReport && (
        <>
          {/* BLUR BACKGROUND */}
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/30 z-[9998]"
            onClick={() => setShowProjectReport(false)}
          />

          {/* MODAL */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999]">

            <div
              className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >

              {/* HEADER */}
              <div className="mb-4 border-b pb-2">
                <h3 className="text-xl font-semibold">
                  📊 Project Application Report
                </h3>
              </div>

              {/* BODY */}
              {(() => {
                const user = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));

                const pending = projects.filter(p => p.status === "PENDING").length;
                const approved = projects.filter(p => p.status === "APPROVED").length;
                const rejected = projects.filter(p => p.status === "REJECTED").length;

                return (
                  <div className="space-y-3 text-sm">
                    <p><strong>ID:</strong> {user.userId}</p>
                    <p><strong>Email:</strong> {user.sub}</p>

                    <div className="border p-3 bg-gray-50 rounded-lg">
                      <p><strong>Total Applications:</strong> {projects.length}</p>
                      <p><strong>Pending:</strong> {pending}</p>
                      <p><strong>Approved:</strong> {approved}</p>
                      <p><strong>Rejected:</strong> {rejected}</p>
                    </div>
                  </div>
                );
              })()}

              {/* FOOTER */}
              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() => setShowProjectReport(false)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    const user = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));

                    const report = {
                      managerId: user.userId,
                      email: user.sub,
                      total: projects.length,
                      pending: projects.filter(p => p.status === "PENDING").length,
                      approved: projects.filter(p => p.status === "APPROVED").length,
                      rejected: projects.filter(p => p.status === "REJECTED").length
                    };

                    downloadOverallReportPDF(report);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Download PDF 📄
                </button>

              </div>

            </div>
          </div>
        </>
      )}

    </div>


  );

};

export default ManagerApplications;