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

import {
  getAllNotifications,
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
    { name: "Reports", to: "/compliance-reports" },
    { name: "Analytics", to: "/compliance-analytics" },
  ],
  auditor: [
    { name: "Dashboard", to: "/audit-dashboard" },
    { name: "Reports", to: "/audit-reports" },
    { name: "Analytics", to: "/audit-analytics" },
  ],
  manager: [
    { name: "Dashboard", to: "/manager/dashboard" },
    { name: "Apps", to: "/manager/applications" },
    { name: "Programs", to: "/manager/health-programs" },
  ],
};

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

  /* ================= FETCH NOTIFICATIONS ================= */

  useEffect(() => {
    if (!user?.userId) return;
    fetchNotifications();
    
 const interval = setInterval(() => {
    fetchNotifications(); // 🔁 refresh every 10 seconds
  }, 5000); 

  }, [user?.userId]);

 const fetchNotifications = async () => {
  try {
    setNotifLoading(true);
    const res = await getAllNotifications();
    console.log("Fetched notifications:", res.data);

    const data = Array.isArray(res.data) ? res.data : [];

    // ✅ filter by logged-in user
    let filtered = data.filter((n) => n.userId === user.userId);

    // ✅ role-specific filter
    if (userRole === "compliance") {
      filtered = data.filter((n) => n.category === "COMPLIANCE");
    }

    setNotifications(filtered);

  } catch (err) {
    console.error("Notification fetch error:", err);
    setNotifications([]);
  } finally {
    setNotifLoading(false);
  }
};

  /* ================= MARK AS READ ================= */

  useEffect(() => {
    if (!isNotifOpen) return;

    const unread = notifications.filter((n) => !n.isRead);

    unread.forEach((n) => markNotificationAsRead(n.id));

    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
  }, [isNotifOpen]);

  /* ================= CLICK OUTSIDE ================= */

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

  /* ================= DATA ================= */

  const navItems =
    userRole && roleNavigation[userRole]
      ? roleNavigation[userRole]
      : mainNavigation;

  const profile = userRole ? roleUsers[userRole] : null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  /* ================= UI ================= */

  return (
    <>
      <Disclosure
        as="nav"
        ref={navRef}
        className="fixed top-0 left-0 w-full bg-[#009930] shadow-md z-40"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">

            {/* ✅ LOGO */}
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/web_Icon.png" className="h-8" />
              <span className="text-white font-bold text-lg hidden sm:block">
                HealthGov
              </span>
            </Link>

            {/* ✅ NAV LINKS */}
            <div className="hidden md:flex gap-6 lg:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-white font-medium hover:text-gray-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* ✅ RIGHT SIDE */}
            <div className="flex items-center gap-2 md:gap-4">

              {/* 🔔 NOTIFICATION */}
              {userRole && userRole !== "auditor" && (
                <button
                  onClick={() => {
                    setIsNotifOpen(true);
                    setIsProfileOpen(false);
                  }}
                  className="relative flex items-center justify-center h-10 w-10 md:h-11 md:w-11 bg-white/10 rounded-full"
                >
                  <BellIcon className="h-5 w-5 md:h-6 md:w-6 text-white" />

                  {/* ✅ BADGE 
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                      
                    </span>
                  )}
                    */}
                </button>
              )}

              {/* 👤 PROFILE */}
              {userRole && (
                <button
                  onClick={() => {
                    setIsProfileOpen(true);
                    setIsNotifOpen(false);
                  }}
                  className="flex items-center gap-1 md:gap-2 bg-white/10 px-2 md:px-4 py-2 rounded-full text-white"
                >
                  <UserCircleIcon className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="hidden md:inline">
                    {profile?.name}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 hidden md:block" />
                </button>
              )}

              {/* 📱 MOBILE MENU */}
              <div className="md:hidden ml-2">
                <DisclosureButton>
                  <Bars3Icon className="h-6 w-6 text-white" />
                </DisclosureButton>
              </div>

            </div>
          </div>
        </div>

        {/* ✅ MOBILE MENU */}
        <DisclosurePanel className="md:hidden bg-[#009933] px-4 py-3 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="block text-white"
            >
              {item.name}
            </Link>
          ))}
        </DisclosurePanel>
      </Disclosure>

      {/* ✅ PANELS */}
      <Notifications
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        loading={notifLoading}
      />

      <ProfileCard
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        email={user?.email}
        onLogout={logout}
      />
    </>
  );
}