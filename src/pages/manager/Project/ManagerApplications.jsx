import React, { useEffect, useState, useRef } from "react";
import {
  getNotificationsByUser,
  markNotificationAsRead,
} from "../../../api/notificationApi";

import { getManagerProjects, decideProject } from "../../../api/managerApi";

import ManagerSidebar from "../ManagerSidebar.jsx";
import Footer from "../../../components/ui/Footer";
import ProjectDetailsModal from "./ProjectDetailsModal";
import DecisionModal from "./DecisionModal";

import toast from "react-hot-toast";

const ManagerApplications = () => {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("");
  const [searchId, setSearchId] = useState("");

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedForReview, setSelectedForReview] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const [lastUpdatedId, setLastUpdatedId] = useState(null);

  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      userId = decoded.userId;
    } catch { }
  }

  useEffect(() => {
    fetchProjects();
    if (userId) fetchNotifications();
  }, [status, lastUpdatedId]);

  const fetchProjects = async () => {
    try {
      const res = await getManagerProjects(status);
      const data = res.data;

      const sortedData = [...data].sort((a, b) => {
        if (a.status === "PENDING" && b.status !== "PENDING") return -1;
        if (b.status === "PENDING" && a.status !== "PENDING") return 1;
        if (a.projectId === lastUpdatedId) return -1;
        if (b.projectId === lastUpdatedId) return 1;
        return b.projectId - a.projectId;
      });

      setProjects(sortedData);
    } catch (err) {
      console.error("Manager fetch error:", err);
      toast.error("Failed to fetch projects ❌");
    }
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
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

  const filteredProjects = projects.filter((p) => {
    if (!searchId) return true;
    return p.projectId.toString().includes(searchId);
  });

  return (
    <div className="flex h-screen overflow-hidden bg-[#eef3f8]">
      {/* 1. Sidebar */}
      <ManagerSidebar />

      {/* 2. Main Wrapper - h-screen + overflow-hidden prevents the whole page from scrolling */}
      <div className="flex flex-col flex-1 ml-64 relative h-full">

        {/* 3. Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto pt-10 px-6 pb-24">
          <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">📋 Project Applications</h2>

            <div className="flex items-center gap-3">
              {/* Notification & Filters UI */}
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setShowNotifications(!showNotifications)} className="text-xl">🔔</button>
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                    {notifications.length}
                  </span>
                )}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-3 z-50">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500">No notifications</p>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.notificationId} className="flex justify-between items-center border-b py-2 text-sm">
                          <span>{n.message}</span>
                          <button
                            onClick={async () => {
                              try {
                                await markNotificationAsRead(n.notificationId);
                                setNotifications((prev) => prev.filter(item => item.notificationId !== n.notificationId));
                              } catch (err) { console.error(err); }
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
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Researcher</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p) => (
                  <tr key={p.projectId} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedProject(p)}>
                    <td className="p-3">{p.projectId}</td>
                    <td className="p-3">{p.title}</td>
                    <td className="p-3 max-w-xs truncate">{p.description || "-"}</td>
                    <td className="p-3">{p.researcherName || "N/A"}</td>
                    <td className="p-3">
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
                    <td className="p-3">
                      {p.status === "PENDING" ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedForReview(p); }}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition font-semibold"
                        >Review</button>
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
        <div className="fixed bottom-0 right-0 left-64 bg-white border-t z-40">
          <Footer />
        </div>
      </div>

      {/* Modals */}
      {selectedProject && <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {selectedForReview && <DecisionModal application={selectedForReview} onClose={() => setSelectedForReview(null)} onSubmit={handleDecisionSubmit} />}
    </div>
  );
};

export default ManagerApplications;