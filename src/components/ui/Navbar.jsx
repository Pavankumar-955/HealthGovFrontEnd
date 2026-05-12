import { useEffect, useRef, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, BellIcon, ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Notifications from "./Notifications";
import ProfileCard from "./ProfileCard";

const mainNavigation = [
  {name: "Home", to: "/"},
  { name: "About", to: "/about" },
  { name: "Programs", to: "/programs" },
  { name: "Research", to: "/research" },
  { name: "Contact", to: "/contact" },
];

const roleNavigation = {
  compliance: [
    { name: "Dashboard", to: "/compliance-dashboard" },
    { name: "Compliance Reports", to: "/compliance-reports" },
    { name: "Analytics", to: "/compliance-analytics" },
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
    links: ["compliance-dashboard", "compliance-reports", "compliance-analytics"]
  },
  auditor: {
    label: "Government Auditor",
    links: ["Dashboard", "Audits", "Reports", "Analytics"]
  },
};

const roleUsers = {
  compliance: {
    name: "Compliance Officer",
  },
  auditor: {
    name: "Government Auditor"
  },
};

const notificationsByRole = {
  compliance: [
    { id: 1, title: "New compliance audit assigned", subtitle: "Health program review - 2m ago", type: "health" },
    { id: 2, title: "Compliance report ready", subtitle: "Vaccination records updated - 10m ago", type: "health" },
    { id: 3, title: "Issue tracking updated", subtitle: "Medical data privacy check - 30m ago", type: "health" },
  ],
  auditor: [
    { id: 1, title: "Program review available", subtitle: "Healthcare funding audit - 5m ago", type: "health" },
    { id: 2, title: "Analytics dashboard refreshed", subtitle: "Patient care metrics - 15m ago", type: "health" },
  ],
  admin: [
    { id: 1, title: "System health check completed", subtitle: "All services operational - 1m ago", type: "system" },
    { id: 2, title: "New user registration", subtitle: "Healthcare provider added - 5m ago", type: "user" },
  ],
  citizen: [
    { id: 1, title: "Health record updated", subtitle: "Vaccination status confirmed - 3m ago", type: "health" },
    { id: 2, title: "Appointment reminder", subtitle: "Doctor visit tomorrow - 1h ago", type: "health" },
  ],
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const userRole = user?.role?.toString().toLowerCase() || null;
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNotifOpen(false);
        setIsProfileOpen(false);
      }
    };

    if (isNotifOpen || isProfileOpen) {
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }
  }, [isNotifOpen, isProfileOpen]);

  const metadata = userRole ? roleMeta[userRole] : null;
  const profile = userRole ? roleUsers[userRole] : null;
  const notifications = userRole ? notificationsByRole[userRole] : [];
  const hasNotifications = notifications.length > 0? true : false;
  const navItems = userRole && roleNavigation[userRole] ? roleNavigation[userRole] : mainNavigation;

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
  };

  return (
    <>
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
                      setIsNotifOpen(true);
                      setIsProfileOpen(false);
                    }}
                    className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Open notifications"
                  >
                    <BellIcon className="h-6 w-6" />
                    {hasNotifications ? (
                      <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 px-1.5 text-[0.65rem] font-semibold text-slate-950">
                        {/* {notifications.length} */}
                      </span>
                    ) : null}
                  </button>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(true);
                      setIsNotifOpen(false);
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                    aria-label="Open profile menu"
                  >
                    <UserCircleIcon className="h-6 w-6" />
                    <span className="hidden sm:inline">{profile?.name ?? "Profile"}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
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
                    setIsNotifOpen(true);
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
                    setIsProfileOpen(true);
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
            </div>
          ) : null}
        </div>
      </DisclosurePanel>
    </Disclosure>

    <Notifications
      isOpen={isNotifOpen}
      onClose={() => setIsNotifOpen(false)}
      notifications={notifications}
    />

    <ProfileCard
      isOpen={isProfileOpen}
      onClose={() => setIsProfileOpen(false)}
      email={user?.email || profile?.email}
      onLogout={handleLogout}
    />
    </>
  );
}