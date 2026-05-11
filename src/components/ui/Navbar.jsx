import { useEffect, useRef, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, BellIcon, ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

const mainNavigation = [
  { name: "About", to: "/about" },
  { name: "Programs", to: "/programs" },
  { name: "Research", to: "/research" },
  { name: "Contact", to: "/contact" },
];

const roleNavigation = {
  compliance: [
    { name: "Dashboard", to: "/compliance" },
    { name: "Compliance Reports", to: "/compliance" },
    { name: "Analytics", to: "/compliance" },
  ],
  auditor: [
    { name: "Dashboard", to: "/audit" },
    { name: "Audit Reports", to: "/audit" },
    { name: "Analytics", to: "/audit" },
  ],
};

const authNavigation = [
  { name: "Login", to: "/login" },
  { name: "Register", to: "/signup" },
];

const roleMeta = {
  compliance: {
    label: "Compliance Officer",
    links: ["Dashboard", "Compliance Records", "Audits", "Reports"],
    modules: ["Compliance Monitoring", "Issue Tracking", "Audit Logs"],
  },
  auditor: {
    label: "Government Auditor",
    links: ["Dashboard", "Audits", "Reports", "Analytics"],
    modules: ["Program Review", "Compliance Review", "KPI Dashboard"],
  },
};

const roleUsers = {
  compliance: {
    name: "Compliance Officer",
    email: "compliance@healthgov.local",
  },
  auditor: {
    name: "Government Auditor",
    email: "auditor@healthgov.local",
  },
};

const notificationsByRole = {
  compliance: [
    { id: 1, title: "New audit assigned", subtitle: "2m ago" },
    { id: 2, title: "Compliance report ready", subtitle: "10m ago" },
    { id: 3, title: "Issue tracking updated", subtitle: "30m ago" },
  ],
  auditor: [
    { id: 1, title: "Program review available", subtitle: "5m ago" },
    { id: 2, title: "Analytics dashboard refreshed", subtitle: "15m ago" },
  ],
};

export default function Navbar() {
  const [userRole, setUserRole] = useState(
    typeof window !== "undefined" ? localStorage.getItem("userRole") : null
  );

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRoleChange = () => {
      setUserRole(localStorage.getItem("userRole"));
    };

    window.addEventListener("roleChanged", handleRoleChange);
    return () => window.removeEventListener("roleChanged", handleRoleChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNotifOpen(false);
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const metadata = userRole ? roleMeta[userRole] : null;
  const profile = userRole ? roleUsers[userRole] : null;
  const notifications = userRole ? notificationsByRole[userRole] : [];
  const hasNotifications = notifications.length > 0? true : false;
  const navItems = userRole && roleNavigation[userRole] ? roleNavigation[userRole] : mainNavigation;

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
    setIsProfileOpen(false);
    navigate("/login");
  };

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 z-40 w-full bg-[#009930] shadow-md"
      ref={navRef}
    >
      <div className="mx-auto max-w-7xl px-4">
        
        {/* ✅ FLEX FIX */}
        <div className="flex h-16 items-center justify-between">

          {/* LEFT → LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/web_Icon.png"
              alt="logo"
              className="h-9"
            />
            <span className="text-lg font-bold text-white">
              HealthGov
            </span>
          </Link>

          {/* CENTER → NAV LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-lg font-medium text-white hover:text-gray-200 transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* RIGHT → AUTH OR USER CONTROLS */}
          <div className="hidden md:flex items-center gap-4">
            {userRole ? (
              <>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsNotifOpen((current) => !current);
                      setIsProfileOpen(false);
                    }}
                    className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Open notifications"
                  >
                    <BellIcon className="h-6 w-6" />
                    {hasNotifications ? (
                      <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-400 px-1.5 text-[0.65rem] font-semibold text-slate-950">
                        {notifications.length}
                      </span>
                    ) : null}
                  </button>
                  {isNotifOpen ? (
                    <div className="absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-slate-950/30">
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Notifications</p>
                      <div className="mt-3 space-y-3">
                        {notifications.length > 0 ? (
                          notifications.map((item) => (
                            <div key={item.id} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-3">
                              <p className="font-semibold text-white">{item.title}</p>
                              <p className="mt-1 text-xs text-slate-400">{item.subtitle}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-slate-400">No new notifications</p>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen((current) => !current);
                      setIsNotifOpen(false);
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                    aria-label="Open profile menu"
                  >
                    <UserCircleIcon className="h-6 w-6" />
                    <span className="hidden sm:inline">{profile?.name ?? "Profile"}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                  {isProfileOpen ? (
                    <div className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-slate-950/30">
                      <div className="mb-4 rounded-3xl bg-slate-900/90 p-4">
                        <p className="text-sm font-semibold text-slate-200">{profile?.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{profile?.email}</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full rounded-3xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                      >
                        Logout
                      </button>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              authNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    item.name === "Register"
                      ? "bg-white text-green-700"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))
            )}
          </div>

          {/* MOBILE MENU */}
          <div className="md:hidden">
            <DisclosureButton className="text-white">
              <Bars3Icon className="h-6 w-6" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      {/* ✅ MOBILE PANEL */}
      <DisclosurePanel className="md:hidden bg-[#009933]">
        <div className="px-4 py-3 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="block text-white text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
          {!userRole
            ? authNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block text-white text-base font-medium"
                >
                  {item.name}
                </Link>
              ))
            : null}
          {userRole ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsNotifOpen((current) => !current);
                    setIsProfileOpen(false);
                  }}
                  className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Open notifications"
                >
                  <BellIcon className="h-6 w-6" />
                  {hasNotifications ? (
                    <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-400 px-1.5 text-[0.65rem] font-semibold text-slate-950">
                      {notifications.length}
                    </span>
                  ) : null}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen((current) => !current);
                    setIsNotifOpen(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                  aria-label="Open profile menu"
                >
                  <UserCircleIcon className="h-6 w-6" />
                  <span>{profile?.name ?? "Profile"}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </div>
              {isNotifOpen ? (
                <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-slate-950/30">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Notifications</p>
                  <div className="mt-3 space-y-3">
                    {notifications.length > 0 ? (
                      notifications.map((item) => (
                        <div key={item.id} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-3">
                          <p className="font-semibold text-white">{item.title}</p>
                          <p className="mt-1 text-xs text-slate-400">{item.subtitle}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400">No new notifications</p>
                    )}
                  </div>
                </div>
              ) : null}
              {isProfileOpen ? (
                <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-slate-950/30">
                  <div className="mb-4 rounded-3xl bg-slate-900/90 p-4">
                    <p className="text-sm font-semibold text-slate-200">{profile?.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{profile?.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-3xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}