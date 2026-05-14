import { useEffect, useRef, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Notifications from "./Notifications";
import ProfileCard from "./ProfileCard";

// ✅ NOTIFICATION API
import {
  getNotificationsByUser,
  markNotificationAsRead,
} from "../api/notificationApi.js";

/* -------------------- NAV DATA -------------------- */

const mainNavigation = [
  { name: "Home", to: "/" },
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
    { name: "Dashboard", to: "/audit-dashboard" },
    { name: "Audit Reports", to: "/audit-reports" },
    { name: "Analytics", to: "/audit-analytics" },
  ],
  
  manager: [
    { name: "Dashboard", to: "/manager/dashboard" },
    { name: "Applications", to: "/manager/applications" },
    { name: "Programs", to: "/manager/health-programs" },
  ],

};

const authNavigation = [
  { name: "Login", to: "/login" },
  { name: "Register", to: "/signup" },
];

const roleUsers = {
  compliance: { name: "Compliance Officer" },
  auditor: { name: "Government Auditor" },
};

/* -------------------- COMPONENT -------------------- */

export default function Navbar() {
  const { user, logout } = useAuth();
  const userRole = user?.role?.toLowerCase() || null;

  const navRef = useRef(null);

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  /* -------------------- FETCH NOTIFICATIONS -------------------- */

  useEffect(() => {
    if (!user?.userId) return;
    fetchNotifications();
  }, [user?.userId]);

  const fetchNotifications = async () => {
    try {
      setNotifLoading(true);
      const res = await getNotificationsByUser(user.userId);
      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setNotifLoading(false);
    }
  };

  /* -------------------- MARK AS READ ON OPEN -------------------- */

  useEffect(() => {
    if (!isNotifOpen) return;

    notifications
      .filter((n) => !n.isRead)
      .forEach((n) => markNotificationAsRead(n.id));
  }, [isNotifOpen]);

  /* -------------------- CLICK OUTSIDE HANDLER -------------------- */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsNotifOpen(false);
        setIsProfileOpen(false);
      }
    };

    if (isNotifOpen || isProfileOpen) {
      window.addEventListener("click", handleClickOutside);
      return () =>
        window.removeEventListener("click", handleClickOutside);
    }
  }, [isNotifOpen, isProfileOpen]);

  /* -------------------- COMPUTED DATA -------------------- */


  const navItems =
    userRole && roleNavigation[userRole]
      ? roleNavigation[userRole]
      : mainNavigation;

  const profile = userRole ? roleUsers[userRole] : null;

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
  };

  /* -------------------- RENDER -------------------- */

  return (
    <>
      <Disclosure
        as="nav"
        className="fixed top-0 left-0 z-40 w-full bg-[#009930] shadow-md"
        ref={navRef}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">

            {/* ✅ LOGO */}
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/web_Icon.png" alt="logo" className="h-9" />
              <span className="text-lg font-bold text-white">
                HealthGov
              </span>
            </Link>

            {/* ✅ NAV LINKS */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-lg font-medium text-white hover:text-gray-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* ✅ RIGHT CONTROLS */}
            <div className="hidden md:flex items-center gap-4">
              {userRole? (
                <>
                  {/* 🔔 Notifications */}
                 
{userRole !== "auditor" && (
        <button
          onClick={() => {
            setIsNotifOpen(true);
            setIsProfileOpen(false);
          }}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        >
          <BellIcon className="h-6 w-6" />
        </button>
      )}


                  {/* 👤 Profile */}
                  <button
                    onClick={() => {
                      setIsProfileOpen(true);
                      setIsNotifOpen(false);
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
                  >
                    <UserCircleIcon className="h-6 w-6" />
                    <span>{profile?.name ?? "Profile"}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
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

            {/* 📱 MOBILE MENU */}
            <div className="md:hidden">
              <DisclosureButton className="text-white">
                <Bars3Icon className="h-6 w-6" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        {/* 📱 MOBILE PANEL */}
        <DisclosurePanel className="md:hidden bg-[#009933] px-4 py-3 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="block text-white text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
        </DisclosurePanel>
      </Disclosure>

      {/* ✅ Notifications Panel */}
      <Notifications
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        loading={notifLoading}
      />

      {/* ✅ Profile Panel */}
      <ProfileCard
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        email={user?.email}
        onLogout={handleLogout}
      />
    </>
  );
}
