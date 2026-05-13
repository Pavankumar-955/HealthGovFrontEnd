import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const ResearcherSidebar = ({ onOpenReport }) => {

    const navigate = useNavigate();
    const location = useLocation(); // Get current url

    const token = localStorage.getItem("token");

    let email = "";
    let role = "";

    if (token) {
        try {
            const decoded = JSON.parse(atob(token.split(".")[1]));
            email = decoded.sub || "";
            role = decoded.role || "";
        } catch {}
    }

    const handleLogout = () => {
        if (!window.confirm("Are you sure you want to logout?")) return;

        localStorage.clear();
        toast.success("Logged out ✅");

        setTimeout(() => {
            window.location.href = "/";
        }, 800);
    };

    const isDashboard = location.pathname.includes("/researcher/dashboard");
    const isProjects = location.pathname.includes("/researcher/projects");

    return (
        <div className="w-64 bg-[#011138] text-white h-screen fixed top-0 left-0 flex flex-col p-4">

            {/* USER */}
            <div className="mb-6 border-b pb-4">
                <p className="font-semibold break-words">{email}</p>
                <p className="text-green-400 text-sm">{role}</p>
            </div>

            {/* MENU */}
            <div className="flex flex-col gap-3">

                <button
                    onClick={() => navigate("/researcher/dashboard")}
                    className={`px-4 py-2 rounded-lg text-left ${isDashboard ? "bg-green-600" : "bg-white/10 hover:bg-white/20"}`}
                >
                    Dashboard
                </button>

                <button
                    onClick={() => navigate("/researcher/projects")}
                    className={`px-4 py-2 rounded-lg text-left ${isProjects ? "bg-green-600" : "bg-white/10 hover:bg-white/20"}`}
                >
                    Projects
                </button>

                <button
                    onClick={onOpenReport}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-left"
                >
                    Reports 📊
                </button>

            </div>

            {/* LOGOUT */}
            <button
                onClick={handleLogout}
                className="mt-auto bg-red-500 px-4 py-2 rounded"
            >
                Logout
            </button>

        </div>
    );
};

export default ResearcherSidebar;