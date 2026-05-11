import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  MdDashboard,
  MdBuild,
  MdLibraryBooks,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";

const ManagerLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ NEW: active section state
  const [activeSection, setActiveSection] = useState("Infrastructure");

  // ✅ MENU
  const menuItems = [
    {
      section: "Infrastructure",
      items: [
        {
          path: "/infrastructure/dashboard",
          icon: MdDashboard,
          label: "Infra Dashboard",
        },
        {
          path: "/infrastructure/systems",
          icon: MdBuild,
          label: "Systems",
        },
      ],
    },
    {
      section: "Resources",
      items: [
        {
          path: "/resources/dashboard",
          icon: MdDashboard,
          label: "Resource Dashboard",
        },
        {
          path: "/resources/library",
          icon: MdLibraryBooks,
          label: "Resources",
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-[#eef3f8]">

      {/* ✅ OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ✅ SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-semibold text-gray-800">
            HealthGov
          </h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500"
          >
            <MdClose size={22} />
          </button>
        </div>

        {/* USER */}
        <div className="p-5 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
              {user?.email?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-sm">{user?.email}</p>
              <p className="text-xs text-gray-500">Manager</p>
            </div>
          </div>
        </div>

        {/* ✅ ADD TOGGLE BUTTONS */}
        <div className="p-4 flex gap-2 border-b">
          <button
            onClick={() => setActiveSection("Infrastructure")}
            className={`flex-1 py-2 rounded-lg text-sm ${
              activeSection === "Infrastructure"
                ? "bg-green-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Infrastructure
          </button>

          <button
            onClick={() => setActiveSection("Resources")}
            className={`flex-1 py-2 rounded-lg text-sm ${
              activeSection === "Resources"
                ? "bg-green-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Resources
          </button>
        </div>

        {/* ✅ NAV */}
        <nav className="p-4 space-y-6 overflow-y-auto">

          {menuItems
            .filter((section) => section.section === activeSection)
            .map((section) => (
              <div key={section.section}>

                {/* SECTION TITLE */}
                <p className="text-xs text-gray-400 uppercase mb-2">
                  {section.section}
                </p>

                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                        ${
                          isActive
                            ? "bg-green-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            ))}

        </nav>

        {/* ✅ LOGOUT */}
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <MdLogout size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* ✅ MAIN */}
      <div className="flex-1 flex flex-col">

        {/* MOBILE HEADER */}
        <header className="lg:hidden bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-4 h-14">
            <button onClick={() => setSidebarOpen(true)}>
              <MdMenu size={22} />
            </button>

            <p className="text-sm font-medium">
              HealthGov Portal
            </p>

            <div className="w-6" />
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default ManagerLayout;