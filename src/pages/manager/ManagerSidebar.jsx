import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const ManagerSidebar = ({ onOpenProjectReport }) => {

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ collapse state
  const [showReports, setShowReports] = useState(false);

  const token = localStorage.getItem("token");

  let email = "";
  let role = "";

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      email = decoded.sub || "";
      role = decoded.role || "";
    } catch {
      console.error("Invalid token");
    }
  }

  const handleLogout = () => {
    if (!window.confirm("Logout?")) return;

    localStorage.clear();
    toast.success("Logged out ✅");

    setTimeout(() => {
      window.location.href = "/";
    }, 600);
  };

  // ✅ active detection
  const isDashboard = location.pathname.includes("/manager/dashboard");
  const isApplications = location.pathname.includes("/manager/applications");
  const isPrograms = location.pathname.includes("/manager/health-programs");

  return (
    <div className="w-64 bg-[#011138] text-white h-screen fixed top-0 left-0 flex flex-col p-4">

      {/* USER INFO */}
      <div className="mb-6 border-b pb-4">
        <p className="font-semibold text-sm truncate">{email}</p>
        <p className="text-green-400 text-sm">{role}</p>
      </div>

      {/* MENU */}
      <div className="flex flex-col gap-3">

        {/* DASHBOARD */}
        <button
          onClick={() => navigate("/manager/dashboard")}
          className={`px-4 py-2 rounded-lg text-left transition font-medium
            ${isDashboard
              ? "bg-green-600 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
            }`}
        >
          Dashboard
        </button>

        {/* PROJECT APPLICATIONS */}
        <button
          onClick={() => navigate("/manager/applications")}
          className={`px-4 py-2 rounded-lg text-left transition font-medium
            ${isApplications
              ? "bg-green-600 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
            }`}
        >
          Project Applications
        </button>

        {/* HEALTH PROGRAMS */}
        <button
          onClick={() => navigate("/manager/health-programs")}
          className={`px-4 py-2 rounded-lg text-left transition font-medium
            ${isPrograms
              ? "bg-green-600 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
            }`}
        >
          Health Programs
        </button>

        {/* ✅ REPORTS BUTTON */}
        <button
          onClick={() => setShowReports(!showReports)}
          className="px-4 py-2 rounded-lg text-left transition font-medium bg-white/10 hover:bg-white/20"
        >
          Reports
        </button>

        {/* ✅ SUB OPTIONS */}
        {showReports && (
          <div className="flex flex-col gap-2 ml-2">

            {/* ✅ OPEN POPUP */}
            <button
              onClick={onOpenProjectReport}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
            >
              Project Application Report
            </button>

            {/* ✅ NORMAL NAVIGATION */}
            <button
              onClick={() => navigate("/manager/reports/health")}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
            >
              Health Program Report
            </button>

          </div>
        )}

      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

    </div>
  );

  
};

export default ManagerSidebar;