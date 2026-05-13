import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const ManagerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  // ✅ ACTIVE STATE DETECTION
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
            ${
              isDashboard
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
            ${
              isApplications
                ? "bg-green-600 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
        >
          Project Applications
        </button>

        {/* ✅ NEW: HEALTH PROGRAMS */}
        <button
          onClick={() => navigate("/manager/health-programs")}
          className={`px-4 py-2 rounded-lg text-left transition font-medium
            ${
              isPrograms
                ? "bg-green-600 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
        >
          Health Programs
        </button>


        {/* ✅ NEW: Resource and Infrastructure */}
        <button
  onClick={() => navigate("/manager/enrollments")}
  className={`px-4 py-2 rounded-lg text-left transition font-medium
    ${
      location.pathname.includes("/manager/infrastructure")
        ? "bg-green-600 text-white"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
>
  Enrollments
</button>

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