import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { getNotificationsByUser, markNotificationAsRead }
from "../../api/notificationApi.js";

export default function ManagerNavbar({ onOpenProjectReport }) {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");
  let email = "";
  let userId = null;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      email = decoded.sub || "";
      userId = decoded.userId;
    } catch {}
  }

  /* ✅ Fetch notifications */
  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const res = await getNotificationsByUser(userId);
        const list = res.data.data || [];

        const unread = list.filter(
          (n) => n.status !== "READ" && n.category === "PROJECT"
        );

        setNotifications(unread);
      } catch {}
    };

    fetchNotifications();
  }, [userId]);

  /* ✅ Close dropdowns on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsNotifOpen(false);
        setIsProfileOpen(false);
        setIsReportOpen(false);
      }
    };

    if (isNotifOpen || isProfileOpen || isReportOpen) {
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }
  }, [isNotifOpen, isProfileOpen, isReportOpen]);

  /* ✅ Logout */
  const handleLogout = () => {
    toast.success("Logged out ✅");
    localStorage.clear();
    setTimeout(() => navigate("/"), 500);
  };

  const isDashboard = location.pathname.includes("/manager/dashboard");
  const isApplications = location.pathname.includes("/manager/applications");
  const isPrograms = location.pathname.includes("/manager/health-programs");

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-40 bg-[#009930] shadow-md"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT → LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/web_Icon.png" alt="logo" className="h-9" />
            <span className="text-lg font-bold text-white">HealthGov</span>
          </Link>

          {/* CENTER → NAV LINKS */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/manager/dashboard")}
              className={`px-4 py-2 rounded-lg font-medium ${
                isDashboard
                  ? "bg-green-700 text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/manager/applications")}
              className={`px-4 py-2 rounded-lg font-medium ${
                isApplications
                  ? "bg-green-700 text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Applications
            </button>

            <button
              onClick={() => navigate("/manager/health-programs")}
              className={`px-4 py-2 rounded-lg font-medium ${
                isPrograms
                  ? "bg-green-700 text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Programs
            </button>

            <div className="relative">
  <button
    onClick={() => {
      setIsReportOpen(!isReportOpen);
      setIsNotifOpen(false);
      setIsProfileOpen(false);
    }}
    className="px-4 py-2 rounded-lg font-medium text-white hover:bg-white/10"
  >
    Reports
  </button>

  {isReportOpen && (
  <div className="absolute mt-3 w-72 bg-white rounded-2xl shadow-xl p-3 z-50">

    {/* ✅ Option 1 */}
    <button
      onClick={() => {
        setIsReportOpen(false);
        onOpenProjectReport();
      }}
      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-green-800 bg-green-50 rounded-xl hover:bg-green-100 transition"
    >
      <span className="font-medium">Overall Project Report</span>
    </button>

    {/* ✅ Option 2 */}
    <button
      onClick={() => {
        setIsReportOpen(false);
      }}
      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-green-800 bg-green-50 rounded-xl hover:bg-green-100 transition"
    >
      <span className="font-medium">Overall Health Program Report</span>
    </button>

  </div>
)}
</div>
          </div>

          {/* RIGHT → NOTIFICATION + MANAGER */}
          <div className="flex items-center gap-4">

            {/* 🔔 NOTIFICATIONS */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsProfileOpen(false);
                }}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <BellIcon className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold text-black rounded-full px-1">
                    {notifications.length}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg p-3 z-50">
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500">No notifications</p>
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
                              prev.filter(
                                (item) =>
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

            {/* 👤 MANAGER BUTTON */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotifOpen(false);
                }}
                className="flex items-center gap-2 rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
              >
                <UserCircleIcon className="h-6 w-6" />
                Manager
                <ChevronDownIcon className="h-4 w-4" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl p-4 z-50">
                  <div className="bg-green-50 text-green-800 text-sm rounded-xl px-4 py-3 mb-4 text-center">
                    {email}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 font-semibold"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}