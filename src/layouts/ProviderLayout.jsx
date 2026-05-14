import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  MdDashboard,
  MdFolder,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";

const ProviderLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      path: "/provider/dashboard",
      icon: MdDashboard,
      label: "Dashboard",
    },
    {
      path: "/provider/programs",
      icon: MdFolder,
      label: "Health Programs",
    },
    {
      path: "/provider/HealthRecords",
      icon: MdDashboard,
      label: "Health Records",
    },
    {
      path: "/provider/docverification",
      icon: MdFolder,
      label: "Doc Verification",
    },
  ];

  return (
    <div className="flex h-screen bg-[#eef3f8]">

      {/* ✅ SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#011138] text-white shadow-lg
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center h-16 px-6 border-b border-white/20">
          <h1 className="font-semibold text-lg">HealthGov</h1>

          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <MdClose size={22} />
          </button>
        </div>

        {/* USER */}
        <div className="p-5 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-semibold">
              {user?.email?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium truncate">
                {user?.email}
              </p>
              <p className="text-green-400 text-xs">
                Healthcare Provider
              </p>
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className="p-4 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium
                  ${
                    isActive
                      ? "bg-green-600"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 mt-auto">
          <button
            onClick={logout}
            className="w-full bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

      </div>

      {/* ✅ OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/30 z-[40] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ✅ MAIN CONTENT */}
      <div className="flex-1 flex flex-col lg:pl-64">

        {/* MOBILE HEADER */}
        <header className="lg:hidden bg-white border-b">
          <div className="flex justify-between items-center px-4 h-14">
            <button onClick={() => setSidebarOpen(true)}>
              <MdMenu size={22} />
            </button>

            <p className="text-sm font-medium">
              Provider Portal
            </p>

            <div className="w-6" />
          </div>
        </header>

        {/* PAGE */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default ProviderLayout;